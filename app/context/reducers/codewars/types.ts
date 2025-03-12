import { CodewarsCompletedChallenge, CodewarsUser } from "@/types/codewars";

export type CodewarsAction =
  | { type: "UPDATE_CODEWARS_USERS"; codewarsUsers: CodewarsUser[] }
  | {
      type: "SET_COMPLETED_CHALLENGES";
      completedChallenges: CodewarsCompletedChallenge[];
    }
  | {
      type: "SET_SELECTED_CHALLENGE";
      selectedChallenge: CodewarsCompletedChallenge;
    }
  | { type: "SET_ERROR"; isError: boolean }
  | { type: "SET_LOADING"; isLoading: boolean }
  | { type: "SET_PAGE_NUMBER"; pageNumber: number };
