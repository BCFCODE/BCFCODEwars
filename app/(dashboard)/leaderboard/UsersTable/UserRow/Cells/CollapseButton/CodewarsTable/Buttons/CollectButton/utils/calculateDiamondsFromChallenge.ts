import { CodewarsSingleChallenge } from "@/types/codewars";
import getDiamondsByCodewarsRank from "./getDiamondsByCodewarsRank";

/**
 * Calculates the number of diamonds that can be collected from a single Codewars challenge.
 *
 * @param challenge - The selected Codewars challenge object.
 * @returns The number of collected diamonds.
 */
const calculateDiamondsFromChallenge = (
  challenge: CodewarsSingleChallenge
): number => {
  const rankId = challenge.rank.id;
  return getDiamondsByCodewarsRank(rankId);
};

export default calculateDiamondsFromChallenge;
