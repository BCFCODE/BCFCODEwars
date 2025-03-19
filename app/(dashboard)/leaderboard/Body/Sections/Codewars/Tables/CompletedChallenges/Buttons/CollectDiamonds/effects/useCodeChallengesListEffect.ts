import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
import useDiamondsContext from "@/app/context/hooks/diamonds/useDiamondsContext";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { CurrentUser } from "@/types/db/users";
import { Dispatch, RefObject, useEffect } from "react";
import useCollectButtonReducer from "../hooks/useCollectButtonReducer";
import updateListAndSum from "../db/updateListAndSum";
import DiamondsService from "@/app/services/diamonds-service";
import { CurrentUserAction } from "@/app/context/reducers/currentUserReducer";
import { CodewarsAction } from "@/app/context/reducers/codewarsReducer";
import useAllUsersContext from "@/app/context/hooks/db/useAllUsersContext";

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
  const { allUsers } = useAllUsersContext();

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

      updateListAndSum({ currentUser, list });
    }
  }, [success, isDiamondIconButtonDisabled]);

  useEffect(() => {
    currentUserDispatch({
      type: "UPDATE_CODEWARS_DIAMONDS_SUM",
      reward: collectedDiamondsCount,
    });
  }, [success]);
}
