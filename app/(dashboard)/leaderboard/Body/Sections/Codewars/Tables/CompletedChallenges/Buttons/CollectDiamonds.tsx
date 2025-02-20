import {
  collectedDiamondStyles,
  counterStyles,
  diamondBoxStyles,
  diamondStyles,
  fade,
  iconButtonStyles,
} from "@/app/(dashboard)/leaderboard/styles";
import useCodewarsContext from "@/app/context/hooks/useContexts/useCodewarsContext";
import useDBCurrentUserContext from "@/app/context/hooks/useContexts/useDBCurrentUserContext";
import useDiamondsContext from "@/app/context/hooks/useContexts/useDiamondsContext";
import useCodewarsDispatchContext from "@/app/context/hooks/useDispatches/useCodewarsDispatchContext";
import useDiamondsDispatchContext from "@/app/context/hooks/useDispatches/useDiamondsDispatchContext";

import CodewarsService from "@/app/services/codewars-service";
import DiamondsService from "@/app/services/diamonds-service";
import { CodewarsCompletedChallenge } from "@/types/codewars";

import DiamondIcon from "@mui/icons-material/Diamond";
import { Box, IconButton, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const { getSingleChallenge } = new CodewarsService();
const { collectDiamonds } = new DiamondsService();

interface Props {
  currentChallenge: CodewarsCompletedChallenge;
}

const CollectDiamonds = ({ currentChallenge }: Props) => {
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
      });
      diamondsDispatch({ type: "SET_ERROR", isError: true });
      setError(true);
      diamondsDispatch({ type: "SET_LOADING", isLoading: false });
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
      });
      diamondsDispatch({ type: "SET_LOADING", isLoading: false });
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
      });
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

  return (
    <Box sx={diamondBoxStyles}>
      <Typography sx={counterStyles}>
        {isLoading
          ? counter < 4
            ? "" // Hide the count for the first 200ms (4 * 50ms = 200ms) to prevent flashing "0" on click, ensuring a smoother UX by avoiding unnecessary visual updates before the count starts.
            : counter // Show counts after 4 * 50ms = 200ms
          : collectedDiamondsCount}
      </Typography>

      {isCollected && <DiamondIcon sx={collectedDiamondStyles} />}
      {!isCollected && (
        <IconButton
          disabled={isDiamondIconButtonDisabled}
          sx={iconButtonStyles}
          onClick={handleClick}
        >
          <DiamondIcon
            sx={isLoading || isError ? fade(isError) : diamondStyles}
          />
        </IconButton>
      )}
    </Box>
  );
};

export default CollectDiamonds;
