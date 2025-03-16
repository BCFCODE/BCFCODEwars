import { CurrentUserAction, CurrentUserState } from "./types";

const dbCurrentUserReducer = (
  state: CurrentUserState,
  action: CurrentUserAction
): CurrentUserState => {
  switch (action.type) {
    case "UPDATE_CODE_CHALLENGES_LIST":
      return {
        currentUser: {
          ...state.currentUser,
          codewars: {
            ...state.currentUser.codewars,
            codeChallenges: {
              ...state.currentUser.codewars.codeChallenges,
              list: action.list,
            },
          },
        },
      };
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
