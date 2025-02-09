import { Action, AllUsersState } from "./types";

const dbAllUsersReducer = (
  state: AllUsersState,
  action: Action
): AllUsersState => {
  switch (action.type) {
    case "SET_ALL_USERS":
      return { ...action.payload };
    case "SET_ERROR":
      return { ...state, error: action.error };
    case "SET_LOADING":
      return { ...state, error: action.loading };
    default:
      return state;
  }
};

export default dbAllUsersReducer;
