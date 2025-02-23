import { useReducer } from "react";
import collectButtonReducer, {
  CollectDiamondsState,
} from "../collectButtonReducer";

export const initialCollectDiamondsState: CollectDiamondsState = {
  isLoading: false,
  isError: false,
  isCollected: false,
  counter: 0,
};

export default function useCollectButtonReducer() {
  const [collectButtonState, collectButtonDispatch] = useReducer(
    collectButtonReducer,
    initialCollectDiamondsState
  );
  return { collectButtonState, collectButtonDispatch };
}
