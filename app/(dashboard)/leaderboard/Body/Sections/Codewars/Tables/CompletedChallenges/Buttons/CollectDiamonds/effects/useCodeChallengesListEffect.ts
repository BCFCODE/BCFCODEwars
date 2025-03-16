import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
import useDiamondsContext from "@/app/context/hooks/diamonds/useDiamondsContext";
import { CodewarsAction } from "@/app/context/reducers/codewars/types";
import { CurrentUserAction } from "@/app/context/reducers/users/currentUser/types";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { CurrentUser } from "@/types/db/users";
import { Dispatch, RefObject, useEffect } from "react";
import useCollectButtonReducer from "../hooks/useCollectButtonReducer";
import updateListAndSum from "../db/updateListAndSum";
import DiamondsService from "@/app/services/diamonds-service";

// const { calculateCodewarsDiamondsCount } = new DiamondsService();

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
      // currentUserDispatch({type: "UPDATE_CODEWARS_DIAMONDS_SUM", reward: })
      console.log(
        "useCodeChallengesListEffect > currentUser.diamonds.sum.codewars",
        currentUser.diamonds.sum.codewars
      );
      updateListAndSum({ currentUser, list });
    }
  }, [success, isDiamondIconButtonDisabled]);
}
