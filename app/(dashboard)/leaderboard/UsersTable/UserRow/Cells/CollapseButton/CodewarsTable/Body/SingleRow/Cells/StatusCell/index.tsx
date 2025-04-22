import { codewarsCellStyles } from "@/app/(dashboard)/leaderboard/styles";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { TableCell } from "@mui/material";
import TimeAgoChip from "../TimeAgoCell/TimeAgoChip";

interface Props {
  currentChallenge: CodewarsCompletedChallenge;
  // isUntracked: boolean;
}

const StatusCell = ({ currentChallenge }: Props) => {
  return (
    <TableCell sx={codewarsCellStyles} align="left">
      {/* {isUntracked && <TimeAgoChip challenge={currentChallenge} />} */}
      <TimeAgoChip challenge={currentChallenge} />
    </TableCell>
  );
};

export default StatusCell;
