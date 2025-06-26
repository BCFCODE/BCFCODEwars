import usePaginationStore from "@/app/(dashboard)/leaderboard/UsersTable/Pagination/usePaginationStore";
import { GetUsersResponse } from "@/app/api/db/users/route";
import DatabaseAPIService from "@/app/api/services/db";
import usersQueryKeys from "@/ReactQuery/queryKeys/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface IdleSnapshotData {
  isIdle: boolean;
  isPrompted: boolean;
  elapsedTimeMs: number;
  lastIdleTime: Date | null;
  lastActiveTime: Date | null;
  activeTimeMs: number;
  totalActiveTimeMs: number;
  timestamp: Date;
}

const { updateIdleHistory } = new DatabaseAPIService();

interface Data {
  success: boolean;
}

interface Variables {
  email: string;
  snapshot: IdleSnapshotData;
}

interface Context {
  previousData?: GetUsersResponse;
}

const useIdleHistoryMutation = () => {
  const pagination = usePaginationStore((state) => state.pagination);
  const queryClient = useQueryClient();

  const queryKey = [
    usersQueryKeys.usersList,
    pagination.skip,
    pagination.limit,
  ];

  return useMutation<Data, Error, Variables, Context>({
    mutationFn: async ({ email, snapshot }) => {
      // console.log(email, snapshot);
      const { success } = await updateIdleHistory({
        email,
        snapshot,
      });
      return { success };
    },
    onMutate: async ({ email, snapshot }) => {
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
                ? {
                    ...user,
                    activity: { ...user.activity, ...snapshot },
                  }
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
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    retry: 3,
  });
};

export default useIdleHistoryMutation;
