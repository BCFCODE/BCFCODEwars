// app/services/codewars-service.ts

// import { CompletedChallengesQueryData } from "@/app/(dashboard)/leaderboard/UsersTable/UserRow/Cells/CollapseButton/CodewarsTable/Pagination/usePaginationQuery";
import { CompletedChallengesQueryData } from "@/app/(dashboard)/leaderboard/UsersTable/UserRow/Cells/CollapseButton/CodewarsTable/Pagination/usePaginationQuery";
import { CodewarsSingleChallenge } from "@/types/codewars";
import { baseURL } from "@/utils/constants";
import { GetCompletedChallengesResponse } from "../codewars/challenges/all/route";
// import { GetCompletedChallengesResponse } from "../codewars/challenges/all/route";

class CodewarsAPIService {
  private endpoint = `${baseURL}/api/codewars`;

  private async fetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(url, { cache: "no-store", ...options });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API Error (${response.status} ${response.statusText}): ${errorText}`
      );
    }

    return response.json();
  }

  getCompletedChallenges = async ({
    apiPageNumber,
    username,
  }: {
    apiPageNumber: number;
    username: string;
  }): Promise<CompletedChallengesQueryData> => {
    const result = await this.fetchJSON<GetCompletedChallengesResponse>(
      `${this.endpoint}/challenges/all?username=${username}&pageNumber=${apiPageNumber}`
    );

    return {
      list: result.data,
      totalItems: result.totalItems,
      totalPages: result.totalPages,
    };
  };

  getSingleChallenge = async (
    username: string,
    id: string,
    options?: RequestInit
  ): Promise<
    | { success: true; data: CodewarsSingleChallenge }
    | { success: false; reason: string }
  > => {
    try {
      const { data } = await this.fetchJSON<{ data: CodewarsSingleChallenge }>(
        `${this.endpoint}/challenges/single?username=${username}&challengeId=${id}`
      );

      return { success: true, data };
    } catch (error) {
      console.error("Error fetching single challenge:", error);
      return { success: false, reason: (error as Error).message };
    }
  };
}

export default CodewarsAPIService;
