import { CodewarsCompletedChallenge } from "@/types/codewars";
// import { addUntrackedFlagsToChallenges } from "./addUntrackedFlags";

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
  //   "in extractListDiff >",
  //   "previousChallenges",
  //   previousChallenges,
  //   "fetchedChallenges",
  //   fetchedChallenges
  // );

  const previousRecentIndex = fetchedChallenges.findIndex(
    (challenge) => challenge.id === previousMostRecentChallenge.id
  );

  const untrackedChallenges  = fetchedChallenges.slice(0, previousRecentIndex);
  // const untrackedChallenges = addUntrackedFlagsToChallenges(challengesBeforeFlagging )
  console.log(
    "in extractListDiff >",
    "previousRecentIndex",
    previousRecentIndex,
    "untrackedChallenges",
    untrackedChallenges
  );
  const isMostRecentChallengeSame =
    previousMostRecentChallenge.id === mostRecentFetchedChallenge.id;
  // console.log("isMostRecentChallengeSame", isMostRecentChallengeSame);
  return isMostRecentChallengeSame ? [] : untrackedChallenges;
};

export default extractListDiff;
