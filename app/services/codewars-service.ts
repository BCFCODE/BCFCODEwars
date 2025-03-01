// app/services/codewars-service.ts

import {
  CodewarsSingleChallenge,
  CodewarsChallengesApiResponse,
  CodewarsCompletedChallenge,
} from "@/types/codewars";
import { baseURL } from "@/utils/constants";

class CodewarsService {
  /* 
    TODO: CRUD
    
    get challenges

    get users

    get challenge

    ...
  */
  getRank = (challengeRankId: number): number => Math.abs(challengeRankId);

  // Read
  getCompletedChallenges = async (
    username: string,
    pageNumber: number
  ): Promise<CodewarsChallengesApiResponse> =>
    await fetch(
      `${baseURL}/api/wars/codewars/challenges/all?username=${username}&pageNumber=${pageNumber}`,
      { cache: "no-store" }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch completed challenges`);
        }
        return response.json();
      })
      .catch((error) => {
        // console.error(error);
        throw new Error("Failed to fetch completed challenges");
      });

  getSingleChallenge = async (
    username: string,
    id: string
  ): Promise<
    | { success: true; data: CodewarsSingleChallenge }
    | { success: false; reason: string }
  > =>
    await fetch(
      `${baseURL}/api/wars/codewars/challenges/single?username=${username}&challengeId=${id}`
    ).then((res) => res.json());



  collectLeaderboardDiamonds = () => {};
}

export default CodewarsService;
