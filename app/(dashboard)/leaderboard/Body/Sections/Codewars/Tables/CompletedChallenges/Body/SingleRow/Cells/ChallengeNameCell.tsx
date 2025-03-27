import { codewarsCellStyles } from "@/app/(dashboard)/leaderboard/styles";
import { TableCell } from "@mui/material";
import React from "react";

interface Props {
  challengeName: string;
}

const ChallengeNameCell = ({ challengeName }: Props) => {
  return (
    <TableCell sx={codewarsCellStyles}>
      {challengeName.length > 50
        ? `${challengeName.slice(0, 50)}...`
        : challengeName}
    </TableCell>
  );
};

export default ChallengeNameCell;
