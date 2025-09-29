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

  // Step 1: Get checkpoint
  const latest = await collection.findOne(
    { userId },
    { sort: { completedAt: -1 }, projection: { completedAt: 1 } }
  );
  const latestCompletedAt = latest?.completedAt || null;

  // Step 2: Fetch new katas
  const newKatas: Kata[] = [];
  let page = 0;
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(
      `https://www.codewars.com/api/v1/users/${username}/code-challenges/completed?page=${page}`
    );
    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const { totalPages, data } = await response.json();

    for (const apiKata of data) {
      const completedDate = new Date(apiKata.completedAt);
      if (latestCompletedAt && completedDate <= latestCompletedAt) continue;

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

    page++;
    if (page >= totalPages) hasMore = false;
  }

  // Deduplicate (just in case)
  const dedupedKatas = Array.from(
    new Map(newKatas.map((k) => [`${k.userId}-${k.id}`, k])).values()
  );

  // Step 3: Bulk upsert (⚡ super fast)
  if (dedupedKatas.length > 0) {
    const operations = dedupedKatas.map((kata) => ({
      updateOne: {
        filter: { userId: kata.userId, id: kata.id },
        update: { $setOnInsert: kata },
        upsert: true
      }
    }));

    await collection.bulkWrite(operations, { ordered: false });
  }

  // Step 4: Return updated data
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
