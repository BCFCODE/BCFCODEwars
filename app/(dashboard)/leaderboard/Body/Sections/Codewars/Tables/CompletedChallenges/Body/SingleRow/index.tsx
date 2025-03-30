import { TableRow } from "@mui/material";
import { ReactNode } from "react";
import RankCell from "./Cells/RankCell";
import SolvedOnCell from "./Cells/SolvedOnCell";
import NameCell from "./Cells/NameCell";
import DateCompletedCell from "./Cells/DateCompletedCell";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import CollectDiamondsCell from "./Cells/CollectDiamondsCell";
import CollectDiamonds from "../../Buttons/CollectDiamonds";

interface Props {
  challenge: CodewarsCompletedChallenge;
}

const SingleRow = ({ challenge }: Props) => {
  return (
    <TableRow>
      <DateCompletedCell completedAt={challenge.completedAt} />
      <NameCell
        challengeName={challenge.name}
        isUntracked={challenge.isUntracked ?? false}
      />
      <RankCell {...{ challenge }} />
      <CollectDiamondsCell>
        <CollectDiamonds currentChallenge={challenge} />
      </CollectDiamondsCell>
      <SolvedOnCell completedAt={challenge.completedAt} />
    </TableRow>
  );
};

export default SingleRow;
