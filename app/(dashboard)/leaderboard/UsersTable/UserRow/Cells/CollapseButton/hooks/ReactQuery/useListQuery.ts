import CodewarsAPIService from "@/app/api/services/codewars";
import codewarsQueryKeys from "@/app/context/providers/ReactQuery/queryKeys/codewars";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { useQuery } from "@tanstack/react-query";
import usePaginationStore from "../../CodewarsTable/Pagination/usePaginationStore";
import { useUsersStore } from "@/app/context/store/users";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";

const { getCompletedChallenges } = new CodewarsAPIService();

export interface CompletedChallengesQueryData {
  totalPages: number; // Total number of pages in the response
  totalItems: number; // Total number of items across all pages
  list: CodewarsCompletedChallenge[];
}

export interface ListQuery {
  apiPageNumber: number;
  username: string;
}

const useListQuery = () => {
  // const {
  //   user: { selectedUser },
  // } = useUsersStore((state) => state);
  const { currentUser } = useCurrentUserContext();
  const {
    pagination: { apiPageNumber },
  } = usePaginationStore((state) => state);

  const username = currentUser?.codewars?.username ?? "";

  const queryKey = username
    ? [codewarsQueryKeys.codewars, { username, apiPageNumber }]
    : [codewarsQueryKeys.codewars];

  return useQuery<
    CompletedChallengesQueryData,
    Error,
    CompletedChallengesQueryData
  >({
    queryKey,
    queryFn: async () => {
      const { list, totalItems, totalPages } = await getCompletedChallenges({
        username,
        apiPageNumber,
      });

      return { list, totalItems, totalPages };
    },
    staleTime: 1 * 1000 * 60, // 1m
    // retry: 1,
  });
};

export default useListQuery;
