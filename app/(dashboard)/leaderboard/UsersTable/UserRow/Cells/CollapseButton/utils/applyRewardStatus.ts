import { CodewarsCompletedChallenge } from "@/types/codewars";
import { RewardStatus } from "@/types/diamonds";

export const applyDefaultRewardStatus = (
  challenge: CodewarsCompletedChallenge
): CodewarsCompletedChallenge => ({
  ...challenge,
  rewardStatus: RewardStatus.UnclaimedDiamonds,
});

export const applyDefaultRewardStatusToAll = (
  list: CodewarsCompletedChallenge[]
): CodewarsCompletedChallenge[] => {
  return list.map(applyDefaultRewardStatus);
};
