import {
  CodewarsCompletedChallenge
} from "./codewars";

export interface CodewarsContextState {
  completedChallenges?: CodewarsCompletedChallenge[];
  selectedChallenge?: CodewarsCompletedChallenge;
  isDisable: boolean;
  isLoading: boolean;
  isError: boolean;
  pageNumber: number;
}
