import { DiamondsContextState } from "../../providers/diamonds/types";
import { DiamondsAction } from "./types";

const dbDiamondsReducer = (
  state: DiamondsContextState,
  action: DiamondsAction
): DiamondsContextState => {
  switch (action.type) {
    case "LOADING...":
      return { ...state, isDiamondIconButtonDisabled: true };
    case "!SUCCESSFUL_RESPONSE":
      return { ...state, isDiamondIconButtonDisabled: false };
    case "SET_DIAMONDS":
      return { ...action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.isLoading };
    case "SET_ERROR":
      return { ...state, isError: action.isError };
    case "INCREMENT_CODEWARS_DIAMONDS_SUM_AND_TOTAL":
      if (state.data)
        return {
          ...state,
          isDiamondIconButtonDisabled: false,
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
