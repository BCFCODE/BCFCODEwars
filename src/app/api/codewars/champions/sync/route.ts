import {
  getKataData,
  getChampionsKataData
} from '@/app/repositories/codewarsRepository';
import { getClient } from '@/lib/mongodb';
import { isConnectedToCodewars } from '@/services/codewarsService';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

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

    let championsData = null;
    let totalCount = 0;
    await session.withTransaction(async () => {
      if (skip === 0) {
        await getKataData(
          {
            codewarsUserId: codewars.id,
            codewarsUsername: codewars.username,
            codewarsName: codewars.name
          },
          session
        );
      }
      const { data, success } = await getChampionsKataData(
        { skip, limit },
        session
      );

      if (!success) {
        throw new Error('Failed to retrieve champions kata data');
      }

      championsData = data;
      totalCount = await client
        .db()
        .collection('recentlySolved')
        .countDocuments({}, { session });
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Champions kata data synced successfully.',
        data: championsData,
        totalCount,
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
