import { CodewarsChallengesResponse } from "@/app/api/codewars/challenges/all/route";
import CodewarsAPIService from "@/app/api/services/codewars";
import codewarsQueryKeys from "@/app/context/providers/ReactQuery/queryKeys/codewars";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { useQuery } from "@tanstack/react-query";

const { getCompletedChallenges } = new CodewarsAPIService();

export interface CompletedChallengesQueryData {
  totalPages: number; // Total number of pages in the response
  totalItems: number; // Total number of items across all pages
  list: CodewarsCompletedChallenge[];
}

export interface ListQuery {
  username: string;
  pageNumber: number;
  options?: RequestInit;
}

const useListQuery = ({ username, pageNumber, options }: ListQuery) => {
  return useQuery<
    CompletedChallengesQueryData,
    Error,
    CompletedChallengesQueryData
  >({
    queryKey: [codewarsQueryKeys.codewars, username, pageNumber],
    queryFn: async () => {
      const { list, totalItems, totalPages } =
        await getCompletedChallenges({
          username,
          pageNumber,
          options,
        });

      return { list, totalItems, totalPages };
    },
    staleTime: 1 * 1000 * 60, // 1m
    retry: 1,
  });
};

export default useListQuery;
