import { Dispatch, useEffect, useRef } from "react";
import { CollectButtonAction } from "../reducers/collectButtonReducer";

interface Props {
  isLoading: boolean;
  counter: number;
  isError: boolean;
  isCollected: boolean;
  success: boolean;
  collectedDiamondsCount: number | undefined;
  collectButtonDispatch: Dispatch<CollectButtonAction>;
}

export default function useCounter({
  collectButtonDispatch,
  collectedDiamondsCount,
  counter,
  isCollected,
  isError,
  isLoading,
  success,
}: Props) {
  const timeRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isLoading && !isCollected && success) {
      timeRef.current = setTimeout(() => {
        collectButtonDispatch({ type: "DIAMOND_COUNTS", counter: counter + 1 });
      }, 50);
    }
    console.log("isCollected", isCollected);

    if (counter > (collectedDiamondsCount ?? 500)) {
      collectButtonDispatch({ type: "LOADING...", isLoading: false });
      collectButtonDispatch({ type: "DIAMONDS_COLLECTED" });
    }

    return () => {
      timeRef.current && clearTimeout(timeRef.current);
    };
  }, [isError, isLoading, isCollected, counter, success]);
}
