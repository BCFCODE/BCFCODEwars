import { CodewarsCompletedChallenge } from "@/types/codewars";
import { DBCodewarsCompletedChallenge } from "@/types/db/codewars";

export interface Context {}

export interface CodewarsState extends Context {
  completedChallenges?: CodewarsCompletedChallenge[] ;
  selectedChallenge: DBCodewarsCompletedChallenge;
  pageNumber: number;
  isDisabled: boolean;
  isError: boolean
  isLoading: boolean
  handleTry: () => void
}
