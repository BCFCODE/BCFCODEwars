import { Queue, QueueEvents } from 'bullmq';
import IORedis from 'ioredis';
import { JobData } from '../src/types';

export const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

export const redis = new IORedis(redisUrl, {
  enableOfflineQueue: true
});

const diamondsQueue = new Queue<JobData>('collect-diamonds', {
  connection: redis,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential', delay: 1000 },
    removeOnComplete: { count: 1000 },
    removeOnFail: { count: 5000 }
  }
});

const diamondsQueueEvents = new QueueEvents('collect-diamonds', {
  connection: redis
});
diamondsQueueEvents.on('waiting', ({ jobId }) =>
  console.log(`Job ${jobId} is waiting in Redis`)
);
diamondsQueueEvents.on('completed', ({ jobId }) =>
  console.log(`Job ${jobId} completed`)
);
diamondsQueueEvents.on('failed', ({ jobId, failedReason }) =>
  console.error(`Job ${jobId} failed: ${failedReason}`)
);
diamondsQueueEvents.on('error', (err) =>
  console.error('QueueEvents error:', err)
);

export default diamondsQueue;
