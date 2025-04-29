import { CodeChallengesFilter } from "@/types/diamonds";
import DiamondIcon from "@mui/icons-material/Diamond";
import { TableCell } from "@mui/material";
import React, { useState } from "react";
import {
  collectedDiamondToggleStyles,
  diamondCellContainerStyles,
  DiamondToggleButton,
  DiamondToggleGroup,
  notCollectedDiamondToggleStyles,
} from "./styles";
import useToggleCollection from "./useCollectionToggle";

const DiamondsCell = () => {
  const [collection, setCollection] = useState(() => [
    CodeChallengesFilter.ClaimedDiamonds,
    CodeChallengesFilter.UnclaimedDiamonds,
  ]);
  const { handle } = useToggleCollection();

  const handleCollectionChange = (
    event: React.MouseEvent<HTMLElement>,
    newCollection: string[]
  ) => {
    if (newCollection.length) {
      setCollection(newCollection as CodeChallengesFilter[]);
    }
  };

  return (
    <TableCell sx={diamondCellContainerStyles} align="center">
      <DiamondToggleGroup
        value={collection}
        onChange={handleCollectionChange}
        aria-label="diamond collection filter"
      >
        <DiamondToggleButton
          value={CodeChallengesFilter.ClaimedDiamonds}
          aria-label="Show collected diamonds"
          onClick={handle.onClaimedDiamondIcon}
        >
          <DiamondIcon sx={collectedDiamondToggleStyles} />
        </DiamondToggleButton>
        <DiamondToggleButton
          value={CodeChallengesFilter.UnclaimedDiamonds}
          aria-label="Show uncollected diamonds"
          onClick={handle.onUnclaimedDiamondIcon}
        >
          <DiamondIcon sx={notCollectedDiamondToggleStyles} />
        </DiamondToggleButton>
      </DiamondToggleGroup>
    </TableCell>
  );
};

export default DiamondsCell;
