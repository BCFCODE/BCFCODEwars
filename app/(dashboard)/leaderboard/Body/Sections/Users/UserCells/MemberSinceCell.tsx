import { codewarsCellStyles } from "@/app/(dashboard)/leaderboard/styles";
import useDBCurrentUserContext from "@/app/context/hooks/useDBCurrentUserContext";
import { TableCell } from "@mui/material";
import React from "react";

const MemberSinceCell = () => {
  const {
    currentUser: { createdAt },
  } = useDBCurrentUserContext();

  return (
    <TableCell sx={codewarsCellStyles} align="right">
      {new Date(createdAt).toLocaleDateString()}
    </TableCell>
  );
};

export default MemberSinceCell;
