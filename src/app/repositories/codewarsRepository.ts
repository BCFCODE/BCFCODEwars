import { getDb } from '@/lib/mongodb';
import { getEmail, getUser } from '@/services/clerkService';
import {
  CodewarsProfileData,
  isConnectedToCodewars,
  Kata,
  kataSchema,
  recentlySolvedKata,
  recentlySolvedKataSchema
} from '@/types';
import { Db } from 'mongodb';

/**
 * Retrieves the Codewars user ID and username for the authenticated user based on their email.
 * @returns An object containing the database instance, user email, Codewars user ID, and username.
 * @throws Error if the email is invalid, the database operation fails, or the Codewars user ID or username is not found.
 */
export async function getCodewarsUserId(): Promise<{
  db: Db;
  email: string;
  id: string;
  username: string;
}> {
  try {
    const email = await getEmail();

    // Validate email input
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      throw new Error('Invalid or missing email');
    }

    const db = await getDb();

    // Query the codewars collection for the user ID and username
    const codewars = await db
      .collection<isConnectedToCodewars>('codewars')
      .findOne({ email }, { projection: { _id: 0, id: 1, username: 1 } });

    // Throw an error if the user ID or username is not found
    if (!codewars?.id || !codewars?.username) {
      throw new Error(
        'Codewars user ID or username not found for the provided email'
      );
    }

    // Return the result with db, email, id, and username
    return { db, email, id: codewars.id, username: codewars.username };
  } catch (error) {
    console.error('Error in getCodewarsUserId:', error);
    throw new Error(
      error instanceof Error && error.message.includes('not found')
        ? error.message
        : 'Failed to fetch Codewars user ID or username'
    );
  }
}

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

/**
 * Retrieves the Codewars profile for the authenticated user, fetching fresh data from the Codewars API
 * and updating the database with the latest user information.
 * @returns The Codewars profile data or null if the profile cannot be retrieved or updated.
 * @throws Error if the database operation fails, the API request fails, or required user data is missing.
 */
