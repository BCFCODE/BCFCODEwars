import {
  collectedDiamondStyles,
  counterStyles,
  diamondBoxStyles,
  diamondStyles,
  fade,
  iconButtonStyles,
} from "@/app/(dashboard)/leaderboard/styles";

import useCollectDiamonds from "@/app/(dashboard)/leaderboard/Body/Sections/Codewars/Tables/CompletedChallenges/Buttons/CollectDiamonds/hooks/useCollectDiamonds";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import DiamondIcon from "@mui/icons-material/Diamond";
import { Box, IconButton, Typography } from "@mui/material";
import handleClick from "./utils/handleClick";
import { RewardStatus } from "@/types/db/diamonds";
import DiamondsService from "@/app/services/diamonds-service";

const { calculateCodewarsDiamondsCount } = new DiamondsService();

interface Props {
  currentChallenge: CodewarsCompletedChallenge;
}

const CollectDiamonds = ({ currentChallenge }: Props) => {
  const {
    isLoading,
    counter,
    collectedDiamondsCount,
    isCollected,
    isDiamondIconButtonDisabled,
    codewarsContextDispatch,
    collectButtonDispatch,
    completedChallengesRef,
    diamondsContextDispatch,
    isError,
    currentUser,
    completedChallenges,
    currentUserDispatch,
    success,
    allUsersDispatch,
  } = useCollectDiamonds();

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
            disabled={isDiamondIconButtonDisabled}
            sx={iconButtonStyles}
            onClick={() =>
              handleClick({
                codewarsContextDispatch,
                collectButtonDispatch,
                completedChallengesRef,
                currentChallenge,
                diamondsContextDispatch,
                currentUser,
                completedChallenges,
                currentUserDispatch,
                success,
                isDiamondIconButtonDisabled,
                allUsersDispatch,
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
