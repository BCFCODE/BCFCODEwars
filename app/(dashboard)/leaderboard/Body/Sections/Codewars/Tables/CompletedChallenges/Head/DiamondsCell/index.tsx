import { textStyles } from "@/app/(dashboard)/leaderboard/styles";
import DiamondIcon from "@mui/icons-material/Diamond";
import { TableCell } from "@mui/material";
import React from "react";
import {
  collectedDiamondToggleStyles,
  DiamondToggleButton,
  DiamondToggleGroup,
  notCollectedDiamondToggleStyles,
} from "./styles";

const DiamondsCell = () => {
  const [collection, setCollection] = React.useState(() => ["collected"]);

  const handleCollections = (
    event: React.MouseEvent<HTMLElement>,
    newCollection: string[]
  ) => {
    if (newCollection.length) {
      setCollection(newCollection);
    }
  };

  return (
    <TableCell
      sx={{
        ...textStyles,
        // backgroundColor: "black",
        padding: 0,
        display: "flex",
        height: 51,
        justifyContent: "center",
      }}
      align="center"
    >
      <DiamondToggleGroup
        value={collection}
        onChange={handleCollections}
        aria-label="diamond collection filter"
      >
        <DiamondToggleButton
          value="collected"
          aria-label="Show collected diamonds"
        >
          <DiamondIcon sx={collectedDiamondToggleStyles} />
        </DiamondToggleButton>
        <DiamondToggleButton
          value="notCollected"
          aria-label="Show uncollected diamonds"
        >
          <DiamondIcon sx={notCollectedDiamondToggleStyles} />
        </DiamondToggleButton>
      </DiamondToggleGroup>
    </TableCell>
  );
};

export default DiamondsCell;
