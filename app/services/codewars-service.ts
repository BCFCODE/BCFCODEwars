// app/services/codewars-service.ts

import {
  CodewarsChallenge,
  CodewarsCompletedChallengeApiResponse,
} from "@/types/codewars";

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
  ): Promise<CodewarsCompletedChallengeApiResponse> => {
    // Fetch List Completed Challenges
    const response = await fetch(
      `https://www.codewars.com/api/v1/users/${username}/code-challenges/completed?page=${pageNumber}`,
      { cache: "no-store" }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch completed challenges");
    }

    return await response.json();
  };

  getSingleChallenge = async (id: string): Promise<CodewarsChallenge> => {
    // Fetch single challenge
    const response = await fetch(
      `https://www.codewars.com/api/v1/code-challenges/${id}`,
      { cache: "no-store" }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch challenge");
    }

    return await response.json();
  };
}

export default CodewarsService;
