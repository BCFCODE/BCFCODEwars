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
import useCodeChallengesList from "./hooks/useCodeChallengesList";

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
    success,
  } = useCollectDiamonds();

  const { currentUserDispatch } = useCodeChallengesList();

  // console.log(
  //   "currentChallenge in Table/CompletedChallenges/Buttons/CollectDiamonds/index.tsx",
  //   currentChallenge.moreDetails?.rank
  // );

  // if ("moreDetails" in currentChallenge)
  //   return (
  //     <Box sx={diamondBoxStyles}>
  //       <Typography sx={counterStyles}>
  //         N/A
  //       </Typography>
  //       <DiamondIcon sx={collectedDiamondStyles} />
  //     </Box>
  //   );

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
