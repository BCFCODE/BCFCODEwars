"use client";

import { GetUsersResponse } from "@/app/api/db/users/route";
import dbAPIService from "@/app/api/services/db";
import { PaginationQuery } from "@/app/services/db";
import { AuthenticatedUser } from "@/types/users";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { usersQueryKeys } from "../../providers/ReactQuery/queryKeys";

const { getUsers } = new dbAPIService();

const useUsersQuery = (paginationQuery: PaginationQuery) => {
  const { data: session, status } = useSession();

  return useQuery<GetUsersResponse>({
    queryKey: [usersQueryKeys.allUsers, paginationQuery],
    queryFn: async () => {
      const { success, list, error, totalUsers } = await getUsers(
        paginationQuery,
        {
          cache: "no-store",
        }
      );

      if (!success || !list || error) {
        throw new Error("Failed to users data in useUsersQuery");
      }

      const updatedList = list.map((user) =>
        user.email === session?.user?.email ? { ...user, session } : user
      ) as AuthenticatedUser[];

      return { list: updatedList, session, error, success, totalUsers };
    },
    enabled: status === "authenticated", // Avoid calling if session isn't ready
    staleTime: 1000 * 30, // cache for 30 seconds
    retry: 1,
  });
};

export default useUsersQuery;
