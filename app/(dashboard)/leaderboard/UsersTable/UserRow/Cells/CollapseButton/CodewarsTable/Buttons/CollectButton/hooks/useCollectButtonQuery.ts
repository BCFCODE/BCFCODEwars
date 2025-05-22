import CodewarsAPIService from "@/app/api/services/codewars";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const { getSingleChallenge } = new CodewarsAPIService();

const useCollectButtonQuery = () => {
  const { currentUser } = useCurrentUserContext();
  return useQuery({
    queryKey: [],
    queryFn: async () => {
      const response = await getSingleChallenge(
        currentUser.codewars.username,
        currentChallenge.id
      );
    },
  });
};

export default useCollectButtonQuery;
