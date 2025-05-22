import CodewarsAPIService from "@/app/api/services/codewars";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import diamondsQueryKeys from "@/app/context/providers/ReactQuery/queryKeys/diamonds";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const { getSingleChallenge } = new CodewarsAPIService();

const useCollectButtonQuery = (
  currentChallenge: CodewarsCompletedChallenge
) => {
  const { currentUser } = useCurrentUserContext();
  return useQuery({
    queryKey: [diamondsQueryKeys.diamonds, diamondsQueryKeys.diamonds],
    queryFn: async () => {
      const response = await getSingleChallenge(
        currentUser.codewars.username,
        currentChallenge.id
      );
    },
  });
};

export default useCollectButtonQuery;
