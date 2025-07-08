/**
 * Custom React Query mutation hook for updating the current authenticated user
 * and synchronizing UI cache with the latest Codewars challenge data.
 *
 * Responsibilities:
 * - Sends a mutation to update the current user in the database
 * - Immediately reflects changes in the UI by updating cached queries
 * - Avoids unnecessary refetches by directly mutating cached query data
 * - Falls back to invalidation only where needed (e.g., gauges)
 */

import DatabaseAPIService from "@/app/api/services/db";
import { AuthenticatedUser } from "@/types/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import getQueryKey from "../CodewarsTable/Pagination/utils/getQueryKey";
import { CompletedChallengesQueryData } from "../CodewarsTable/Pagination/usePaginationQuery";
import usersQueryKeys from "@/ReactQuery/queryKeys/users";

const { postCurrentUser } = new DatabaseAPIService();

interface Props {
  username: string;
  apiPageNumber: number;
}

/**
 * useCodewarsTableMutation
 *
 * This hook posts the current user to the server and updates the
 * React Query cache to reflect the changes immediately in the UI.
 *
 * @param {string} username - Username to scope the cache update
 * @param {number} apiPageNumber - Current paginated page number
 * @returns Mutation hook with automatic cache management
 */
const useCodewarsTableMutation = ({ username, apiPageNumber }: Props) => {
  const queryClient = useQueryClient();

  // Get the query key for paginated Codewars data
  const { queryKey } = getQueryKey({ username, apiPageNumber });

  return useMutation({
    // Sends updated user data to the backend
    mutationFn: (currentUser: AuthenticatedUser) =>
      postCurrentUser(currentUser),

    // Log mutation errors to help with debugging
    onError: (error) => {
      console.error("Failed to post current user (useFilter):", error);
    },

    // Invalidate gauge-related queries so they refetch fresh data
    onSuccess: (_data, currentUser) => {
      queryClient.invalidateQueries({
        queryKey: [usersQueryKeys.currentUser, currentUser.email],
      });
    },

    // Optimistically update the Codewars table data in cache
    // This ensures a rapid UI response without waiting for refetch
    onSettled: (_data, _error, currentUser) => {
      queryClient.setQueryData<CompletedChallengesQueryData | undefined>(
        queryKey,
        (oldData) => ({
          ...(oldData ?? {}),
          totalPages: currentUser.codewars.codeChallenges.totalPages,
          totalItems: currentUser.codewars.codeChallenges.totalItems,
          list: currentUser.codewars.codeChallenges.list,
        })
      );
    },

    // Retry the mutation up to 2 times on failure
    retry: 2,
  });
};

export default useCodewarsTableMutation;
