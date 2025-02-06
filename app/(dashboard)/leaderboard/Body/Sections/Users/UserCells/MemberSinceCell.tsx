import { codewarsCellStyles } from "@/app/(dashboard)/leaderboard/styles";
import useDBUserContext from "@/app/context/hooks/useDBUserContext";
import { TableCell } from "@mui/material";
import React from "react";

const MemberSinceCell = () => {
  const {
    currentUser: { createdAt },
  } = useDBUserContext();

  return (
    <TableCell sx={codewarsCellStyles} align="right">
      {new Date(createdAt).toLocaleDateString()}
    </TableCell>
  );
};

export default MemberSinceCell;
