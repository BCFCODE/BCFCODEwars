import CodewarsAPIService from "@/app/api/services/codewars";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { useQuery } from "@tanstack/react-query";
import { getQueryKey } from "../utils";

const { getSingleChallenge } = new CodewarsAPIService();

const useCollectButtonQuery = (
  currentChallenge: CodewarsCompletedChallenge
) => {
  const { currentUser } = useCurrentUserContext();

  const queryKey = getQueryKey({ currentUser, currentChallenge });

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await getSingleChallenge(
        currentUser.codewars.username,
        currentChallenge.id
      );
    },
  });
};

export default useCollectButtonQuery;
