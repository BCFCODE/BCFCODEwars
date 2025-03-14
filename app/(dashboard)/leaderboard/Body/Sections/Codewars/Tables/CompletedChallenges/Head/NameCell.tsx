import { textStyles } from "@/app/(dashboard)/leaderboard/styles";
import { TableCell } from "@mui/material";
import React from "react";

const NameCell = () => {
  return <TableCell sx={textStyles}>Challenge Name</TableCell>;
};

export default NameCell;
