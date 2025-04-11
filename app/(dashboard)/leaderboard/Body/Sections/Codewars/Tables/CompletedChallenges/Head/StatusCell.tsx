import { textStyles } from "@/app/(dashboard)/leaderboard/styles";
import { TableCell } from "@mui/material";
import React from "react";

const StatusCell = () => {
  return (
    <TableCell sx={textStyles} align="center">
      Status
    </TableCell>
  );
};

export default StatusCell;
