import { textStyles } from "@/app/(dashboard)/leaderboard/styles";
import { TableCell } from "@mui/material";
import React from "react";

const DiamondsCell = () => {
  return (
    <TableCell sx={textStyles} align="right">
      Diamonds
    </TableCell>
  );
};

export default DiamondsCell;
