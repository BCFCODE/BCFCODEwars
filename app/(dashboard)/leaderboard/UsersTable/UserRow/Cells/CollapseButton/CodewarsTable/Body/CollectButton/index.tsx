import {
  collectedDiamondStyles,
  counterStyles,
  diamondBoxStyles,
  diamondStyles,
  fade,
  iconButtonStyles,
} from "@/app/(dashboard)/leaderboard/styles";

import CodewarsAPIService from "@/app/api/services/codewars";
import DatabaseAPIService from "@/app/api/services/db";
import DiamondsService from "@/app/services/diamonds";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { RewardStatus } from "@/types/diamonds";
import DiamondIcon from "@mui/icons-material/Diamond";
import { Box, IconButton, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useCollectButtonStore } from "./store/collectButton";
import useCollectButtonState from "./useCollectButtonState";
import { useCodewarsStore } from "@/app/store/codewars";
import useCurrentUserContext from "@/app/context/hooks/useCurrentUserContext";
import useCurrentUserDispatchContext from "@/app/context/hooks/useCurrentUserDispatchContext";
import useCodewarsTableMutation from "../../../hooks/useCodewarsTableMutation";
import usePaginationStore, {
  defaultPagination,
} from "../../Pagination/usePaginationStore";

const { calculateCodewarsDiamondsCount } = new DiamondsService();
const { getSingleChallenge } = new CodewarsAPIService();
const { collectDiamonds } = new DiamondsService();
// const { postCurrentUser } = new DatabaseAPIService();

interface Props {
  currentChallenge: CodewarsCompletedChallenge;
}

const CollectDiamonds = ({ currentChallenge }: Props) => {
  const { currentUser } = useCurrentUserContext();
  const { mutate: postCurrentUser } = useCodewarsTableMutation({
    username: currentUser.codewars.username,
    apiPageNumber: usePaginationStore(
      (state) =>
        state.pagination[currentUser.codewars.username] ?? defaultPagination
    ).apiPageNumber,
  });
  const [isCounting, setIsCounting] = useState(true);
  const timeRef = useRef<NodeJS.Timeout | null>(null);
  const isListUpdatedRef = useRef(false);
  const isDiamondsUpdatedRef = useRef(false);
  const session = useSession().data;
  const isIconDisabled = useCollectButtonStore(
    (state) => state.diamonds.isIconDisabled
  );
  const setIsDiamondIconDisabled = useCollectButtonStore(
    (state) => state.setIsDiamondIconDisabled
  );
  const selectedChallenge = useCodewarsStore(
    (state) => state.challenge.selectedChallenge
  );
  const setSelectedChallenge = useCodewarsStore(
    (state) => state.setSelectedChallenge
  );

  const currentUserDispatch = useCurrentUserDispatchContext();

  const { collectState, collectButtonDispatch } = useCollectButtonState();

  const {
    counter,
    isCollected,
    isError,
    isLoading,
    success,
    collectedDiamondsCount,
  } = collectState;

  useEffect(() => {
    if (!isCounting) return;

    if (success) {
      timeRef.current = setTimeout(() => {
        collectButtonDispatch({ type: "DIAMOND_COUNTS", counter: counter + 1 });
      }, 50);
    }

    if (counter === collectedDiamondsCount) {
      collectButtonDispatch({ type: "LOADING...", isLoading: false });
      collectButtonDispatch({ type: "DIAMONDS_COLLECTED" });

      setIsCounting(false);
    }

    return () => {
      timeRef.current && clearTimeout(timeRef.current);
    };
  }, [
    isError,
    counter,
    success,
    isCounting,
    collectedDiamondsCount,
    collectButtonDispatch,
  ]);

  useEffect(() => {
    if (isCollected && collectedDiamondsCount) {
      setIsDiamondIconDisabled(false);
      collectButtonDispatch({ type: "RESET_COUNTER" });
    }
  }, [isCollected, collectedDiamondsCount]);

  useEffect(() => {
    if (success && !isIconDisabled) {
      const list = currentUser.codewars.codeChallenges.list.map((challenge) =>
        challenge.id === selectedChallenge?.id ? selectedChallenge : challenge
      );

      if (!isListUpdatedRef.current) {
        const userWithUpdatedList = { ...currentUser };
        userWithUpdatedList.codewars.codeChallenges.list = [...list];
        postCurrentUser(userWithUpdatedList);
        isListUpdatedRef.current = true;
      }

      currentUserDispatch({
        type: "UPDATE_CODE_CHALLENGES_LIST",
        list,
        totalItems: currentUser.codewars.codeChallenges.totalItems,
        totalPages: currentUser.codewars.codeChallenges.totalPages,
      });
    }

    if (success && !isDiamondsUpdatedRef.current && selectedChallenge) {
      currentUserDispatch({
        type: "UPDATE_DIAMONDS_TOTALS_AND_RANKS",
        reward: collectedDiamondsCount ?? 0,
        selectedChallenge,
      });

      isDiamondsUpdatedRef.current = true; // Prevents duplicate dispatch
    }

    if (!success) {
      isListUpdatedRef.current = false;
      isDiamondsUpdatedRef.current = false;
    }
  }, [
    success,
    isIconDisabled,
    collectedDiamondsCount,
    currentUserDispatch,
    selectedChallenge,
  ]);

  const handleCollectDiamonds = useCallback(async () => {
    try {
      setIsDiamondIconDisabled(true);
      collectButtonDispatch({ type: "LOADING...", isLoading: true });

      const response = await getSingleChallenge(
        currentUser.codewars.username,
        currentChallenge.id
      );

      if (response.success) {
        const { data: selectedSingleChallenge } = response;
        const { collectedDiamondsCount } = await collectDiamonds(
          selectedSingleChallenge
        );

        collectButtonDispatch({
          type: "SUCCESSFUL_RESPONSE",
          collectedDiamondsCount,
          success: true,
        });

        setSelectedChallenge({
          ...currentChallenge,
          rewardStatus: RewardStatus.ClaimedDiamonds,
          moreDetails: selectedSingleChallenge,
        });
      } else {
        throw new Error("Failed to fetch single challenge");
      }
    } catch (error) {
      // console.error("Collect Diamonds failed:", error);
      setIsDiamondIconDisabled(false);
      collectButtonDispatch({ type: "LOADING...", isLoading: false });
      collectButtonDispatch({
        type: "!SUCCESSFUL_RESPONSE",
        success: false,
      });
      collectButtonDispatch({ type: "RESET_COUNTER" });
    }
  }, [
    currentUser.codewars.username,
    currentChallenge.id,
    collectButtonDispatch,
    setSelectedChallenge,
  ]);

  const isUserOnPersonalDashboard = session?.user?.email === currentUser.email;

  if (currentChallenge.rewardStatus === RewardStatus.ClaimedDiamonds)
    return (
      <Box sx={diamondBoxStyles}>
        <Typography sx={counterStyles}>
          {calculateCodewarsDiamondsCount(
            currentChallenge.moreDetails?.rank?.id ?? 8
          )}
        </Typography>
        <DiamondIcon sx={collectedDiamondStyles} />
      </Box>
    );
  else
    return (
      <Box sx={diamondBoxStyles}>
        <Typography sx={counterStyles}>
          {isLoading ? (success ? counter : "") : collectedDiamondsCount}
        </Typography>

        {isCollected && <DiamondIcon sx={collectedDiamondStyles} />}

        {!isCollected && (
          <IconButton
            disabled={isIconDisabled || !isUserOnPersonalDashboard}
            sx={iconButtonStyles}
            onClick={handleCollectDiamonds}
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
