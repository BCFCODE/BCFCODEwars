import usePaginationStore from "@/app/(dashboard)/leaderboard/UsersTable/Pagination/usePaginationStore";
import { GetUsersResponse } from "@/app/api/db/users/route";
import DatabaseAPIService from "@/app/api/services/db";
import usersQueryKeys from "@/ReactQuery/queryKeys/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface IdleHistoryData {
  id: string;
  name?: string;
  remainingTimeMs: number;
  elapsedTimeMs: number;
  lastIdleTime: Date | null;
  lastActiveTime: Date | null;
  idleTimeMs: number;
  activeTimeMs: number;
  totalIdleTimeMs: number;
  totalActiveTimeMs: number;
  presence: "active" | "prompting" | "idle";
  timestamp: Date;
}

const { pushIdleHistory } = new DatabaseAPIService();

interface Data {
  success: boolean;
}

interface Variables {
  email: string;
  snapshot: IdleHistoryData;
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
      const { success } = await pushIdleHistory({
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
                    activity: { ...user.activity, isIdle: snapshot.isIdle },
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
    // Invalidate only once after mutation settles
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    retry: 3,
  });
};

export default useIdleHistoryMutation;

/* 
 await db.collection("users").updateOne(
  { email: "user@example.com" },
  {
    $push: {
      "activity.idleHistory": {
        $each: [newIdleSnapshot],
        $slice: -50
      }
    }
  }
);
*/
