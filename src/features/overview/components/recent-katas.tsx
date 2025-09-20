'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Clock, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import dayjs from '@/lib/dayjs';

type RecentKata = {
  user: string;
  name: string;
  kyu: string;
  solvedAt: string; // ISO date
  avatar?: string;
  fallback: string;
};

const recentKatas: RecentKata[] = [
  {
    user: 'Morteza',
    name: 'Sum of Two Integers',
    kyu: '7 kyū',
    solvedAt: '2025-09-15T10:27:43.529Z',
    avatar:
      'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18zMmp5M3NJT0VzeUtoYWNSanRhTFA5b1VCeHEifQ',
    fallback: 'S2'
  },
  {
    user: 'Miguel',
    name: 'Sum of Two Integers',
    kyu: '7 kyū',
    solvedAt: '2025-09-15T10:27:43.529Z',
    avatar:
      'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18zMnBHZ1lxM05kV3VvV0pETDk1cldYaWVUeXcifQ',
    fallback: 'S2'
  },
  {
    user: 'Fatemeh N.',
    name: 'Valid Parentheses',
    kyu: '6 kyū',
    solvedAt: '2025-09-14T15:20:12.000Z',
    avatar: 'https://www.codewars.com/packs/assets/logo.f607a0fb.svg',
    fallback: 'VP'
  },
  {
    user: 'John K.',
    name: 'Find the Odd Int',
    kyu: '6 kyū',
    solvedAt: '2025-09-13T18:45:33.000Z',
    avatar: 'https://www.codewars.com/packs/assets/logo.f607a0fb.svg',
    fallback: 'FO'
  }
];

export function RecentKatas() {
  return (
    <Card
      className={cn(
        'h-full overflow-hidden rounded-xl bg-gradient-to-br from-[var(--bg-background)]/10 to-[var(--kyu-5)]/10 shadow-lg transition-all duration-300 hover:shadow-xl',
        'border-sidebar-border border'
      )}
    >
      <CardHeader className='bg-sidebar/50 dark:bg-sidebar/30'>
        <CardTitle className='text-sidebar-foreground flex items-center gap-2 text-xl font-bold'>
          <Trophy className='h-6 w-6 animate-pulse text-[var(--royal-gold)]' />
          BCFCODE Kata Champions
        </CardTitle>
        <CardDescription className='text-sidebar-accent-foreground text-sm'>
          See who’s crushing Codewars right now ⚡
        </CardDescription>
      </CardHeader>
      <CardContent className='-mt-3 p-2'>
        <div className='space-y-1'>
          {recentKatas.map((kata, idx) => (
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
                  'transition-transform duration-300 hover:scale-110'
                )}
              >
                <AvatarImage
                  src={kata.avatar}
                  alt={kata.name}
                  referrerPolicy='no-referrer'
                />
                <AvatarFallback className='bg-muted text-muted-foreground'>
                  {kata.fallback}
                </AvatarFallback>
              </Avatar>

              {/* Kata Info */}
              <div className='ml-4 flex-1'>
                <p className='text-foreground text-sm font-medium'>
                  <span className='font-semibold'>{kata.user}</span> solved{' '}
                  <span className='italic'>{kata.name}</span>
                </p>
                <p className='text-muted-foreground mt-1 flex items-center gap-2 text-xs'>
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase',
                      `bg-[var(--kyu-${kata.kyu.charAt(0)})]/20 text-[var(--kyu-${kata.kyu.charAt(
                        0
                      )})]`
                    )}
                  >
                    {kata.kyu}
                  </span>
                  <span>• {dayjs(kata.solvedAt).fromNow()}</span>
                </p>
              </div>

              {/* Solved At */}
              <div className='text-muted-foreground ml-auto hidden items-center text-xs sm:flex'>
                <Clock className='mr-1 h-4 w-4 text-[var(--royal-gold)]' />
                {dayjs(kata.solvedAt).format('MMM D, HH:mm')}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
