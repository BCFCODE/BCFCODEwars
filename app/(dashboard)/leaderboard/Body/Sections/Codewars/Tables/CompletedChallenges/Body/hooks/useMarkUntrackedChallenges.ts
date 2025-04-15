import { useUsersStore } from "@/app/store/users";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { RewardStatus } from "@/types/diamonds";
import { AuthenticatedUser } from "@/types/users";

interface Props {
  untrackedChallenges: CodewarsCompletedChallenge[];
}

const useMarkUntrackedChallenges = ({ untrackedChallenges }: Props) => {
  const currentUser = useUsersStore(s => s.currentUser) as AuthenticatedUser
  const codeChallenges = currentUser.codewars.codeChallenges;
  const isFirstLogin = codeChallenges.list.every(
    (challenge) => challenge.rewardStatus === RewardStatus.UnclaimedDiamonds
  );

  const markedUntrackedChallenges = isFirstLogin ? [] : untrackedChallenges;
  return { markedUntrackedChallenges };
};

export default useMarkUntrackedChallenges;
