import { codewarsCellStyles } from "@/app/(dashboard)/leaderboard/styles";
import CodewarsService from "@/app/services/codewars-service";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { TableCell } from "@mui/material";
import React from "react";

const { getRank } = new CodewarsService();

interface Props {
  challenge: CodewarsCompletedChallenge;
}

const RankCell = ({ challenge }: Props) => {
  return (
    <TableCell sx={codewarsCellStyles} align="center">
      {challenge.moreDetails ? getRank(challenge.moreDetails.rank.id) : ""}
    </TableCell>
  );
};

export default RankCell;
