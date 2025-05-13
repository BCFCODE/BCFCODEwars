import CodewarsAPIService from "@/app/api/services/codewars";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import codewarsQueryKeys from "@/app/context/providers/ReactQuery/queryKeys/codewars";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { useQuery } from "@tanstack/react-query";
import usePaginationStore, { defaultPagination } from "./usePaginationStore";

const { getCompletedChallenges } = new CodewarsAPIService();

export interface CompletedChallengesQueryData {
  totalPages: number; // Total number of pages in the response
  totalItems: number; // Total number of items across all pages
  list: CodewarsCompletedChallenge[];
}

const usePaginationQuery = () => {
  const { currentUser } = useCurrentUserContext();
  const username = currentUser.codewars.username;
  const pagination = usePaginationStore(
    (state) => state.pagination[username] ?? defaultPagination
  );

  const queryKey = username
    ? [codewarsQueryKeys.codewars, username, pagination.apiPageNumber]
    : [codewarsQueryKeys.codewars];

  return useQuery<
    CompletedChallengesQueryData,
    Error,
    CompletedChallengesQueryData
  >({
    queryKey,
    queryFn: async () => {
      console.log("usePaginationQuery queryFn called...");
      const { list, totalItems, totalPages } = await getCompletedChallenges({
        username,
        pageNumber: pagination.apiPageNumber,
      });
      console.log("usePaginationQuery/list", list);
      return { list, totalItems, totalPages };
    },
    enabled: !!username,
    staleTime: 1 * 1000 * 60, // 1m
    // retry: 1,
  });
};

export default usePaginationQuery;
