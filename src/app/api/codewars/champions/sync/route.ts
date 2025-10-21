import {
  getChampionsKataData,
  getKataData
} from '@/app/repositories/codewarsRepository';
import { getClient } from '@/lib/mongodb';
import { isConnectedToCodewars } from '@/services/codewarsService';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

/**
 * PATCH /api/codewars/champions/sync
 * Syncs champion kata data for the authenticated user.
 * - Verifies user is logged in and connected to Codewars.
 * - Fetches & updates kata data atomically inside a MongoDB transaction.
 * - Returns latest champions leaderboard data.
 */
export async function PATCH(request: NextRequest) {
  const url = new URL(request.url);
  const limit = Number(url.searchParams.get('limit')) || 25;
  const skip = Number(url.searchParams.get('skip')) || 0;

  const client = await getClient();

  const session = client.startSession();

  try {
    const { sessionStatus } = await auth();
    if (sessionStatus !== 'active') {
      return NextResponse.json(
        {
          success: false,
          message: 'You must be signed in to sync your Codewars connection.',
          toastType: 'error'
        },
        { status: 401 }
      );
    }

    // 1️⃣ Verify Codewars connection
    const { data: codewars } = await isConnectedToCodewars();
    if (!codewars?.isConnected) {
      return NextResponse.json(
        {
          success: false,
          message: 'User is not connected to Codewars.',
          toastType: 'error'
        },
        { status: 401 }
      );
    }

    // 2️⃣ Start a transaction for atomic sync
    let championsData = null;
    await session.withTransaction(async () => {
      if (skip === 0) {
        /* 
          When skip is 0 (first page), fetch and update kata data to ensure freshness.
          This optimizes the sync process by avoiding redundant updates during pagination,
          eliminating the need for a separate GET handler for paginated queries.
          Subsequent pages retrieve cached data, leveraging React Query for efficient client-side pagination.
        */
        // (a) Fetch latest kata data and update in DB
        await getKataData(
          {
            codewarsUserId: codewars.id,
            codewarsUsername: codewars.username,
            codewarsName: codewars.name
          },
          session // Pass session for transactional context
        );
      }
      // (b) Retrieve champions data (read-only)
      const { data, success } = await getChampionsKataData(
        {
          skip,
          limit
        },
        session
      );

      if (!success) {
        throw new Error('Failed to retrieve champions kata data');
      }

      championsData = data;
    });

    // 3️⃣ Commit successful response
    return NextResponse.json(
      {
        success: true,
        message: 'Champions kata data synced successfully.',
        data: championsData,
        toastType: 'success'
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[PATCH /api/codewars/champions/sync] ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error during champion sync.',
        error:
          process.env.NODE_ENV === 'development' ? String(error) : undefined,
        toastType: 'error'
      },
      { status: 500 }
    );
  } finally {
    await session.endSession();
  }
}
