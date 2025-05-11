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
    /* 
      ✅ Always enabled — this hook needs to fetch and render leaderboard data 
      even when the user is not authenticated (e.g., on the sign-in page). 
      ❗Important: We intentionally do NOT depend on session loading status here.
      Waiting for `status === "authenticated"` would block the initial render 
      and skip hydration from server-prefetched data when there's no active session.
      
      This ensures:
      - The leaderboard loads for both guests and logged-in users.
      - The server-prefetched cache (via HydrationBoundary) is used immediately.
      - No extra suspense boundaries or conditional hooks are needed.
      
      If authentication is required for the request, the API layer (`getUsers`) 
      should handle that gracefully (e.g., by returning filtered data or 401).
    */
    staleTime: 1000 * 60 * 60 * 24, // 24h
    retry: 1,
  });
};

export default usePaginationQuery;
