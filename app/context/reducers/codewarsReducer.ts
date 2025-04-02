import { CodewarsCompletedChallenge, CodewarsUser } from "@/types/codewars";

export const initialCodewars: CodewarsState = {
  completedChallenges: [],
  isDisabled: false,
  isError: false,
  isLoading: false,
  pageNumber: 0,
  untrackedChallenges: [],
  mostRecentUntrackedChallenge: null,
};

export interface Context {}

export interface CodewarsState extends Context {
  codewarsUsers?: CodewarsUser[];
  completedChallenges: CodewarsCompletedChallenge[];
  selectedChallenge?: CodewarsCompletedChallenge;
  pageNumber: number;
  isDisabled: boolean;
  isError: boolean;
  isLoading: boolean;
  untrackedChallenges: CodewarsCompletedChallenge[];
  mostRecentUntrackedChallenge: CodewarsCompletedChallenge | null;
  // fetchCompletedChallenges: () => void;
}

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
  | { type: "SET_PAGE_NUMBER"; pageNumber: number }
  // | {
  //     type: "SET_LATEST_UNTRACKED_CHALLENGE";
  //     mostRecentUntrackedChallenge: CodewarsCompletedChallenge;
  //   };

const codewarsReducer = (
  state: CodewarsState,
  action: CodewarsAction
): CodewarsState => {
  switch (action.type) {
    case "UPDATE_CODEWARS_USERS": {
      return { ...state, codewarsUsers: action.codewarsUsers };
    }
    case "SET_COMPLETED_CHALLENGES": {
      return { ...state, completedChallenges: action.completedChallenges };
    }
    case "SET_SELECTED_CHALLENGE": {
      return { ...state, selectedChallenge: action.selectedChallenge };
    }
    case "SET_LOADING": {
      return { ...state, isLoading: action.isLoading };
    }
    case "SET_ERROR": {
      return { ...state, isError: action.isError };
    }
    case "SET_PAGE_NUMBER": {
      return { ...state, pageNumber: action.pageNumber };
    }
    default:
      return state;
  }
};

export default codewarsReducer;
