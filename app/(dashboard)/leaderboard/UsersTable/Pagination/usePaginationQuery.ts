"use client";

import { GetUsersResponse } from "@/app/api/db/users/route";
import DatabaseAPIService from "@/app/api/services/db";
import usersQueryKeys from "@/ReactQuery/queryKeys/users";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import usePaginationStore from "./usePaginationStore";
import { Session } from "next-auth";

const { getUsers } = new DatabaseAPIService();

export interface GetUsersResponseWithSession extends GetUsersResponse {
  session?: Session | null;
}

const usePaginationQuery = () => {
  const pagination = usePaginationStore((state) => state.pagination);
  const { data: session, status } = useSession();
  // console.log(
  //   "usePaginationQuery/pagination",
  //   pagination.skip,
  //   pagination.limit
  // );
  return useQuery<GetUsersResponse, Error, GetUsersResponse>({
    queryKey: [usersQueryKeys.usersList, pagination.skip, pagination.limit],
    queryFn: async () => {
      const { success, list, error, totalUsers } = await getUsers(pagination);

      if (!success || !list || error) {
        throw new Error(
          `Failed to fetch users in usePaginationQuery: ${error}`
        );
      }

      const updatedListWithAddedSessionToAuthenticatedUser = list.map((user) =>
        user.email === session?.user?.email ? { ...user, session } : user
      );

      return {
        list:
          status === "authenticated"
            ? updatedListWithAddedSessionToAuthenticatedUser
            : list,
        // session,
        error,
        success,
        totalUsers,
      };
    },
    enabled: [pagination.skip, pagination.limit].every(
      (query) => typeof query === "number"
    ),
    staleTime: 10 * 60 * 1000,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    refetchOnMount: "always",
    retry: (failureCount, error) => {
      if (error.message.includes("Network")) return true;
      return false;
    },
  });
};

export default usePaginationQuery;
