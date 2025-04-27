import { codewarsCellStyles } from "@/app/(dashboard)/leaderboard/styles";
import { TableCell } from "@mui/material";
import React from "react";

interface Props {
  completedAt: string;
}

const SolvedOnCell = ({ completedAt }: Props) => {
  return (
    <TableCell sx={codewarsCellStyles} align="left">
      {new Date(completedAt).toLocaleTimeString()}
    </TableCell>
  );
};

export default SolvedOnCell;
