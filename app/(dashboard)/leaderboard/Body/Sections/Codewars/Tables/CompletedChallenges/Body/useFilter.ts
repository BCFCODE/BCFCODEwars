import useCurrentUserContext from "@/app/context/hooks/db/useCurrentUserContext";
import { CodeChallengesFilter, RewardStatus } from "@/types/diamonds";

const useFilter = () => {
  const { currentUser } = useCurrentUserContext();

  const activeFilter: CodeChallengesFilter =
    currentUser.codewars.codeChallenges.challengeFilter;

  const both = currentUser.codewars.codeChallenges.list;

  const claimed = both.filter(
    (challenge) => challenge.rewardStatus === RewardStatus.ClaimedDiamonds
  );
  
  const unClaimed = both.filter(
    (challenge) => challenge.rewardStatus === RewardStatus.UnclaimedDiamonds
  );

  return { activeFilter, both, claimed, unClaimed };
};

export default useFilter;
