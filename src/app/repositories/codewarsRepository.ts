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
import { ClientSession, Db } from 'mongodb';
import { appendFile } from 'fs/promises';

// #region agent log
const logPath = 'f:\\Wars\\BCFCODEwars\\.cursor\\debug.log';
const logToFile = async (data: any) => {
  try {
    const logEntry = JSON.stringify({ ...data, timestamp: Date.now() }) + '\n';
    await appendFile(logPath, logEntry, 'utf8');
  } catch (e) {}
};
// #endregion

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
      { next: { revalidate: 60 }, signal: AbortSignal.timeout(10000) } // 10s timeout
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

export async function getKataData(
  {
    codewarsUsername,
    codewarsUserId,
    codewarsName
  }: {
    codewarsUsername: string;
    codewarsUserId: string;
    codewarsName: string;
  },
  session?: ClientSession
): Promise<Kata[]> {
  // Input validation
  if (typeof codewarsUsername !== 'string' || !codewarsUsername.trim()) {
    throw new Error('Invalid or missing username');
  }
  if (typeof codewarsUserId !== 'string' || !codewarsUserId.trim()) {
    throw new Error('Invalid or missing user ID');
  }
  if (typeof codewarsName !== 'string' || !codewarsName.trim()) {
    throw new Error('Invalid or missing name');
  }

  // #region agent log
  const getKataDataStartTime = Date.now();
  await logToFile({
    location: 'codewarsRepository.ts:188',
    message: 'getKataData started',
    data: { username: codewarsUsername, userId: codewarsUserId },
    sessionId: 'debug-session',
    runId: 'run1',
    hypothesisId: 'A'
  });
  // #endregion
  const db = await getDb();
  const katasCollection = db.collection<Kata>('katas');
  const recentlySolvedCollection = db.collection('recentlySolved');
  // #region agent log
  const getUserStartTime = Date.now();
  // #endregion
  const user = await getUser(); // Fetches user data including imageUrl
  // #region agent log
  const getUserDuration = Date.now() - getUserStartTime;
  await logToFile({
    location: 'codewarsRepository.ts:214',
    message: 'getUser completed',
    data: { duration: getUserDuration },
    sessionId: 'debug-session',
    runId: 'run1',
    hypothesisId: 'A'
  });
  // #endregion

  // Get latest completedAt checkpoint within transaction
  // #region agent log
  const findLatestStartTime = Date.now();
  // #endregion
  const latest = await katasCollection.findOne(
    { userId: codewarsUserId },
    {
      sort: { completedAt: -1 },
      projection: { completedAt: 1 },
      session // Bind to transaction
    }
  );
  // #region agent log
  const findLatestDuration = Date.now() - findLatestStartTime;
  await logToFile({
    location: 'codewarsRepository.ts:217',
    message: 'findLatest completed',
    data: { duration: findLatestDuration, hasLatest: !!latest },
    sessionId: 'debug-session',
    runId: 'run1',
    hypothesisId: 'A'
  });
  // #endregion
  const latestCompletedAt = latest?.completedAt ?? null;

  // Fetch new katas sequentially with early stopping
  const newKatas: Kata[] = [];
  let page = 0;
  let totalPages = 1;
  let shouldContinue = true;

  // #region agent log
  const apiCallsStartTime = Date.now();
  let apiCallCount = 0;
  let dbWriteStartTime: number | undefined;
  // #endregion

  try {
    while (shouldContinue && page < totalPages) {
      // #region agent log
      const singleApiCallStartTime = Date.now();
      apiCallCount++;
      // #endregion
      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(new Error('Request timed out')),
        10000
      );

      const res = await fetch(
        `https://www.codewars.com/api/v1/users/${encodeURIComponent(codewarsUsername)}/code-challenges/completed?page=${page}`,
        { next: { revalidate: 60 }, signal: controller.signal }
      );

      clearTimeout(timeoutId);

      if (!res.ok) {
        console.error(
          `API error on page ${page}: ${res.status} ${res.statusText}`
        );
        throw new Error(`Codewars API error: ${res.status}`);
      }
      const json = await res.json();
      const { data } = json;

      if (page === 0) {
        totalPages = json.totalPages;
      }

      shouldContinue = false;
      let newKatasInPage = 0;
      for (const apiKata of data) {
        const completedDate = new Date(apiKata.completedAt);
        if (latestCompletedAt && completedDate <= latestCompletedAt) {
          shouldContinue = false;
          break;
        }
        newKatas.push({
          userId: codewarsUserId,
          id: apiKata.id,
          name: apiKata.name,
          completedAt: completedDate,
          completedLanguages: apiKata.completedLanguages,
          slug: apiKata.slug,
          isCollected: false
        });
        newKatasInPage++;
        shouldContinue = true;
      }
      // #region agent log
      const singleApiCallDuration = Date.now() - singleApiCallStartTime;
      await logToFile({
        location: 'codewarsRepository.ts:254',
        message: 'API call completed',
        data: {
          page,
          duration: singleApiCallDuration,
          newKatasInPage,
          totalPages
        },
        sessionId: 'debug-session',
        runId: 'run1',
        hypothesisId: 'A'
      });
      // #endregion
      page++;
    }
    // #region agent log
    const apiCallsDuration = Date.now() - apiCallsStartTime;
    await logToFile({
      location: 'codewarsRepository.ts:248',
      message: 'All API calls completed',
      data: {
        totalDuration: apiCallsDuration,
        totalCalls: apiCallCount,
        totalNewKatas: newKatas.length
      },
      sessionId: 'debug-session',
      runId: 'run1',
      hypothesisId: 'A'
    });
    // #endregion
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage === 'Request timed out') {
      console.error('Fetch timed out');
      throw new Error('Request timed out after 10 seconds');
    }
    console.error('Error fetching Codewars data:', error);
    throw new Error(`Failed to fetch katas: ${errorMessage}`);
  }

  // Perform database writes within transaction
  if (newKatas.length > 0) {
    // #region agent log
    dbWriteStartTime = Date.now();
    // #endregion
    const operations = newKatas.map((kata) => ({
      updateOne: {
        filter: { userId: kata.userId, id: kata.id },
        update: { $setOnInsert: kata },
        upsert: true
      }
    }));

    const chunkSize = 500;
    // #region agent log
    const bulkWriteStartTime = Date.now();
    // #endregion
    for (let i = 0; i < operations.length; i += chunkSize) {
      await katasCollection.bulkWrite(
        operations.slice(i, i + chunkSize),
        { ordered: false, session } // Bind to transaction
      );
    }
    // #region agent log
    const bulkWriteDuration = Date.now() - bulkWriteStartTime;
    // #endregion

    const recentDocs = newKatas.map((kata) => ({
      username: codewarsName,
      userId: kata.userId,
      kataId: kata.id,
      kataName: kata.name,
      completedAt: kata.completedAt,
      avatar: user.imageUrl,
      fallback: codewarsName.charAt(0).toUpperCase()
    }));

    // #region agent log
    const insertManyStartTime = Date.now();
    // #endregion
    await recentlySolvedCollection.insertMany(
      recentDocs,
      { ordered: false, session } // Bind to transaction
    );
    // #region agent log
    const insertManyDuration = Date.now() - insertManyStartTime;
    const dbWriteDuration = Date.now() - dbWriteStartTime;
    await logToFile({
      location: 'codewarsRepository.ts:291',
      message: 'DB writes completed',
      data: {
        bulkWriteDuration,
        insertManyDuration,
        dbWriteDuration,
        newKatasCount: newKatas.length
      },
      sessionId: 'debug-session',
      runId: 'run1',
      hypothesisId: 'A'
    });
    // #endregion
  } else {
    // #region agent log
    await logToFile({
      location: 'codewarsRepository.ts:291',
      message: 'No new katas - skipping DB writes',
      data: {},
      sessionId: 'debug-session',
      runId: 'run1',
      hypothesisId: 'E'
    });
    // #endregion
  }

  // Fetch and return the 10 most recent katas within transaction
  // #region agent log
  const fetchRecentStartTime = Date.now();
  // #endregion
  const katas = await katasCollection
    .find(
      { userId: codewarsUserId },
      {
        projection: {
          _id: 0,
          id: 1,
          userId: 1,
          slug: 1,
          name: 1,
          completedAt: 1
        },
        sort: { completedAt: -1 },
        limit: 10,
        session // Bind to transaction
      }
    )
    .toArray();
  // #region agent log
  const fetchRecentDuration = Date.now() - fetchRecentStartTime;
  const getKataDataTotalDuration = Date.now() - getKataDataStartTime;
  const apiCallsDuration = Date.now() - apiCallsStartTime;
  const dbWriteDuration = dbWriteStartTime ? Date.now() - dbWriteStartTime : 0;
  await logToFile({
    location: 'codewarsRepository.ts:188',
    message: 'getKataData completed',
    data: {
      totalDuration: getKataDataTotalDuration,
      getUserDuration,
      findLatestDuration,
      apiCallsDuration,
      dbWriteDuration,
      fetchRecentDuration,
      returnedKatasCount: katas.length
    },
    sessionId: 'debug-session',
    runId: 'run1',
    hypothesisId: 'A'
  });
  // #endregion

  return katas.map((kata) => kataSchema.parse(kata));
}

