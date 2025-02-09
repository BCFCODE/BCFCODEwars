import { codewarsCellStyles } from "@/app/(dashboard)/leaderboard/styles";
import CodewarsService from "@/app/services/codewars-service";
import { DBCodewarsCompletedChallenge } from "@/types/db/codewars";
import { TableCell } from "@mui/material";
import React from "react";

const { getRank } = new CodewarsService();

interface Props {
  challenge: DBCodewarsCompletedChallenge;
}

const RankCell = ({ challenge }: Props) => {
  return (
    <TableCell sx={codewarsCellStyles} align="center">
      {challenge.rank?.id ? getRank(challenge) : ""}
    </TableCell>
  );
};

export default RankCell;
