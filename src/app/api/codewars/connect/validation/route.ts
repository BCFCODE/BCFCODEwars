import { CodewarsApiSchema } from '@/types';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { ApiResponse, ConnectBodySchema } from './schema';

export async function POST(req: Request): Promise<NextResponse<ApiResponse>> {
  try {
    const { sessionStatus } = await auth();
    if (sessionStatus !== 'active') {
      return NextResponse.json(
        {
          success: false,
          reason: 'Please sign in to validate your Codewars account.',
          toastType: 'error'
        },
        { status: 401 }
      );
    }

    const json = await req.json().catch(() => null);
    const body = ConnectBodySchema.safeParse(json);

    if (!body.success) {
      return NextResponse.json(
        {
          success: false,
          reason:
            body.error.flatten().fieldErrors.username?.[0] ??
            'Invalid username format. Please try again.',
          toastType: 'warning'
        },
        { status: 400 }
      );
    }

    const { username } = body.data;

    const res = await fetch(
      `https://www.codewars.com/api/v1/users/${username}`
    );
    const apiData = await res.json().catch(() => null);

    if (!res.ok || !apiData || apiData.success === false) {
      return NextResponse.json(
        {
          success: false,
          reason: `No Codewars profile found for "${username}". Double-check spelling or ensure your account is public.`,
          toastType: 'warning'
        },
        { status: 404 }
      );
    }

    const parsed = CodewarsApiSchema.safeParse(apiData);
    if (!parsed.success) {
      console.error(
        '⚠️ Invalid Codewars API structure',
        parsed.error.flatten()
      );
      return NextResponse.json(
        {
          success: false,
          reason:
            'Received unexpected data from Codewars. Please try again later.',
          toastType: 'error'
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      toastType: 'success',
      message: `Successfully validated @${parsed.data.username}.`,
      userData: parsed.data
    });
  } catch (error: unknown) {
    console.error('❌ Codewars Connect Error:', error);

    const message =
      error instanceof TypeError && /fetch/i.test(error.message)
        ? 'Unable to reach Codewars servers. Please check your internet connection.'
        : 'Unexpected error occurred while validating. Please retry.';

    return NextResponse.json(
      { success: false, reason: message, toastType: 'error' },
      { status: 500 }
    );
  }
}
