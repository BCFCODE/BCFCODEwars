import { useReducer } from "react";
import collectButtonReducer, {
  CollectDiamondsState,
} from "../reducers/collectButtonReducer";

export const initialCollectDiamondsState: CollectDiamondsState = {
  isLoading: false,
  isError: false,
  isCollected: false,
  counter: 0,
  success: false,
};

export default function useCollectButtonReducer() {
  const [collectButtonState, collectButtonDispatch] = useReducer(
    collectButtonReducer,
    initialCollectDiamondsState
  );
  return { collectButtonState, collectButtonDispatch };
}
