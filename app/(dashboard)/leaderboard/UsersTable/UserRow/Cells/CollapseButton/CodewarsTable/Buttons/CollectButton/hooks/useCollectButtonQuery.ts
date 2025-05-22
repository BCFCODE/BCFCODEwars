import CodewarsAPIService from "@/app/api/services/codewars";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { useQuery } from "@tanstack/react-query";
import { getQueryKey } from "../utils";
import { useCollectButtonStore } from "../../store/collectButton";

const { getSingleChallenge } = new CodewarsAPIService();

const useCollectButtonQuery = (
  currentChallenge: CodewarsCompletedChallenge
) => {
  const { currentUser } = useCurrentUserContext();
  const isClicked = useCollectButtonStore((state) => state.button.isClicked);

  const queryKey = getQueryKey({ currentUser, currentChallenge });

  return useQuery({
    queryKey,
    queryFn: async () => {
      const { success, data, error } = await getSingleChallenge(
        currentUser.codewars.username,
        currentChallenge.id
      );

      if (!success || error)
        throw new Error("Failed to fetch single challenge.");

      return data;
    },
    enabled: isClicked,
  });
};

export default useCollectButtonQuery;
