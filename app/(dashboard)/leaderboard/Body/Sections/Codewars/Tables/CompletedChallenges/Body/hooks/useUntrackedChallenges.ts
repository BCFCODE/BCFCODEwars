import { CurrentUser } from "@/types/users";
import { markAllChallengesAsUntracked } from "../utils/markChallengeAsUntracked";
import { RewardStatus } from "@/types/diamonds";

const useUntrackedChallenges = (currentUser: CurrentUser) => {
  const codeChallenges = currentUser.codewars.codeChallenges;

  let untrackedChallenges = codeChallenges.untrackedChallenges ?? []
// console.log('useUntrackedChallenges/untrackedChallenges', untrackedChallenges) 
  const isFirstLogin = codeChallenges.list.every(
    (challenge) => challenge.rewardStatus === RewardStatus.UnclaimedDiamonds
  );

  const markedUntrackedChallenges = isFirstLogin
    ? []
    : markAllChallengesAsUntracked(untrackedChallenges);
  return { markedUntrackedChallenges, untrackedChallenges };
};

export default useUntrackedChallenges;
