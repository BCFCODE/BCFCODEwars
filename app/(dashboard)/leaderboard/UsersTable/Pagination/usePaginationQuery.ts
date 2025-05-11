"use client";

import { GetUsersResponse } from "@/app/api/db/users/route";
import dbAPIService from "@/app/api/services/db";
import usersQueryKeys from "@/app/context/providers/ReactQuery/queryKeys/users";
import { PaginationQuery } from "@/app/services/db";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import usePaginationStore from "./usePaginationStore";

const { getUsers } = new dbAPIService();

const usePaginationQuery = () => {
  const pagination = usePaginationStore((state) => state.pagination);
  const { data: session, status } = useSession();
  console.log(
    "usePaginationQuery/pagination",
    pagination.skip,
    pagination.limit
  );
  return useQuery<GetUsersResponse>({
    queryKey: [usersQueryKeys.allUsers, pagination.skip, pagination.limit],
    queryFn: async () => {
      const { success, list, error, totalUsers } = await getUsers(pagination);

      if (!success || !list || error) {
        throw new Error("Failed to users data in usePaginationQuery");
      }

      const updatedListWithAddedSessionToAuthenticatedUser = list.map((user) =>
        user.email === session?.user?.email ? { ...user, session } : user
      );

      return {
        list:
          status === "authenticated"
            ? updatedListWithAddedSessionToAuthenticatedUser
            : list,
        session,
        error,
        success,
        totalUsers,
      };
    },
    enabled: [pagination.skip, pagination.limit].every(
      (query) => typeof query === "number"
    ),
    staleTime: 1000 * 60 * 60 * 24, // 24h
    retry: 1,
  });
};

export default usePaginationQuery;
