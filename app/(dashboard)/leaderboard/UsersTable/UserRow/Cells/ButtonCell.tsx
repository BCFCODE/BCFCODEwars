import { TableCell } from "@mui/material";
import React from "react";
import OpenButton from "./CollapseButton/OpenButton";
import { codewarsCellStyles } from "@/app/(dashboard)/leaderboard/styles";

const ButtonCell = () => {
  return (
    <TableCell sx={{ ...codewarsCellStyles, maxWidth: 5 }} align="left">
      <OpenButton />
    </TableCell>
  );
};

export default ButtonCell;
