import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";
import CodewarsService from "@/app/services/codewars-service";
import DiamondsService from "@/app/services/diamonds-service";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { useRef } from "react";
import useCollectedDiamonds from "./effects/useCollectedDiamonds";
import useCompletedChallenges from "./effects/useCompletedChallenges";
import useCounter from "./effects/useCounter";
import useCollectButtonReducer from "./useCollectButtonReducer";
import useCollectDiamondsContext from "./useCollectDiamondsContext";

const { getSingleChallenge } = new CodewarsService();
const { collectDiamonds } = new DiamondsService();

export default function useCollectDiamonds(
  currentChallenge: CodewarsCompletedChallenge
) {
  const { completedChallenges } = useCodewarsContext();
  const completedChallengesRef =
    useRef<CodewarsCompletedChallenge[]>(completedChallenges);

  const {
    codewarsContextDispatch,
    currentUser,
    diamondsContextDispatch,
    isDiamondIconButtonDisabled,
  } = useCollectDiamondsContext();

  const {
    collectButtonState: {
      isLoading,
      counter,
      isError,
      isCollected,
      collectedDiamondsCount,
    },
    collectButtonDispatch,
  } = useCollectButtonReducer();

  const handleClick = async () => {
    diamondsContextDispatch({ type: "LOADING..." });

    collectButtonDispatch({ type: "LOADING...", isLoading: true });

    const response = await getSingleChallenge(
      currentUser.codewars.username,
      currentChallenge.id
    );

    if (response.success) {
      diamondsContextDispatch({ type: "SET_ERROR", isError: false });

      const { data: selectedSingleChallenge } = response;
      const { collectedDiamondsCount } = await collectDiamonds(
        selectedSingleChallenge
      );

      collectButtonDispatch({
        type: "SUCCESSFUL_RESPONSE",
        collectedDiamondsCount,
      });

      const selectedChallenge = {
        ...currentChallenge,
        details: selectedSingleChallenge,
      };

      codewarsContextDispatch({
        type: "SET_SELECTED_CHALLENGE",
        selectedChallenge: {
          ...currentChallenge,
          details: selectedSingleChallenge,
        },
      });

      completedChallengesRef.current = completedChallenges?.map((challenge) =>
        challenge.id === selectedSingleChallenge.id
          ? selectedChallenge
          : currentChallenge
      );
    }

    if (!response.success) {
      diamondsContextDispatch({ type: "!SUCCESSFUL_RESPONSE" });
      collectButtonDispatch({ type: "LOADING...", isLoading: false });
      collectButtonDispatch({ type: "RESET_COUNTER" });
    }
  };

  useCounter({
    collectButtonDispatch,
    collectedDiamondsCount,
    counter,
    isCollected,
    isError,
    isLoading,
  });

  useCollectedDiamonds({
    collectButtonDispatch,
    collectedDiamondsCount,
    diamondsContextDispatch,
    isCollected,
  });

  useCompletedChallenges({
    codewarsContextDispatch,
    isDiamondIconButtonDisabled,
    completedChallengesRef,
  });

  return {
    isLoading,
    counter,
    collectedDiamondsCount,
    isCollected,
    isDiamondIconButtonDisabled,
    handleClick,
    isError,
  };
}
