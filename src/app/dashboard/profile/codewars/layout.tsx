// app/dashboard/profile/codewars/layout.tsx
import React, { PropsWithChildren } from 'react';
import PageContainer from '@/components/layout/page-container';
import Link from 'next/link';
import { auth, currentUser } from '@clerk/nextjs/server';
import { CodewarsProfileDataSchema } from '@/types/codewars-profile'; // zod schema
import type { CodewarsProfileData } from '@/types/codewars-profile';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
// import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';
import { Trophy, Medal, Award, Code, UserX } from 'lucide-react';
import { getCodewarsProfile } from '@/app/repositories/codewarsRepository';
import { IconTrendingUp } from '@tabler/icons-react';
import { UserAvatar } from './UserAvatar';

export const metadata = {
  title: 'Codewars Profile | BCFCODE Dashboard',
  description:
    'Your Codewars profile on BCFCODE — honor, ranks, leaderboard position and language stats.',
  robots: { index: false, follow: false }
};

interface Props extends PropsWithChildren {}

function StatCard({
  title,
  primary,
  meta,
  badge,
  hint
}: {
  title: string;
  primary: React.ReactNode;
  meta?: React.ReactNode;
  badge?: React.ReactNode;
  hint?: string;
}) {
  return (
    <Card className='@container/card'>
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
          {primary}
        </CardTitle>
        {badge && <CardAction>{badge}</CardAction>}
      </CardHeader>
      <CardFooter className='flex-col items-start gap-1.5 text-sm'>
        {meta && <div className='font-medium'>{meta}</div>}
        {hint && <div className='text-muted-foreground'>{hint}</div>}
      </CardFooter>
    </Card>
  );
}

