import { Box, TableCell } from "@mui/material";
import ChallengeName from "./ChallengeName";
import RecentlySolvedChip from "./RecentlySolvedChip";
import { contentBoxStyles, nameCellStyles } from "./styles";

interface Props {
  challengeName: string;
  isUntracked: boolean;
}

const NameCell = ({ challengeName, isUntracked }: Props) => {
  return (
    <TableCell sx={nameCellStyles}>
      <Box sx={contentBoxStyles}>
        <ChallengeName text={challengeName} length={55} />
        {isUntracked && <RecentlySolvedChip />}
      </Box>
    </TableCell>
  );
};

export default NameCell;
