import { DiamondsAction } from "@/app/context/reducers/diamonds/types";
import { CurrentUserAction } from "@/app/context/reducers/users/currentUser/types";
import { Dispatch, useEffect } from "react";
import { CollectButtonAction } from "../reducers/collectButtonReducer";
import useCurrentUserDispatchContext from "@/app/context/hooks/db/useCurrentUserDispatchContext";
import { AllUsersAction } from "@/app/context/reducers/users/allUsers/types";

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
  // currentUserDispatch,
  allUsersDispatch,
}: Props) {
  // const currentUserDispatch = useCurrentUserDispatchContext();
  useEffect(() => {
    if (isCollected && collectedDiamondsCount)
      diamondsContextDispatch({
        type: "INCREMENT_CODEWARS_DIAMONDS_SUM_AND_TOTAL",
        codewarsCollectedDiamonds: collectedDiamondsCount,
      }); // this is for Diamonds sum in header

    // Reset counter to avoid duplicate dispatches on subsequent renders
    collectButtonDispatch({ type: "RESET_COUNTER" });
  }, [isCollected, collectedDiamondsCount, diamondsContextDispatch]);
}
