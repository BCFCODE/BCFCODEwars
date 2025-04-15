import { CodewarsCompletedChallenge } from "@/types/codewars";

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

  const previousRecentIndex = fetchedChallenges.findIndex(
    (challenge) => challenge.id === previousMostRecentChallenge.id
  );

  let untrackedChallenges = fetchedChallenges.slice(0, previousRecentIndex);

  const isMostRecentChallengeSame =
    previousMostRecentChallenge.id === mostRecentFetchedChallenge.id;

  untrackedChallenges = isMostRecentChallengeSame ? [] : untrackedChallenges;

  
  return untrackedChallenges;
};

export default extractListDiff;
