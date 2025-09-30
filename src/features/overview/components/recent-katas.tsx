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
import { Trophy } from 'lucide-react';

interface Props {
  data: recentlySolvedKata[];
}

export function RecentKatas({ data }: Props) {
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
                  'transition-transform duration-300 hover:scale-110'
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
                      className={cn(
                        'max-w-80 flex-wrap',
                        'group-hover:max-w-80 group-hover:break-words group-hover:whitespace-normal'
                      )}
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
