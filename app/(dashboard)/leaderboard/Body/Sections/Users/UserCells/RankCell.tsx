import { codewarsCellStyles } from "@/app/(dashboard)/leaderboard/styles";
import { TableCell } from "@mui/material";
import React from "react";

const RankCell = () => {
  return (
    <TableCell sx={codewarsCellStyles} align="center">
      N/A
    </TableCell>
  );
};

export default RankCell;
