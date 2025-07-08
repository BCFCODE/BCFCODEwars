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

const useCodewarsTableMutation = ({ username, apiPageNumber }: Props) => {
  const queryClient = useQueryClient();

  const { queryKey } = getQueryKey({ username, apiPageNumber });

  return useMutation({
    mutationFn: (currentUser: AuthenticatedUser) =>
      postCurrentUser(currentUser),
    onError: (error) => {
      console.error("Failed to post current user (useFilter):", error);
    },
    onSuccess: (_data, currentUser) => {
      // queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({
        queryKey: [usersQueryKeys.currentUser, currentUser.email],
      });
    },
    onSettled: (_data, _error, currentUser) => {
      queryClient.setQueryData(queryKey, () => ({
        totalPages: currentUser.codewars.codeChallenges.totalPages,
        totalItems: currentUser.codewars.codeChallenges.totalItems,
        list: currentUser.codewars.codeChallenges.list,
      }));
    },
    retry: 2,
  });
};

export default useCodewarsTableMutation;
