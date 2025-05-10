"use client";

import CodewarsAPIService from "@/app/api/services/codewars";
import useCurrentUserQuery from "@/app/context/hooks/ReactQuery/useCurrentUserQuery";
import codewarsQueryKeys from "@/app/context/providers/ReactQuery/queryKeys/codewars";
import { useUsersStore } from "@/app/context/store/users";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import usePaginationStore from "./usePaginationStore";

const { getCompletedChallenges } = new CodewarsAPIService();

const usePaginationQuery = () => {
  const {
    user: { selectedUser },
  } = useUsersStore((state) => state);
  const {
    pagination: { page, rowsPerPage, apiPageNumber },
  } = usePaginationStore((state) => state);
  const { data } = useCurrentUserQuery();
  const { data: session, status } = useSession();

  const list = data?.codewars.codeChallenges.list;

  const username = selectedUser?.codewars.username ?? "";

  return useQuery({
    queryKey: [codewarsQueryKeys.codewars, apiPageNumber],
    queryFn: async () => {
      // await getCompletedChallenges({ apiPageNumber, username });
      console.log("useQuery/pagination", page, rowsPerPage);
      // if (!success || !list || error) {
      //   throw new Error("Failed to users data in usePaginationQuery");
      // }

      return { list };
    },
    staleTime: 1000 * 60 * 10, // 10m
    retry: 1,
  });
};

export default usePaginationQuery;
