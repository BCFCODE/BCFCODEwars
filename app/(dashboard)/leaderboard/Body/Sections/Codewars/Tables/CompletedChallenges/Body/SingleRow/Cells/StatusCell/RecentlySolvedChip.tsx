import { CodewarsCompletedChallenge } from "@/types/codewars";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Chip } from "@mui/material";
import { chipIconStyles, chipStyles } from "../NameCell/styles";
import dayjs from "@/utils/dayjs";


interface Props {
  challenge: CodewarsCompletedChallenge;
}

const RecentlySolvedChip = ({ challenge }: Props) => {
  // if (challenge.isUntracked)
    return (
      <Chip
        // TODO
        // disabled={!challenge.isLatestUntracked}
        sx={chipStyles}
        size="small"
        label={dayjs(challenge.completedAt).fromNow()}
        variant="outlined"
        color="success"
        icon={<TaskAltIcon sx={chipIconStyles} />}
      />
    );
};

export default RecentlySolvedChip;
