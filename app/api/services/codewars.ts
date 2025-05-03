// app/services/codewars-service.ts

import { CodewarsSingleChallenge } from "@/types/codewars";
import { baseURL } from "@/utils/constants";
import { GetCompletedChallengesResponse } from "../codewars/challenges/all/route";

class CodewarsAPIService {
  private endpoint = `${baseURL}/api/codewars`;

  // Read
  getCompletedChallenges = async (
    username: string,
    pageNumber: number,
    options?: RequestInit
  ): Promise<GetCompletedChallengesResponse> =>
    await fetch(
      `${this.endpoint}/challenges/all?username=${username}&pageNumber=${pageNumber}`,
      { ...options }
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
    id: string,
    options?: RequestInit
  ): Promise<
    | { success: true; data: CodewarsSingleChallenge }
    | { success: false; reason: string }
  > =>
    await fetch(
      `${this.endpoint}/challenges/single?username=${username}&challengeId=${id}`,
      { ...options }
    )
      .then((res) => res.json())
      .catch((error) => {
        // console.error(error);
        throw new Error("Failed to fetch completed challenges");
      });
}

export default CodewarsAPIService;
