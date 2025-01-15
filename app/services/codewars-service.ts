// app/services/codewars-service.ts

import {
  CodewarsChallenge,
  CodewarsCompletedChallengeApiResponse,
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
  ): Promise<CodewarsCompletedChallengeApiResponse> =>
    await fetch(
      `https://www.codewars.com/api/v1/users/${username}/code-challenges/completed?page=${pageNumber}`,
      { cache: "no-store" }
    )
      .then((res) => res.json())
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to fetch completed challenges");
      });

  getSingleChallenge = async (
    username: string,
    id: string
  ): Promise<CodewarsChallenge> =>
    await fetch(
      `${baseURL}/api/wars/codewars/challenge?username=${username}&challengeId=${id}`,
      { cache: "no-store" }
    ).then((res) => res.json());
}

export default CodewarsService;
