"use client";

import dbAPIService from "@/app/api/services/db";
import { AuthenticatedUser } from "@/types/users";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const { getUsers } = new dbAPIService();

const useUsersQuery = () => {
  const { data: session } = useSession();

  return useQuery<AuthenticatedUser[]>({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const response = await getUsers({ cache: "no-store" });

      if (!response.success || !response.users) {
        throw new Error("Failed to fetch allUsers in useUsersQuery");
      }

      return response.users.map((user) =>
        user.email === session?.user?.email ? { ...user, session } : user
      ) as AuthenticatedUser[];
    },
    enabled: !!session?.user?.email, // Avoid calling if session isn't ready
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });
};

export default useUsersQuery;
