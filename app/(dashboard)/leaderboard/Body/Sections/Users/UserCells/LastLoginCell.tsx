import { codewarsCellStyles } from "@/app/(dashboard)/leaderboard/styles";
import useDBUserContext from "@/app/context/hooks/useDBUserContext";
import { TableCell } from "@mui/material";
import React from "react";

const LastLoginCell = () => {
  const {
    currentUser: { lastLogin },
  } = useDBUserContext();

  return (
    <TableCell sx={codewarsCellStyles} align="right">
      {new Date(lastLogin).toLocaleTimeString()}
    </TableCell>
  );
};

export default LastLoginCell;
