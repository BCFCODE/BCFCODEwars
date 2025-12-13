// app/api/codewars/champions/sync/route.ts
import { getKataData } from '@/app/repositories/codewarsRepository';
import { getClient } from '@/lib/mongodb';
import { isConnectedToCodewars } from '@/services/codewarsService';
import { recentlySolvedKata } from '@/types';
import { auth } from '@clerk/nextjs/server';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { getCachedChampions } from '../route';

export const dynamic = 'force-dynamic';

export async function PATCH(request: NextRequest) {
  const url = new URL(request.url);
  const limit = Number(url.searchParams.get('limit')) || 25;
  const skip = Number(url.searchParams.get('skip')) || 0;

  try {
    const { sessionStatus } = await auth();
    if (sessionStatus !== 'active') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized', toastType: 'error' },
        { status: 401 }
      );
    }

    const { data: codewars } = await isConnectedToCodewars();
    if (!codewars?.isConnected) {
      return NextResponse.json(
        {
          success: false,
          message: 'Not connected to Codewars',
          toastType: 'error'
        },
        { status: 401 }
      );
    }

    let championsData: recentlySolvedKata[] = [];
    let totalCount = 0;

    // ONLY use transaction when skip === 0 (i.e. we're writing user kata data)
    if (skip === 0) {
      const client = await getClient();
      const session = client.startSession();
      try {
        await session.withTransaction(async () => {
          await getKataData(
            {
              codewarsUserId: codewars.id,
              codewarsUsername: codewars.username,
              codewarsName: codewars.name
            },
            session
          );

          const result = await getCachedChampions(limit, skip, session);
          championsData = result.data;
          totalCount = result.totalCount;
        });
      } finally {
        await session.endSession();
      }
    } else {
      // READ-ONLY PATH — NO SESSION, NO TRANSACTION → blazing fast
      const result = await getCachedChampions(limit, skip);
      championsData = result.data;
      totalCount = result.totalCount;
    }

    // THIS IS THE MAGIC LINE
    // Invalidate the cache so next read gets fresh data
    revalidateTag('codewars-champions');

    return NextResponse.json({
      success: true,
      message: 'Champions synced',
      data: championsData,
      totalCount,
      toastType: 'success'
    });
  } catch (error) {
    console.error('[PATCH /api/codewars/champions/sync] ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Sync failed',
        error:
          process.env.NODE_ENV === 'development' ? String(error) : undefined,
        toastType: 'error'
      },
      { status: 500 }
    );
  }
}
