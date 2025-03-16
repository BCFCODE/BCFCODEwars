import { Dispatch, useEffect, useRef } from "react";
import { CollectButtonAction } from "../reducers/collectButtonReducer";
import { CurrentUser } from "@/types/db/users";
import { CurrentUserAction } from "@/app/context/reducers/users/currentUser/types";
import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";

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
  
  const timeRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (success) {
      timeRef.current = setTimeout(() => {
        collectButtonDispatch({ type: "DIAMOND_COUNTS", counter: counter + 1 });
      }, 50);
    }

    if (counter === collectedDiamondsCount) {
      collectButtonDispatch({ type: "LOADING...", isLoading: false });
      collectButtonDispatch({ type: "DIAMONDS_COLLECTED" });
    }

    return () => {
      timeRef.current && clearTimeout(timeRef.current);
    };
  }, [isError, counter, success]);
}
