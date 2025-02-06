import { diamondBoxStyles, counterStyles, collectedDiamondStyles, iconButtonStyles, fade, diamondStyles } from "@/app/(dashboard)/leaderboard/styles";
import useDBUserContext from "@/app/context/hooks/useDBUserContext";
import CodewarsService from "@/app/services/codewars-service";
import DiamondsService from "@/app/services/diamonds-service";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { DBCodewarsCompletedChallenge } from "@/types/db/codewars";
import DiamondIcon from "@mui/icons-material/Diamond";
import { Box, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const { getSingleChallenge } = new CodewarsService();
const { collectDiamonds } = new DiamondsService();

interface Props {
  setIconButtonDisable: (isDisabled: boolean) => void;
  isDisabled: boolean;
  challenge: CodewarsCompletedChallenge;
  manageSelectedChallenge: (challenge: DBCodewarsCompletedChallenge) => void;
}

const CollectDiamonds = ({
  setIconButtonDisable,
  isDisabled,
  manageSelectedChallenge,
  challenge,
}: Props) => {
  const { currentUser } = useDBUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [collectedDiamondsCount, setCollectedDiamondsCount] =
    useState<number>();
  const [isCollected, setIsCollected] = useState<boolean>();
  const [counter, setCounter] = useState<number>(0);

  const handleClick = async () => {
    setIconButtonDisable(true);
    setIsLoading(true);
    setError(false);

    const response = await getSingleChallenge(
      currentUser.codewars.username,
      challenge.id
    );

    if (response.success) {
      setError(false);
      const { data: selectedSingleChallenge } = response;
      const { collectedDiamondsCount } = await collectDiamonds(
        selectedSingleChallenge
      );
      setCollectedDiamondsCount(collectedDiamondsCount);

      manageSelectedChallenge({ ...challenge, ...selectedSingleChallenge });
    }

    if (!response.success) {
      setIconButtonDisable(false);
      setError(true);
      console.error(response.reason);
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
      setIconButtonDisable(false);
      setIsLoading(false);
      setIsCollected(true);
    }

    isCollected && setCounter(0); // Reset counter when isCollected becomes true or isLoading stops

    return () => {
      timer && clearTimeout(timer);
    };
  }, [error, isLoading, isCollected, counter]);

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
          disabled={isDisabled}
          sx={iconButtonStyles}
          onClick={handleClick}
        >
          <DiamondIcon sx={isLoading || error ? fade(error) : diamondStyles} />
        </IconButton>
      )}
    </Box>
  );
};

export default CollectDiamonds;
