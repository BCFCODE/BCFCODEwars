import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import useCurrentUserDispatchContext from "@/app/context/hooks/db/useCurrentUserDispatchContext";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import saveChallengeListToDB from "../../utils/saveChallengeListToDB";
import { applyRewardStatusToAll } from "../utils/applyRewardStatus";

const useListInitializer = () => {
  const { currentUser } = useCurrentUserContext();
  const currentUserDispatch = useCurrentUserDispatchContext();
  const isListEmpty = !currentUser.codewars?.codeChallenges.list.length;

  const initializeCodeChallengesList = (
    challenges: CodewarsCompletedChallenge[]
  ) => {
    const list = applyRewardStatusToAll(challenges);

    currentUserDispatch({
      type: "UPDATE_CODE_CHALLENGES_LIST",
      list,
    });

    saveChallengeListToDB({ list, currentUser });
  };
  return { initializeCodeChallengesList, isListEmpty };
};

export default useListInitializer;
