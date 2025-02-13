import { CodewarsCompletedChallenge } from "@/types/codewars";

export type Action =
  | {
      type: "SET_COMPLETED_CHALLENGES";
      completedChallenges: CodewarsCompletedChallenge[];
    }
  | { type: "SET_ERROR"; isError: boolean }
  | { type: "SET_LOADING"; isLoading: boolean }
  | { type: "SET_PAGE_NUMBER"; pageNumber: number };
