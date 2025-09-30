'use client';

import { DaysAgo } from '@/app/dashboard/profile/codewars/components/Table/DaysAgo';
import { KataName } from '@/app/dashboard/profile/codewars/components/Table/KataName';
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
import { Trophy, History } from 'lucide-react';
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
        'h-full overflow-hidden rounded-xl bg-gradient-to-br from-[var(--bg-background)]/10 to-[var(--kyu-5)]/10 shadow-lg transition-all duration-300 hover:shadow-xl',
        'border-sidebar-border border'
      )}
    >
      <CardHeader className='bg-sidebar/50 dark:bg-sidebar/30 flex items-center justify-between'>
        <div>
          <CardTitle className='text-sidebar-foreground flex items-center gap-2 text-xl font-bold'>
            <Trophy className='h-6 w-6 animate-pulse text-[var(--royal-gold)]' />
            BCFCODE Kata Champions
          </CardTitle>
          <CardDescription className='text-sidebar-accent-foreground text-sm'>
            See who’s crushing Codewars right now ⚡
          </CardDescription>
        </div>
        <Link
          href='/dashboard/recently-solved-history'
          className={cn(
            'flex items-center gap-2 rounded-lg bg-[var(--royal-gold)]/30 px-4 py-2 font-semibold text-white hover:text-black',
            'transition-all duration-200 hover:scale-105 hover:bg-[var(--royal-gold)]/90',
            'focus:ring-sidebar-ring focus:ring-2 focus:outline-none'
          )}
        >
          <History className='h-5 w-5' />
          View History
        </Link>
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
                  'h-12 w-12 border-2 border-[var(--royal-gold)]/50 shadow-md',
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
              <div className='ml-4 flex-1'>
                <div className='text-foreground text-sm font-medium'>
                  <span className='font-semibold group-hover:hidden'>
                    {kata.username}
                  </span>
                  <span className='italic group-hover:hidden'> solved </span>
                  <span className='group inline-block italic'>
                    <KataName
                      name={kata.kataName}
                      date={kata.completedAt}
                      className={className?.kataNameStyles}
                    />
                  </span>
                </div>
                <DaysAgo
                  date={kata.completedAt}
                  className='mt-1 group-hover:hidden'
                />
              </div>
              <SolvedOn
                date={kata.completedAt}
                className='group-hover:hidden'
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
