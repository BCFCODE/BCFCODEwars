import useCollectedDiamonds from "../effects/useCollectedDiamonds";
import useCompletedChallenges from "../effects/useCompletedChallenges";
import useCounter from "../effects/useCounter";
import useCollectButtonReducer from "./useCollectButtonReducer";
import useCollectDiamondsContext from "./useCollectDiamondsContext";
import useMixedDBchallenges from "./CodewarsChallenges/useMixedDBchallenges";

export default function useCollectDiamonds() {
  const { completedChallenges, completedChallengesRef, currentUser } =
    useMixedDBchallenges();

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
    },
    collectButtonDispatch,
  } = useCollectButtonReducer();

  useCounter({
    collectButtonDispatch,
    collectedDiamondsCount,
    counter,
    isCollected,
    isError,
    isLoading,
  });

  useCollectedDiamonds({
    collectButtonDispatch,
    collectedDiamondsCount,
    diamondsContextDispatch,
    isCollected,
  });

  useCompletedChallenges({
    codewarsContextDispatch,
    isDiamondIconButtonDisabled,
    completedChallengesRef,
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
  };
}
