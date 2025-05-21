import { Dispatch, useReducer } from "react";
import collectButtonReducer, {
  CollectButtonAction,
  CollectDiamondsState,
  initialCollectDiamondsState,
} from "../reducers/collectButtonReducer";

// Alias for cleaner type usage
export type CollectState = CollectDiamondsState;

export type CollectButtonDispatch = Dispatch<CollectButtonAction>;

export interface UseCollectButtonState {
  collectState: CollectState;
  collectButtonDispatch: CollectButtonDispatch;
}

export default function useCollectButtonState(): UseCollectButtonState {
  const [collectState, collectButtonDispatch] = useReducer(
    collectButtonReducer,
    initialCollectDiamondsState
  );
  return { collectState, collectButtonDispatch };
}
