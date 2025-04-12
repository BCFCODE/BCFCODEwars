import { codewarsCellStyles } from "@/app/(dashboard)/leaderboard/styles";
import { Box, TableCell } from "@mui/material";
import RecentlySolvedChip from "../StatusCell/RecentlySolvedChip";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import ChallengeName from "../NameCell/ChallengeName";
import { contentBoxStyles } from "../NameCell/styles";

interface Props {
  currentChallenge: CodewarsCompletedChallenge;
  // isUntracked: boolean;
}

const StatusCell = ({ currentChallenge }: Props) => {
  return (
    <TableCell sx={codewarsCellStyles} align="center">
      {/* {isUntracked && <RecentlySolvedChip challenge={currentChallenge} />} */}
      <RecentlySolvedChip challenge={currentChallenge} />
    </TableCell>
  );
};

export default StatusCell;
