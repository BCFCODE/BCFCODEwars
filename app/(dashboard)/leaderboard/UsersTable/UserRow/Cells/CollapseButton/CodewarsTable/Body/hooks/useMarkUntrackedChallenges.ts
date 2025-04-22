// import { CodewarsCompletedChallenge } from "@/types/codewars";
// import { RewardStatus } from "@/types/diamonds";
// import { AuthenticatedUser } from "@/types/users";
// // import { markAllChallengesAsUntracked } from "../../../../../Collapse/utils/addUntrackedFlags";

// interface Props {
//   currentUser: AuthenticatedUser;
//   untrackedChallenges: CodewarsCompletedChallenge[];
//   // selectedChallenge?: CodewarsCompletedChallenge;
// }

// const useMarkUntrackedChallenges = ({
//   currentUser,
//   // selectedChallenge,
//   untrackedChallenges,
// }: Props) => {
//   const codeChallenges = currentUser.codewars.codeChallenges;
//   const isFirstLogin = codeChallenges.list.every(
//     (challenge) => challenge.rewardStatus === RewardStatus.UnclaimedDiamonds
//   );

//   const markedUntrackedChallenges = isFirstLogin ? [] : untrackedChallenges;
//   return { markedUntrackedChallenges };
// };

// export default useMarkUntrackedChallenges;
