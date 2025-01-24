// app/services/codewars-service.ts

import {
  CodewarsChallenge,
  CodewarsChallengesApiResponse,
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
          throw new Error(
            `Failed to fetch completed challenges: ${response.status} ${response.statusText}`
          );
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
  ): Promise<{ success: boolean; data: CodewarsChallenge }> =>
    await fetch(
      `${baseURL}/api/wars/codewars/challenges/single?username=${username}&challengeId=${id}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch single challenge: ${response.status} ${response.statusText}`
          );
        }
        return response.json();
      })
      .catch((error) => {
        // console.error(error);
        throw new Error("Failed to fetch single challenge.");
      });

  collectLeaderboardDiamonds = () => {};
}

export default CodewarsService;
