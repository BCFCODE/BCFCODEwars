import {
  codewarsCellStyles,
  diamondBoxStyles,
} from "@/app/(dashboard)/leaderboard/styles";
import { Box, TableCell, Typography } from "@mui/material";
import DiamondIcon from "@mui/icons-material/Diamond";
import React from "react";

const DiamondsCell = () => {
  return (
    <TableCell sx={{ ...codewarsCellStyles }} align="right">
      <Box sx={diamondBoxStyles}>
        <Typography>{Math.floor(Math.random() * 100000)}</Typography>
        <DiamondIcon />
      </Box>
    </TableCell>
  );
};

export default DiamondsCell;