export async function getChampionsKataData(
  limit = 25,
  skip = 0,
  session?: ClientSession
): Promise<{
  success: boolean;
  data: recentlySolvedKata[];
  totalCount: number;
}> {
  try {
    // #region agent log
    const getChampionsStartTime = Date.now();
    // #endregion
    const db = await getDb();
    const collection = db.collection<recentlySolvedKata>('recentlySolved');

    // #region agent log
    const countStartTime = Date.now();
    // #endregion
    // Use estimatedDocumentCount for much faster performance (O(1) vs O(n))
    // This gives an approximate count which is sufficient for pagination
    const totalCount = await collection.estimatedDocumentCount();
    // #region agent log
    const countDuration = Date.now() - countStartTime;
    await logToFile({
      location: 'codewarsRepository.ts:348',
      message: 'estimatedDocumentCount completed',
      data: { duration: countDuration, totalCount },
      sessionId: 'debug-session',
      runId: 'run1',
      hypothesisId: 'B'
    });
    // #endregion

    // #region agent log
    const findStartTime = Date.now();
    // #endregion
    const katas = await collection
      .find(
        {},
        {
          projection: {
            _id: 0,
            username: 1,
            userId: 1,
            kataId: 1,
            kataName: 1,
            completedAt: 1,
            avatar: 1,
            fallback: 1
          },
          sort: { completedAt: -1 },
          limit,
          skip,
          session
        }
      )
      .toArray();
    // #region agent log
    const findDuration = Date.now() - findStartTime;
    const getChampionsDuration = Date.now() - getChampionsStartTime;
    await logToFile({
      location: 'codewarsRepository.ts:348',
      message: 'getChampionsKataData completed',
      data: {
        countDuration,
        findDuration,
        totalDuration: getChampionsDuration,
        returnedCount: katas.length,
        limit,
        skip
      },
      sessionId: 'debug-session',
      runId: 'run1',
      hypothesisId: 'B'
    });
    // #endregion

    const parsedKatas = katas.map((kata) =>
      recentlySolvedKataSchema.parse(kata)
    );

    return {
      success: true,
      data: parsedKatas,
      totalCount
    };
  } catch (error) {
    console.error('Error in getChampionsKataData:', error);
    return {
      success: false,
      data: [],
      totalCount: 0
    };
  }
}
