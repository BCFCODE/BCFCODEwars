import { CollectButtonDispatch } from "../hooks/useCollectButtonState";
import { UseCollectDiamondsContext } from "../hooks/useCollectDiamondsContext";
import { UseUserCodewarsChallenges } from "../hooks/useUserCodewarsChallenges";
import { CollectDiamondsState } from "../reducers/collectButtonReducer";
import useChallengesListEffect from "./useChallengesListEffect";
import useCollectedDiamondsEffect from "./useCollectedDiamondsEffect";
import useCounterEffect from "./useCounterEffect";

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
    currentUserDispatch,
  });

  useCollectedDiamondsEffect({
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
