"use client";

import { GetUsersResponse } from "@/app/api/db/users/route";
import dbAPIService, { ConnectToCodewarsResponse } from "@/app/api/services/db";
import { usersQueryKeys } from "@/app/context/providers/ReactQuery/queryKeys";
import { CodewarsUser } from "@/types/codewars";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const { connectToCodewars } = new dbAPIService();

interface ConnectToCodewarsContext {
  prevData: GetUsersResponse | undefined;
}

const useCodewarsConnectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ConnectToCodewarsResponse,
    Error,
    CodewarsUser,
    ConnectToCodewarsContext
  >({
    mutationFn: async (initializedCodewarsUser: CodewarsUser) => {
      return await connectToCodewars(initializedCodewarsUser);
    },
    onMutate: async (newCodewarsUser) => {
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
              oldUser.email === newCodewarsUser.email
                ? {
                    ...oldUser,
                    codewars: {
                      ...oldUser.codewars,
                      ...newCodewarsUser,
                    },
                  }
                : oldUser
            ),
          };
        }
      );

      return { prevData };
    },
    onError: (_error, _newCodewarsUser, context) => {
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

export default useCodewarsConnectMutation;
