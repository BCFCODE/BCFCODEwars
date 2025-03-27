import useCollectedDiamondsEffect from "../effects/useCollectedDiamondsEffect";
import useChallengesListEffect from "../effects/useChallengesListEffect";
import useCounterEffect from "../effects/useCounterEffect";
import useClaimedChallenge from "./useClaimedChallenge";
import useCollectButtonReducer from "./useCollectButtonReducer";
import useCollectDiamondsContext from "./useCollectDiamondsContext";

export default function useCollectDiamonds() {
  const {
    completedChallenges,
    completedChallengesRef,
    currentUser,
    currentUserDispatch,
    allUsersDispatch,
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
    allUsersDispatch,
    currentUserDispatch,
    collectButtonDispatch,
    collectedDiamondsCount,
    diamondsContextDispatch,
    isCollected,
  });

  useChallengesListEffect({
    collectedDiamondsCount,
    isDiamondIconButtonDisabled,
    success,
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
    allUsersDispatch,
  };
}
