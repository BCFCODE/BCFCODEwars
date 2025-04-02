import React from "react";
import { CollectDiamondsState } from "../reducers/collectButtonReducer";
import useCounterEffect from "./useCounterEffect";
import useCollectedDiamondsEffect from "./useCollectedDiamondsEffect";
import useChallengesListEffect from "./useChallengesListEffect";
import { CollectButtonDispatch } from "../hooks/useCollectButtonState";
import { UseUserCodewarsChallenges } from "../hooks/useUserCodewarsChallenges";
import { UseCollectDiamondsContext } from "../hooks/useCollectDiamondsContext";

interface Props
  extends Omit<CollectDiamondsState, "isLoading">,
    Omit<UseUserCodewarsChallenges, "completedChallenges" | "currentUser">,
    Omit<UseCollectDiamondsContext, "codewarsContextDispatch"> {
  collectButtonDispatch: CollectButtonDispatch;
}

const useCollectEffects = ({
  counter,
  isCollected,
  isError,
  success,
  collectedDiamondsCount,
  collectButtonDispatch,
  allUsersDispatch,
  currentUserDispatch,
  diamondsContextDispatch,
  isDiamondIconButtonDisabled,
}: Props) => {
  useCounterEffect({
    collectButtonDispatch,
    collectedDiamondsCount,
    counter,
    isError,
    success,
  });

  useCollectedDiamondsEffect({
    allUsersDispatch,
    currentUserDispatch,
    diamondsContextDispatch,
    collectButtonDispatch,
    collectedDiamondsCount,
    isCollected,
  });

  useChallengesListEffect({
    isDiamondIconButtonDisabled,
    collectedDiamondsCount,
    success,
  });
  return;
};

export default useCollectEffects;
