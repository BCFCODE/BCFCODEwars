import { CodewarsCompletedChallenge } from "@/types/codewars";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Chip } from "@mui/material";
import { chipIconStyles, chipStyles } from "./styles";

interface Props {
  challenge: CodewarsCompletedChallenge;
}

const RecentlySolvedChip = ({ challenge }: Props) => {
  if (challenge.isUntracked)
    return (
      <Chip
        // TODO
        disabled={!challenge.isLatestUntracked}
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
