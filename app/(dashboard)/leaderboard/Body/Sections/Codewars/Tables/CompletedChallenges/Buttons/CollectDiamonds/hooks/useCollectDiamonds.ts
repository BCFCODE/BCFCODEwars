import useCollectedDiamondsEffect from "../effects/useCollectedDiamondsEffect";

import useCounterEffect from "../effects/useCounterEffect";
import useClaimedChallenge from "./useClaimedChallenge";
import useCollectButtonReducer from "./useCollectButtonReducer";
import useCollectDiamondsContext from "./useCollectDiamondsContext";
import useCodeChallengesListEffect from "../effects/useCodeChallengesListEffect";
import useCurrentUserDispatchContext from "@/app/context/hooks/db/useDBCurrentUserDispatchContext";

export default function useCollectDiamonds() {
  const {
    completedChallenges,
    completedChallengesRef,
    currentUser,
    currentUserDispatch,
  } = useClaimedChallenge();

  const {
    codewarsContextDispatch,
    diamondsContextDispatch,
    isDiamondIconButtonDisabled,
  } = useCollectDiamondsContext();

  const {
    collectButtonState: {
      isLoading,
      counter,
      isError,
      isCollected,
      collectedDiamondsCount,
      success,
    },
    collectButtonDispatch,
  } = useCollectButtonReducer();

  useCounterEffect({
    collectButtonDispatch,
    collectedDiamondsCount,
    counter,
    // isCollected,
    isError,
    // isLoading,
    success,
  });

  useCollectedDiamondsEffect({
    currentUserDispatch,
    collectButtonDispatch,
    collectedDiamondsCount,
    diamondsContextDispatch,
    isCollected,
  });

  useCodeChallengesListEffect({
    codewarsContextDispatch,
    isDiamondIconButtonDisabled,
    completedChallengesRef,
    currentUser,
    currentUserDispatch,
    success,
    isCollected
  });

  return {
    isLoading,
    counter,
    collectedDiamondsCount,
    isCollected,
    isDiamondIconButtonDisabled,
    codewarsContextDispatch,
    collectButtonDispatch,
    completedChallengesRef,
    diamondsContextDispatch,
    isError,
    currentUser,
    completedChallenges,
    currentUserDispatch,
    success,
  };
}
