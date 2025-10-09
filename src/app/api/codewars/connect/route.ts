import { getDb } from '@/lib/mongodb';
import { getEmail } from '@/services/clerkService';
import { CodewarsApiSchema } from '@/types';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// ✅ Input validation for incoming body
const ConnectBodySchema = z.object({
  username: z.string().trim().min(1, 'Username is required')
});

// ✅ Response shape for successful connection
const SuccessResponseSchema = z.object({
  success: z.literal(true),
  message: z.string()
});

export async function POST(req: Request) {
  try {
    // 🔐 Clerk Authentication
    const { userId, getToken } = await auth();
    if (!userId) {
      return NextResponse.json({ reason: 'Unauthorized' }, { status: 401 });
    }

    // 🧾 Parse & validate request body
    const json = await req.json().catch(() => null);
    const body = ConnectBodySchema.safeParse(json);

    if (!body.success) {
      return NextResponse.json(
        {
          reason:
            body.error.flatten().fieldErrors.username?.[0] ?? 'Invalid input'
        },
        { status: 400 }
      );
    }

    const email = await getEmail();
    const { username } = body.data;

    // 🌍 Fetch from Codewars API
    const response = await fetch(
      `https://www.codewars.com/api/v1/users/${username}`
    );
    const apiData = await response.json().catch(() => null);
    if (!response.ok || !apiData || apiData.success === false) {
      return NextResponse.json(
        {
          success: false,
          reason:
            "The username you entered wasn't found on Codewars. Please double-check spelling (it's case-sensitive)."
        },
        { status: 404 }
      );
    }

    // ✅ Validate Codewars API response
    const parsedApiData = CodewarsApiSchema.safeParse(apiData);

    if (!parsedApiData.success) {
      console.error(
        '⚠️ Invalid Codewars API structure:',
        parsedApiData.error.flatten()
      );
      return NextResponse.json(
        { reason: 'Received unexpected data format from Codewars.' },
        { status: 502 }
      );
    }

    // 💾 Merge and save
    const db = await getDb();
    await db.collection('codewars').updateOne(
      { email },
      {
        $set: {
          ...parsedApiData.data,
          email,
          isConnected: true,
          connectedAt: new Date()
        }
      },
      { upsert: true }
    );

    // ✅ Return success
    const successPayload = SuccessResponseSchema.parse({
      success: true,
      message: `Successfully connected Codewars user ${parsedApiData.data.username}.`
    });

    return NextResponse.json(successPayload);
  } catch (error: unknown) {
    console.error('❌ Codewars Connect Error:', error);

    const message =
      error instanceof TypeError && /fetch/i.test(error.message)
        ? 'Unable to reach Codewars. Please check your internet connection or try again later.'
        : 'An unexpected server error occurred. Please try again or contact support if it persists.';

    return NextResponse.json({ reason: message }, { status: 500 });
  }
}
