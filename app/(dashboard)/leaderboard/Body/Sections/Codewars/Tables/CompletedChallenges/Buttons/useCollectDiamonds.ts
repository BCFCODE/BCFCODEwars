import { CodewarsCompletedChallenge } from "@/types/codewars";
import useDBCurrentUserContext from "../../../../../../../../context/hooks/db/useDBCurrentUserContext";
import useDiamondsContext from "../../../../../../../../context/hooks/diamonds/useDiamondsContext";
import useDiamondsDispatchContext from "../../../../../../../../context/hooks/diamonds/useDiamondsDispatchContext";
import useCodewarsContext from "../../../../../../../../context/hooks/codewars/useCodewarsContext";
import { useEffect, useRef, useState } from "react";
import useCodewarsDispatchContext from "../../../../../../../../context/hooks/codewars/useCodewarsDispatchContext";
import CodewarsService from "@/app/services/codewars-service";
import DiamondsService from "@/app/services/diamonds-service";
import useCollectButtonReducer from "./useCollectButtonReducer";

const { getSingleChallenge } = new CodewarsService();
const { collectDiamonds } = new DiamondsService();

export default function useCollectDiamonds(
  currentChallenge: CodewarsCompletedChallenge
) {
  const { currentUser } = useDBCurrentUserContext();
  const { isDiamondIconButtonDisabled } = useDiamondsContext();
  const diamondsDispatch = useDiamondsDispatchContext();
  const { completedChallenges } = useCodewarsContext();
  const completedChallengesRef =
    useRef<CodewarsCompletedChallenge[]>(completedChallenges);
  const codewarsDispatch = useCodewarsDispatchContext();

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
    diamondsDispatch({
      type: "SET_DIAMOND_ICON_BUTTON_DISABLE",
      isDisabled: true,
    });
    diamondsDispatch({ type: "SET_LOADING", isLoading: true });
    diamondsDispatch({ type: "SET_ERROR", isError: false });

    collectButtonDispatch({ type: "LOADING...", isLoading: true });

    const response = await getSingleChallenge(
      currentUser.codewars.username,
      currentChallenge.id
    );

    if (response.success) {
      diamondsDispatch({ type: "SET_ERROR", isError: false });

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

      codewarsDispatch({
        type: "SET_SELECTED_CHALLENGE",
        selectedChallenge,
      });

      completedChallengesRef.current = completedChallenges?.map((challenge) =>
        challenge.id === selectedSingleChallenge.id
          ? selectedChallenge
          : currentChallenge
      );
    }

    if (!response.success) {
      // setIconButtonDisable(false);
      diamondsDispatch({
        type: "SET_DIAMOND_ICON_BUTTON_DISABLE",
        isDisabled: false,
      }); // this is for Diamonds sum in header
      diamondsDispatch({ type: "SET_ERROR", isError: true }); // this is for Diamonds sum in header
      diamondsDispatch({ type: "SET_LOADING", isLoading: false }); // this is for Diamonds sum in header

      collectButtonDispatch({ type: "LOADING...", isLoading: false });
      collectButtonDispatch({ type: "RESET_COUNTER" });
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isLoading && !isCollected) {
      timer = setTimeout(() => {
        collectButtonDispatch({ type: "DIAMOND_COUNTS", counter: counter + 1 });
      }, 50);
    }

    if (counter > (collectedDiamondsCount ?? 500)) {
      diamondsDispatch({
        type: "SET_DIAMOND_ICON_BUTTON_DISABLE",
        isDisabled: false,
      }); // this is for Diamonds sum in header
      diamondsDispatch({ type: "SET_LOADING", isLoading: false }); // this is for Diamonds sum in header

      collectButtonDispatch({ type: "LOADING...", isLoading: false });
      collectButtonDispatch({ type: "DIAMONDS_COLLECTED" });
    }

    return () => {
      timer && clearTimeout(timer);
    };
  }, [isError, isLoading, isCollected, counter]);

  useEffect(() => {
    if (isCollected && collectedDiamondsCount)
      diamondsDispatch({
        type: "COLLECT_CODEWARS_DIAMONDS",
        codewarsCollectedDiamonds: collectedDiamondsCount,
      }); // this is for Diamonds sum in header
    // Reset counter to avoid duplicate dispatches on subsequent renders
    collectButtonDispatch({ type: "RESET_COUNTER" });
  }, [isCollected, collectedDiamondsCount, diamondsDispatch]);

  useEffect(() => {
    if (!isDiamondIconButtonDisabled) {
      codewarsDispatch({
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
