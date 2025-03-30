import FiberNewIcon from "@mui/icons-material/FiberNew";
import { Box, Chip, TableCell, Typography } from "@mui/material";
import {
  chipIconStyles,
  chipStyles,
  contentBoxStyles,
  nameCellStyles,
  textStyles,
} from "./styles";

import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

import TaskAltIcon from "@mui/icons-material/TaskAlt";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import StarIcon from "@mui/icons-material/Star";

interface Props {
  challengeName: string;
}

const NameCell = ({ challengeName }: Props) => {
  const nameLength = 40;
  return (
    <TableCell sx={nameCellStyles}>
      <Box sx={contentBoxStyles}>
        <Typography sx={textStyles}>
          {challengeName.length > nameLength
            ? `${challengeName.slice(0, nameLength)}...`
            : challengeName}
        </Typography>
        <Chip
          sx={chipStyles}
          size="small"
          label="Recently Solved"
          variant="outlined"
          color="warning"
          icon={<TaskAltIcon sx={chipIconStyles} />}
        />
      </Box>
    </TableCell>
  );
};

export default NameCell;
