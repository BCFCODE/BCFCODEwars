import { getDb } from '@/lib/mongodb';
import { getEmail } from '@/services/clerkService';
import { CodewarsApiSchema } from '@/types';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

/* -------------------- 🔹 Schemas -------------------- */

// Input validation
const ConnectBodySchema = z.object({
  username: z.string().trim().min(1, 'Username is required')
});

// Common toast types
const ToastTypeSchema = z.enum(['success', 'error', 'warning']);
export type ToastType = z.infer<typeof ToastTypeSchema>;

// Success and error shapes merged into a reusable schema
const ApiResponseSchema = z.union([
  z.object({
    success: z.literal(true),
    message: z.string(),
    toastType: ToastTypeSchema
  }),
  z.object({
    success: z.literal(false),
    reason: z.string(),
    toastType: ToastTypeSchema
  })
]);

export type ApiResponse = z.infer<typeof ApiResponseSchema>;

/* -------------------- 🔹 Handler -------------------- */

export async function POST(req: Request): Promise<NextResponse<ApiResponse>> {
  try {
    // 🔐 Clerk Authentication
    const { sessionStatus } = await auth();
    if (sessionStatus !== 'active') {
      return NextResponse.json(
        {
          success: false,
          reason: 'Unauthorized',
          toastType: 'error'
        },
        { status: 401 }
      );
    }

    // 🧾 Parse & validate request body
    const json = await req.json().catch(() => null);
    const body = ConnectBodySchema.safeParse(json);

    if (!body.success) {
      return NextResponse.json(
        {
          success: false,
          reason:
            body.error.flatten().fieldErrors.username?.[0] ?? 'Invalid input',
          toastType: 'error'
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
            "The username you entered wasn't found on Codewars. Please double-check spelling (it's case-sensitive).",
          toastType: 'warning'
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
        {
          success: false,
          reason: 'Received unexpected data format from Codewars.',
          toastType: 'error'
        },
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
    return NextResponse.json({
      success: true,
      message: `Successfully connected Codewars user ${parsedApiData.data.username}.`,
      toastType: 'success'
    });
  } catch (error: unknown) {
    console.error('❌ Codewars Connect Error:', error);

    const message =
      error instanceof TypeError && /fetch/i.test(error.message)
        ? 'Unable to reach Codewars. Please check your internet connection or try again later.'
        : 'An unexpected server error occurred. Please try again or contact support if it persists.';

    return NextResponse.json(
      {
        success: false,
        reason: message,
        toastType: 'error'
      },
      { status: 500 }
    );
  }
}
