import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { useRef } from "react";
import useCollectedDiamonds from "../effects/useCollectedDiamonds";
import useCompletedChallenges from "../effects/useCompletedChallenges";
import useCounter from "../effects/useCounter";
import useCollectButtonReducer from "./useCollectButtonReducer";
import useCollectDiamondsContext from "./useCollectDiamondsContext";

export default function useCollectDiamonds() {
  const { completedChallenges } = useCodewarsContext();
  const completedChallengesRef =
    useRef<CodewarsCompletedChallenge[]>(completedChallenges);

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
  };
}
