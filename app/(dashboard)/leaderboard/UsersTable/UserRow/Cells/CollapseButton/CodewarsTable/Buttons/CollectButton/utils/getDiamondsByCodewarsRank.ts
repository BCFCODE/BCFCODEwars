import scoreMap from "./scoreMap";

/**
 * Returns the diamond count for a given Codewars rank ID.
 *
 * @param rankId - A numeric rank ID (positive or negative) from Codewars.
 * @returns The corresponding diamond count based on the score map.
 */
const getDiamondsByCodewarsRank = (rankId: number): number => {
  const absoluteRank = Math.abs(rankId);
  return scoreMap.codewars[absoluteRank];
};

export default getDiamondsByCodewarsRank;
