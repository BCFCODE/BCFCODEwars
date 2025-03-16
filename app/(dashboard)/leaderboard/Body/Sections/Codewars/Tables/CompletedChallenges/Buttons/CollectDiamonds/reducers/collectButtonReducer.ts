export interface CollectDiamondsState {
  isLoading: boolean;
  isError: boolean;
  isCollected: boolean;
  counter: number;
  collectedDiamondsCount?: number;
  success: boolean;
}

export type CollectButtonAction =
  | { type: "LOADING..."; isLoading: boolean }
  | {
      type: "DIAMOND_COUNTS";
      counter: number;
    }
  | { type: "RESET_COUNTER" }
  | { type: "DIAMONDS_COLLECTED" }
  | {
      type: "SUCCESSFUL_RESPONSE";
      success: true;
      collectedDiamondsCount: number;
    }
  | {
      type: "!SUCCESSFUL_RESPONSE";
      success: false;
    }
  | { type: "ERROR?"; isError: boolean };

// | { type: "START_LOADING" }
// | { type: "!SUCCESSFUL_RESPONSE" }
// | { type: "COLLECT_DIAMONDS"; collectedDiamondsCount?: number }
// | { type: "UPDATE_COUNTER"; counter: number }
// | { type: "RESET_COUNTER" };
// | { type: "SET_ERROR"; isError: boolean }

export default function collectButtonReducer(
  state: CollectDiamondsState,
  action: CollectButtonAction
): CollectDiamondsState {
  switch (action.type) {
    case "LOADING...":
      return {
        ...state,
        isLoading: action.isLoading,
        isError: !action.isLoading, // if loading is true set isError to false
      };
    case "DIAMOND_COUNTS":
      return {
        ...state,
        counter: action.counter,
      };
    case "RESET_COUNTER":
      return { ...state, counter: 0 };
    case "DIAMONDS_COLLECTED":
      return { ...state, isCollected: true };
    case "SUCCESSFUL_RESPONSE":
      return {
        ...state,
        success: true,
        isError: false,
        collectedDiamondsCount: action.collectedDiamondsCount,
      };
    case "!SUCCESSFUL_RESPONSE":
      return { ...state, success: false };
    case "ERROR?":
      return { ...state, isError: action.isError };
    // case "RESET_COUNTER":
    //   return {
    //     ...state,
    //     // isLoading: false,
    //     // isError: false,
    //     // isCollected: false,
    //     // counter: 0,
    //     // collectedDiamondsCount: undefined,
    //   };
    default:
      return state;
  }
}
