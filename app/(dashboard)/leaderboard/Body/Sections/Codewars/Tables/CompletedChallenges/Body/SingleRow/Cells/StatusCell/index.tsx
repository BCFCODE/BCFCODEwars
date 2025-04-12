import { codewarsCellStyles } from "@/app/(dashboard)/leaderboard/styles";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { TableCell } from "@mui/material";
import StatusChip from "./StatusChip";

interface Props {
  currentChallenge: CodewarsCompletedChallenge;
  // isUntracked: boolean;
}

const StatusCell = ({ currentChallenge }: Props) => {
  return (
    <TableCell sx={codewarsCellStyles} align="center">
      {/* {isUntracked && <StatusChip challenge={currentChallenge} />} */}
      <StatusChip challenge={currentChallenge} />
    </TableCell>
  );
};

export default StatusCell;
