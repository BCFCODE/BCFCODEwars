import { DiamondsContextState } from "../providers/Diamonds";

export type DiamondsAction =
  | { type: "LOADING..." }
  | { type: "!SUCCESSFUL_RESPONSE" }
  | { type: "SET_DIAMONDS"; payload: DiamondsContextState }
  | { type: "SET_LOADING"; isLoading: boolean }
  | { type: "SET_ERROR"; isError: boolean }
  | {
      type: "INCREMENT_CODEWARS_DIAMONDS_SUM_AND_TOTAL";
      codewarsCollectedDiamonds: number;
    };

const diamondsReducer = (
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
            totals: {
              ...state.data.totals,
              codewars:
                state.data.totals.codewars + action.codewarsCollectedDiamonds,
              total: state.data.totals.total + action.codewarsCollectedDiamonds,
            },
          },
        };
    default:
      return state;
  }
};

export default diamondsReducer;
