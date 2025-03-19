import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
import useAllUsersContext from "@/app/context/hooks/db/useAllUsersContext";
import { CodewarsAction } from "@/app/context/reducers/codewarsReducer";
import { CurrentUserAction } from "@/app/context/reducers/currentUserReducer";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { CurrentUser } from "@/types/db/users";
import { Dispatch, RefObject, useEffect } from "react";

// const { calculateCodewarsDiamondsCount } = new DiamondsService();

interface Props {
  collectedDiamondsCount: number | undefined;
  success: boolean;
  currentUser: CurrentUser;
  currentUserDispatch: Dispatch<CurrentUserAction>;
  isDiamondIconButtonDisabled: boolean;
  isCollected: boolean;
  codewarsContextDispatch: Dispatch<CodewarsAction>;
  completedChallengesRef: RefObject<CodewarsCompletedChallenge[] | undefined>;
}
export default function useCodeChallengesListEffect({
  collectedDiamondsCount = 0,
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
    }
  }, [success, isDiamondIconButtonDisabled]);

  useEffect(() => {
    currentUserDispatch({
      type: "UPDATE_CODEWARS_DIAMONDS_SUM",
      reward: collectedDiamondsCount,
    });
  }, [success]);
}
