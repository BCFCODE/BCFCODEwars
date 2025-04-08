import { CodewarsCompletedChallenge, CodewarsUser } from "@/types/codewars";
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
  isCollapsed?: boolean;
  isUserOnPersonalDashboard?: boolean;
}

export interface CurrentUserContext extends CurrentUserState {
  currentUser: AuthenticatedUser;
}

export type CurrentUserAction =
  | { type: "UPDATE_CODE_CHALLENGES_LIST"; list: CodewarsCompletedChallenge[] }
  | {
      type: "USER_COLLECTED_CHALLENGE_REWARD_(BEFORE_COUNTER)";
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
  | { type: "SELECTED_CHALLENGE_MATCHES_LATEST_UNTRACKED" }
  | {
      type: "DIAMOND_COUNT_ANIMATION_COMPLETED";
      selectedChallenge: CodewarsCompletedChallenge;
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
    case "USER_COLLECTED_CHALLENGE_REWARD_(BEFORE_COUNTER)": {
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
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          codewars: {
            ...state.currentUser.codewars,
            codeChallenges: {
              ...state.currentUser.codewars.codeChallenges,
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
              mostRecentUntrackedChallenge: action.mostRecentUntrackedChallenge,
            },
          },
        },
      };
    }
    case "SELECTED_CHALLENGE_MATCHES_LATEST_UNTRACKED": {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          codewars: {
            ...state.currentUser.codewars,
            codeChallenges: {
              ...state.currentUser.codewars.codeChallenges,
              mostRecentUntrackedChallenge: null,
            },
          },
        },
      };
    }
    case "DIAMOND_COUNT_ANIMATION_COMPLETED": {
      // const list: CodewarsCompletedChallenge[] = [
      //   action.selectedChallenge,
      //   ...state.currentUser.codewars.codeChallenges.list,
      // ];

      // const untrackedChallenges: CodewarsCompletedChallenge[] =
      //   state.currentUser.codewars.codeChallenges.untrackedChallenges.filter(
      //     (challenge) => challenge.id !== action.selectedChallenge.id
      //   );

      // const codeChallenges: CodeChallenges = {
      //   ...state.currentUser.codewars.codeChallenges,
      //   list,
      //   untrackedChallenges,
      // };

      // const codewars: CodewarsUser = {
      //   ...state.currentUser.codewars,
      //   codeChallenges,
      // };

      // const currentUser: AuthenticatedUser = {
      //   ...state.currentUser,
      //   codewars,
      // };

      return { ...state };
    }
    default:
      return state;
  }
};

export default currentUserReducer;
