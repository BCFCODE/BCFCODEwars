import DiamondIcon from "@mui/icons-material/Diamond";
import { TableCell } from "@mui/material";
import React, { useState } from "react";
import {
  collectedDiamondToggleStyles,
  diamondCellContainerStyles,
  DiamondToggleButton,
  DiamondToggleGroup,
  notCollectedDiamondToggleStyles,
  // recentlySolvedToggleStyles,
} from "./styles";
import useCollectionToggle from "./useCollectionToggle";
import { CodeChallengesFilter } from "@/types/diamonds";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const DiamondsCell = () => {
  const [collection, setCollection] = useState(() => [
    CodeChallengesFilter.ClaimedDiamonds,
  ]);
  const { handle } = useCollectionToggle();

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
          onClick={handle.selectCollectedDiamonds}
        >
          <DiamondIcon sx={collectedDiamondToggleStyles} />
        </DiamondToggleButton>
        {/* <DiamondToggleButton
          value={CodeChallengesFilter.ClaimedDiamonds}
          aria-label="Show collected diamonds"
          onClick={handle.selectCollectedDiamonds}
        >
          <TaskAltIcon sx={recentlySolvedToggleStyles} />
        </DiamondToggleButton> */}
        <DiamondToggleButton
          value={CodeChallengesFilter.UnclaimedDiamonds}
          aria-label="Show uncollected diamonds"
          onClick={handle.selectNotCollectedDiamonds}
        >
          <DiamondIcon sx={notCollectedDiamondToggleStyles} />
        </DiamondToggleButton>
      </DiamondToggleGroup>
    </TableCell>
  );
};

export default DiamondsCell;
