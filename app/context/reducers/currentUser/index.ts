import { CodewarsCompletedChallenge } from "@/types/codewars";
import {
  CodeChallengesFilter,
  CodewarsDiamondsRecord,
  CodewarsRanks,
  CodewarsRankTotals,
  Diamonds,
} from "@/types/diamonds";
import { AuthenticatedUser } from "@/types/users";
import { Session } from "next-auth";
import getRank from "./getRank";

export interface CurrentUserState {
  session?: Session;
  isUserOnPersonalDashboard?: boolean;
}

export interface CurrentUserContext extends CurrentUserState {
  currentUser: AuthenticatedUser;
}

export type CurrentUserAction =
  | {
      type: "UPDATE_CODE_CHALLENGES_LIST";
      list: CodewarsCompletedChallenge[];
      totalPages: number;
      totalItems: number;
    }
  | {
      type: "UPDATE_DIAMONDS_TOTALS_AND_RANKS";
      reward: number;
      selectedChallenge: CodewarsCompletedChallenge;
    }
  | {
      type: "USER_COLLECTED_CHALLENGE_REWARD_(BEFORE_COUNTER)";
      reward: number;
      selectedChallenge: CodewarsCompletedChallenge;
    }
  | { type: "SET_USER_DIAMONDS"; diamonds: Diamonds }
  
  | { type: "UPDATE_COLLECTION_FILTER"; filterName: CodeChallengesFilter }

  | { type: "EMPTY_UNTRACKED_CHALLENGE_LIST" }
  | {
      type: "DIAMOND_COUNT_ANIMATION_COMPLETED";
      selectedChallenge: CodewarsCompletedChallenge;
    };

const currentUserReducer = (
  state: CurrentUserContext,
  action: CurrentUserAction
): CurrentUserContext => {
  switch (action.type) {
    case "UPDATE_CODE_CHALLENGES_LIST": {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          codewars: {
            ...state.currentUser.codewars,
            codeChallenges: {
              ...state.currentUser.codewars.codeChallenges,
              totalItems: action.totalItems,
              totalPages: action.totalPages,
              totalCompleted: action.totalItems,
              list: [...action.list],
            },
          },
        },
      };
    }
    case "SET_USER_DIAMONDS": {
      return {
        ...state,
        currentUser: { ...state.currentUser, diamonds: action.diamonds },
      };
    }
    case "UPDATE_COLLECTION_FILTER": {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          codewars: {
            ...state.currentUser.codewars,
            codeChallenges: {
              ...state.currentUser.codewars.codeChallenges,
              challengeFilter: action.filterName,
            },
          },
        },
      };
    }
    // case "ADD_UNTRACKED_CHALLENGES_TO_LIST": {
    //   return {
    //     ...state,
    //     currentUser: {
    //       ...state.currentUser,
    //       codewars: {
    //         ...state.currentUser.codewars,
    //         codeChallenges: {
    //           ...state.currentUser.codewars.codeChallenges,
    //           totalItems: action.totalItems,
    //           totalPages: action.totalPages,
    //           totalCompleted: action.totalItems,
    //           list: [
    //             ...action.untrackedChallenges,
    //             ...state.currentUser.codewars.codeChallenges.list,
    //           ],
    //         },
    //       },
    //     },
    //   };
    // }
    case "UPDATE_DIAMONDS_TOTALS_AND_RANKS": {
      const currentRankId = getRank(action.selectedChallenge);

      const ranks: CodewarsRanks = {
        ...state.currentUser.diamonds.totals.codewars.ranks,
        [currentRankId]:
          state.currentUser.diamonds.totals.codewars.ranks[currentRankId] +
          action.reward,
      };

      const updateCodewarsRanks: CodewarsRankTotals = {
        ...state.currentUser.diamonds.totals.codewars,
        ranks,
        total: state.currentUser.diamonds.totals.codewars.total + action.reward,
      };

      const newCodewarsChallengeRecord: CodewarsDiamondsRecord = {
        id: action.selectedChallenge.id,
        rank: currentRankId,
        diamondsEarned: action.reward,
        collectedAt: new Date(),
        completedAt: new Date(action.selectedChallenge.completedAt),
      };

      const diamonds: Diamonds = {
        ...state.currentUser.diamonds,
        codewars: [
          ...state.currentUser.diamonds.codewars,
          newCodewarsChallengeRecord,
        ],
        totals: {
          ...state.currentUser.diamonds.totals,
          codewars: updateCodewarsRanks,
          total: state.currentUser.diamonds.totals.total + action.reward,
        },
      };

      const currentUser: AuthenticatedUser = {
        ...state.currentUser,
        diamonds,
      };

      return { ...state, currentUser };
    }
    default:
      return state;
  }
};

export default currentUserReducer;
