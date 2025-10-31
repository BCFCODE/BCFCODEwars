'use client';

import {
  keepPreviousData,
  useQuery,
  UseQueryResult
} from '@tanstack/react-query';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { recentlySolvedKata } from '@/types';

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
  page,
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
    // gcTime: 10 * 60 * 1000,
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

    const isRefetching = query.isFetching && !query.isLoading;

    // 1. Show loading **only on refetch** (window focus, manual refetch)
    if (isRefetching && !hasShownLoading.current) {
      hasShownLoading.current = true;
      toast.loading('Syncing BCFCODE Kata Champions...', {
        id: SYNC_TOAST_ID,
        // icon: <Loader2 className='h-4 w-4 animate-spin' />,
        duration: Infinity
      });
      return;
    }

    // 2. On success
    if (query.isSuccess) {
      const data = query.data;
      const currentLength = data.data.length;

      // Initial load: just store length, no toast
      if (isInitialMount.current) {
        isInitialMount.current = false;
        prevLength.current = currentLength;
        hasShownLoading.current = false; // reset in case loading was shown
        return;
      }

      // Refetch success: show toast
      if (hasShownLoading.current) {
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
            duration: 4000,
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
    }

    // 3. On error (only if we were showing loading)
    if (query.isError && hasShownLoading.current) {
      toast.error(query.error?.message ?? 'Failed to sync champions', {
        id: SYNC_TOAST_ID,
        icon: <AlertCircle className='h-4 w-4' />,
        duration: 5000,
        action: { label: 'Retry', onClick: () => query.refetch() }
      });
      hasShownLoading.current = false;
    }

    // 4. Dismiss loading if fetch ended but we never transitioned
    if (!query.isFetching && hasShownLoading.current) {
      toast.dismiss(SYNC_TOAST_ID);
      hasShownLoading.current = false;
    }
  }, [page, query]);

  // Cleanup
  useEffect(() => {
    return () => {
      toast.dismiss(SYNC_TOAST_ID);
      hasShownLoading.current = false;
    };
  }, []);

  return query;
}
