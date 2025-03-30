import { CodewarsCompletedChallenge } from "@/types/codewars";
import getTime from "./getTime";

interface Props {
  previousChallenges: CodewarsCompletedChallenge[];
  fetchedChallenges: CodewarsCompletedChallenge[];
}

const extractListDiff = ({
  previousChallenges,
  fetchedChallenges,
}: Props): CodewarsCompletedChallenge[] => {
  const [previousMostRecentChallenge] = previousChallenges;

  const previousRecentIndex = previousChallenges.findIndex(
    (challenge) =>
      challenge.id === previousMostRecentChallenge.id ||
      getTime(challenge.completedAt) <
        getTime(previousMostRecentChallenge.completedAt)
  );

  const untrackedChallenges =
    previousRecentIndex < 0
      ? []
      : fetchedChallenges.slice(0, previousRecentIndex);

  return untrackedChallenges;
};

export default extractListDiff;
