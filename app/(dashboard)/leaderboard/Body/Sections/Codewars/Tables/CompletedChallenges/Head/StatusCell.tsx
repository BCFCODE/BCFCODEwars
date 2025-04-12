import { textStyles } from "@/app/(dashboard)/leaderboard/styles";
import { TableCell } from "@mui/material";
import React from "react";

const TimeAgoCell = () => {
  return (
    <TableCell sx={textStyles} align="left">
      Time Ago
    </TableCell>
  );
};

export default TimeAgoCell;
