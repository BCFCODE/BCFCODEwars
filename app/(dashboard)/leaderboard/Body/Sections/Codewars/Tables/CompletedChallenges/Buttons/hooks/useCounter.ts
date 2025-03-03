import { Dispatch, useEffect, useRef } from "react";
import { CollectDiamondsAction } from "../collectButtonReducer";

interface Props {
  isLoading: boolean;
  counter: number;
  isError: boolean;
  isCollected: boolean;
  collectedDiamondsCount: number | undefined;
  collectButtonDispatch: Dispatch<CollectDiamondsAction>;
}

export default function useCounter({
  collectButtonDispatch,
  collectedDiamondsCount,
  counter,
  isCollected,
  isError,
  isLoading,
}: Props) {
  const timeRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isLoading && !isCollected) {
      timeRef.current = setTimeout(() => {
        collectButtonDispatch({ type: "DIAMOND_COUNTS", counter: counter + 1 });
      }, 50);
    }

    if (counter > (collectedDiamondsCount ?? 500)) {
      collectButtonDispatch({ type: "LOADING...", isLoading: false });
      collectButtonDispatch({ type: "DIAMONDS_COLLECTED" });
    }

    return () => {
      timeRef.current && clearTimeout(timeRef.current);
    };
  }, [isError, isLoading, isCollected, counter]);
}
