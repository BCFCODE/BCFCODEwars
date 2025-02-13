import { CodewarsContextState } from "@/types/contexts";
import { Action } from "./types";

const codewarsReducer = (
  state: CodewarsContextState,
  action: Action
): CodewarsContextState => {
  switch (action.type) {
    case "SET_COMPLETED_CHALLENGES":
      return { ...state, completedChallenges: action.completedChallenges };
    case "SET_LOADING":
      return { ...state, isLoading: action.isLoading };
    case "SET_ERROR":
      return { ...state, isError: action.isError };
    default:
      return state;
  }
};

export default codewarsReducer;
