import { codewarsCellStyles } from "@/app/(dashboard)/leaderboard/styles";
import useCurrentUserContext from "@/app/context/hooks/useCurrentUserContext";
import { TableCell } from "@mui/material";
import React from "react";

const LastActivityCell = () => {
  const { currentUser } = useCurrentUserContext();

  const lastActivity = new Date(
    currentUser.activity.lastActiveTime ?? currentUser.lastLogin
  );

  return (
    <TableCell
      key={lastActivity.getTime()}
      sx={codewarsCellStyles}
      align="right"
    >
       {lastActivity.toLocaleString()}
    </TableCell>
  );
};

export default LastActivityCell;
