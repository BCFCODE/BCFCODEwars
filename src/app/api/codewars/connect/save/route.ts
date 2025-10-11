import { getDb, getClient, closeClient } from '@/lib/mongodb';
import { getEmail } from '@/services/clerkService';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { ApiResponse, SaveBodySchema } from './schema';
import { MongoClient } from 'mongodb';

export async function POST(req: Request): Promise<NextResponse<ApiResponse>> {
  let client: MongoClient | null = null;

  try {
    const { sessionStatus } = await auth();
    if (sessionStatus !== 'active') {
      return NextResponse.json(
        {
          success: false,
          reason: 'You must be signed in to save your Codewars connection.',
          toastType: 'error'
        },
        { status: 401 }
      );
    }

    const json = await req.json().catch(() => null);
    const body = SaveBodySchema.safeParse(json);

    if (!body.success) {
      return NextResponse.json(
        {
          success: false,
          reason: 'Invalid data structure. Please revalidate your account.',
          toastType: 'error'
        },
        { status: 400 }
      );
    }

    const { userData } = body.data;
    const email = await getEmail();
    client = await getClient();
    const db = await getDb();

    // Start a MongoDB session for the transaction
    const session = client.startSession();

    try {
      await session.withTransaction(async () => {
        // Clean up: Delete all katas from 'katas' collection for userData.id
        await db
          .collection('katas')
          .deleteMany({ userId: userData.id }, { session });

        // Clean up: Delete all katas from 'recentlySolved' collection for userData.id
        await db
          .collection('recentlySolved')
          .deleteMany({ userId: userData.id }, { session });

        // Update the 'codewars' collection
        await db.collection('codewars').updateOne(
          { email },
          {
            $set: {
              ...userData,
              email,
              isConnected: true,
              connectedAt: new Date()
            }
          },
          { upsert: true, session }
        );
      });
    } finally {
      await session.endSession();
    }

    return NextResponse.json({
      success: true,
      message: `"${userData.username}" has been successfully connected!`,
      toastType: 'success'
    });
  } catch (error) {
    console.error('❌ Codewars Save Error:', error);
    return NextResponse.json(
      {
        success: false,
        reason:
          'An unexpected error occurred while saving your data. Please try again.',
        toastType: 'error'
      },
      { status: 500 }
    );
  } finally {
    // Only close the client in non-production environments
    if (process.env.NODE_ENV !== 'production') {
      await closeClient();
    }
  }
}
