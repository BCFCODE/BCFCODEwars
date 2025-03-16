import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
import useDiamondsContext from "@/app/context/hooks/diamonds/useDiamondsContext";
import { CodewarsAction } from "@/app/context/reducers/codewars/types";
import { CurrentUserAction } from "@/app/context/reducers/users/currentUser/types";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { CurrentUser } from "@/types/db/users";
import { Dispatch, RefObject, useEffect } from "react";
import useCollectButtonReducer from "../hooks/useCollectButtonReducer";
import saveChallengeListToDB from "../utils/saveChallengeListToDB";

interface Props {
  success: boolean;
  currentUser: CurrentUser;
  currentUserDispatch: Dispatch<CurrentUserAction>;
  isDiamondIconButtonDisabled: boolean;
  isCollected: boolean;
  codewarsContextDispatch: Dispatch<CodewarsAction>;
  completedChallengesRef: RefObject<CodewarsCompletedChallenge[] | undefined>;
}
export default function useCodeChallengesListEffect({
  codewarsContextDispatch,
  completedChallengesRef,
  currentUser,
  currentUserDispatch,
  success,
  isDiamondIconButtonDisabled,
  isCollected,
}: Props) {
  // const {collectButtonState: {isCollected, success}} = useCollectButtonReducer()
  const { selectedChallenge } = useCodewarsContext();

  useEffect(() => {
    if (success && !isDiamondIconButtonDisabled) {
      const list = currentUser.codewars.codeChallenges.list.map((challenge) =>
        challenge.id === selectedChallenge?.id ? selectedChallenge : challenge
      );
      console.log(
        "list in useCodeChallengesListEffect",
        list,
        selectedChallenge
      );
      currentUserDispatch({
        type: "UPDATE_CODE_CHALLENGES_LIST",
        list,
      });

      saveChallengeListToDB({ currentUser, list });
    }
  }, [success, isDiamondIconButtonDisabled]);
}
