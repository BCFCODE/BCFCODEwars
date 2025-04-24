"use client";

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

  return useQuery<{ allUsers: AuthenticatedUser[] }>({
    queryKey: shouldRefetch ? ["allUsers", "leaderboard"] : ["allUsers"],
    queryFn: async () => {
      const { success, data } = await getUsers({ cache: "no-store" });

      if (!success || !data?.list) {
        throw new Error("Failed to fetch allUsers in useUsersQuery");
      }

      const allUsers = data.list.map((user) =>
        user.email === session?.user?.email ? { ...user, session } : user
      ) as AuthenticatedUser[];

      return { allUsers };
    },
    enabled: !!session?.user?.email, // Avoid calling if session isn't ready
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });
};

export default useUsersQuery;
