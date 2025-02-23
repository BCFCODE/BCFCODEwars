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
            diamonds: {
              ...state.data.diamonds,
              codewars:
                state.data.diamonds.codewars + action.codewarsCollectedDiamonds,
              sum: state.data.diamonds.sum + action.codewarsCollectedDiamonds,
            },
          },
        };
    default:
      return state;
  }
};

export default dbDiamondsReducer;
