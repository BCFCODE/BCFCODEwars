import { DiamondsContextState } from "../../providers/diamonds/types";
import { Action } from "./types";

const dbDiamondsReducer = (
  state: DiamondsContextState,
  action: Action
): DiamondsContextState => {
  switch (action.type) {
    case "SET_DIAMONDS":
      return { ...action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.isLoading };
    case "SET_ERROR":
      return { ...state, isError: action.isError };
    case "COLLECT_CODEWARS_DIAMONDS":
      if (state.data)
        return {
          ...state,
          data: {
            ...state.data,
            sum: {
              ...state.data.sum,
              codewars:
                state.data.sum.codewars + action.codewarsCollectedDiamonds,
              total: state.data.sum.total + action.codewarsCollectedDiamonds,
            },
          },
        };
    default:
      return state;
  }
};

export default dbDiamondsReducer;
