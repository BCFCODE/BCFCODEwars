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
    default:
      return state;
  }
};

export default dbCurrentUserReducer;
