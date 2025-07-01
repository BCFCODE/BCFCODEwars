import DatabaseAPIService from "@/app/api/services/db";
import { AuthenticatedUser } from "@/types/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import getQueryKey from "../CodewarsTable/Pagination/utils/getQueryKey";

const { postCurrentUser } = new DatabaseAPIService();

interface Props {
  username: string;
  apiPageNumber: number;
}

const useCurrentUserMutation = ({ username, apiPageNumber }: Props) => {
  const queryClient = useQueryClient();
  
  const { queryKey } = getQueryKey({ username, apiPageNumber });

  return useMutation({
    mutationFn: (currentUser: AuthenticatedUser) =>
      postCurrentUser(currentUser),
    onError: (error) => {
      console.error("Failed to post current user (useFilter):", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    retry: 2,
  });
};

export default useCurrentUserMutation;
