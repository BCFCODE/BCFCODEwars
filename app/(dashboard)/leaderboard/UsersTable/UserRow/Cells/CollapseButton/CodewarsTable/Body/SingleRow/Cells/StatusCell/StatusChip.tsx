import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Chip } from "@mui/material";
import { chipIconStyles, chipStyles } from "../NameCell/styles";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import getColorChip from "../TimeAgoCell/getColorChip";
import dayjs from "@/utils/dayjs";

interface Props {
  challenge: CodewarsCompletedChallenge;
}

const StatusChip = ({ challenge }: Props) => {
  // if (challenge.isUntracked)
  return (
    <Chip
      // TODO
      // disabled={!challenge.isLatestUntracked}
      sx={chipStyles}
      size="small"
      label={dayjs(challenge.completedAt).fromNow()}
      variant="outlined"
      color={getColorChip(challenge.completedAt)}
      icon={<TaskAltIcon sx={chipIconStyles} />}
    />
  );
};

export default StatusChip;
