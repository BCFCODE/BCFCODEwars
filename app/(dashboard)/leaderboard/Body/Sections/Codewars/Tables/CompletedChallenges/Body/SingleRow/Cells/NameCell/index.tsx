import { Box, TableCell } from "@mui/material";
import ChallengeName from "./ChallengeName";
import RecentlySolvedChip from "./RecentlySolvedChip";
import { contentBoxStyles, nameCellStyles } from "./styles";
import { CodewarsCompletedChallenge } from "@/types/codewars";

interface Props {
  currentChallenge: CodewarsCompletedChallenge;
  isUntracked: boolean;
}

const NameCell = ({ currentChallenge, isUntracked }: Props) => {
  return (
    <TableCell sx={nameCellStyles}>
      <Box sx={contentBoxStyles}>
        <ChallengeName text={currentChallenge.name} length={55} />
        {isUntracked && <RecentlySolvedChip challenge={currentChallenge} />}
      </Box>
    </TableCell>
  );
};

export default NameCell;