export default async function Layout({ children }: Props) {
  // get current user (server)
  const user = await currentUser();
  const email =
    user?.emailAddresses?.[0]?.emailAddress ??
    user?.primaryEmailAddress?.emailAddress ??
    null;

  // Fetch and validate profile
  let profileData: CodewarsProfileData | null = null;

  if (email) {
    try {
      const raw = await getCodewarsProfile(email); // should return a plain object or null
      if (raw) {
        const parsed = CodewarsProfileDataSchema.safeParse(raw);
        if (parsed.success) {
          profileData = parsed.data;
        } else {
          // invalid shape - log for debugging and fall back
          // you can send this to server logs or Sentry
          // eslint-disable-next-line no-console
          console.warn('Invalid Codewars profile shape', parsed.error.format());
        }
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed fetching Codewars profile', err);
    }
  }

  // Derived / fallback values
  const isConnected = !!profileData?.isConnected;
  const honor = profileData?.honor ?? null;
  const leaderboardPosition = profileData?.leaderboardPosition ?? null;
  const overall = profileData?.ranks?.overall ?? null;
  const languages = profileData?.ranks?.languages ?? {};
  const languageEntries = Object.entries(languages);
  const topLanguage =
    languageEntries.length > 0
      ? languageEntries.sort((a, b) => b[1].score - a[1].score)[0] // [lang, {name,color,score}]
      : null;
  const skillsCount = (profileData?.skills ?? []).length;

  const avatarData = user
    ? {
        id: user.id,
        firstName: user.firstName ?? null,
        lastName: user.lastName ?? null,
        imageUrl: user.imageUrl ?? null,
        isConnected
      }
    : null;

  const formatNumber = (n: number | null | undefined) =>
    typeof n === 'number' ? n.toLocaleString() : '—';

  // If not connected: show a single nice CTA card occupying full-width and still render CodewarsProfileCard below.
  const NotConnectedGrid = (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
      <div className='col-span-1 md:col-span-2 lg:col-span-4'>
        <Card className='border-muted/20 from-muted/10 to-background mx-auto rounded-xl border border-dashed bg-gradient-to-br p-6 text-center shadow-md'>
          <div className='flex flex-col items-center gap-3'>
            <UserX className='text-muted-foreground h-10 w-10' />
            <h3 className='text-lg font-bold'>Codewars not connected</h3>
            <p className='text-muted-foreground max-w-xl text-sm'>
              Connect your Codewars account to surface your honor, ranks,
              leaderboard position and language stats. Once connected these
              cards will show live metrics and shortcuts to deeper insights.
            </p>
            <div className='mt-4 flex flex-col items-center gap-3 sm:flex-row'>
              <Link href='/dashboard/profile/codewars/connect'>
                <button className='bg-primary text-primary-foreground inline-flex cursor-pointer items-center rounded-md px-4 py-2 text-sm font-medium shadow'>
                  Connect Codewars Account
                </button>
              </Link>
              <Link href='/dashboard/leaderboard/codewars'>
                <button className='hover:bg-muted inline-flex cursor-pointer items-center rounded-md px-4 py-2 text-sm font-medium'>
                  Back to Leaderboard
                </button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const ConnectedGrid = (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
      <StatCard
        title='Total Honor'
        primary={
          <span className='text-2xl font-semibold'>{formatNumber(honor)}</span>
        }
        badge={
          <Badge variant='outline' className='flex items-center gap-1'>
            <Trophy className='h-4 w-4 text-[var(--royal-gold)]' />
            Honor
          </Badge>
        }
        meta='Community reputation points earned on Codewars.'
        hint='Higher honor indicates consistent contributions & kata solving.'
      />

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

      <StatCard
        title='Top Language'
        primary={
          topLanguage ? (
            <div className='flex items-baseline gap-2'>
              <span className='text-lg font-semibold'>{topLanguage[0]}</span>
              <span className='text-muted-foreground text-sm'>
                • {topLanguage[1].name}
              </span>
            </div>
          ) : (
            <span className='text-lg font-semibold'>—</span>
          )
        }
        badge={
          topLanguage ? (
            <Badge variant='outline' className='flex items-center gap-1'>
              <Code className='h-4 w-4' />
              {formatNumber(topLanguage[1].score)}
            </Badge>
          ) : (
            <Badge variant='outline' className='flex items-center gap-1'>
              <Code className='h-4 w-4' /> Languages
            </Badge>
          )
        }
        meta='Your best-performing language on Codewars.'
        hint={`${languageEntries.length} language${languageEntries.length === 1 ? '' : 's'} tracked • ${skillsCount} skill${skillsCount === 1 ? '' : 's'}`}
      />
    </div>
  );

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          {/* left: avatar + greeting */}
          <div className='flex items-start gap-4'>
            <UserAvatar size={56} showPresence user={avatarData} />

            <div className='min-w-0'>
              <h2 className='text-lg leading-tight font-extrabold tracking-tight sm:text-2xl'>
                Welcome back,{' '}
                <span className='bg-gradient-to-r from-[var(--royal-gold)] to-[var(--kyu-2)] bg-clip-text text-transparent'>
                  {user?.firstName ?? 'Guest'}
                </span>
                <span className='text-muted-foreground ml-1 font-normal'>
                  — Codewars profile
                </span>
              </h2>

              <p className='text-muted-foreground mt-1 text-xs sm:text-sm'>
                {isConnected ? (
                  <>
                    <span className='inline-flex items-center gap-2 rounded-full bg-[var(--kyu-3)]/10 px-2 py-0.5 text-[11px] font-medium text-[var(--kyu-3)]'>
                      • Connected to Codewars
                    </span>
                    <span className='ml-3'>
                      Live honor, ranks & language stats
                    </span>
                  </>
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

          {/* right: actions / shortcuts */}
          <div className='flex flex-wrap items-center gap-3'>
            <Link
              href='/dashboard/leaderboard/codewars'
              className='inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[var(--kyu-3)] to-[var(--kyu-2)] px-3 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.02] focus:ring-2 focus:ring-[var(--kyu-2)] focus:outline-none'
            >
              View Leaderboard
              <IconTrendingUp className='h-4 w-4' />
            </Link>

            <Link
              href='/dashboard/profile'
              className='text-muted-foreground hover:bg-muted/10 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition'
            >
              Profile settings
            </Link>

            {/* compact status pill for small screens */}
            <div className='bg-card/50 text-muted-foreground hidden items-center gap-2 rounded-full px-3 py-1 text-xs font-medium sm:inline-flex'>
              {isConnected ? (
                <span className='inline-flex items-center gap-2 text-[var(--kyu-4)]'>
                  <svg
                    className='h-3 w-3'
                    viewBox='0 0 24 24'
                    fill='none'
                    aria-hidden
                  >
                    <circle
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeOpacity='0.15'
                    />
                    <path
                      d='M7 13l3 3 7-7'
                      stroke='currentColor'
                      strokeWidth='1.6'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                  Connected
                </span>
              ) : (
                <Link
                  href='/dashboard/profile/codewars/connect'
                  className='bg-accent text-accent-foreground inline-flex items-center gap-2 rounded-md px-2 py-1 text-xs font-semibold shadow-sm'
                >
                  Connect
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Top cards grid (either NotConnected or Connected) */}
        {isConnected ? ConnectedGrid : NotConnectedGrid}
      </div>
    </PageContainer>
  );
}
