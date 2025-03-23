import DiamondIcon from "@mui/icons-material/Diamond";
import { TableCell } from "@mui/material";
import React, { useRef, useState } from "react";
import {
  collectedDiamondToggleStyles,
  diamondCellContainerStyles,
  DiamondToggleButton,
  DiamondToggleGroup,
  notCollectedDiamondToggleStyles,
} from "./styles";
import useCollectionToggle from "./useCollectionToggle";

const DiamondsCell = () => {
  const [collection, setCollection] = useState(() => ["collected"]);
  const { handle, collectionToggleState } = useCollectionToggle();

  const handleCollectionChange = (
    event: React.MouseEvent<HTMLElement>,
    newCollection: string[]
  ) => {
    if (newCollection.length) {
      setCollection(newCollection);
      console.log(collectionToggleState);
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
          value="collected"
          aria-label="Show collected diamonds"
          onClick={handle.selectCollectedDiamonds}
        >
          <DiamondIcon sx={collectedDiamondToggleStyles} />
        </DiamondToggleButton>
        <DiamondToggleButton
          value="notCollected"
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
