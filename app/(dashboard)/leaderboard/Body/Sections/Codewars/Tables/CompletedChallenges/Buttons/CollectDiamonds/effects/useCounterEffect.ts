import { Dispatch, useEffect, useRef, useState } from "react";
import { CollectButtonAction } from "../reducers/collectButtonReducer";

interface Props {
  // isLoading: boolean;
  counter: number;
  isError: boolean;
  // isCollected: boolean;
  success: boolean;
  collectedDiamondsCount: number | undefined;
  collectButtonDispatch: Dispatch<CollectButtonAction>;
}

export default function useCounterEffect({
  collectButtonDispatch,
  collectedDiamondsCount,
  counter,
  // isCollected,
  isError,
  // isLoading,
  success,
}: Props) {
  const [isCounting, setIsCounting] = useState(true);
  const timeRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isCounting) return;
    if (success) {
      timeRef.current = setTimeout(() => {
        collectButtonDispatch({ type: "DIAMOND_COUNTS", counter: counter + 1 });
      }, 50);
    }

    if (counter === collectedDiamondsCount) {
      collectButtonDispatch({ type: "LOADING...", isLoading: false });
      collectButtonDispatch({ type: "DIAMONDS_COLLECTED" });
      setIsCounting(false);
    }

    return () => {
      timeRef.current && clearTimeout(timeRef.current);
    };
  }, [isError, counter, success, isCounting, collectedDiamondsCount]);

  // console.log(Math.random(), "<<<<<<<<<<<<<", isCounting);
}
