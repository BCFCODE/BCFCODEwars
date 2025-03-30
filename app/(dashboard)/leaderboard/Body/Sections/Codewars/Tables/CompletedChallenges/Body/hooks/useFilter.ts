import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import { CodeChallengesFilter, RewardStatus } from "@/types/diamonds";
import useUntrackedChallenges from "./useUntrackedChallenges";

const useFilter = () => {
  console.log("useFilter Rendered...");

  const { currentUser } = useCurrentUserContext();

  const { markedUntrackedChallenges, untrackedChallenges } =
    useUntrackedChallenges(currentUser);

  console.log("markedUntrackedChallenges", markedUntrackedChallenges);

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

  return { activeFilter, both, claimed, unClaimed, untrackedChallenges };
};

export default useFilter;
