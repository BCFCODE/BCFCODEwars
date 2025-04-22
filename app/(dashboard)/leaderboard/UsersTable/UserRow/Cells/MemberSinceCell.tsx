import { codewarsCellStyles } from "@/app/(dashboard)/leaderboard/styles";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import { TableCell } from "@mui/material";
import React from "react";

const MemberSinceCell = () => {
  const {
    currentUser: { firstLogin },
  } = useCurrentUserContext();

  return (
    <TableCell sx={codewarsCellStyles} align="right">
      {new Date(firstLogin).toLocaleDateString()}
    </TableCell>
  );
};

export default MemberSinceCell;
