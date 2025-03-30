import { TableRow } from "@mui/material";
import { ReactNode } from "react";
import RankCell from "./Cells/RankCell";
import SolvedOnCell from "./Cells/SolvedOnCell";
import NameCell from "./Cells/NameCell";
import DateCompletedCell from "./Cells/DateCompletedCell";
import { CodewarsCompletedChallenge } from "@/types/codewars";

interface Props {
  challenge: CodewarsCompletedChallenge;
  children: ReactNode;
}

const SingleRow = ({ challenge, children }: Props) => {
  return (
    <TableRow>
      <DateCompletedCell completedAt={challenge.completedAt} />
      <NameCell challengeName={challenge.name} />
      <RankCell {...{ challenge }} />
      {children}
      <SolvedOnCell completedAt={challenge.completedAt} />
    </TableRow>
  );
};

export default SingleRow;
