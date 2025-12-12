'use client';

import { recentlySolvedKata } from '@/types';
import useChampionsQuery from '@/hooks/useChampionsQuery';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Trophy } from 'lucide-react';
import { ChampionsPagination } from '@/features/overview/components/codewars-champion-pagination';

interface Props {
  limit: number;
  initialData: recentlySolvedKata[];
  totalCount: number;
}

export default function ChampionsList({
  limit,
  //   initialData,
  totalCount
}: Props) {
  const [page, setPage] = useState(0);

  const { data, error, isFetching } = useChampionsQuery({
    page,
    limit
    // initialData
  });

  useEffect(() => {
    if (!error) return;
    toast.error('Failed to load champions data');
  }, [error]);

  //   const champions = data?.data ?? [];

  return (
    <Card
      className={cn(
        'group border-sidebar-border h-full overflow-hidden rounded-xl border shadow-lg transition-all duration-500 hover:shadow-[0_0_25px_rgba(255,215,0,0.3)]',
        'bg-gradient-to-br from-[var(--bg-background)]/10 to-[var(--kyu-5)]/10'
      )}
    >
      <CardHeader className='flex items-center gap-3 px-7 py-5'>
        <Trophy className='h-6 w-6 text-[var(--royal-gold)]' />
        <CardTitle className='text-xl font-bold'>Champions</CardTitle>
      </CardHeader>

      <CardContent>
        {isFetching && <div className='text-sm opacity-60'>Syncing...</div>}

        {/* Your table goes here */}
        {/* champions.map(...) */}
      </CardContent>

      <ChampionsPagination
        totalPages={Math.ceil(totalCount / limit)}
        currentPage={page}
        onPageChange={setPage}
        loadingPage={isFetching ? page : null}
      />
    </Card>
  );
}
