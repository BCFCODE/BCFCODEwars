import { CollectButtonDispatch } from "../hooks/useCollectButtonState";
import { UseUserCodewarsChallenges } from "../hooks/useUserCodewarsChallenges";
import { CollectDiamondsState } from "../reducers/collectButtonReducer";
import useChallengesListEffect from "./useChallengesListEffect";
import useCollectedDiamondsEffect from "./useCollectedDiamondsEffect";
import useCounterEffect from "./useCounterEffect";

interface Props
  extends Omit<CollectDiamondsState, "isLoading">,
    Omit<UseUserCodewarsChallenges, "completedChallenges" | "currentUser"> {
  collectButtonDispatch: CollectButtonDispatch;
}

const useCollectEffects = ({
  counter,
  isCollected,
  isError,
  success,
  collectedDiamondsCount,
  collectButtonDispatch,
  currentUserDispatch,
}: Props) => {
  useCounterEffect({
    collectButtonDispatch,
    collectedDiamondsCount,
    counter,
    isError,
    success,
    currentUserDispatch,
  });

  useCollectedDiamondsEffect({
    currentUserDispatch,
    collectButtonDispatch,
    collectedDiamondsCount,
    isCollected,
  });

  useChallengesListEffect({
    collectedDiamondsCount,
    success,
  });
  return;
};

export default useCollectEffects;
