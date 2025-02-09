import { Action, DiamondsState } from "./types";

const dbDiamondsReducer = (
  state: DiamondsState,
  action: Action
): DiamondsState => {
  switch (action.type) {
    case "SET_DIAMONDS":
      return { ...action.payload };
    case "COLLECT_CODEWARS_DIAMONDS":
      if (state.success)
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
