import { codewarsCellStyles } from "@/app/(dashboard)/leaderboard/styles";
import useDBCurrentUserContext from "@/app/context/hooks/db/useDBCurrentUserContext";
import { TableCell } from "@mui/material";
import React from "react";

const LastLoginCell = () => {
  const {
    currentUser: { lastLogin },
  } = useDBCurrentUserContext();

  return (
    <TableCell sx={codewarsCellStyles} align="right">
      {new Date(lastLogin).toLocaleTimeString()}
    </TableCell>
  );
};

export default LastLoginCell;
