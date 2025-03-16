import { codewarsCellStyles } from "@/app/(dashboard)/leaderboard/styles";
import CodewarsService from "@/app/services/codewars-service";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { CircularProgress, TableCell } from "@mui/material";
import React from "react";
import useCollectDiamonds from "../../../Buttons/CollectDiamonds/hooks/useCollectDiamonds";
import DiamondsService from "@/app/services/diamonds-service";
import useCodewarsContext from "@/app/context/hooks/codewars/useCodewarsContext";

interface Props {
  challenge: CodewarsCompletedChallenge;
}

const RankCell = ({ challenge }: Props) => {
  return (
    <TableCell sx={codewarsCellStyles} align="center">
      {challenge.moreDetails ? Math.abs(challenge.moreDetails.rank.id) : ""}
    </TableCell>
  );
};

export default RankCell;
