'use client';

import { DaysAgo } from '@/app/dashboard/profile/codewars/components/Table/DaysAgo';
import { SolvedOn } from '@/app/dashboard/profile/codewars/components/Table/SolvedOn';
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
import { History, Trophy } from 'lucide-react';
import Link from 'next/link';

interface Props {
  data: recentlySolvedKata[];
  className?: {
    kataNameStyles?: string;
    avatarStyles?: string;
  };
}

export function RecentKatas({ data, className }: Props) {
  return (
    <Card
      className={cn(
        'bg-gradient-to-r from-[var(--royal-gold)]/20 to-[var(--kyu-5)]/20 dark:from-[var(--royal-gold)]/5 dark:to-[var(--kyu-5)]/5',
        'group h-full overflow-hidden rounded-xl bg-gradient-to-br from-[var(--bg-background)]/10 to-[var(--kyu-5)]/10 shadow-lg transition-all duration-300 hover:shadow-xl',
        'border-sidebar-border border'
      )}
    >
      <CardHeader
        className={cn(
          'relative bg-gradient-to-r from-[var(--royal-gold)]/20 to-[var(--kyu-5)]/20 dark:from-[var(--royal-gold)]/5 dark:to-[var(--kyu-5)]/5',
          'border-b border-[var(--royal-gold)]/30 backdrop-blur-md',
          'flex items-center justify-start px-7 py-4',
          'shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.05)]',
          'transition-all duration-500 hover:shadow-[0_6px_20px_rgba(255,215,0,0.3)]'
        )}
      >
        {/* Animated Background Effect */}
        <div className='animate-pulse-slow absolute inset-0 bg-gradient-to-r from-[var(--royal-gold)]/10 to-transparent opacity-50' />

        {/* History Link with Tooltip */}
        <div className='group/link relative'>
          <Link
            href='/dashboard/recently-solved-history'
            className={cn(
              'text-card flex items-center gap-2 rounded-full bg-[var(--royal-gold)]/40 font-semibold max-[420]:-ml-4',
              'transition-all duration-300 hover:scale-110 hover:bg-[var(--royal-gold)]/60 hover:p-1 hover:text-black',
              'focus:ring-sidebar-ring focus:ring-2 focus:outline-none'
            )}
          >
            <History className='group-hover/link:animate-spin-slow h-10 w-10 max-[480px]:h-8 max-[480px]:w-8 max-[320px]:h-6 max-[320px]:w-6' />
          </Link>
          <span className='text-card absolute top-full left-1/2 mt-1 hidden -translate-x-1/2 rounded-md bg-[var(--royal-gold)]/30 px-2 py-1 text-xs shadow-md group-hover/link:block'>
            History
          </span>
        </div>

        {/* Title and Description */}
        <div className='ml-4 max-[480px]:ml-3 max-[420px]:ml-2 max-[320px]:ml-0'>
          <CardTitle
            className={cn(
              'text-sidebar-foreground flex items-center gap-2 text-2xl font-extrabold tracking-tight max-[1280px]:text-[19px] max-[520px]:text-[20px] max-[480px]:text-[18px] max-[420px]:text-[15px] max-[360px]:text-[12px]',
              'text-card-foreground drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]',
              'group-hover:text-card-foreground/80 transition-all duration-300'
            )}
          >
            <Trophy className='text-card-foreground h-7 w-7 animate-bounce group-hover:animate-pulse max-[1280px]:h-4 max-[1280px]:w-4 max-[520px]:h-4 max-[520px]:w-4 max-[480px]:h-3 max-[480px]:w-3' />
            BCFCODE Kata Champions
          </CardTitle>
          <CardDescription
            className={cn(
              'text-sidebar-accent-foreground mt-1 text-sm font-medium max-[480px]:text-xs max-[420px]:text-[12px] max-[360px]:text-[9px]',
              'text-card-foreground/80'
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
                'flex items-center rounded-lg p-3 transition-all duration-200',
                'hover:bg-sidebar-accent/20 hover:scale-[1.01] hover:shadow-sm',
                'focus-within:ring-sidebar-ring focus-within:ring-2'
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
                <AvatarFallback
                  className={cn('bg-muted text-muted-foreground')}
                >
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
