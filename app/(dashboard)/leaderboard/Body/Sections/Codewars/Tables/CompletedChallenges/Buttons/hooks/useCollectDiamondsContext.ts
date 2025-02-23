import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
import useCodewarsDispatchContext from "@/app/context/hooks/codewars/useCodewarsDispatchContext";
import useDBCurrentUserContext from "@/app/context/hooks/db/useDBCurrentUserContext";
import useDiamondsContext from "@/app/context/hooks/diamonds/useDiamondsContext";
import useDiamondsDispatchContext from "@/app/context/hooks/diamonds/useDiamondsDispatchContext";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { useRef } from "react";

export default function useCollectDiamondsContext() {
  const { currentUser } = useDBCurrentUserContext();
  const { isDiamondIconButtonDisabled } = useDiamondsContext();
  const diamondsContextDispatch = useDiamondsDispatchContext();
  const { completedChallenges } = useCodewarsContext();
  const completedChallengesRef =
    useRef<CodewarsCompletedChallenge[]>(completedChallenges);
  const codewarsContextDispatch = useCodewarsDispatchContext();

  return {
    currentUser,
    isDiamondIconButtonDisabled,
    diamondsContextDispatch,
    completedChallenges,
    completedChallengesRef,
    codewarsContextDispatch,
  };
}
