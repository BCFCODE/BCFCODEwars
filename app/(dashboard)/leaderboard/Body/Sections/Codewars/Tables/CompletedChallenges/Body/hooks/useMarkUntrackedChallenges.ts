import { CodewarsCompletedChallenge } from "@/types/codewars";
import { RewardStatus } from "@/types/diamonds";
import { AuthenticatedUser } from "@/types/users";
import { addTrackedFlagsToChallenges } from "../../../../../Collapse/utils/addTrackedFlags";
import { markAllChallengesAsUntracked } from "../../../../../Collapse/utils/addUntrackedFlags";

interface Props {
  currentUser: AuthenticatedUser;
  untrackedChallenges: CodewarsCompletedChallenge[];
  selectedChallenge?: CodewarsCompletedChallenge;
}

const useMarkUntrackedChallenges = ({
  currentUser,
  selectedChallenge,
  untrackedChallenges,
}: Props) => {
  const codeChallenges = currentUser.codewars.codeChallenges;
  const isFirstLogin = codeChallenges.list.every(
    (challenge) => challenge.rewardStatus === RewardStatus.UnclaimedDiamonds
  );

  const markedUntrackedChallenges = isFirstLogin
    ? []
    : selectedChallenge
      ? addTrackedFlagsToChallenges(selectedChallenge, untrackedChallenges)
      : markAllChallengesAsUntracked(untrackedChallenges);
  return { markedUntrackedChallenges };
};

export default useMarkUntrackedChallenges;
