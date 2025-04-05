import { CodewarsCompletedChallenge } from "@/types/codewars";
import { RewardStatus } from "@/types/diamonds";
import { AuthenticatedUser } from "@/types/users";
import useSetLatestUntrackedChallenge from "../effects/useSetLatestUntrackedChallenge ";
import { markAllChallengesAsUntracked } from "../utils/markChallengeAsUntracked";
import useCurrentUserDispatchContext from "@/app/context/hooks/db/useCurrentUserDispatchContext";
import { useEffect } from "react";

export interface UseUntrackedChallenges {
  // markedUntrackedChallenges: CodewarsCompletedChallenge[];
  untrackedChallenges: CodewarsCompletedChallenge[];
  // mostRecentUntrackedChallenge: CodewarsCompletedChallenge;
}

const useUntrackedChallenges = (
  currentUser: AuthenticatedUser
): UseUntrackedChallenges => {
  

  const codeChallenges = currentUser.codewars.codeChallenges;

  const untrackedChallenges = codeChallenges.untrackedChallenges ?? [];

  useSetLatestUntrackedChallenge(untrackedChallenges);

  console.log(
    "useUntrackedChallenges/untrackedChallenges",
    untrackedChallenges
    // "mostRecentUntrackedChallenge",
    // mostRecentUntrackedChallenge
  );

  const isFirstLogin = codeChallenges.list.every(
    (challenge) => challenge.rewardStatus === RewardStatus.UnclaimedDiamonds
  );

  const markedUntrackedChallenges = isFirstLogin
    ? []
    : untrackedChallenges;

  return {
    untrackedChallenges: markedUntrackedChallenges,
  };
};

export default useUntrackedChallenges;
