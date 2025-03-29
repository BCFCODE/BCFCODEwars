import CodewarsAPIService from "@/app/api/services/codewars";
import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import extractListDiff from "../utils/extractListDiff";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { useRef } from "react";
import { applyRewardStatusToAll } from "../utils/applyRewardStatus";

const { getCompletedChallenges } = new CodewarsAPIService();

const useUpdateListDiff = () => {
  const { currentUser, isCollapsed } = useCurrentUserContext();
  const { pageNumber } = useCodewarsContext();
  // const untrackedChallengesRef = useRef<CodewarsCompletedChallenge[]>(null);

  const diffAndUpdateList = async () => {
    if (!isCollapsed) {
      try {
        const response = await getCompletedChallenges(
          currentUser.codewars.username,
          pageNumber
        );
        if ("data" in response) {
          const previousChallenges = currentUser.codewars.codeChallenges.list;
          const { data: fetchedChallenges } = response.data;

          const untrackedChallenges = extractListDiff({
            previousChallenges,
            fetchedChallenges,
          });

          console.log(
            "applyRewardStatusToAll(untrackedChallenges)",
            applyRewardStatusToAll(untrackedChallenges)
          );
        }
      } catch (error) {
        // TODO
      }
    }
  };

  return { diffAndUpdateList };
};

export default useUpdateListDiff;
