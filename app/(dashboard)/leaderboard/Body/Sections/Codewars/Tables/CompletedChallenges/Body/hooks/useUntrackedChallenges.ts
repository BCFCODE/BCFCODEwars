import { CodewarsCompletedChallenge } from "@/types/codewars";
import { RewardStatus } from "@/types/diamonds";
import { AuthenticatedUser } from "@/types/users";
import { addUntrackedFlagsToChallenges } from "../../../../../Collapse/utils/addUntrackedFlags";

export interface UseUntrackedChallenges {
  untrackedChallenges: CodewarsCompletedChallenge[];
}

const useUntrackedChallenges = (
  currentUser: AuthenticatedUser
): UseUntrackedChallenges => {
  const codeChallenges = currentUser.codewars.codeChallenges;

  const untrackedChallenges = codeChallenges.untrackedChallenges ?? [];

  // const isFirstLogin = codeChallenges.list.every(
  //   (challenge) => challenge.rewardStatus === RewardStatus.UnclaimedDiamonds
  // );

  // const untrackedChallengesToDisplay = isFirstLogin ? [] : untrackedChallenges;

  // console.log(
  //   "useUntrackedChallenges/untrackedChallengesToDisplay",
  //   untrackedChallengesToDisplay,
    
  //   // "mostRecentUntrackedChallenge",
  //   // mostRecentUntrackedChallenge
  // );

  return {
    untrackedChallenges //: untrackedChallengesToDisplay,
  };
};

export default useUntrackedChallenges;
