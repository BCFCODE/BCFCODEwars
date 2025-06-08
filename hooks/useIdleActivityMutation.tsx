import usePaginationStore from "@/app/(dashboard)/leaderboard/UsersTable/Pagination/usePaginationStore";
import { GetUsersResponse } from "@/app/api/db/users/route";
import DatabaseAPIService from "@/app/api/services/db";
import usersQueryKeys from "@/ReactQuery/queryKeys/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const { toggleUserIdleStatus } = new DatabaseAPIService();

interface Data {
  success: boolean;
}

interface Variables {
  email: string;
  isIdle: boolean;
}

interface Context {
  previousData?: GetUsersResponse;
}

const useIdleActivityMutation = () => {
  const pagination = usePaginationStore((state) => state.pagination);
  const queryClient = useQueryClient();

  const queryKey = [
    usersQueryKeys.usersList,
    // pagination.skip,
    // pagination.limit,
  ];

  return useMutation<Data, Error, Variables, Context>({
    mutationFn: async ({ email, isIdle }) => {
      const { success } = await toggleUserIdleStatus({ email, isIdle });
      return { success };
    },
    onMutate: async ({ email, isIdle }) => {
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData<GetUsersResponse>(queryKey);

      // Optimistic update
      if (previousData) {
        queryClient.setQueryData<GetUsersResponse>(queryKey, (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            list: oldData.list.map((user) =>
              user.email === email
                ? { ...user, activity: { ...user.activity, isIdle } }
                : user
            ),
          };
        });
      }

      return { previousData };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousData) {
        // Rollback on error
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },
    // Invalidate only once after mutation settles
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

export default useIdleActivityMutation;
