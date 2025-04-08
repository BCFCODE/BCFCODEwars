import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import { CodeChallengesFilter, RewardStatus } from "@/types/diamonds";
import useUntrackedChallenges from "./useUntrackedChallenges";
import { CodewarsCompletedChallenge } from "@/types/codewars";

export interface useFilteredChallenges {
  activeFilter: string;
  both: CodewarsCompletedChallenge[];
  claimed: CodewarsCompletedChallenge[];
  unClaimed: CodewarsCompletedChallenge[];
  untrackedChallenges: CodewarsCompletedChallenge[];
}

const useFilteredChallenges = () => {
  const { currentUser } = useCurrentUserContext();

  const { untrackedChallenges } = useUntrackedChallenges(currentUser);

  const activeFilter: CodeChallengesFilter =
    currentUser.codewars.codeChallenges.challengeFilter;

  const list = currentUser.codewars.codeChallenges.list;

  const both = [...(untrackedChallenges ?? []), ...list];

  const claimed = list.filter(
    (challenge) => challenge.rewardStatus === RewardStatus.ClaimedDiamonds
  );

  const unClaimed = [
    ...(untrackedChallenges ?? []),
    ...list.filter(
      (challenge) => challenge.rewardStatus === RewardStatus.UnclaimedDiamonds
    ),
  ];

  return { activeFilter, both, claimed, unClaimed };
};

export default useFilteredChallenges;
