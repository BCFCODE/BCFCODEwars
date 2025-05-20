import { GetUsersResponse } from "@/app/api/db/users/route";
import DatabaseAPIService, {
  CodewarsReconnectRequest,
  ConnectToCodewarsResponse,
} from "@/app/api/services/db";
import usersQueryKeys from "@/app/context/providers/ReactQuery/queryKeys/users";
import { CodeChallengesFilter } from "@/types/diamonds";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const { reconnectToCodewars } = new DatabaseAPIService();

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
      await queryClient.cancelQueries({ queryKey: [usersQueryKeys.usersList] });

      const prevData = queryClient.getQueryData<GetUsersResponse>([
        usersQueryKeys.usersList,
      ]);

      queryClient.setQueryData<GetUsersResponse>(
        [usersQueryKeys.usersList],
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
                        challengeFilter: CodeChallengesFilter.Both,
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
        queryClient.setQueryData([usersQueryKeys.usersList], context.prevData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [usersQueryKeys.usersList] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [usersQueryKeys.usersList] });
    },
  });
};

export default useReconnectMutation;
