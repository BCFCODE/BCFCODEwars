import { textStyles } from "@/app/(dashboard)/leaderboard/styles";
import {
  TableHead,
  TableRow,
  TableCell,
  FormControlLabel,
  Switch,
} from "@mui/material";
import SwitchCell from "./SwitchCell";
import NameCell from "./NameCell";
import RankCell from "./RankCell";
import DiamondsCell from "./DiamondsCell";
import SolveOnCell from "./SolveOnCell";

export default function Head() {
  return (
    <>
      <TableHead>
        <TableRow>
          <SwitchCell />
          <NameCell />
          <RankCell />
          <DiamondsCell />
          <SolveOnCell />
        </TableRow>
      </TableHead>
    </>
  );
}
