import { CodewarsCompletedChallenge } from "@/types/codewars";
import {
  CodeChallengesFilter,
  CodewarsDiamondsRecord,
  CodewarsRank,
  CodewarsRanks,
  CodewarsRankTotals,
  Diamonds,
} from "@/types/diamonds";
import { AuthenticatedUser } from "@/types/users";
import { Session } from "next-auth";

export interface CurrentUserState {
  session?: Session;
  isCollapsed?: boolean;
  isUserOnPersonalDashboard?: boolean;
}

export interface CurrentUserContext extends CurrentUserState {
  currentUser: AuthenticatedUser;
}

export type CurrentUserAction =
  | { type: "UPDATE_CODE_CHALLENGES_LIST"; list: CodewarsCompletedChallenge[] }
  | {
      type: "UPDATE_DIAMONDS_TOTALS_AND_RANKS";
      reward: number;
      selectedChallenge: CodewarsCompletedChallenge;
    }
  | { type: "SET_USER_DIAMONDS"; diamonds: Diamonds }
  | { type: "SET_COLLAPSE_OPEN"; isCollapsed: boolean }
  | { type: "UPDATE_COLLECTION_FILTER"; filterName: CodeChallengesFilter }
  | {
      type: "ADD_UNTRACKED_CHALLENGES";
      untrackedChallenges: CodewarsCompletedChallenge[];
    }
  | {
      type: "SET_LATEST_UNTRACKED_CHALLENGE";
      mostRecentUntrackedChallenge: CodewarsCompletedChallenge;
    }
  | {
      type: "COLLECT_DIAMOND_AND_FETCH_CHALLENGE_BEFORE_COUNTER_START";
      updatedUntrackedChallenges: CodewarsCompletedChallenge[];
    };

const currentUserReducer = (
  state: CurrentUserContext,
  action: CurrentUserAction
): CurrentUserContext => {
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

      const newCodewarsChallengeRecord: CodewarsDiamondsRecord = {
        id: action.selectedChallenge.id,
        rank: currentRankId,
        diamondsEarned: action.reward,
        collectedAt: new Date(),
        completedAt: new Date(action.selectedChallenge.completedAt),
      };

      const updatedDiamonds: Diamonds = {
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

      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          diamonds: updatedDiamonds,
        },
      };
    }
    case "SET_USER_DIAMONDS": {
      return {
        ...state,
        currentUser: { ...state.currentUser, diamonds: action.diamonds },
      };
    }
    case "SET_COLLAPSE_OPEN": {
      return { ...state, isCollapsed: action.isCollapsed };
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
    case "ADD_UNTRACKED_CHALLENGES": {
      // const isDifferent =
      //   (state.currentUser.codewars.codeChallenges.untrackedChallenges ?? []).length !==
      //   action.untrackedChallenges.length;

      // console.log(
      //   "state.currentUser.codewars.codeChallenges.untrackedChallenges",
      //   state.currentUser.codewars.codeChallenges.untrackedChallenges,
      //   "action.untrackedChallenges",
      //   action.untrackedChallenges,
      // );
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          codewars: {
            ...state.currentUser.codewars,
            codeChallenges: {
              ...state.currentUser.codewars.codeChallenges,
              // list: [
              //   ...(isDifferent ? action.untrackedChallenges : []),
              //   ...state.currentUser.codewars.codeChallenges.list,
              // ],
              untrackedChallenges: action.untrackedChallenges,
            },
          },
        },
      };
    }
    case "SET_LATEST_UNTRACKED_CHALLENGE": {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          codewars: {
            ...state.currentUser.codewars,
            codeChallenges: {
              ...state.currentUser.codewars.codeChallenges,
              mostRecentUntrackedChallenge: {
                ...action.mostRecentUntrackedChallenge,
              },
            },
          },
        },
      };
    }
    case "COLLECT_DIAMOND_AND_FETCH_CHALLENGE_BEFORE_COUNTER_START": {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          codewars: {
            ...state.currentUser.codewars,
            codeChallenges: {
              ...state.currentUser.codewars.codeChallenges,
              untrackedChallenges: action.updatedUntrackedChallenges,
            },
          },
        },
      };
    }
    default:
      return state;
  }
};

export default currentUserReducer;
