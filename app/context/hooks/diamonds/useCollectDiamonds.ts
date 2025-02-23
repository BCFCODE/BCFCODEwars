import { CodewarsCompletedChallenge } from "@/types/codewars";
import useDBCurrentUserContext from "../db/useDBCurrentUserContext";
import useDiamondsContext from "./useDiamondsContext";
import useDiamondsDispatchContext from "./useDiamondsDispatchContext";
import useCodewarsContext from "../codewars/useCodewarsContext";
import { useEffect, useRef, useState } from "react";
import useCodewarsDispatchContext from "../codewars/useCodewarsDispatchContext";
import CodewarsService from "@/app/services/codewars-service";
import DiamondsService from "@/app/services/diamonds-service";

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
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [collectedDiamondsCount, setCollectedDiamondsCount] =
    useState<number>();
  const [isCollected, setIsCollected] = useState<boolean>();
  const [counter, setCounter] = useState<number>(0);

  const handleClick = async () => {
    diamondsDispatch({
      type: "SET_DIAMOND_ICON_BUTTON_DISABLE",
      isDisabled: true,
    });
    diamondsDispatch({ type: "SET_LOADING", isLoading: true });
    diamondsDispatch({ type: "SET_ERROR", isError: false });
    setIsLoading(true);
    setError(false);

    const response = await getSingleChallenge(
      currentUser.codewars.username,
      currentChallenge.id
    );

    if (response.success) {
      diamondsDispatch({ type: "SET_ERROR", isError: false });
      // setError(false);
      const { data: selectedSingleChallenge } = response;
      const { collectedDiamondsCount } = await collectDiamonds(
        selectedSingleChallenge
      );
      setCollectedDiamondsCount(collectedDiamondsCount);

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
      setError(true);
      diamondsDispatch({ type: "SET_LOADING", isLoading: false }); // this is for Diamonds sum in header
      setIsLoading(false);
      setCounter(0);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isLoading && !isCollected) {
      timer = setTimeout(() => {
        setCounter((collectingCount) => collectingCount + 1);
      }, 50);
    }

    if (counter > (collectedDiamondsCount ?? 500)) {
      // setIconButtonDisable(false);
      diamondsDispatch({
        type: "SET_DIAMOND_ICON_BUTTON_DISABLE",
        isDisabled: false,
      }); // this is for Diamonds sum in header
      diamondsDispatch({ type: "SET_LOADING", isLoading: false }); // this is for Diamonds sum in header
      setIsLoading(false);
      setIsCollected(true);
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
    setCounter(0);
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
