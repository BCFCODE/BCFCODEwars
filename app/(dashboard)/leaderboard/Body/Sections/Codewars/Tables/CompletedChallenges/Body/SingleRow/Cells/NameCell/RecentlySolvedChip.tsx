import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Chip } from "@mui/material";
import { chipIconStyles, chipStyles } from "./styles";

const RecentlySolvedChip = () => {
  return (
    <Chip
      sx={chipStyles}
      size="small"
      label="Recently Solved"
      variant="outlined"
      color="warning"
      icon={<TaskAltIcon sx={chipIconStyles} />}
    />
  );
};

export default RecentlySolvedChip;
