import { CodewarsAction } from "@/app/context/reducers/codewars/types";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { Dispatch, RefObject, useEffect } from "react";

interface Props {
  isDiamondIconButtonDisabled: boolean;
  codewarsContextDispatch: Dispatch<CodewarsAction>;
  completedChallengesRef: RefObject<CodewarsCompletedChallenge[] | undefined>;
}
export default function useCompletedChallenges({
  codewarsContextDispatch,
  completedChallengesRef,
  isDiamondIconButtonDisabled,
}: Props) {
  useEffect(() => {
    if (!isDiamondIconButtonDisabled) {
      codewarsContextDispatch({
        type: "SET_COMPLETED_CHALLENGES",
        completedChallenges: completedChallengesRef.current ?? [],
      });
    }
  }, [isDiamondIconButtonDisabled]);
}
