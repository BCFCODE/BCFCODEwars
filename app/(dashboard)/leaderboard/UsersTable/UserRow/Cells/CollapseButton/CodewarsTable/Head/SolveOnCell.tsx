import { textStyles } from "@/app/(dashboard)/leaderboard/styles";
import { TableCell } from "@mui/material";
import React from "react";

const SolveOnCell = () => {
  return (
    <TableCell sx={textStyles} align="left">
      Solved On
    </TableCell>
  );
};

export default SolveOnCell;
