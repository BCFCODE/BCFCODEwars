import useDatabaseUserContext from "@/app/context/hooks/useDatabaseUserContext";
import CodewarsService from "@/app/services/codewars-service";
import DiamondsService from "@/app/services/diamonds-service";
import {
  CodewarsCompletedChallenge,
  CodewarsSingleChallenge,
} from "@/types/codewars";
import DiamondIcon from "@mui/icons-material/Diamond";
import { Box, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  collectedDiamond,
  diamondBoxStyle,
  diamondStyles,
  diamondTextStyle,
  fade,
  iconButtonStyles,
} from "../../../styles";

const { getSingleChallenge } = new CodewarsService();
const { collectDiamonds } = new DiamondsService();

interface Props {
  challenge: CodewarsCompletedChallenge;
  manageSelectedChallenge: (
    selectedSingleChallenge: CodewarsSingleChallenge
  ) => void;
}

const CollectDiamonds = ({ manageSelectedChallenge, challenge }: Props) => {
  const { currentUser } = useDatabaseUserContext();
  const [isLoading, setLoading] = useState(false);
  const [collectedDiamondsCount, setCollectedDiamondsCount] =
    useState<number>();
  const [isCollected, setIsCollected] = useState<boolean>();
  const [collectingCount, setCounter] = useState<number>(0);

  const handleClick = async () => {
    setLoading(true);

    const { data: selectedSingleChallenge, success } = await getSingleChallenge(
      currentUser.codewars.username,
      challenge.id
    );

    const { collectedDiamondsCount } = await collectDiamonds(
      selectedSingleChallenge
    );

    success && setCollectedDiamondsCount(collectedDiamondsCount);

    manageSelectedChallenge(selectedSingleChallenge);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isLoading && !isCollected) {
      timer = setTimeout(() => {
        setCounter((collectingCount) => collectingCount + 1);
      }, 50);
    }

    if (collectingCount >= (collectedDiamondsCount ?? 500)) {
      setLoading(false);
      setIsCollected(true);
    }

    isCollected && setCounter(0); // Reset counter when isCollected becomes true or isLoading stops

    return () => {
      timer && clearTimeout(timer);
    };
  }, [isLoading, isCollected, collectingCount]);

  return (
    <Box sx={diamondBoxStyle}>
      <Typography sx={diamondTextStyle}>
        {isLoading ? collectingCount : collectedDiamondsCount}
      </Typography>
      {isCollected && <DiamondIcon sx={collectedDiamond} />}
      {!isCollected && (
        <IconButton
          // disabled={selectedId === challenge.id}
          sx={iconButtonStyles}
          onClick={handleClick}
        >
          <DiamondIcon sx={isLoading ? fade : diamondStyles} />
        </IconButton>
      )}
    </Box>
  );
};

export default CollectDiamonds;
