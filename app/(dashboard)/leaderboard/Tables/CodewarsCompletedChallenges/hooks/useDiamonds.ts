import useDatabaseUserContext from "@/app/context/hooks/useDatabaseUserContext";
import CodewarsService from "@/app/services/codewars-service";
import DiamondsService from "@/app/services/diamonds-service";
import { CodewarsChallenge } from "@/types/codewars";

const { getSingleChallenge } = new CodewarsService();
const { scoreMap } = DiamondsService;

const useDiamonds = (id: string) => {
  const {
    currentUser: {
      codewars: { username },
    },
  } = useDatabaseUserContext();

  const collectDiamonds = async (): Promise<{
    isCollected: boolean;
    challenge: CodewarsChallenge;
    rankId: number;
    collectedDiamonds: number
  }> => {
    const { data: challenge, success: isCollected } = await getSingleChallenge(username, id);
    const rankId = Math.abs(challenge.rank.id);
    const collectedDiamonds = scoreMap.codewars[rankId]
    console.log("codewars userInDB >>", username);
    console.log(
      "challenge >>",
      challenge,
      "Rank:",
      rankId,
      "Number of diamonds: ",
      collectDiamonds
    );
    return { isCollected, challenge, rankId, collectedDiamonds };
  };
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

  return { collectDiamonds };
};

export default useDiamonds;
