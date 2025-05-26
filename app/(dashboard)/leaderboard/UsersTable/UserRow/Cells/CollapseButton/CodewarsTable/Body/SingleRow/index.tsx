import { TableRow } from "@mui/material";
import { ReactNode } from "react";
import RankCell from "./Cells/RankCell";
import SolvedOnCell from "./Cells/SolvedOnCell";
import NameCell from "./Cells/NameCell";
import DateCompletedCell from "./Cells/DateCompletedCell";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import CollectDiamondsCell from "./Cells/CollectDiamondsCell";
import CollectDiamonds from "../../Buttons/CollectButton";
import TimeAgoCell from "./Cells/TimeAgoCell";

interface Props {
  challenge: CodewarsCompletedChallenge;
}

const SingleRow = ({ challenge }: Props) => {
  return (
    <TableRow>
      <TimeAgoCell currentChallenge={challenge} />
      <NameCell currentChallenge={challenge} />
      <DateCompletedCell completedAt={challenge.completedAt} />
      <SolvedOnCell completedAt={challenge.completedAt} />
      <CollectDiamondsCell>
        <CollectDiamonds currentChallenge={challenge} />
      </CollectDiamondsCell>
      <RankCell {...{ challenge }} />
    </TableRow>
  );
};

export default SingleRow;
