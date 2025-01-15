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
      `${baseURL}/api/wars/codewars/challenges/single?username=${username}&challengeId=${id}`
    )
      .then((res) => res.json())
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to fetch single challenge.");
      });
}

export default CodewarsService;
