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
  const [mostRecentFetchedChallenge] = fetchedChallenges;
  // console.log(
  //   "previousChallenges",
  //   previousChallenges,
  //   "fetchedChallenges",
  //   fetchedChallenges
  // );

  const previousRecentIndex = previousChallenges.findIndex(
    (challenge) =>
      getTime(challenge.completedAt) <
      getTime(previousMostRecentChallenge.completedAt)
  );

  const isMostRecentChallengeSame =
    previousMostRecentChallenge.id === mostRecentFetchedChallenge.id;

  const untrackedChallenges = fetchedChallenges.slice(0, previousRecentIndex);
  // console.log(
  //   "in extractListDiff >",

  //   "previousRecentIndex",
  //   previousRecentIndex,
  //   "untrackedChallenges",
  //   untrackedChallenges
  // );
  return isMostRecentChallengeSame ? [] : untrackedChallenges;
};

export default extractListDiff;
