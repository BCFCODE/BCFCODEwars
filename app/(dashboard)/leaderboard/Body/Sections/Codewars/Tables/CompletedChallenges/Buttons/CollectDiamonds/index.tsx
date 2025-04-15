import {
  collectedDiamondStyles,
  counterStyles,
  diamondBoxStyles,
  diamondStyles,
  fade,
  iconButtonStyles,
} from "@/app/(dashboard)/leaderboard/styles";

import useCollectDiamonds from "@/app/(dashboard)/leaderboard/Body/Sections/Codewars/Tables/CompletedChallenges/Buttons/CollectDiamonds/hooks/useCollectDiamonds";
import { useCurrentUser } from "@/app/(dashboard)/leaderboard/context/CurrentUser";
import DiamondsService from "@/app/services/diamonds";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { RewardStatus } from "@/types/diamonds";
import DiamondIcon from "@mui/icons-material/Diamond";
import { Box, IconButton, Typography } from "@mui/material";
import UntrackedChallengeTooltip from "./components/Tooltips";
import handleClick from "./utils/handleClick";

const { calculateCodewarsDiamondsCount } = new DiamondsService();

interface Props {
  currentChallenge: CodewarsCompletedChallenge;
}

const CollectDiamonds = ({ currentChallenge }: Props) => {
  const currentUser = useCurrentUser()

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

  const isUserOnPersonalDashboard =
    currentUser.session?.user?.email === currentUser.email;

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
          <UntrackedChallengeTooltip
            isLatestUntracked={currentChallenge.isLatestUntracked}
            isUntracked={currentChallenge.isUntracked ?? false}
            text={
              isUserOnPersonalDashboard
                ? "Oops! Let’s track this now!"
                : "💎Diamonds await! Sign in to collect."
            }
          >
            <IconButton
              disabled={
                isDiamondIconButtonDisabled || !isUserOnPersonalDashboard
              }
              sx={iconButtonStyles}
              onClick={() =>
                handleClick({
                  codewarsContextDispatch,
                  collectButtonDispatch,
                  currentChallenge,
                  diamondsContextDispatch,
                })
              }
            >
              <DiamondIcon
                sx={isLoading || isError ? fade(isError) : diamondStyles}
              />
            </IconButton>
          </UntrackedChallengeTooltip>
        )}
      </Box>
    );
};

export default CollectDiamonds;
