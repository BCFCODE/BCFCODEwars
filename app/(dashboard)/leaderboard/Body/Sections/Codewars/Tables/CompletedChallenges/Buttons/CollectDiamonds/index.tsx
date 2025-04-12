import {
  collectedDiamondStyles,
  counterStyles,
  diamondBoxStyles,
  diamondStyles,
  fade,
  iconButtonStyles,
} from "@/app/(dashboard)/leaderboard/styles";

import useCollectDiamonds from "@/app/(dashboard)/leaderboard/Body/Sections/Codewars/Tables/CompletedChallenges/Buttons/CollectDiamonds/hooks/useCollectDiamonds";
import DiamondsService from "@/app/services/diamonds";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { RewardStatus } from "@/types/diamonds";
import DiamondIcon from "@mui/icons-material/Diamond";
import { Box, IconButton, Typography } from "@mui/material";
import UntrackedChallengeTooltip from "./components/Tooltips";
import handleClick from "./utils/handleClick";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";

const { calculateCodewarsDiamondsCount } = new DiamondsService();

interface Props {
  currentChallenge: CodewarsCompletedChallenge;
}

const CollectDiamonds = ({ currentChallenge }: Props) => {
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
  // console.log("currentUser in CollectDiamonds >>>>", currentUser);
  const isUserOnPersonalDashboard =
    currentUser.session?.user?.email === currentUser.email;
  // console.log(
  //   "isUserOnPersonalDashboard in CollectDiamonds",
  //   isUserOnPersonalDashboard,
  //   currentUser
  // );

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
                  currentUser,
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
