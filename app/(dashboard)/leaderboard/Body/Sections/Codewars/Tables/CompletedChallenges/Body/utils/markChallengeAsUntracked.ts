import { CodewarsCompletedChallenge } from "@/types/codewars";

export const markChallengeAsUntracked = (
  challenge: CodewarsCompletedChallenge
): CodewarsCompletedChallenge => ({
  ...challenge,
  isUntracked: true,
});

export const markAllChallengesAsUntracked = (
  challenges: CodewarsCompletedChallenge[]
): CodewarsCompletedChallenge[] => {
  return challenges.map(markChallengeAsUntracked);
};
 