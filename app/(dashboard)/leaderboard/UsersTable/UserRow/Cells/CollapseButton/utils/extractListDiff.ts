import { CodewarsCompletedChallenge } from "@/types/codewars";
import { applyDefaultTrackingAndRewardStatusToAll } from "./applyRewardStatus";
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

  const previousRecentIndex = fetchedChallenges.findIndex(
    (challenge) => challenge.id === previousMostRecentChallenge.id
  );

  let filtered = fetchedChallenges.slice(0, previousRecentIndex);
  let untrackedChallenges = applyDefaultTrackingAndRewardStatusToAll(filtered);

  const isMostRecentChallengeSame =
    previousMostRecentChallenge.id === mostRecentFetchedChallenge.id;

  untrackedChallenges = isMostRecentChallengeSame ? [] : untrackedChallenges;

  return untrackedChallenges;
};

export default extractListDiff;
