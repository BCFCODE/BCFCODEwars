import { codewarsCellStyles } from "@/app/(dashboard)/leaderboard/styles";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import { TableCell } from "@mui/material";
import React from "react";

const RankCell = () => {
  const { currentUser } = useCurrentUserContext();
  
  return (
    <TableCell sx={codewarsCellStyles} align="center">
      {currentUser.codewars.ranks?.overall.name ?? `N/A`}
    </TableCell>
  );
};

export default RankCell;
