import useDiamondsContext from "@/app/context/hooks/diamonds/useDiamondsContext";
// import filterUntrackedChallenges from "@/app/context/reducers/currentUser/filterUntrackedChallenges";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { AuthenticatedUser } from "@/types/users";

export interface UseUntrackedChallenges {
  untrackedChallenges: CodewarsCompletedChallenge[];
}

const useUntrackedChallenges = (
  currentUser: AuthenticatedUser
): UseUntrackedChallenges => {
  const { isCollected } = useDiamondsContext();
  const codeChallenges = currentUser.codewars.codeChallenges;

  let untrackedChallenges = codeChallenges.untrackedChallenges ?? [];

  console.log(
    "useUntrackedChallenges/isCollected >>",
    isCollected,
    // filterUntrackedChallenges(untrackedChallenges)
  );

  // if (isCollected)
  //   untrackedChallenges = filterUntrackedChallenges(untrackedChallenges);

  // const isFirstLogin = codeChallenges.list.every(
  //   (challenge) => challenge.rewardStatus === RewardStatus.UnclaimedDiamonds
  // );

  // const untrackedChallengesToDisplay = isFirstLogin ? [] : untrackedChallenges;

  // console.log(
  //   "useUntrackedChallenges/untrackedChallengesToDisplay",
  //   untrackedChallengesToDisplay,

  //   // "mostRecentUntrackedChallenge",
  //   // mostRecentUntrackedChallenge
  // );

  return { untrackedChallenges };
};

export default useUntrackedChallenges;
