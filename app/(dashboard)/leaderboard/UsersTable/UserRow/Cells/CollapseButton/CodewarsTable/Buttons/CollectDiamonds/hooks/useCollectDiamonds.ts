import useCodewarsDispatchContext from "@/app/context/hooks/codewars/useCodewarsDispatchContext";
import useCollectEffects from "../effects";
import { CollectDiamondsState } from "../reducers/collectButtonReducer";
import useCollectButtonState, {
  CollectButtonDispatch,
} from "./useCollectButtonState";

import useUserCodewarsChallenges from "./useUserCodewarsChallenges";

export interface UseCollectDiamonds extends CollectDiamondsState {
  collectButtonDispatch: CollectButtonDispatch;
}

export default function useCollectDiamonds(): UseCollectDiamonds {
  // Extract data from contexts
  const { currentUserDispatch } = useUserCodewarsChallenges();

  // const codewarsContextDispatch = useCodewarsDispatchContext();

  // Collect Button State
  const { collectState, collectButtonDispatch } = useCollectButtonState();

  const {
    counter,
    isCollected,
    isError,
    isLoading,
    success,
    collectedDiamondsCount,
  } = collectState;

  // Run Effects
  useCollectEffects({
    counter,
    isCollected,
    isError,
    success,
    collectedDiamondsCount,
    collectButtonDispatch,
    currentUserDispatch,
  });

  return {
    isLoading,
    counter,
    collectedDiamondsCount,
    isCollected,
    isError,
    success,
    collectButtonDispatch,
  };
}
