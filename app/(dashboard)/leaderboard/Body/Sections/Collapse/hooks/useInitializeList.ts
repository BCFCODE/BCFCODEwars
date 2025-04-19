import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import useCurrentUserDispatchContext from "@/app/context/hooks/db/useCurrentUserDispatchContext";
import { CodewarsChallengesResponse } from "@/types/codewars";
import { applyDefaultTrackingAndRewardStatusToAll } from "../utils/applyRewardStatus";
import storeChallengeList from "../utils/storeChallengeList";

const useInitializeList = () => {
  const { currentUser } = useCurrentUserContext();
  const currentUserDispatch = useCurrentUserDispatchContext();
  const isListEmpty = !currentUser.codewars?.codeChallenges?.list.length;

  const initializeCodeChallengesList = (
    response: CodewarsChallengesResponse
  ) => {
    const list = applyDefaultTrackingAndRewardStatusToAll(response.data);
    // const list = response.data

    currentUserDispatch({
      type: "UPDATE_CODE_CHALLENGES_LIST",
      list,
    });

    storeChallengeList({ list, currentUser });
  };
  return { initializeCodeChallengesList, isListEmpty };
};

export default useInitializeList;
