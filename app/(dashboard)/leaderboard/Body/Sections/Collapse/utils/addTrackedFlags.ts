import { CodewarsCompletedChallenge } from "@/types/codewars";

export const addTrackedFlagsToChallenge = (
  challenge: CodewarsCompletedChallenge
): CodewarsCompletedChallenge => ({
  ...challenge,
  isUntracked: false,
  isLatestUntracked: false,
});

export const addTrackedFlagsToChallenges = (
  challenge: CodewarsCompletedChallenge,
  list: CodewarsCompletedChallenge[]
): CodewarsCompletedChallenge[] => {
  return list.map((listChallenge) =>
    listChallenge.id === challenge.id
      ? addTrackedFlagsToChallenge(listChallenge)
      : listChallenge
  );
};
