import { CodewarsSingleChallenge } from "@/types/codewars";

interface ScoreMap {
  codewars: { [key: number]: number };
}

class DiamondsService {
  scoreMap: ScoreMap = {
    // Map reference for diamond rewards for each solved challenge
    codewars: {
      /* 
    Number of diamonds according to its kyo (8 = 8kyo)
      Scores:
        8kyo = 5💎
        7kyo = 10💎
        6kyo = 25💎
        5kyo = 50💎
        4kyo = 100💎
        3kyo = 200💎
        2kyo = 300💎
        1kyo = 500💎
    */
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

  calculateCodewarsDiamondsCount = (rankId: number): number => {
    const absoluteRank = Math.abs(rankId);
    const calculatedScore = this.scoreMap.codewars[absoluteRank];
    return calculatedScore;
  };

  collectDiamonds = async (
    selectedSingleChallenge: CodewarsSingleChallenge
  ): Promise<{
    collectedDiamondsCount: number;
  }> => {
    const rankId = selectedSingleChallenge.rank.id;
    const collectedDiamondsCount = this.calculateCodewarsDiamondsCount(rankId);
  
    return { collectedDiamondsCount };
  };
}

export default DiamondsService;
