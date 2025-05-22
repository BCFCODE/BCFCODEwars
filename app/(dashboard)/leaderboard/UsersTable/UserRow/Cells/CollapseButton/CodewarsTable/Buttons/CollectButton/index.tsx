import {
  collectedDiamondStyles,
  counterStyles,
  diamondBoxStyles,
  diamondStyles,
  fade,
  iconButtonStyles,
} from "@/app/(dashboard)/leaderboard/styles";

import DiamondsService from "@/app/services/diamonds";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { RewardStatus } from "@/types/diamonds";
import DiamondIcon from "@mui/icons-material/Diamond";
import { Box, IconButton, Typography } from "@mui/material";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import { useSession } from "next-auth/react";
import useCollectDiamonds from "./hooks/useCollectDiamonds";

import CodewarsAPIService from "@/app/api/services/codewars";
import { useCodewarsStore } from "@/app/store/codewars";

const { calculateCodewarsDiamondsCount } = new DiamondsService();
const { getSingleChallenge } = new CodewarsAPIService();
const { collectDiamonds } = new DiamondsService();

interface Props {
  currentChallenge: CodewarsCompletedChallenge;
}

const CollectDiamonds = ({ currentChallenge }: Props) => {
  const session = useSession().data;
  const { currentUser } = useCurrentUserContext();
  const setSelectedChallenge = useCodewarsStore(
    (state) => state.setSelectedChallenge
  );
  const {
    isLoading,
    counter,
    collectedDiamondsCount,
    isCollected,
    isError,
    success,
    isDiamondIconButtonDisabled,
    diamondsContextDispatch,
    collectButtonDispatch,
  } = useCollectDiamonds();

  const isUserOnPersonalDashboard = session?.user?.email === currentUser.email;

  if (currentChallenge.rewardStatus === RewardStatus.ClaimedDiamonds)
    return (
      <Box sx={diamondBoxStyles}>
        <Typography sx={counterStyles}>
          {calculateCodewarsDiamondsCount(
            currentChallenge.moreDetails?.rank.id ?? 8
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
            disabled={isDiamondIconButtonDisabled || !isUserOnPersonalDashboard}
            sx={iconButtonStyles}
            onClick={async () => {
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
                  success: true,
                });

                const selectedChallenge: Required<CodewarsCompletedChallenge> =
                  {
                    ...currentChallenge,
                    rewardStatus: RewardStatus.ClaimedDiamonds,
                    moreDetails: selectedSingleChallenge,
                    // isUntracked: currentChallenge.isUntracked ?? false,
                  };

                setSelectedChallenge(selectedChallenge);
              }

              if (!response.success) {
                diamondsContextDispatch({ type: "!SUCCESSFUL_RESPONSE" });
                collectButtonDispatch({ type: "LOADING...", isLoading: false });
                collectButtonDispatch({
                  type: "!SUCCESSFUL_RESPONSE",
                  success: false,
                });
                collectButtonDispatch({ type: "RESET_COUNTER" });
              }
            }}
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
