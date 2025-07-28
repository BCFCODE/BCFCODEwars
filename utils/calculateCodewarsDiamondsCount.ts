import { CodewarsSingleChallenge } from "@/types/codewars";

/**
 * Mapping of Codewars kata ranks (1-8) to diamond rewards.
 *
 * 💎 Diamond Reward Rules:
 * - 8kyu:   5 diamonds
 * - 7kyu:  10 diamonds
 * - 6kyu:  25 diamonds
 * - 5kyu:  50 diamonds
 * - 4kyu: 100 diamonds
 * - 3kyu: 200 diamonds
 * - 2kyu: 300 diamonds
 * - 1kyu: 500 diamonds
 */
const scoreMap: Record<number, number> = {
  1: 500,
  2: 300,
  3: 200,
  4: 100,
  5: 50,
  6: 25,
  7: 10,
  8: 5,
};

/**
 * Calculates how many diamonds a Codewars challenge is worth based on its rank.
 *
 * @param challenge - A single Codewars challenge containing rank information
 * @returns The diamond reward associated with the kata's rank (defaults to 0 if unknown)
 */
const calculateCodewarsDiamondsCount = (
  challenge: CodewarsSingleChallenge
): number => {
  const rankId = Math.abs(challenge.rank.id); // Handle negative values (e.g., -8 for 8kyu)
  return scoreMap[rankId] ?? 0; // Fallback in case rank is out of range
};

export default calculateCodewarsDiamondsCount;
