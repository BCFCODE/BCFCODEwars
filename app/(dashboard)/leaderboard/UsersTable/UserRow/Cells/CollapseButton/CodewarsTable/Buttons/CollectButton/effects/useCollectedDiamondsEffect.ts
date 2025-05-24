import { CurrentUserAction } from "@/app/context/reducers/currentUser";
import { DiamondsAction } from "@/app/context/reducers/diamondsReducer";
import { Dispatch, useEffect } from "react";
import { CollectButtonAction } from "../reducers/collectButtonReducer";
import { useCollectButtonStore } from "../../store/collectButton";

interface Props {
  isCollected: boolean;
  collectedDiamondsCount: number | undefined;
  diamondsContextDispatch: Dispatch<DiamondsAction>;
  collectButtonDispatch: Dispatch<CollectButtonAction>;
  currentUserDispatch: Dispatch<CurrentUserAction>;
}

export default function useCollectedDiamondsEffect({
  collectedDiamondsCount,
  collectButtonDispatch,
  diamondsContextDispatch,
  isCollected,
}: Props) {
  const resetCounter = useCollectButtonStore((state) => state.resetCounter);
  // const currentUserDispatch = useCurrentUserDispatchContext();
  useEffect(() => {
    if (isCollected && collectedDiamondsCount)
      diamondsContextDispatch({ type: "DISABLE_DIAMOND_ICON_BUTTON" });
    // Reset counter to avoid duplicate dispatches on subsequent renders
    resetCounter();
  }, [
    isCollected,
    collectedDiamondsCount,
    diamondsContextDispatch,
    collectButtonDispatch,
  ]);
}
