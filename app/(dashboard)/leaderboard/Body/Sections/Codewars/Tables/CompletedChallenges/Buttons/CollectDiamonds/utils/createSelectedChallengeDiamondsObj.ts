import { CodewarsCompletedChallenge } from "@/types/codewars";
import { CodewarsDiamonds } from "@/types/diamonds";

const createSelectedChallengeDiamondsObj = ({
  selectedChallenge,
  collectedDiamondsCount,
}: {
  selectedChallenge: Required<CodewarsCompletedChallenge>;
  collectedDiamondsCount: number;
}): Required<CodewarsDiamonds> => {
  const id = selectedChallenge.id;
  const rank = Math.abs(selectedChallenge.moreDetails?.rank.id);
  const diamondsEarned = collectedDiamondsCount;
  console.log("currentUser in useChallengesListEffect", selectedChallenge, {
    id,
    rank,
    diamondsEarned,
  });

  return { id, rank, diamondsEarned };
};

export default createSelectedChallengeDiamondsObj;
