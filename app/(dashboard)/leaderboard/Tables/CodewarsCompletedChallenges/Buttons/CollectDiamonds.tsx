import { CodewarsCompletedChallenge } from "@/types/codewars";
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
import useDiamonds from "../hooks/useDiamonds";

interface Props {
  challenge: CodewarsCompletedChallenge;
}

const CollectDiamonds = ({ challenge: { id } }: Props) => {
  const { collectDiamonds } = useDiamonds(id);
  const [isLoading, setLoading] = useState(false);
  const [collectedDiamonds, setCollectedDiamonds] = useState<number>();
  const [isCollected, setIsCollected] = useState<boolean>();
  const [collectingCounter, setCounter] = useState<number>(0);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isLoading && !isCollected) {
      timer = setTimeout(() => {
        setCounter((collectingCounter) => collectingCounter + 1);
      }, 50);
    }

    if (collectingCounter >= (collectedDiamonds ?? 500)) {
      setLoading(false);
      setIsCollected(true);
    }

    isCollected && setCounter(0); // Reset counter when isCollected becomes true or isLoading stops

    return () => {
      timer && clearTimeout(timer);
    };
  }, [isLoading, isCollected, collectingCounter]);

  return (
    <Box sx={diamondBoxStyle}>
      <Typography sx={diamondTextStyle}>
        {isLoading ? collectingCounter : collectedDiamonds}
      </Typography>
      {isCollected && <DiamondIcon sx={collectedDiamond} />}
      {!isCollected && (
        <IconButton
          sx={iconButtonStyles}
          onClick={async () => {
            setLoading(true);
            const { isCollected, rankId, collectedDiamonds } =
              await collectDiamonds();
            isCollected && setCollectedDiamonds(collectedDiamonds);
          }}
        >
          <DiamondIcon sx={isLoading ? fade : diamondStyles} />
        </IconButton>
      )}
    </Box>
  );
};

export default CollectDiamonds;
