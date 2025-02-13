import { Action, CurrentUserState } from "./types";

const dbCurrentUserReducer = (
  state: CurrentUserState,
  action: Action
): CurrentUserState => {
  switch (action.type) {
    case "SET_USER_DIAMONDS":
      return {
        currentUser: { ...state.currentUser, diamonds: action.diamonds },
      };
    case "SET_COLLAPSE_OPEN":
      return { ...state, isCollapse: action.isCollapse };
    default:
      return state;
  }
};

export default dbCurrentUserReducer;
