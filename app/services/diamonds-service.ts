import { CodewarsSingleChallenge } from "@/types/codewars";
import CodewarsService from "./codewars-service";

const { getRank } = new CodewarsService();

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

  getDiamondsCount = (challenge: CodewarsSingleChallenge): number => {
    const rank = getRank(challenge);
    const calculatedScore = this.scoreMap.codewars[rank];
    return calculatedScore;
  };

  collectDiamonds = async (
    selectedSingleChallenge: CodewarsSingleChallenge
  ): Promise<{
    collectedDiamondsCount: number;
  }> => {
    const collectedDiamondsCount = this.getDiamondsCount(
      selectedSingleChallenge
    );
    console.log(
      "diamonds-service, challenge >>",
      selectedSingleChallenge,
      "Number of diamonds: ",
      collectedDiamondsCount
    );
    {
      /* TODO: Send a request to codewars api to catch this specific solved problem and write it to our database */
    }
    {
      /* 
             A common best practice is to limit requests to 1 request per second per user, totaling 3,600 requests per hour. This approach aligns with standard API usage patterns and helps prevent triggering rate limiting mechanisms.
        Common Rate Limiting Standards
          10 requests per second per user: A typical, generous limit for systems with a reasonable tolerance for high-frequency requests.
          5 requests per second per user: A moderate limit, suitable for APIs that prioritize server stability.
          1 request per second per user: A strict limit for APIs with high resource consumption per request.
          3. Burst Limits
          Allow short bursts of higher traffic while enforcing a sustained rate over time. For example:
          Up to 20 requests in 10 seconds, but no more than 60 requests per minute.
          Use token bucket algorithms for this (common in libraries like Nginx, Redis, or cloud services).
        */
    }
    return { collectedDiamondsCount };
  };
}

export default DiamondsService;
