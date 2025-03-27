import { TableHead, TableRow } from "@mui/material";
import DiamondsCell from "./DiamondsCell";
import NameCell from "./NameCell";
import RankCell from "./RankCell";
import SolveOnCell from "./SolveOnCell";
import DateCompletedCell from "./SwitchCell";

export default function Head() {
  return (
    <>
      <TableHead>
        <TableRow>
          <DateCompletedCell />
          <NameCell />
          <RankCell />
          <DiamondsCell />
          <SolveOnCell />
        </TableRow>
      </TableHead>
    </>
  );
}
