import { CodewarsCompletedChallenge } from "@/types/codewars";
import { Diamonds } from "@/types/diamonds";
import { CurrentUserContextState } from "../providers/CurrentUser";

export type CurrentUserState = CurrentUserContextState;

export type CurrentUserAction =
  | { type: "UPDATE_CODE_CHALLENGES_LIST"; list: CodewarsCompletedChallenge[] }
  | { type: "UPDATE_CODEWARS_DIAMONDS_SUM"; reward: number }
  | { type: "SET_USER_DIAMONDS"; diamonds: Diamonds }
  | { type: "SET_COLLAPSE_OPEN"; isCollapse: boolean };

const currentUserReducer = (
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
              list: [...action.list],
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
            totals: {
              ...state.currentUser.diamonds.totals,
              codewars:
                state.currentUser.diamonds.totals.codewars + action.reward,
              total: state.currentUser.diamonds.totals.total + action.reward,
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

export default currentUserReducer;
