import { textStyles } from "@/app/(dashboard)/leaderboard/styles";
import { TableCell } from "@mui/material";
import React from "react";

const RankCell = () => {
  return (
    <TableCell sx={textStyles} align="center">
      Rank
    </TableCell>
  );
};

export default RankCell;
