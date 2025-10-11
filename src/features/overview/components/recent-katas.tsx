'use client';

import { DaysAgo } from '@/app/dashboard/codewars/components/Table/DaysAgo';
import { SolvedOn } from '@/app/dashboard/codewars/components/Table/SolvedOn';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { recentlySolvedKata } from '@/types';
import { Trophy } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
  data: recentlySolvedKata[];
  className?: {
    kataNameStyles?: string;
    avatarStyles?: string;
  };
}

export function RecentKatas({ data, className }: Props) {
  const router = useRouter();

  return (
    <Card
      className={cn(
        'group border-sidebar-border h-full overflow-hidden rounded-xl border shadow-lg transition-all duration-500 hover:shadow-[0_0_25px_rgba(255,215,0,0.3)]',
        'bg-gradient-to-br from-[var(--bg-background)]/10 to-[var(--kyu-5)]/10 dark:from-[var(--bg-background)]/5 dark:to-[var(--kyu-5)]/5'
      )}
    >
      <CardHeader
        role='button'
        tabIndex={0}
        onClick={() => router.push('/dashboard/codewars/champions')}
        className={cn(
          'relative flex cursor-pointer items-center justify-start gap-4 overflow-hidden px-7 py-5',
          'bg-gradient-to-r from-[var(--royal-gold)]/20 to-[var(--kyu-5)]/20',
          'border-b border-[var(--royal-gold)]/30 backdrop-blur-md',
          'transition-all duration-500',
          'hover:scale-[1.02] active:scale-[0.99]',
          'hover:shadow-[0_8px_25px_rgba(255,215,0,0.3)]',
          'focus-visible:ring-2 focus-visible:ring-[var(--royal-gold)] focus-visible:outline-none'
        )}
      >
        {/* Subtle shimmer sweep */}
        <div className='group-hover:animate-shimmer pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-[var(--royal-gold)]/10 to-transparent opacity-0 group-hover:opacity-100' />

        {/* Glowing rotating aura behind Trophy */}
        <div className='animate-rotate-slow absolute -left-3 h-20 w-20 rounded-full bg-[var(--royal-gold)]/20 opacity-50 blur-2xl group-hover:opacity-70' />

        {/* Animated Trophy Icon */}
        <div className='relative flex items-center justify-center'>
          <Trophy
            className={cn(
              'h-11 w-11 text-[var(--royal-gold)] drop-shadow-[0_0_8px_rgba(255,215,0,0.5)] transition-transform duration-500',
              'group-hover:scale-110 group-hover:rotate-[10deg] group-hover:drop-shadow-[0_0_15px_rgba(255,215,0,0.7)]',
              'max-[480px]:h-8 max-[480px]:w-8 max-[320px]:h-6 max-[320px]:w-6'
            )}
          />
          <div className='animate-ping-slow absolute inset-0 rounded-full border border-[var(--royal-gold)]/30' />
        </div>

        {/* Title & Subtitle */}
        <div className='relative z-10 flex flex-col'>
          <CardTitle
            className={cn(
              'text-card-foreground text-2xl font-extrabold tracking-tight max-[1280px]:text-[19px] max-[480px]:text-[17px] max-[360px]:text-[14px]',
              'drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] transition-all duration-300 group-hover:text-[var(--royal-gold)]'
            )}
          >
            BCFCODE Kata Champions
          </CardTitle>
          <CardDescription
            className={cn(
              'text-card-foreground/80 mt-1 text-sm font-medium max-[480px]:text-xs max-[420px]:text-[11px]',
              'transition-colors duration-300 group-hover:text-[var(--royal-gold)]/90'
            )}
          >
            See who’s crushing Codewars right now ⚡
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className='-mt-3 p-2'>
        <div className='space-y-1'>
          {data.map((kata, idx) => (
            <div
              key={idx}
              className={cn(
                'flex items-center rounded-lg p-3 transition-all duration-300',
                'hover:bg-sidebar-accent/20 focus-within:ring-sidebar-ring focus-within:ring-2 hover:scale-[1.01] hover:shadow-sm'
              )}
              tabIndex={0}
            >
              {/* Avatar */}
              <Avatar
                className={cn(
                  'h-15 w-15 border-2 border-[var(--royal-gold)]/10 shadow-md max-[420px]:hidden',
                  'transition-transform duration-300 hover:scale-110',
                  className?.avatarStyles
                )}
              >
                <AvatarImage
                  src={kata.avatar}
                  alt={kata.kataName}
                  referrerPolicy='no-referrer'
                />
                <AvatarFallback className='bg-muted text-muted-foreground'>
                  {kata.fallback}
                </AvatarFallback>
              </Avatar>

              {/* Kata Info */}
              <div className='ml-4 flex-1 max-[420]:ml-0 max-[360px]:ml-1 max-[320px]:-ml-1'>
                <div className='text-foreground text-sm font-medium max-[320px]:text-xs'>
                  <span className='font-semibold'>{kata.username}</span>
                  <span className='italic'> solved </span>
                  <span className='group inline-block italic'>
                    {kata.kataName}
                  </span>
                </div>
                <div className='mt-2 flex items-center justify-between'>
                  <DaysAgo date={kata.completedAt} />
                  <SolvedOn
                    date={kata.completedAt}
                    className='cursor-pointer'
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
