import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import { CodeChallengesFilter, RewardStatus } from "@/types/diamonds";
import useUntrackedChallenges from "./useUntrackedChallenges";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import useCurrentUserDispatchContext from "@/app/context/hooks/db/useCurrentUserDispatchContext";

export interface UseFilter {
  activeFilter: string;
  both: CodewarsCompletedChallenge[];
  claimed: CodewarsCompletedChallenge[];
  unClaimed: CodewarsCompletedChallenge[];
  untrackedChallenges: CodewarsCompletedChallenge[];
}

const useFilter = (): UseFilter => {
  console.log("useFilter Rendered...");

  const { currentUser } = useCurrentUserContext();

  const {
    markedUntrackedChallenges,
    untrackedChallenges,
  } = useUntrackedChallenges(currentUser);

  console.log(
    "useFilter/markedUntrackedChallenges",
    markedUntrackedChallenges
    // "useFilter/mostRecentUntrackedChallenge",
    // mostRecentUntrackedChallenge
  );

  const activeFilter: CodeChallengesFilter =
    currentUser.codewars.codeChallenges.challengeFilter;

  const list = currentUser.codewars.codeChallenges.list;

  const both = [...(markedUntrackedChallenges ?? []), ...list];

  const claimed = list.filter(
    (challenge) => challenge.rewardStatus === RewardStatus.ClaimedDiamonds
  );

  const unClaimed = [
    ...(markedUntrackedChallenges ?? []),
    ...list.filter(
      (challenge) => challenge.rewardStatus === RewardStatus.UnclaimedDiamonds
    ),
  ];

  return {
    activeFilter,
    both,
    claimed,
    unClaimed,
    untrackedChallenges,
  };
};

export default useFilter;
