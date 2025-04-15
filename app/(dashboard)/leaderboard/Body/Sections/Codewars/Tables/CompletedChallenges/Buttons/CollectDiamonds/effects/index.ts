import { CollectButtonDispatch } from "../hooks/useCollectButtonState";
import { UseCollectDiamondsContext } from "../hooks/useCollectDiamondsContext";
import { CollectDiamondsState } from "../reducers/collectButtonReducer";
import useChallengesListEffect from "./useChallengesListEffect";
import useCollectedDiamondsEffect from "./useCollectedDiamondsEffect";
import useCounterEffect from "./useCounterEffect";

interface Props
  extends Omit<CollectDiamondsState, "isLoading">,
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
