import { getCodewarsUserId } from '@/services/codewarsService';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import diamondsQueue, { redis } from 'queues/diamondsQueue';
import { z } from 'zod';

// Define cooldown constant consistently (same as frontend)
const COOLDOWN_SECONDS = 100;

// Zod schema for response
const CollectResponseSchema = z.object({
  message: z.string().optional(),
  error: z.string().optional(),
  cooldown: z.number().int().nonnegative().optional()
});

export async function POST(req: NextRequest) {
  try {
    // Authenticate with Clerk
    const { userId: clerkUserId, getToken } = await auth();
    if (!clerkUserId) {
      return NextResponse.json(
        CollectResponseSchema.parse({ error: 'Unauthorized' }),
        { status: 401 }
      );
    }

    // Get JWT for Codewars service
    const token = await getToken({ template: 'bcfcode-jwt-service' });
    console.log('JWT Token for user:', token); // Remove in prod or use logger

    // Get Codewars userId (assumes function handles token internally)
    const userId = await getCodewarsUserId(); // TODO: Pass token if required
    if (!userId) {
      return NextResponse.json(
        CollectResponseSchema.parse({ error: 'Codewars user id not found' }),
        { status: 401 }
      );
    }

    // Idempotency lock with correct redis.set syntax
    const lockKey = `lock:diamonds:${userId}`;
    console.log('Trying to acquire Redis lock for', userId);
    const acquired = await redis.set(
      lockKey,
      'locked',
      'EX',
      COOLDOWN_SECONDS,
      'NX'
    );

    if (acquired !== 'OK') {
      const ttl = await redis.ttl(lockKey);
      return NextResponse.json(
        CollectResponseSchema.parse({
          error: 'Already processing for this user',
          cooldown: ttl > 0 ? ttl : COOLDOWN_SECONDS
        }),
        { status: 429 }
      );
    }

    // Enqueue job
    await diamondsQueue.add('collect-diamonds', { userId });

    return NextResponse.json(
      CollectResponseSchema.parse({ message: 'Collection enqueued' }),
      { status: 200 }
    );
  } catch (err: any) {
    console.error('Collect API error:', err.message, err.stack);
    // Optionally release lock if userId is defined (unlikely needed due to TTL)
    // if (userId) await redis.del(`lock:diamonds:${userId}`);
    return NextResponse.json(
      CollectResponseSchema.parse({ error: 'Internal server error' }),
      { status: 500 }
    );
  }
}
