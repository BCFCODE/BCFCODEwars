import {
  GetCompletedChallengesResponse
} from "@/app/api/codewars/challenges/all/route";
import CodewarsAPIService from "@/app/api/services/codewars";
import codewarsQueryKeys from "@/app/context/providers/ReactQuery/queryKeys/codewars";
import { useQuery } from "@tanstack/react-query";

const { getCompletedChallenges } = new CodewarsAPIService();

export interface ListQuery {
  username: string;
  pageNumber: number;
  options?: RequestInit;
}

const useListQuery = ({ username, pageNumber, options }: ListQuery) => {
  return useQuery<
    GetCompletedChallengesResponse,
    Error,
    GetCompletedChallengesResponse
  >({
    queryKey: [codewarsQueryKeys.codewars, username, pageNumber],
    queryFn: async () =>
      await getCompletedChallenges({ username, pageNumber, options }),
    staleTime: 1 * 1000 * 60, // 1m
    retry: 1,
  });
};

export default useListQuery;
