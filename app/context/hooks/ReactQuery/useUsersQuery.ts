"use client";

import { GetUsersResponse } from "@/app/api/db/users/route";
import dbAPIService from "@/app/api/services/db";
import { AuthenticatedUser } from "@/types/users";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const { getUsers } = new dbAPIService();

const useUsersQuery = () => {
  const { data: session } = useSession();
  const pathName = usePathname();

  const shouldRefetch = pathName === "/leaderboard";

  return useQuery<GetUsersResponse>({
    queryKey: shouldRefetch ? ["allUsers", "leaderboard"] : ["allUsers"],
    queryFn: async () => {
      const { success, list, error } = await getUsers({
        cache: "no-store",
      });

      if (!success || !list || error) {
        throw new Error("Failed to users data in useUsersQuery");
      }

      const updatedList = list.map((user) =>
        user.email === session?.user?.email ? { ...user, session } : user
      ) as AuthenticatedUser[];

      return { list: updatedList, session, error, success };
    },
    enabled: !!session?.user?.email, // Avoid calling if session isn't ready
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
    retry: 1,
  });
};

export default useUsersQuery;
