import syncWithCodewars from '@/app/api/lib/syncWithCodewars';
import { NextResponse } from 'next/server';

/**
 * Background sync endpoint
 * - Returns immediately without waiting for sync to complete
 * - Can be called from client after page loads via: fetch('/api/codewars/sync-background', { method: 'POST' })
 * - Don't block on this - just trigger and forget
 */
export async function POST(request: Request) {
  // Trigger sync in the background without awaiting
  await syncWithCodewars().catch((err) =>
    console.error('Background sync failed:', err)
  );

  // Return immediately to unblock the client
  return NextResponse.json(
    { status: 'sync triggered' },
    { status: 202 } // 202 Accepted = request accepted but not completed
  );
}
