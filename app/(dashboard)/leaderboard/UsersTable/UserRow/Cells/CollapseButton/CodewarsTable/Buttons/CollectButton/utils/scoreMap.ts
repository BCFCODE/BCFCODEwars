/**
 * A mapping of Codewars ranks to the number of diamonds rewarded for solving challenges.
 *
 * @example
 * // 6 kyu challenge gives 25 diamonds
 * scoreMap.codewars[6] // ➝ 25
 */
export interface ScoreMap {
  codewars: Record<number, number>; // Rank (1-8 kyu) → Diamonds
}

/**
 * Diamond reward lookup table based on challenge rank (1–8 kyu).
 *
 * Ranks:
 *   1 kyu = 500 💎
 *   2 kyu = 300 💎
 *   3 kyu = 200 💎
 *   4 kyu = 100 💎
 *   5 kyu = 50 💎
 *   6 kyu = 25 💎
 *   7 kyu = 10 💎
 *   8 kyu = 5 💎
 */
const scoreMap: ScoreMap = {
  codewars: {
    1: 500,
    2: 300,
    3: 200,
    4: 100,
    5: 50,
    6: 25,
    7: 10,
    8: 5,
  },
};

export default scoreMap;
