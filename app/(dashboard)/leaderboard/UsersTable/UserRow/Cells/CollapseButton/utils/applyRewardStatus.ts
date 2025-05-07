import { CodewarsCompletedChallenge } from "@/types/codewars";
import { RewardStatus } from "@/types/diamonds";

export const applyDefaultTrackingAndRewardStatus = (
  challenge: CodewarsCompletedChallenge
): CodewarsCompletedChallenge => ({
  ...challenge,
  rewardStatus: RewardStatus.UnclaimedDiamonds,
});

export const applyDefaultTrackingAndRewardStatusToAll = (
  list: CodewarsCompletedChallenge[]
): CodewarsCompletedChallenge[] => {
  return list.map(applyDefaultTrackingAndRewardStatus);
};
