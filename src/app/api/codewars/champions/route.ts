// app/api/codewars/champions/route.ts
import { getChampionsKataData } from '@/app/repositories/codewarsRepository';
// import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';
import isRateLimited from '../../lib/isRateLimited';

export const revalidate = false; // disable ISR
export const dynamic = 'force-dynamic'; // we control caching manually

const getCachedChampions = unstable_cache(
  async (limit: number, skip: number) => {
    console.log('Running DB query... (only once per 5 min)');
    const result = await getChampionsKataData({ limit, skip });
    return result;
  },
  ['codewars-champions'],
  {
    revalidate: 300, // 5 minutes
    tags: ['codewars-champions']
  }
);

export async function GET(request: Request) {
  //   const { sessionStatus } = await auth();
  //   if (sessionStatus !== 'active') {
  //     return NextResponse.json(
  //       { success: false, message: 'Unauthorized', toastType: 'error' },
  //       { status: 401 }
  //     );
  //   }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429, headers: { 'Retry-After': '60' } }
    );
  }

  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get('limit') ?? '25');
  const skip = Number(searchParams.get('skip') ?? '0');

  //   console.log('→ Request:', { limit, skip });

  const result = await getCachedChampions(limit, skip);

  return NextResponse.json({
    success: true,
    data: result.data,
    totalCount: result.totalCount
  });
}
