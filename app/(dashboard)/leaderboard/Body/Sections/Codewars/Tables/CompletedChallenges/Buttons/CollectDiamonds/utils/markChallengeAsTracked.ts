import { CodewarsCompletedChallenge } from "@/types/codewars";

export const markChallengeAsTracked = (
  challenge: CodewarsCompletedChallenge
): CodewarsCompletedChallenge => ({
  ...challenge,
  isUntracked: false,
});

export const updateChallengeInListAsTracked = (
  challenge: CodewarsCompletedChallenge,
  list: CodewarsCompletedChallenge[]
): CodewarsCompletedChallenge[] => {
  return list.map((listChallenge) =>
    listChallenge.id === challenge.id
      ? markChallengeAsTracked(listChallenge)
      : listChallenge
  );
};
