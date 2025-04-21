"use client";
import dbAPIService from "@/app/api/services/db";
import { AuthenticatedUser } from "@/types/users";
import { useQuery } from "@tanstack/react-query";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

const { getCurrentUser } = new dbAPIService();

const useCurrentUserQuery = () => {
  const session = useSession().data as Session;
  const email = session?.user?.email ?? "";

  return useQuery<AuthenticatedUser>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const { currentUser, success } = await getCurrentUser(email, {
        cache: "no-store",
      });

      if (!success || !currentUser) {
        throw new Error("Failed to fetch and aggregate currentUser.");
      }

      return { ...currentUser, session };
    },
    enabled: !!session?.user?.email, // Avoid calling if session isn't ready
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });
};

export default useCurrentUserQuery;
