import { CodewarsCompletedChallenge } from "./codewars";

export interface CodewarsContextState {
  completedChallenges?: CodewarsCompletedChallenge[];
  selectedChallenge?: CodewarsCompletedChallenge;
  isDisabled: boolean;
  isLoading: boolean;
  isError: boolean;
  pageNumber: number;
  // isConnected: boolean;
}
