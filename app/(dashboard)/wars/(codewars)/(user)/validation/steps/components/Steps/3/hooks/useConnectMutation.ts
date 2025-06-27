"use client";

import { GetUsersResponse } from "@/app/api/db/users/route";
import DatabaseAPIService, {
  ConnectToCodewarsResponse,
} from "@/app/api/services/db";
import usersQueryKeys from "@/ReactQuery/queryKeys/users";
import { CodewarsUser } from "@/types/codewars";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const { connectToCodewars } = new DatabaseAPIService();

interface ConnectToCodewarsContext {
  prevData: GetUsersResponse | undefined;
}

const useConnectMutation = () => {
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
        queryClient.setQueryData([usersQueryKeys.usersList], context.prevData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [usersQueryKeys.usersList] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [usersQueryKeys.usersList] });
    },
    retry: 3,
  });
};

export default useConnectMutation;
