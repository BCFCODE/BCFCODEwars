"use client";

import DatabaseAPIService from "@/app/api/services/db";
import usersQueryKeys from "@/ReactQuery/queryKeys/users";
import { AuthenticatedUser } from "@/types/users";
import { useQuery } from "@tanstack/react-query";

const { getCurrentUser } = new DatabaseAPIService();

const useCurrentUserQuery = (email: string) => {
  return useQuery<AuthenticatedUser>({
    queryKey: [usersQueryKeys.currentUser, email],
    queryFn: async () => {
      const { currentUser, success, error } = await getCurrentUser(email, {
        cache: "no-store",
      });

      if (!success || !currentUser || error) {
        throw new Error("Failed to fetch and aggregate currentUser.");
      }

      return { ...currentUser };
    },
    enabled: !!email, // Avoid calling if email isn't ready
    // staleTime: 1000 * 60 * 5, // cache for 5 minutes
    staleTime: 0, // cache for 5 minutes
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    
  });
  
};

export default useCurrentUserQuery;
