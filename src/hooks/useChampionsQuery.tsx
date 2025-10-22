'use client';

import { recentlySolvedKata } from '@/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
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

export default function useChampionsQuery({
  page,
  limit = 25,
  initialData
}: ChampionsQueryParams) {
  if (page < 0) {
    throw new Error('Page number must be non-negative');
  }
  if (limit < 1) {
    throw new Error('Limit must be at least 1');
  }

  const skip = page * limit;

  return useQuery({
    queryKey: ['champions', page, limit],
    queryFn: async () => {
      const response = await fetch(
        `/api/codewars/champions/sync?limit=${limit}&skip=${skip}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to fetch champions data');
      }

      if (result.toastType === 'success' && page === 0) {
        toast.success(result.message || 'Champions data synced successfully', {
          id: 'champions-sync',
          duration: 3000
        });
      }

      return {
        success: result.success,
        data: result.data || [],
        totalCount: result.totalCount || 0,
        message: result.message || '',
        toastType: result.toastType || 'success'
      };
    },
    placeholderData: (previousData: ChampionsQueryResult | undefined) => {
      if (page === 0) {
        return {
          success: true,
          data: initialData,
          totalCount: initialData.length,
          message: 'Initial data loaded',
          toastType: 'success'
        };
      }
      return keepPreviousData(previousData);
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
    throwOnError: false // Prevent React Query from throwing errors to the nearest error boundary
  });
}
