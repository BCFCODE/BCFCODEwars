import { CodewarsCompletedChallenge, CodewarsUser } from "@/types/codewars";

export interface Context {}

export interface CodewarsState extends Context {
  codewarsUsers?: CodewarsUser[];
  completedChallenges?: CodewarsCompletedChallenge[];
  selectedChallenge?: CodewarsCompletedChallenge;
  pageNumber: number;
  isDisabled: boolean;
  isError: boolean;
  isLoading: boolean;
  // fetchCompletedChallenges: () => void;
}
