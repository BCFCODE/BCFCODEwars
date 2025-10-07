import { getDb } from '../src/lib/mongodb';
import { JobData, Kata, KataMetaDataSchema } from '../src/types';
import { Job, Worker } from 'bullmq';
import pLimit from 'p-limit';
import diamondsQueue, { redisUrl } from '../queues/diamondsQueue';

// Rest of the file remains unchanged
const limit = pLimit(2);

const processDiamonds = async (job: Job<JobData>): Promise<void> => {
  console.log(`[Worker] Processing job ${job.id} for user ${job.data.userId}`);
  const { userId } = job.data;
  let db;
  try {
    console.log(
      `[Worker] Connecting to MongoDB with MONGO_URI=${process.env.MONGO_URI}`
    );
    db = await getDb();
    console.log(`[Worker] Connected to MongoDB for user ${userId}`);
  } catch (err: any) {
    console.error(`[Worker] MongoDB connection failed: ${err.message}`);
    throw err;
  }

  const katasCollection = db.collection<Kata>('katas');
  const katasMetaDataCollection = db.collection('katasMetaData');

  try {
    const pendingKatas = await katasCollection
      .find({ userId, isCollected: false })
      .toArray();
    console.log(
      `[Worker] Found ${pendingKatas.length} pending katas for user ${userId}:`,
      pendingKatas.map((k) => k.id)
    );

    if (pendingKatas.length === 0) {
      console.log(`[Worker] No pending katas for user ${userId}, exiting`);
      return;
    }

    const results = await Promise.allSettled(
      pendingKatas.map((kata) =>
        limit(async () => {
          const challengeId = kata.id;
          console.log(`[Worker] Fetching kata ${challengeId} from Codewars`);
          try {
            const response = await fetch(
              `https://www.codewars.com/api/v1/code-challenges/${challengeId}`,
              { signal: AbortSignal.timeout(5000) }
            );
            if (!response.ok) {
              throw new Error(
                `Failed to fetch kata ${challengeId}: ${response.status} ${response.statusText}`
              );
            }

            const rawMetaData = await response.json();
            console.log(
              `[Worker] Raw metadata for kata ${challengeId}:`,
              JSON.stringify(rawMetaData, null, 2)
            );

            let metaData;
            try {
              metaData = KataMetaDataSchema.parse(rawMetaData);
              console.log(
                `[Worker] Validated metadata for kata ${challengeId}:`,
                metaData.id
              );
            } catch (zodErr: any) {
              console.error(
                `[Worker] Zod validation failed for kata ${challengeId}: ${zodErr.message}`
              );
              throw zodErr;
            }

            await katasMetaDataCollection.updateOne(
              { id: metaData.id },
              { $set: metaData },
              { upsert: true }
            );
            console.log(
              `[Worker] Upserted metadata for kata ${challengeId} into katasMetaData`
            );

            const rankLevel = metaData.rank?.id
              ? Math.abs(metaData.rank.id)
              : 0;
            if (!metaData.rank?.id) {
              console.warn(
                `[Worker] Kata ${challengeId} missing rank; defaulting to 0`
              );
            }

            await katasCollection.updateOne(
              { _id: kata._id },
              { $set: { isCollected: true, rank: rankLevel } }
            );
            console.log(
              `[Worker] Updated kata ${challengeId} to isCollected: true, rank: ${rankLevel}`
            );
          } catch (err: any) {
            console.error(
              `[Worker] Error processing kata ${challengeId}: ${err.message}`
            );
          }
        })
      )
    );

    const errors = results.filter(
      (r) => r.status === 'rejected'
    ) as PromiseRejectedResult[];
    if (errors.length > 0) {
      console.error(
        `[Worker] Processed with ${errors.length} errors:`,
        errors.map((e) => e.reason)
      );
    } else {
      console.log(
        `[Worker] Successfully processed all katas for job ${job.id}`
      );
    }
  } catch (err: any) {
    console.error(
      `[Worker] Job ${job.id} failed for user ${userId}: ${err.message}`
    );
    throw err;
  } finally {
    const client = await diamondsQueue.client;
    await client.del(`lock:diamonds:${userId}`);
    console.log(`[Worker] Released lock for user ${userId}`);
  }
};

const worker = new Worker<JobData>('collect-diamonds', processDiamonds, {
  connection: {
    url: redisUrl,
    maxRetriesPerRequest: 3,
    enableOfflineQueue: true
  },
  concurrency: 1,
  limiter: { max: 10, duration: 60000 },
  removeOnComplete: { count: 1000 },
  removeOnFail: { count: 5000 }
});

worker.on('active', (job: Job<JobData>) => {
  console.log(
    `[Worker] Job ${job.id} is now active for user ${job.data.userId}`
  );
});

worker.on('completed', (job: Job<JobData>) => {
  console.log(
    `[Worker] Job ${job.id} for user ${job.data.userId} completed successfully`
  );
});

worker.on('failed', (job: Job<JobData> | undefined, err: Error) => {
  console.error(`[Worker] Job ${job?.id} failed: ${err.message}`);
});

worker.on('error', (err: Error) => {
  console.error('[Worker] Worker error:', err);
});

process.on('SIGTERM', async () => {
  console.log('[Worker] Received SIGTERM, closing worker');
  await worker.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('[Worker] Received SIGINT, closing worker');
  await worker.close();
  process.exit(0);
});

console.log('[Worker] Diamonds worker started');
