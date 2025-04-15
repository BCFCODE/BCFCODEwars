import { useCurrentUser } from "@/app/(dashboard)/leaderboard/context/CurrentUser";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { CodeChallengesFilter, RewardStatus } from "@/types/diamonds";

export interface UseFilter {
  activeFilter: string;
  both: CodewarsCompletedChallenge[];
  claimed: CodewarsCompletedChallenge[];
  unClaimed: CodewarsCompletedChallenge[];
}

const useFilter = (): UseFilter => {
  const { codewars } = useCurrentUser();

  const activeFilter: CodeChallengesFilter =
    codewars.codeChallenges.challengeFilter;

  const list = codewars.codeChallenges.list;

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
  };
};

export default useFilter;
