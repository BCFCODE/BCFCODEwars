import {
  collectedDiamondStyles,
  counterStyles,
  diamondBoxStyles,
  diamondStyles,
  fade,
  iconButtonStyles,
} from "@/app/(dashboard)/leaderboard/styles";

import { CodewarsCompletedChallenge } from "@/types/codewars";
import useCollectDiamonds from "@/app/(dashboard)/leaderboard/Body/Sections/Codewars/Tables/CompletedChallenges/Buttons/hooks/useCollectDiamonds";
import DiamondIcon from "@mui/icons-material/Diamond";
import { Box, IconButton, Typography } from "@mui/material";

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
    handleClick,
    isError,
  } = useCollectDiamonds(currentChallenge);

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
