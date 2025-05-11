// app/services/codewars-service.ts

import { CodewarsSingleChallenge } from "@/types/codewars";
import { baseURL } from "@/utils/constants";
import {
  CodewarsChallengesResponse,
  GetCompletedChallengesResponse,
} from "../codewars/challenges/all/route";
import {
  CompletedChallengesQueryData,
  ListQuery,
} from "@/app/(dashboard)/leaderboard/UsersTable/UserRow/Cells/CollapseButton/CodewarsTable/Pagination/useCodewarsListQuery";

class CodewarsAPIService {
  private endpoint = `${baseURL}/api/codewars`;

  getCompletedChallenges = async ({
    pageNumber,
    username,
    options,
  }: ListQuery): Promise<CompletedChallengesQueryData> =>
    await fetch(
      `${this.endpoint}/challenges/all?username=${username}&pageNumber=${pageNumber}`,
      { ...options }
    ).then(async (response) => {
      const {
        data: list,
        totalItems,
        totalPages,
      } = (await response.json()) as GetCompletedChallengesResponse;

      return { list, totalItems, totalPages };
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
