import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Chip } from "@mui/material";
import { chipIconStyles, chipStyles } from "./styles";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";

const RecentlySolvedChip = () => {
  const { currentUser } = useCurrentUserContext();
  console.log("RecentlySolvedChip/currentUser", currentUser);
  return (
    <Chip
      // TODO
      disabled
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
