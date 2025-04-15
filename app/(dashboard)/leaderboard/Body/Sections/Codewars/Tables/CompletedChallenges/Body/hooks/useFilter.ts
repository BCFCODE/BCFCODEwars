import { CodeChallengesFilter, RewardStatus } from "@/types/diamonds";
import { useUsersStore } from "@/app/store/users";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { AuthenticatedUser } from "@/types/users";

export interface UseFilter {
  activeFilter: string;
  both: CodewarsCompletedChallenge[];
  claimed: CodewarsCompletedChallenge[];
  unClaimed: CodewarsCompletedChallenge[];
}

const useFilter = (): UseFilter => {
  const currentUser = useUsersStore((s) => s.currentUser) as AuthenticatedUser;

  const activeFilter: CodeChallengesFilter =
    currentUser.codewars.codeChallenges.challengeFilter;

  const list = currentUser.codewars.codeChallenges.list;

  const both = [...list];

  const claimed = list.filter(
    (challenge) => challenge.rewardStatus === RewardStatus.ClaimedDiamonds
  );

  const unClaimed = [
    ...list.filter(
      (challenge) => challenge.rewardStatus === RewardStatus.UnclaimedDiamonds
    ),
  ];

  return {
    activeFilter,
    both,
    claimed,
    unClaimed,
    // untrackedChallenges,
  };
};

export default useFilter;
