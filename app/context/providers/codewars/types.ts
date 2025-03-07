import { CodewarsCompletedChallenge } from "@/types/codewars";

export interface Context {}

export interface CodewarsState extends Context {
  completedChallenges?: CodewarsCompletedChallenge[];
  selectedChallenge?: CodewarsCompletedChallenge;
  pageNumber: number;
  isDisabled: boolean;
  isError: boolean;
  isLoading: boolean;
  // fetchCompletedChallenges: () => void;
}
