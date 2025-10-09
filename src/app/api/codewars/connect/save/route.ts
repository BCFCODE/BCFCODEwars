import { getDb } from '@/lib/mongodb';
import { getEmail } from '@/services/clerkService';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { ApiResponse, SaveBodySchema } from './schema';

export async function POST(req: Request): Promise<NextResponse<ApiResponse>> {
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
    const db = await getDb();

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
      { upsert: true }
    );

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
  }
}
