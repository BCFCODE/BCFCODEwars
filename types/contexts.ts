import { CodewarsCompletedChallenge } from "./codewars";

export interface CodewarsContextState {
  completedChallenges?: CodewarsCompletedChallenge[];
  isLoading: boolean;
  isError: boolean;
  pageNumber: number
}
