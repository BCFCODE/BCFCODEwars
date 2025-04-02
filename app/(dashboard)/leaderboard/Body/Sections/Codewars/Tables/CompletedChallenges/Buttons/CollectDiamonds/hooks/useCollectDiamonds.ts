import { AuthenticatedUser } from "@/types/users";
import useCollectEffects from "../effects";
import { CollectDiamondsState } from "../reducers/collectButtonReducer";
import useCollectButtonState, {
  CollectButtonDispatch
} from "./useCollectButtonState";
import useCollectDiamondsContext, {
  UseCollectDiamondsContext,
} from "./useCollectDiamondsContext";
import useUserCodewarsChallenges from "./useUserCodewarsChallenges";

export interface UseCollectDiamonds
  extends CollectDiamondsState,
    UseCollectDiamondsContext {
  collectButtonDispatch: CollectButtonDispatch;
  currentUser: AuthenticatedUser;
}

export default function useCollectDiamonds(): UseCollectDiamonds {
  // Extract data from contexts
  const { allUsersDispatch, currentUser, currentUserDispatch } =
    useUserCodewarsChallenges();

  // Collect Button State
  const {
    codewarsContextDispatch,
    diamondsContextDispatch,
    isDiamondIconButtonDisabled,
  } = useCollectDiamondsContext();

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
    allUsersDispatch,
    currentUserDispatch,
    diamondsContextDispatch,
    isDiamondIconButtonDisabled,
  });

  return {
    isLoading,
    counter,
    collectedDiamondsCount,
    isCollected,
    isDiamondIconButtonDisabled,
    codewarsContextDispatch,
    diamondsContextDispatch,
    isError,
    success,
    collectButtonDispatch,
    currentUser,
  };
}
