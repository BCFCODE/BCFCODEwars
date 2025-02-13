import { DiamondsState } from "../../providers/diamonds/types";
import { Action } from "./types";

const diamondsReducer = (
  state: DiamondsState,
  action: Action
): DiamondsState => {
  switch (action.type) {
    case "SET_DIAMONDS":
      return { ...action.payload };
    case "SET_COLLECTED_COUNT":
      if (state.success && state.data) {
        const { codewars, sum } = state.data.diamonds;
        return {
          ...state,
          data: {
            ...state.data,
            diamonds: {
              ...state.data.diamonds,
              codewars: codewars + action.collectedCount,
              sum: sum + action.collectedCount,
            },
          },
        };
      } else return state;
    case "SET_LOADING":
      return { ...state, isLoading: action.isLoading };
    case "SET_ERROR":
      return { ...state, isError: action.isError };
    case "SET_IS_COLLECTED":
      return { ...state, isCollected: action.isCollected };
    case "SET_COLLECTED_COUNTER":
      return { ...state, collectedCounter: action.collectedCounter };
    case "SET_SUM_COUNTER":
      return state.success && state.data
        ? {
            ...state,
            data: {
              ...state.data,
              diamonds: { ...state.data.diamonds, sum: action.sumCounter },
            },
          }
        : state;
    default:
      return state;
  }
};

export default diamondsReducer;
