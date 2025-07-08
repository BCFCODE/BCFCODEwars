import { CodewarsCompletedChallenge } from "@/types/codewars";
import { CodeChallengesFilter, RewardStatus } from "@/types/diamonds";
import { useMemo } from "react";

export interface UseFilter {
  activeFilter: CodeChallengesFilter;
  both: CodewarsCompletedChallenge[];
  claimed: CodewarsCompletedChallenge[];
  unClaimed: CodewarsCompletedChallenge[];
}

interface Props {
  list: CodewarsCompletedChallenge[];
  activeFilter: CodeChallengesFilter;
}

const useFilter = ({ activeFilter, list }: Props): UseFilter => {
  // const { currentUser } = useCurrentUserContext();

  const both = list;

  const claimed = useMemo(
    () =>
      list.filter(
        (challenge) => challenge.rewardStatus === RewardStatus.ClaimedDiamonds
      ),
    [list]
  );

  const unClaimed = useMemo(
    () =>
      list.filter(
        (challenge) => challenge.rewardStatus === RewardStatus.UnclaimedDiamonds
      ),
    [list]
  );

  return {
    activeFilter,
    both,
    claimed,
    unClaimed,
  };
};

export default useFilter;
