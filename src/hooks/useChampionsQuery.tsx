'use client';

import { recentlySolvedKata } from '@/types';
import {
  keepPreviousData,
  useQuery,
  UseQueryResult
} from '@tanstack/react-query';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

interface ChampionsQueryParams {
  page: number;
  limit?: number;
  initialData: recentlySolvedKata[];
}

interface ChampionsQueryResult {
  data: recentlySolvedKata[];
  success: boolean;
  totalCount: number;
  message: string;
  toastType: 'success' | 'error';
}

const SYNC_TOAST_ID = 'champions-sync';

export default function useChampionsQuery({
  page = 0,
  limit = 25,
  initialData
}: ChampionsQueryParams): UseQueryResult<ChampionsQueryResult, Error> {
  if (page < 0) throw new Error('Page number must be non-negative');
  if (limit < 1) throw new Error('Limit must be at least 1');

  const skip = page * limit;

  const isInitialMount = useRef(true);
  const prevLength = useRef<number>(0);
  const hasShownLoading = useRef(false);

  const query = useQuery<ChampionsQueryResult, Error>({
    queryKey: ['champions', page, limit],
    queryFn: async () => {
      const response = await fetch(
        `/api/codewars/champions/sync?limit=${limit}&skip=${skip}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' }
        }
      );

      const result = await response.json();

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      if (!result.success) throw new Error(result.message ?? 'Sync failed');

      return {
        success: result.success,
        data: result.data ?? [],
        totalCount: result.totalCount ?? 0,
        message: result.message ?? '',
        toastType: result.toastType ?? 'success'
      };
    },

    placeholderData:
      page === 0
        ? {
            success: true,
            data: initialData,
            totalCount: initialData.length,
            message: 'Initial data loaded',
            toastType: 'success'
          }
        : keepPreviousData,

    staleTime: 0,
    gcTime: 1 * 60 * 1000,
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30_000),
    throwOnError: false,
    refetchOnWindowFocus: true
  });

  // ──────────────────────────────────────────────────────────────
  // ONE useEffect – only reacts to fetch state changes
  // ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (page !== 0) return;

    // Prevent any toast logic on initial mount
    if (isInitialMount.current && query.isSuccess) {
      isInitialMount.current = false;
      prevLength.current = query.data.data.length;
      return;
    }

    // Only consider refetching after initial mount
    const isRefetching = query.isFetching && !query.isPending && query.data;

    // Show loading only on refetch (not initial)
    if (isRefetching && !hasShownLoading.current) {
      hasShownLoading.current = true;
      toast.loading('Syncing...', {
        id: SYNC_TOAST_ID,
        duration: Infinity
      });
      return;
    }

    // Success after refetch
    if (query.isSuccess && hasShownLoading.current) {
      const currentLength = query.data.data.length;
      const hasNewItems = currentLength > prevLength.current;
      const newCount = hasNewItems ? currentLength - prevLength.current : 0;
      prevLength.current = currentLength;

      toast.success(
        newCount > 0
          ? `Synced! ${newCount} new kata${newCount > 1 ? 's' : ''} added`
          : 'Champions up to date',
        {
          id: SYNC_TOAST_ID,
          icon: <CheckCircle2 className='h-4 w-4' />,
          duration: 2000,
          action: hasNewItems
            ? {
                label: 'View',
                onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            : undefined
        }
      );
      hasShownLoading.current = false;
    }

    // Error after refetch
    if (query.isError && hasShownLoading.current) {
      toast.error(query.error?.message ?? 'Failed to sync champions', {
        id: SYNC_TOAST_ID,
        icon: <AlertCircle className='h-4 w-4' />,
        duration: 5000,
        action: { label: 'Retry', onClick: () => query.refetch() }
      });
      hasShownLoading.current = false;
    }

    // Dismiss if fetching ended without success/error handling
    if (!query.isFetching && hasShownLoading.current) {
      toast.dismiss(SYNC_TOAST_ID);
      hasShownLoading.current = false;
    }
  }, [page, query]);

  return query;
}
