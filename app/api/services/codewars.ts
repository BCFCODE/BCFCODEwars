// app/services/codewars-service.ts

import { CompletedChallengesQueryData } from "@/app/(dashboard)/leaderboard/UsersTable/UserRow/Cells/CollapseButton/CodewarsTable/Pagination/usePaginationQuery";
import { CodewarsSingleChallenge } from "@/types/codewars";
import { baseURL } from "@/utils/constants";
import { GetCompletedChallengesResponse } from "../codewars/challenges/all/route";
import { GetSingleChallengeResponse } from "../codewars/challenges/single/route";

class CodewarsAPIService {
  private endpoint = `${baseURL}/api/codewars`;

  getCompletedChallenges = async ({
    apiPageNumber,
    username,
  }: {
    apiPageNumber: number;
    username: string;
  }): Promise<CompletedChallengesQueryData> =>
    await fetch(
      `${this.endpoint}/challenges/all?username=${username}&pageNumber=${apiPageNumber}`,
      { cache: "no-store" }
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
    challengeId: string
  ): Promise<GetSingleChallengeResponse> => {
    const url = new URL(`${this.endpoint}/challenges/single`);
    url.searchParams.set("username", username);
    url.searchParams.set("challengeId", challengeId);

    try {
      const response = await fetch(url.toString(), {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch challenge: ${response.status} ${response.statusText} - ${errorText}`
        );
      }

      const { data }: GetSingleChallengeResponse = await response.json();
      return { success: true, data };
    } catch (error) {
      // console.error("getSingleChallenge error:", error);
      throw new Error("Failed to fetch single Codewars challenge.");
    }
  };
}

export default CodewarsAPIService;
