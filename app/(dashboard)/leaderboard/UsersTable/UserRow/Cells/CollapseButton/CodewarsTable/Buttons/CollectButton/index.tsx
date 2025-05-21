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
import handleClick from "./utils/handleClick";

const { calculateCodewarsDiamondsCount } = new DiamondsService();

interface Props {
  currentChallenge: CodewarsCompletedChallenge;
}

const CollectDiamonds = ({ currentChallenge }: Props) => {
  const session = useSession().data;
  const { currentUser } = useCurrentUserContext();
  const {
    isLoading,
    counter,
    collectedDiamondsCount,
    isCollected,
    isError,
    success,
    isDiamondIconButtonDisabled,
    codewarsContextDispatch,
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
            onClick={() =>
              handleClick({
                codewarsContextDispatch,
                collectButtonDispatch,
                currentChallenge,
                diamondsContextDispatch,
                currentUser,
              })
            }
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
