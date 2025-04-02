import { Diamonds } from "@/types/diamonds";

export interface Context {}

export interface DiamondsContextState extends Context {
  data?: Diamonds;
  isDiamondIconButtonDisabled: boolean;
  isLoading: boolean;
  isError: boolean;
}

// Default (synchronous) state for diamonds
export const initialDiamondsState: DiamondsContextState = {
  isDiamondIconButtonDisabled: false,
  isLoading: false,
  isError: false,
};

export type DiamondsAction =
  | { type: "LOADING..." }
  | { type: "!SUCCESSFUL_RESPONSE" }
  | { type: "SET_DIAMONDS"; payload: DiamondsContextState }
  | { type: "SET_LOADING"; isLoading: boolean }
  | { type: "SET_ERROR"; isError: boolean }
  | { type: "DISABLE_DIAMOND_ICON_BUTTON" };

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
    case "DISABLE_DIAMOND_ICON_BUTTON":
      if (state.data) {
        return { ...state, isDiamondIconButtonDisabled: false };
      }
    default:
      return state;
  }
};

export default diamondsReducer;
