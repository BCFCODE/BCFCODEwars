import {
  CodewarsCompletedChallenge
} from "@/types/codewars";

export type Action =
  | {
      type: "SET_COMPLETED_CHALLENGES";
      completedChallenges: CodewarsCompletedChallenge[];
    }
  // | {
  //     type: "SET_DB_COMPLETED_CHALLENGES";
  //     dbCompletedChallenges: CodewarsCompletedChallenge[];
  //   }
  | {
      type: "SET_SELECTED_CHALLENGE";
      selectedChallenge: CodewarsCompletedChallenge;
    }
  | { type: "SET_ERROR"; isError: boolean }
  | { type: "SET_LOADING"; isLoading: boolean }
  | { type: "SET_PAGE_NUMBER"; pageNumber: number };
