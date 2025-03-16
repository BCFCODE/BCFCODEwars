import { CurrentUserAction, CurrentUserState } from "./types";

const dbCurrentUserReducer = (
  state: CurrentUserState,
  action: CurrentUserAction
): CurrentUserState => {
  switch (action.type) {
    case "UPDATE_CODE_CHALLENGES_LIST":
      return {
        ...state,
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
    case "UPDATE_CODEWARS_DIAMONDS_SUM":
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          diamonds: {
            ...state.currentUser.diamonds,
            sum: {
              ...state.currentUser.diamonds.sum,
              codewars: state.currentUser.diamonds.sum.codewars + action.reward,
            },
          },
        },
      };
    case "SET_USER_DIAMONDS":
      return {
        ...state,
        currentUser: { ...state.currentUser, diamonds: action.diamonds },
      };
    case "SET_COLLAPSE_OPEN":
      return { ...state, isCollapse: action.isCollapse };
    default:
      return state;
  }
};

export default dbCurrentUserReducer;