export async function getCodewarsProfile(): Promise<CodewarsProfileData | null> {
  try {
    const { db, email, id, username } = await getCodewarsUserId();

    // Fetch user data from Codewars API
    const response = await fetch(
      `https://www.codewars.com/api/v1/users/${encodeURIComponent(username)}`,
      { signal: AbortSignal.timeout(10000) } // 10s timeout
    );

    if (!response.ok) {
      console.error(
        `Codewars API error: ${response.status} ${response.statusText}`
      );
      throw new Error(`Failed to fetch Codewars profile: ${response.status}`);
    }

    const apiData = await response.json();

    // Validate API response
    if (!apiData?.id || !apiData?.username) {
      throw new Error('Invalid Codewars API response: Missing id or username');
    }

    // Prepare updated profile data
    const updatedProfile = {
      email,
      ...apiData
    };

    // Update the codewars collection with the new data
    await db
      .collection<isConnectedToCodewars>('codewars')
      .updateOne({ id }, { $set: updatedProfile }, { upsert: true });

    // Fetch the updated profile with diamonds
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
            skills: 1,
            codeChallenges: 1
          }
        },
        ...addDiamondsStages
      ])
      .toArray();

    return profile ?? null;
  } catch (error) {
    console.error('Error in getCodewarsProfile:', error);
    throw new Error(
      error instanceof Error && error.message.includes('API')
        ? error.message
        : 'Failed to fetch or update Codewars profile'
    );
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
  const recentlySolved = db.collection('recentlySolved');
  const user = await getUser();

  // Validate username
  if (!username || typeof username !== 'string') {
    throw new Error('Invalid or missing username');
  }

  // Ensure indexes
  await collection.createIndex({ userId: 1, completedAt: -1 });
  await collection.createIndex({ userId: 1, id: 1 }, { unique: true });
  await recentlySolved.createIndex({ userId: 1, completedAt: -1 });
  await recentlySolved.createIndex({ userId: 1, id: 1 });

  // Get checkpoint
  const latest = await collection.findOne(
    { userId },
    { sort: { completedAt: -1 }, projection: { completedAt: 1 } }
  );
  const latestCompletedAt = latest?.completedAt || null;

  // Fetch new katas
  const newKatas: Kata[] = [];

  try {
    const firstRes = await fetch(
      `https://www.codewars.com/api/v1/users/${encodeURIComponent(username)}/code-challenges/completed?page=0`,
      { signal: AbortSignal.timeout(10000) } // 10s timeout
    );
    if (!firstRes.ok) {
      console.error(`API error: ${firstRes.status} ${firstRes.statusText}`);
      throw new Error(`Codewars API error: ${firstRes.status}`);
    }
    const firstJson = await firstRes.json();
    const { totalPages, data: firstData } = firstJson;

    const processData = (data: any[]) => {
      for (const apiKata of data) {
        const completedDate = new Date(apiKata.completedAt);
        if (latestCompletedAt && completedDate <= latestCompletedAt) {
          return false;
        }
        newKatas.push({
          userId,
          id: apiKata.id,
          name: apiKata.name,
          completedAt: completedDate,
          completedLanguages: apiKata.completedLanguages,
          slug: apiKata.slug,
          isCollected: false
        });
      }
      return true;
    };

    let shouldContinue = processData(firstData);

    if (shouldContinue && totalPages > 1) {
      const pageRequests = Array.from({ length: totalPages - 1 }, (_, i) =>
        fetch(
          `https://www.codewars.com/api/v1/users/${encodeURIComponent(username)}/code-challenges/completed?page=${i + 1}`,
          { signal: AbortSignal.timeout(10000) }
        ).then(async (r) => {
          if (!r.ok) {
            console.error(
              `API error on page ${i + 1}: ${r.status} ${r.statusText}`
            );
            throw new Error(`Codewars API error: ${r.status}`);
          }
          return r.json();
        })
      );

      const pages = await Promise.all(pageRequests);
      for (const { data } of pages) {
        shouldContinue = processData(data);
        if (!shouldContinue) break;
      }
    }
  } catch (error) {
    console.error('Error fetching Codewars data:', error);
    throw new Error(`Failed to fetch katas: ${(error as Error).message}`);
  }

  // Bulk upsert to katas
  if (newKatas.length > 0) {
    const operations = newKatas.map((kata) => ({
      updateOne: {
        filter: { userId: kata.userId, id: kata.id },
        update: { $setOnInsert: kata },
        upsert: true
      }
    }));

    const chunkSize = 500;
    for (let i = 0; i < operations.length; i += chunkSize) {
      await collection.bulkWrite(operations.slice(i, i + chunkSize), {
        ordered: false
      });
    }

    const recentDocs = newKatas.map((kata) => ({
      username: user.fullName,
      userId: kata.userId,
      kataId: kata.id,
      kataName: kata.name,
      completedAt: kata.completedAt,
      avatar: user.imageUrl,
      fallback:
        (user.firstName ?? 'G')[0].toUpperCase() +
        (user.lastName ?? '')[0].toUpperCase()
    }));

    await recentlySolved.insertMany(recentDocs, { ordered: false });
  }

  // Return updated data
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
    .limit(10)
    .toArray();

  return katas.map((kata) => kataSchema.parse(kata));
}

export async function getRecentlySolved({ limit = 100 }: { limit?: number }) {
  const db = await getDb();
  const collection = db.collection<recentlySolvedKata>('recentlySolved');

  const katas = await collection
    .find({})
    .project({
      _id: 0,
      username: 1,
      userId: 1,
      kataId: 1,
      kataName: 1,
      completedAt: 1,
      avatar: 1,
      fallback: 1
    })
    .sort({ completedAt: -1 }) // ✅ latest on top
    .limit(limit)
    .toArray();

  return katas.map((kata) => recentlySolvedKataSchema.parse(kata));
}
