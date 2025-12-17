// app/dashboard/overview/layout.tsx

import PageContainer from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
import { baseUrl } from '@/lib/constants';
import { getCodewarsProfileData } from '@/services/codewarsService';
import { Award, Medal, Trophy } from 'lucide-react';
import type { Metadata } from 'next';
import React, { Suspense } from 'react';
import { NotConnectedGrid } from './components/NotConnectedGrid';
import { UserAvatar } from './components/UserAvatar';
import { StatCard } from './components/StatCard';

export const metadata: Metadata = {
  title: 'Overview | BCFCODE Dashboard',
  description:
    'Your BCFCODE overview — track your coding activity, monitor progress, and stay motivated with real-time stats and insights.',
  openGraph: {
    title: 'BCFCODE Dashboard Overview',
    description:
      'Get a snapshot of your coding journey: recent katas, growth rate, and personalized insights inside BCFCODE.',
    url: `${baseUrl}/dashboard/overview`,
    siteName: 'BCFCODE',
    images: [
      {
        url: 'https://res.cloudinary.com/ds8pptoh2/image/upload/v1747824940/dashboard-overview-preview.jpg',
        width: 1200,
        height: 630,
        alt: 'BCFCODE Dashboard Overview Preview'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BCFCODE Dashboard Overview',
    description:
      'See your BCFCODE activity at a glance: recent katas, growth stats, and progress insights.',
    images: [
      'https://res.cloudinary.com/ds8pptoh2/image/upload/v1747824940/dashboard-overview-preview.jpg'
    ],
    creator: '@BCFCODE'
  },
  robots: {
    index: false,
    follow: false
  }
};

export default async function OverViewLayout({
  codewars_status_cards,
  kata_champions,
  codewars_radar_chart,
  bar_stats,
  area_stats
}: {
  codewars_status_cards: React.ReactNode;
  kata_champions: React.ReactNode;
  codewars_radar_chart: React.ReactNode;
  bar_stats: React.ReactNode;
  area_stats: React.ReactNode;
}) {
  let { data } = await getCodewarsProfileData();
  const totalCompleted = data?.codeChallenges?.totalCompleted ?? null;
  const leaderboardPosition = data?.leaderboardPosition ?? null;
  const overall = data?.ranks?.overall ?? null;

  const formatNumber = (n: number | null | undefined) =>
    typeof n === 'number' ? n.toLocaleString() : '—';

  if (!data?.isConnected) return <NotConnectedGrid />;

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-2'>
        <div className='flex items-start gap-4'>
          <UserAvatar
            isConnected={data?.isConnected ?? false}
            size={55}
            showPresence
          />

          <div className='min-w-0'>
            <h2 className='text-lg leading-tight font-extrabold tracking-tight sm:text-2xl'>
              Welcome back,{' '}
              <span className='bg-gradient-to-r from-[var(--royal-gold)] to-[var(--kyu-2)] bg-clip-text text-transparent'>
                {data?.name ?? 'Guest'}
              </span>
              <div className='flex items-center align-baseline'>
                <span className='text-muted-foreground ml-1 font-normal'>
                  — Codewars profile
                </span>
              </div>
            </h2>

            <p className='text-muted-foreground mt-1 text-xs sm:text-sm'>
              {data?.isConnected ? (
                <span className='flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-0'>
                  <span className='inline-flex w-40 items-center gap-2 rounded-full bg-[var(--chart-1)]/5 px-2 py-0.5 text-[11px] font-medium text-[var(--chart-1)]/80'>
                    • Connected to Codewars
                  </span>
                  <span className='ml-3'>
                    Live honor, ranks & language stats
                  </span>
                </span>
              ) : (
                <>
                  <span className='border-muted/20 text-muted-foreground inline-flex items-center gap-2 rounded-full border px-2 py-0.5 text-[11px] font-medium'>
                    • Not connected
                  </span>
                  <span className='ml-3'>
                    Connect to surface your Codewars metrics
                  </span>
                </>
              )}
            </p>
          </div>
        </div>

        <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4'>
          {/* Static cards unchanged */}
          <StatCard
            title='Leaderboard Position'
            primary={
              leaderboardPosition ? (
                <span className='text-2xl font-semibold'>
                  #{leaderboardPosition}
                </span>
              ) : (
                <span className='text-2xl font-semibold'>—</span>
              )
            }
            badge={
              <Badge variant='outline' className='flex items-center gap-1'>
                <Medal className='h-4 w-4 text-[var(--kyu-4)]' /> Global Rank
              </Badge>
            }
            meta='Where you rank globally across Codewars users.'
            hint={
              leaderboardPosition
                ? 'Lower rank is better — solve more high-value kata to climb.'
                : 'No leaderboard data available.'
            }
          />

          <StatCard
            title='Total Katas Completed'
            primary={
              <span className='text-2xl font-semibold'>
                {formatNumber(totalCompleted)}
              </span>
            }
            badge={
              <Badge variant='outline' className='flex items-center gap-1'>
                <Trophy className='h-4 w-4 text-[var(--royal-gold)]' />
                Katas
              </Badge>
            }
            meta='Total number of katas completed on Codewars.'
            hint='Higher completion counts reflect dedication to solving coding challenges.'
          />

          <StatCard
            title='Overall Rank'
            primary={
              overall ? (
                <div className='flex items-baseline gap-2'>
                  <span className='text-xl font-semibold'>{overall.name}</span>
                  <span className='text-muted-foreground text-sm'>
                    ({formatNumber(overall.score)} pts)
                  </span>
                </div>
              ) : (
                <span className='text-lg font-semibold'>Unranked</span>
              )
            }
            badge={
              overall ? (
                <Badge variant='outline' className='flex items-center gap-1'>
                  <Award className='h-4 w-4' /> Rank Score
                </Badge>
              ) : null
            }
            meta='Your current kyū/dan rank on Codewars.'
            hint={
              overall
                ? 'Progress your rank by solving higher-kyū kata.'
                : 'Solve kata to obtain a rank.'
            }
          />

          {/* STREAMED — codewars */}
          <Suspense
            fallback={
              <div className='flex items-center justify-center p-4'>
                <p className='text-muted-foreground text-sm'>
                  Loading Codewars...
                </p>
              </div>
            }
          >
            {codewars_status_cards}
          </Suspense>
        </div>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
          {/* STREAMED — bar_stats */}
          <div className='col-span-4'>
            <Suspense
              fallback={
                <div className='flex items-center justify-center p-4'>
                  <p className='text-muted-foreground text-sm'>
                    Loading stats...
                  </p>
                </div>
              }
            >
              {bar_stats}
            </Suspense>
          </div>

          {/* STREAMED — kata_champions */}
          <div className='col-span-4 md:col-span-3'>
            <Suspense
              fallback={
                <div className='flex items-center justify-center p-4'>
                  <p className='text-muted-foreground text-sm'>
                    Loading champions...
                  </p>
                </div>
              }
            >
              {kata_champions}
            </Suspense>
          </div>

          {/* STREAMED — area_stats */}
          <div className='col-span-4'>
            <Suspense
              fallback={
                <div className='flex items-center justify-center p-4'>
                  <p className='text-muted-foreground text-sm'>
                    Loading area stats...
                  </p>
                </div>
              }
            >
              {area_stats}
            </Suspense>
          </div>

          {/* STREAMED — codewars_radar_chart */}
          <div className='col-span-4 md:col-span-3'>
            <Suspense
              fallback={
                <div className='flex items-center justify-center p-4'>
                  <p className='text-muted-foreground text-sm'>
                    Loading radar chart...
                  </p>
                </div>
              }
            >
              {codewars_radar_chart}
            </Suspense>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
