import { TableHead, TableRow, TableCell } from "@mui/material";
import React from "react";
import { codewarsCellStyles } from "../../styles";

const LeaderboardHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell />
        <TableCell sx={codewarsCellStyles} width="auto">
          User
        </TableCell>
        <TableCell sx={codewarsCellStyles} align="right">
          Member Since
        </TableCell>
        <TableCell sx={codewarsCellStyles} align="right">
          Last Login
        </TableCell>
        <TableCell sx={codewarsCellStyles} align="right">
          Diamonds
        </TableCell>
        <TableCell sx={codewarsCellStyles} align="right">
          Rank
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default LeaderboardHead;
