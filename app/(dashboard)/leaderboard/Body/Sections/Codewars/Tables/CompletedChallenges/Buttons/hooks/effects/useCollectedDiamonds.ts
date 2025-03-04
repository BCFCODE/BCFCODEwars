import { Dispatch, useEffect } from "react";
import { CollectDiamondsAction } from "../../collectButtonReducer";
import { Action } from "@/app/context/reducers/diamonds/types";

interface Props {
  isCollected: boolean;
  collectedDiamondsCount: number | undefined;
  diamondsContextDispatch: Dispatch<Action>;
  collectButtonDispatch: Dispatch<CollectDiamondsAction>;
}

export default function useCollectedDiamonds({
  collectedDiamondsCount,
  collectButtonDispatch,
  diamondsContextDispatch,
  isCollected,
}: Props) {
  useEffect(() => {
    if (isCollected && collectedDiamondsCount)
      diamondsContextDispatch({
        type: "DIAMONDS_COLLECTED",
        codewarsCollectedDiamonds: collectedDiamondsCount,
      }); // this is for Diamonds sum in header
    // Reset counter to avoid duplicate dispatches on subsequent renders

    collectButtonDispatch({ type: "RESET_COUNTER" });
  }, [isCollected, collectedDiamondsCount, diamondsContextDispatch]);
}
