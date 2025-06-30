import DatabaseAPIService from "@/app/api/services/db";
import useCurrentUserContext from "@/app/context/hooks/useCurrentUserContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import usePaginationStore, {
  defaultPagination,
} from "../CodewarsTable/Pagination/usePaginationStore";
import getQueryKey from "../CodewarsTable/Pagination/utils/getQueryKey";
import { AuthenticatedUser } from "@/types/users";

const { postCurrentUser } = new DatabaseAPIService();

const useCurrentUserMutation = () => {
  const queryClient = useQueryClient();
  const { currentUser } = useCurrentUserContext();
  const username = currentUser.codewars.username;
  const apiPageNumber = usePaginationStore(
    (state) => state.pagination[username] ?? defaultPagination
  ).apiPageNumber;
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
