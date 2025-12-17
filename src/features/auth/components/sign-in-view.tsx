import { getCachedChampions } from '@/app/api/codewars/champions/route';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { DaysAgo } from '@/components/ui/DaysAgo';
import { SolvedOn } from '@/components/ui/SolvedOn';
import { cn } from '@/lib/utils';
import { SignIn as ClerkSignInForm } from '@clerk/nextjs';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { IconCrown, IconStar } from '@tabler/icons-react';
import { Flame, Sparkles, Trophy, Zap } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Join the Elite | BCFCODEwars',
  description:
    'Level up your coding. Crush katas. Dominate the leaderboard. Sign in to BCFCODEwars — where legends are forged.',
  openGraph: {
    title: 'Join the Elite | BCFCODEwars',
    description: 'Level up. Crush katas. Dominate. Sign in to BCFCODEwars.',
    url: 'https://bcfcodewars.vercel.app/sign-in',
    siteName: 'BCFCODEwars',
    images: [
      {
        url: '/og-champions.png',
        width: 1200,
        height: 630,
        alt: 'BCFCODEwars — Code. Compete. Conquer.'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Join the Elite | BCFCODEwars',
    description: 'Level up. Crush katas. Dominate.',
    images: ['/og-champions.png']
  }
};

export default async function SignInViewPage({ stars }: { stars: number }) {
  const championsLimit = 5;
  const { data: champions = [], success } = await getCachedChampions(
    championsLimit,
    0
  );

  const getRankIcon = (index: number) => {
    if (index === 0)
      return <IconCrown className='drop-shadow-glow h-5 w-5 text-yellow-400' />;
    // if (index === 1)
    //   return <IconTrophy className='drop-shadow-glow h-5 w-5 text-amber-500' />;
    // if (index === 2)
    //   return <IconMedal className='drop-shadow-glow h-5 w-5 text-orange-600' />;
    return (
      <span className='text-muted-foreground text-xs font-bold'>
        #{index + 1}
      </span>
    );
  };

  return (
    <div className='relative flex min-h-screen flex-col overflow-hidden md:grid lg:max-w-none lg:grid-cols-[2fr_1fr] lg:px-0'>
      {/* Animated Background Gradient */}
      <div className='absolute inset-0 -z-10 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 opacity-50' />
      <div className='absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent' />

      {/* LEFT PANEL: EPIC CHAMPIONS LEADERBOARD */}
      <div className='relative hidden h-full flex-col overflow-hidden p-0 text-white lg:flex'>
        <div className='absolute inset-0 bg-black/40 backdrop-blur-sm' />

        {/* Animated Shimmer Header */}
        <Card
          className={cn(
            'relative h-full overflow-hidden rounded-none border-0 bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-900/90 shadow-2xl',
            'before:animate-shimmer before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-amber-500/10 before:to-transparent'
          )}
        >
          <CardHeader className='relative z-10 p-8 pb-4'>
            <div className='mb-2 flex items-center gap-3'>
              <div className='relative'>
                <Trophy className='h-12 w-12 animate-pulse text-amber-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.6)]' />
                <Sparkles className='absolute -top-1 -right-1 h-5 w-5 animate-ping text-yellow-300' />
              </div>
              <div>
                <CardTitle className='bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-3xl font-black text-transparent drop-shadow-lg'>
                  KATA CHAMPIONS
                </CardTitle>
                <CardDescription className='flex items-center gap-1 text-lg font-bold text-amber-200'>
                  <Flame className='h-5 w-5 animate-pulse text-orange-500' />
                  LIVE ACTIVITY
                  <Zap className='h-4 w-4 animate-bounce text-yellow-400' />
                </CardDescription>
              </div>
            </div>
            <p className='text-sm font-medium text-amber-100/80 italic'>
              “Legends don’t wait. They code. They conquer.”
            </p>
          </CardHeader>

          <CardContent className='space-y-3 p-6 pt-0'>
            {!success || champions.length === 0 ? (
              <div className='py-12 text-center text-amber-200/60'>
                <p className='animate-pulse text-lg font-medium'>
                  Loading warriors...
                </p>
              </div>
            ) : (
              champions.map((kata, idx) => (
                <div
                  key={`${kata.kataId}-${kata.userId}-${idx}`}
                  className={cn(
                    'group relative overflow-hidden rounded-xl p-4 transition-all duration-300',
                    'bg-gradient-to-r from-slate-800/80 via-slate-800/60 to-slate-800/80',
                    'border border-amber-500/20 shadow-lg',
                    'hover:scale-[1.02] hover:border-amber-400/50 hover:shadow-amber-500/20',
                    'animate-in slide-in-from-left-50 fade-in duration-500',
                    idx === 0 &&
                      'ring-2 ring-amber-400/50 ring-offset-2 ring-offset-slate-900'
                  )}
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {/* Rank Badge */}
                  <div className='absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full border border-amber-500/30 bg-slate-900/80 backdrop-blur-sm'>
                    {getRankIcon(idx)}
                  </div>

                  <div className='flex items-center gap-4'>
                    <div className='relative'>
                      <Avatar className='h-14 w-14 ring-2 ring-amber-400/30 transition-all group-hover:ring-amber-300'>
                        <AvatarImage src={kata.avatar} alt={kata.username} />
                        <AvatarFallback className='bg-amber-600 font-bold text-white'>
                          {kata.fallback}
                        </AvatarFallback>
                      </Avatar>
                      {idx < 3 && (
                        <div className='absolute -top-1 -right-1 animate-ping'>
                          <div className='h-3 w-3 rounded-full bg-red-500' />
                        </div>
                      )}
                    </div>

                    <div className='min-w-0 flex-1'>
                      <p className='truncate font-bold text-white'>
                        {kata.username}{' '}
                        <span className='font-normal text-amber-300 italic'>
                          solved
                        </span>{' '}
                        <span className='font-semibold text-yellow-300'>
                          “{kata.kataName}”
                        </span>
                      </p>
                      <div className='mt-1 flex items-center gap-3 text-xs text-amber-200/80'>
                        <DaysAgo date={kata.completedAt} />
                        <span className='text-amber-400'>•</span>
                        <SolvedOn
                          date={kata.completedAt}
                          className='font-medium'
                        />
                      </div>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className='absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Optional: Add subtle animated background elements */}
        <div className='absolute top-20 left-10 h-72 w-72 animate-pulse rounded-full bg-amber-500/10 blur-3xl' />
        <div className='absolute right-10 bottom-20 h-96 w-96 animate-pulse rounded-full bg-purple-500/10 blur-3xl' />
      </div>

      {/* RIGHT PANEL: SIGN IN */}
      <div className='mb-13 flex min-h-0 flex-1 flex-col items-center justify-center p-3 pb-13 lg:p-7 lg:pb-3'>
        <div className='flex w-full max-w-md flex-1 flex-col justify-center space-y-4'>
          {/* GitHub + Hero — ONE LINE, ZERO WASTE */}
          <div className='flex items-center justify-center gap-2'>
            <Link
              href='https://github.com/BCFCODE'
              target='_blank'
              className='bg-background/30 flex h-6 items-center gap-1.5 rounded-md border border-amber-500/20 px-2 text-[10px] font-medium backdrop-blur-sm transition-all hover:border-amber-400 hover:bg-amber-500/10'
            >
              <GitHubLogoIcon className='h-2.5 w-2.5' />
              <IconStar className='h-2 w-2 fill-amber-400 text-amber-400' />
              <span className='font-bold text-amber-300'>{stars}</span>
            </Link>

            <div className='text-center leading-none'>
              <h1 className='bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-base font-bold text-transparent'>
                Code. Compete. Conquer.
              </h1>
            </div>
          </div>

          <div className='bg-card/90 rounded-xl border border-amber-500/20 p-6 shadow-lg backdrop-blur-sm'>
            <ClerkSignInForm />
          </div>
        </div>

        {/* FOOTER — NOW ALWAYS IN VIEW */}
        <p className='text-muted-foreground animate-in fade-in slide-in-from-bottom mt-3 text-center text-xs duration-700'>
          <Sparkles className='inline h-3.5 w-3.5 text-amber-400' />{' '}
          <strong className='text-amber-300'>10,000+</strong> katas solved.{' '}
          <strong className='text-amber-300'>Your turn.</strong>
        </p>
      </div>
    </div>
  );
}
