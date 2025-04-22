import { TableHead, TableRow } from "@mui/material";
import DiamondsCell from "./DiamondsCell";
import NameCell from "./NameCell";
import RankCell from "./RankCell";
import SolveOnCell from "./SolveOnCell";
import DateCompletedCell from "./DateCompletedCell";
import TimeAgoCell from "./StatusCell";

export default function Head() {
  return (
    <>
      <TableHead>
        <TableRow>
          <TimeAgoCell />
          <NameCell />
          <DateCompletedCell />
          <SolveOnCell />
          <DiamondsCell />
          <RankCell />
        </TableRow>
      </TableHead>
    </>
  );
}
