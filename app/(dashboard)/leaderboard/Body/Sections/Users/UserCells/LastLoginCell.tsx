import { codewarsCellStyles } from "@/app/(dashboard)/leaderboard/styles";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import { TableCell } from "@mui/material";
import React from "react";

const LastLoginCell = () => {
  const {
    currentUser: { lastLogin },
  } = useCurrentUserContext();

  return (
    <TableCell sx={codewarsCellStyles} align="right">
      {new Date(lastLogin).toLocaleTimeString()}
    </TableCell>
  );
};

export default LastLoginCell;
