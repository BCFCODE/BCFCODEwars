import { CodewarsCompletedChallenge } from "@/types/codewars";
import {
  CodewarsRank,
  CodewarsRanks,
  CodewarsRankTotals,
  Diamonds,
} from "@/types/diamonds";
import { CurrentUserContextState } from "../providers/CurrentUser";

export type CurrentUserState = CurrentUserContextState;

export type CurrentUserAction =
  | { type: "UPDATE_CODE_CHALLENGES_LIST"; list: CodewarsCompletedChallenge[] }
  | {
      type: "UPDATE_DIAMONDS_TOTALS_AND_RANKS";
      reward: number;
      selectedChallenge: CodewarsCompletedChallenge;
    }
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
    case "UPDATE_DIAMONDS_TOTALS_AND_RANKS": {
      const currentRankId: CodewarsRank = Math.abs(
        action.selectedChallenge.moreDetails?.rank.id as number
      ) as CodewarsRank;

      const updatedRanks: CodewarsRanks = {
        ...state.currentUser.diamonds.totals.codewars.ranks,
        [currentRankId]:
          state.currentUser.diamonds.totals.codewars.ranks[currentRankId] +
          action.reward,
      };

      const updateCodewarsRanks: CodewarsRankTotals = {
        ...state.currentUser.diamonds.totals.codewars,
        ranks: updatedRanks,
        total: state.currentUser.diamonds.totals.codewars.total + action.reward,
      };

      const updatedDiamonds: Diamonds = {
        ...state.currentUser.diamonds,
        totals: {
          ...state.currentUser.diamonds.totals,
          codewars: updateCodewarsRanks,
          total: state.currentUser.diamonds.totals.total + action.reward,
        },
      };

      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          diamonds: updatedDiamonds,
        },
      };
    }
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
