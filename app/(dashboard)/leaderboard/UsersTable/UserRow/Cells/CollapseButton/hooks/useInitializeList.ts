import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import useCurrentUserDispatchContext from "@/app/context/hooks/db/useCurrentUserDispatchContext";
import { applyDefaultTrackingAndRewardStatusToAll } from "../utils/applyRewardStatus";
import storeChallengeList from "../utils/storeChallengeList";
import { GetCompletedChallengesResponse } from "@/app/api/codewars/challenges/all/route";

const useInitializeList = () => {
  const { currentUser } = useCurrentUserContext();
  const currentUserDispatch = useCurrentUserDispatchContext();
  const isListEmpty = !currentUser.codewars?.codeChallenges?.list.length;

  const initializeCodeChallengesList = (
    response: GetCompletedChallengesResponse
  ) => {
    if (response.data) {
      const { data } = response.data;
      const list = applyDefaultTrackingAndRewardStatusToAll(data);

      currentUserDispatch({
        type: "UPDATE_CODE_CHALLENGES_LIST",
        list,
      });

      storeChallengeList({ list, currentUser });
    }
  };
  return { initializeCodeChallengesList, isListEmpty };
};

export default useInitializeList;
