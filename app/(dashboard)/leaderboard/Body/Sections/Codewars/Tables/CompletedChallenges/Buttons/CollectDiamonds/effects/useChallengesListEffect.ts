import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
import { CodewarsAction } from "@/app/context/reducers/codewarsReducer";
import { CurrentUserAction } from "@/app/context/reducers/currentUserReducer";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { CurrentUser } from "@/types/users";
import { Dispatch, RefObject, useEffect, useRef } from "react";

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
export default function useChallengesListEffect({
  collectedDiamondsCount = 0,
  codewarsContextDispatch,
  completedChallengesRef,
  currentUser,
  currentUserDispatch,
  success,
  isDiamondIconButtonDisabled,
  isCollected,
}: Props) {
  const { selectedChallenge } = useCodewarsContext();
  const isListUpdatedRef = useRef(false);

  useEffect(() => {
    if (success && !isDiamondIconButtonDisabled) {
      const list = currentUser.codewars.codeChallenges.list.map((challenge) =>
        challenge.id === selectedChallenge?.id ? selectedChallenge : challenge
      );

      if (!isListUpdatedRef.current) {
        console.log(
          "This is where you must save diamonds count and update (sync) list in one go",
          list, selectedChallenge
        ); // I want a method that show this console.log only one time
        isListUpdatedRef.current = true;
      }

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
