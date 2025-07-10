import { TableHead, TableRow, TableCell } from "@mui/material";
import React from "react";
import { codewarsCellStyles } from "../styles";

const LeaderboardHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell />
        <TableCell sx={codewarsCellStyles} width="auto">
          User
        </TableCell>
        <TableCell sx={codewarsCellStyles} align="right">
          Last Activity
        </TableCell>
        <TableCell sx={codewarsCellStyles} align="left">
          Since
        </TableCell>
        <TableCell sx={codewarsCellStyles} align="right">
          Diamonds
        </TableCell>
        <TableCell sx={codewarsCellStyles} align="center">
          Rank
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default LeaderboardHeader;
