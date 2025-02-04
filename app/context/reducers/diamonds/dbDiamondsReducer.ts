import { Action, DiamondsState } from "./types";

const dbDiamondsReducer = (
  state: DiamondsState,
  action: Action
): DiamondsState => {
  switch (action.type) {
    case "SET_DIAMONDS":
      return { ...action.payload };
    default:
      return state;
  }
};

export default dbDiamondsReducer;
