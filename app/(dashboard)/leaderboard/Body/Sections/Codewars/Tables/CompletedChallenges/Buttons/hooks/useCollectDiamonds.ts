import CodewarsService from "@/app/services/codewars-service";
import DiamondsService from "@/app/services/diamonds-service";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { useEffect } from "react";
import useCollectButtonReducer from "./useCollectButtonReducer";
import useCollectDiamondsContext from "./useCollectDiamondsContext";
import useCounter from "./effects/useCounter";
import useCollectedDiamonds from "./effects/useCollectedDiamonds";

const { getSingleChallenge } = new CodewarsService();
const { collectDiamonds } = new DiamondsService();

export default function useCollectDiamonds(
  currentChallenge: CodewarsCompletedChallenge
) {
  const {
    codewarsContextDispatch,
    completedChallenges,
    completedChallengesRef,
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

  useEffect(() => {
    if (!isDiamondIconButtonDisabled) {
      codewarsContextDispatch({
        type: "SET_COMPLETED_CHALLENGES",
        completedChallenges: completedChallengesRef.current ?? [],
      });
    }
  }, [isDiamondIconButtonDisabled]);

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
