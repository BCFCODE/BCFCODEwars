import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { getEmail } from '@/services/clerkService';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  try {
    // 🔐 Auth check with Clerk
    const { userId, getToken } = await auth();
    if (!userId) {
      return NextResponse.json({ reason: 'Unauthorized' }, { status: 401 });
    }

    // 🔑 Optional: Get JWT for service integrations
    const token = await getToken({ template: 'bcfcode-jwt-service' });
    if (process.env.NODE_ENV === 'development') {
      console.log('🔸 Clerk JWT (dev mode):', token);
    }

    // 🧾 Parse request
    const { username } = await req.json();
    const email = await getEmail();

    if (!username?.trim()) {
      return NextResponse.json(
        { reason: 'Username required' },
        { status: 400 }
      );
    }

    // 🌐 Validate username via Codewars API
    const response = await fetch(
      `https://www.codewars.com/api/v1/users/${username}`
    );
    const data = await response.json().catch(() => null);

    if (!response.ok || !data || data.success === false) {
      return NextResponse.json(
        {
          success: false,
          reason:
            "The username you entered wasn't found on Codewars. Please double-check spelling and note that usernames are case-sensitive."
        },
        { status: 404 }
      );
    }

    // 💾 Save or update user in MongoDB
    const db = await getDb();
    await db
      .collection('codewars')
      .updateOne(
        { email },
        { $set: { ...data, email, isConnected: true, updatedAt: new Date() } },
        { upsert: true }
      );

    return NextResponse.json({
      success: true,
      message: `Successfully connected Codewars user ${data.username}.`
    });
  } catch (error: any) {
    console.error('❌ Codewars Connect Error:', error);

    const message =
      error instanceof TypeError && /fetch/i.test(error.message)
        ? 'Unable to reach Codewars. Please check your internet connection or try again later.'
        : 'An unexpected server error occurred. Please try again or contact support if the issue persists.';

    return NextResponse.json({ reason: message }, { status: 500 });
  }
}
