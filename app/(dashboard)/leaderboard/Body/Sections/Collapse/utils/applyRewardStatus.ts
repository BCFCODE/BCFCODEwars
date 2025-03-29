import { CodewarsCompletedChallenge } from "@/types/codewars";
import { RewardStatus } from "@/types/diamonds";

export const applyRewardStatus = (
  challenge: CodewarsCompletedChallenge
): CodewarsCompletedChallenge => ({
  ...challenge,
  rewardStatus: RewardStatus.UnclaimedDiamonds,
});

export const applyRewardStatusToAll = (
  challenges: CodewarsCompletedChallenge[]
): CodewarsCompletedChallenge[] => {
  return challenges.map(applyRewardStatus);
};
