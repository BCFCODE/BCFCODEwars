import { getDb } from '@/lib/mongodb';
import { getEmail } from '@/services/clerkService';
import {
  CodewarsProfileData,
  isConnectedToCodewars,
  Kata,
  kataSchema
} from '@/types';

// 🔹 Reusable pipeline stages to add totalDiamonds
const addDiamondsStages = [
  {
    $lookup: {
      from: 'diamonds',
      let: { userEmail: '$email' },
      pipeline: [
        { $match: { $expr: { $eq: ['$email', '$$userEmail'] } } },
        { $project: { _id: 0, totalDiamonds: '$totals.total' } }
      ],
      as: 'diamondsDoc'
    }
  },
  {
    $addFields: {
      totalDiamonds: {
        $ifNull: [{ $arrayElemAt: ['$diamondsDoc.totalDiamonds', 0] }, 0]
      }
    }
  },
  { $project: { diamondsDoc: 0 } }
] as const;

/** 🔹 Lightweight check for connection + diamonds */
export async function isConnected(): Promise<isConnectedToCodewars | null> {
  try {
    const email = await getEmail();
    const db = await getDb();

    const [data] = await db
      .collection<isConnectedToCodewars>('codewars')
      .aggregate<isConnectedToCodewars>([
        { $match: { email } },
        {
          $project: {
            _id: 0,
            isConnected: 1,
            name: 1,
            email: 1,
            id: 1,
            username: 1
          }
        },
        ...addDiamondsStages
      ])
      .toArray();

    return data ?? null;
  } catch (error) {
    console.error('Error in isConnectedToCodewars:', error);
    throw new Error('Failed to check Codewars connection');
  }
}

/** 🔹 Full profile + diamonds */
export async function getCodewarsProfile(): Promise<CodewarsProfileData | null> {
  try {
    const email = await getEmail();
    const db = await getDb();

    const [profile] = await db
      .collection<CodewarsProfileData>('codewars')
      .aggregate<CodewarsProfileData>([
        { $match: { email } },
        {
          $project: {
            _id: 0,
            isConnected: 1,
            name: 1,
            username: 1,
            email: 1,
            clan: 1,
            honor: 1,
            leaderboardPosition: 1,
            ranks: 1,
            skills: 1
          }
        },
        ...addDiamondsStages
      ])
      .toArray();

    return profile ?? null;
  } catch (error) {
    console.error('Error in getCodewarsProfile:', error);
    throw new Error('Failed to fetch Codewars profile');
  }
}

export async function getKataData({
  username,
  userId
}: {
  username: string;
  userId: string;
}) {
  const db = await getDb();
  const collection = db.collection<Kata>('katas');

  // ✅ Make sure indexes exist (run once at startup, not per-request ideally)
  await collection.createIndex({ userId: 1, completedAt: -1 });
  await collection.createIndex({ userId: 1, id: 1 }, { unique: true });

  // Step 1: Get checkpoint (latest completed kata for this user)
  const latest = await collection.findOne(
    { userId },
    { sort: { completedAt: -1 }, projection: { completedAt: 1 } }
  );
  const latestCompletedAt = latest?.completedAt || null;

  // Step 2: Fetch new katas
  const newKatas: Kata[] = [];

  // Fetch first page to get totalPages and check if we need more
  const firstRes = await fetch(
    `https://www.codewars.com/api/v1/users/${username}/code-challenges/completed?page=0`
  );
  if (!firstRes.ok) throw new Error(`API error: ${firstRes.status}`);
  const firstJson = await firstRes.json();
  const { totalPages, data: firstData } = firstJson;

  // Helper to filter out only new katas
  const processData = (data: any[]) => {
    for (const apiKata of data) {
      const completedDate = new Date(apiKata.completedAt);

      // ✅ Early exit optimization
      if (latestCompletedAt && completedDate <= latestCompletedAt) {
        return false; // stop scanning this page
      }

      newKatas.push({
        userId,
        id: apiKata.id,
        name: apiKata.name,
        completedAt: completedDate,
        completedLanguages: apiKata.completedLanguages,
        slug: apiKata.slug,
        rewardStatus: 'unclaimedDiamonds'
      });
    }
    return true;
  };

  // Process first page
  let shouldContinue = processData(firstData);

  if (shouldContinue && totalPages > 1) {
    // Fetch remaining pages in parallel
    const pageRequests = Array.from({ length: totalPages - 1 }, (_, i) =>
      fetch(
        `https://www.codewars.com/api/v1/users/${username}/code-challenges/completed?page=${i + 1}`
      ).then((r) => {
        if (!r.ok) throw new Error(`API error: ${r.status}`);
        return r.json();
      })
    );

    const pages = await Promise.all(pageRequests);

    // Process pages in order until we hit old katas
    for (const { data } of pages) {
      shouldContinue = processData(data);
      if (!shouldContinue) break; // ✅ early break
    }
  }

  // Step 3: Bulk upsert (fast, unordered)
  if (newKatas.length > 0) {
    const operations = newKatas.map((kata) => ({
      updateOne: {
        filter: { userId: kata.userId, id: kata.id },
        update: { $setOnInsert: kata },
        upsert: true
      }
    }));

    // ⚡ Chunk operations if massive
    const chunkSize = 500;
    for (let i = 0; i < operations.length; i += chunkSize) {
      await collection.bulkWrite(operations.slice(i, i + chunkSize), {
        ordered: false
      });
    }
  }

  // Step 4: Return updated data (already sorted & projected by index)
  const katas = await collection
    .find({ userId })
    .project({
      _id: 0,
      id: 1,
      userId: 1,
      slug: 1,
      name: 1,
      completedAt: 1
    })
    .sort({ completedAt: -1 })
    .toArray();

  return katas.map((kata) => kataSchema.parse(kata));
}
