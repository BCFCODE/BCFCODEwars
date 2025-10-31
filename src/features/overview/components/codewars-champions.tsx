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
import { ChampionsPagination } from './codewars-champion-pagination';
import { useState } from 'react';
import useChampionsQuery from '@/hooks/useChampionsQuery';
import { toast } from 'sonner';

interface Props {
  showPagination?: boolean;
  limit: number;
  data: recentlySolvedKata[];
  className?: {
    kataNameStyles?: string;
    avatarStyles?: string;
  };
}

export function CodewarsChampions({
  showPagination,
  limit,
  data: initialData,
  className
}: Props) {
  const [page, setPage] = useState(0);
  const router = useRouter();

  const {
    data: queryData,
    isPending,
    error
  } = useChampionsQuery({
    page,
    limit,
    initialData
  });

  if (error) {
    toast.error(queryData?.message || 'Failed to load champions data', {
      id: 'champions-error',
      duration: 5000
    });
  }
  console.log(queryData?.totalCount, '<<<<<<<<<<<<<<');
  const champions: recentlySolvedKata[] = queryData?.data || [];
  const totalPages = queryData?.totalCount
    ? Math.ceil(queryData.totalCount / limit)
    : 1;

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
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            router.push('/dashboard/codewars/champions');
          }
        }}
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
        <div className='group-hover:animate-shimmer pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-[var(--royal-gold)]/10 to-transparent opacity-0 group-hover:opacity-100' />
        <div className='animate-rotate-slow absolute -left-3 h-20 w-20 rounded-full bg-[var(--royal-gold)]/20 opacity-50 blur-2xl group-hover:opacity-70' />
        <div className='relative flex items-center justify-center'>
          <Trophy
            className={cn(
              'text-card-foreground/80 h-11 w-11 drop-shadow-[0_0_8px_rgba(255,215,0,0.5)] transition-transform duration-500 dark:text-[var(--royal-gold)]',
              'group-hover:scale-110 group-hover:rotate-[10deg] group-hover:drop-shadow-[0_0_15px_rgba(255,215,0,0.7)]',
              'max-[480px]:h-8 max-[480px]:w-8 max-[420px]:-ml-1 max-[380px]:-ml-2 max-[360px]:-ml-3 max-[320px]:h-6 max-[320px]:w-6'
            )}
          />
          <div className='animate-ping-slow absolute inset-0 rounded-full border border-[var(--royal-gold)]/30 max-[420px]:-ml-1 max-[380px]:-ml-2 max-[360px]:-ml-3' />
        </div>
        <div className='relative z-10 flex flex-col'>
          <CardTitle
            className={cn(
              'text-card-foreground text-2xl font-extrabold tracking-tight max-[1280px]:text-[19px] max-[480px]:text-[17px] max-[360px]:text-[14px] max-[320px]:text-[10px]',
              'drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] transition-all duration-300 dark:group-hover:text-[var(--royal-gold)]'
            )}
          >
            BCFCODE Kata Champions
          </CardTitle>
          <CardDescription
            className={cn(
              'text-card-foreground/80 mt-1 text-sm font-medium max-[480px]:text-xs max-[420px]:text-[11px] max-[360px]:text-[9px] max-[320px]:text-[7px]',
              'transition-colors duration-300 dark:group-hover:text-[var(--royal-gold)]/90'
            )}
          >
            See who’s crushing Codewars right now ⚡
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className='-mt-3 p-2'>
        <div className='relative space-y-1'>
          {isPending && (
            <div className='absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-black/50'>
              <div className='h-8 w-8 animate-spin rounded-full border-4 border-gray-500 border-t-transparent' />
            </div>
          )}
          {champions.length === 0 && !isPending && (
            <div className='py-4 text-center text-gray-500 dark:text-gray-400'>
              No recent katas found.
            </div>
          )}
          {champions.map((kata, idx) => (
            <div
              key={`${kata.kataId}-${kata.userId}-${idx}`}
              className={cn(
                'flex items-center rounded-lg p-3 transition-all duration-300',
                'hover:bg-sidebar-accent/20 focus-within:ring-sidebar-ring focus-within:ring-2 hover:scale-[1.01] hover:shadow-sm'
              )}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                }
              }}
            >
              <Avatar
                className={cn(
                  'h-10 w-10 border-2 border-[var(--royal-gold)]/10 shadow-md max-[420px]:hidden',
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
              <div className='ml-4 flex-1 max-[420px]:ml-0 max-[360px]:ml-1 max-[320px]:-ml-1'>
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
      {showPagination && (
        <div className='relative mt-6'>
          <div className='absolute inset-0 -z-10 animate-pulse bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.1),transparent_70%)] blur-2xl' />
          <ChampionsPagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => {
              setPage(newPage);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      )}
    </Card>
  );
}
