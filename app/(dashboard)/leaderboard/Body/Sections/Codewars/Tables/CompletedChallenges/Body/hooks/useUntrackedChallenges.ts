import { CodewarsCompletedChallenge } from "@/types/codewars";
import { markAllChallengesAsUntracked } from "../utils/markChallengeAsUntracked";

const useUntrackedChallenges = (
  untrackedChallenges: CodewarsCompletedChallenge[]
) => {
  const markedUntrackedChallenges =
    markAllChallengesAsUntracked(untrackedChallenges);
  return { markedUntrackedChallenges };
};

export default useUntrackedChallenges;
