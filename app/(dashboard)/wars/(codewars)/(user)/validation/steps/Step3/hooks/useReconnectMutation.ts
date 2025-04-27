import { GetUsersResponse } from "@/app/api/db/users/route";
import dbAPIService, {
  CodewarsReconnectRequest,
  ConnectToCodewarsResponse,
} from "@/app/api/services/db";
import { usersQueryKeys } from "@/app/context/providers/ReactQuery/queryKeys";
import { CodeChallengesFilter } from "@/types/diamonds";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const { reconnectToCodewars } = new dbAPIService();

interface ReconnectToCodewarsContext {
  prevData: GetUsersResponse | undefined;
}

const useReconnectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ConnectToCodewarsResponse,
    Error,
    CodewarsReconnectRequest,
    ReconnectToCodewarsContext
  >({
    mutationFn: async (payload: CodewarsReconnectRequest) => {
      return await reconnectToCodewars(payload);
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: usersQueryKeys.allUsers });

      const prevData = queryClient.getQueryData<GetUsersResponse>(
        usersQueryKeys.allUsers
      );

      queryClient.setQueryData<GetUsersResponse>(
        usersQueryKeys.allUsers,
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            list: oldData.list.map((oldUser) =>
              oldUser.email === payload.email
                ? {
                    ...oldUser,
                    name: payload.name,
                    diamonds: {
                      ...oldUser.diamonds,
                      codewars: [],
                      totals: {
                        ...oldUser.diamonds.totals,
                        codewars: {
                          ...oldUser.diamonds.totals.codewars,
                          ranks: {
                            ...oldUser.diamonds.totals.codewars.ranks,
                            1: 0,
                            2: 0,
                            3: 0,
                            4: 0,
                            5: 0,
                            6: 0,
                            7: 0,
                          },
                          total: 0,
                        },
                        missions: 0,
                        total: 0,
                      },
                    },
                    codewars: {
                      ...oldUser.codewars,
                      isConnected: true,
                      clan: payload.clan,
                      username: payload.username,
                      codeChallenges: {
                        ...oldUser.codewars.codeChallenges,
                        challengeFilter: CodeChallengesFilter.ClaimedDiamonds,
                        list: [],
                      },
                    },
                  }
                : oldUser
            ),
          };
        }
      );

      return { prevData };
    },
    onError: (_error, _payload, context) => {
      if (context?.prevData) {
        queryClient.setQueryData(usersQueryKeys.allUsers, context.prevData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersQueryKeys.allUsers });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: usersQueryKeys.allUsers });
    },
  });
};

export default useReconnectMutation;
