import { AllUsersAction } from "@/app/context/reducers/allUsersReducer";
import { CurrentUserAction } from "@/app/context/reducers/currentUserReducer";
import { DiamondsAction } from "@/app/context/reducers/diamondsReducer";
import { Dispatch, useEffect } from "react";
import { CollectButtonAction } from "../reducers/collectButtonReducer";

interface Props {
  isCollected: boolean;
  collectedDiamondsCount: number | undefined;
  diamondsContextDispatch: Dispatch<DiamondsAction>;
  collectButtonDispatch: Dispatch<CollectButtonAction>;
  currentUserDispatch: Dispatch<CurrentUserAction>;
  allUsersDispatch: Dispatch<AllUsersAction>;
}

export default function useCollectedDiamondsEffect({
  collectedDiamondsCount,
  collectButtonDispatch,
  diamondsContextDispatch,
  isCollected,
}: Props) {
  // const currentUserDispatch = useCurrentUserDispatchContext();
  useEffect(() => {
    if (isCollected && collectedDiamondsCount)
      diamondsContextDispatch({ type: "DISABLE_DIAMOND_ICON_BUTTON" }); 
    // Reset counter to avoid duplicate dispatches on subsequent renders
    collectButtonDispatch({ type: "RESET_COUNTER" });
  }, [isCollected, collectedDiamondsCount, diamondsContextDispatch]);
}
