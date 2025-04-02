import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Chip } from "@mui/material";
import { chipIconStyles, chipStyles } from "./styles";
import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";

interface Props {
  challengeId: string;
}

const RecentlySolvedChip = ({ challengeId }: Props) => {
  const {
    currentUser: {
      codewars: {
        codeChallenges: { mostRecentUntrackedChallenge },
      },
    },
  } = useCurrentUserContext();

  const mostRecentUntrackedChallengeId = mostRecentUntrackedChallenge?.id
    ? mostRecentUntrackedChallenge.id
    : "";

  // console.log(
  //   "RecentlySolvedChip/mostRecentUntrackedChallenge",
  //   mostRecentUntrackedChallenge
  // );
  return (
    <Chip
      // TODO
      disabled={challengeId !== mostRecentUntrackedChallengeId}
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
