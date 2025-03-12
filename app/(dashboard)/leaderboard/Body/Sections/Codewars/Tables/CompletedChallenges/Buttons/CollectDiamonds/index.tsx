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
import DiamondsService from "@/app/services/diamonds-service";

const { calculateCodewarsDBdiamondsCount } = new DiamondsService();

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
  } = useCollectDiamonds();

  console.log(
    "currentChallenge in Table/CompletedChallenges/Buttons/CollectDiamonds/index.tsx",
    currentChallenge.moreDetails?.rank
  );

  if ("moreDetails" in currentChallenge)
    return (
      <Box sx={diamondBoxStyles}>
        <Typography sx={counterStyles}>
          {calculateCodewarsDBdiamondsCount(currentChallenge)}
        </Typography>
        <DiamondIcon sx={collectedDiamondStyles} />
      </Box>
    );

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
          onClick={() =>
            handleClick({
              codewarsContextDispatch,
              collectButtonDispatch,
              completedChallengesRef,
              currentChallenge,
              diamondsContextDispatch,
              currentUser,
              completedChallenges,
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
