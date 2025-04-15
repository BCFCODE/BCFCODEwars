import { CodewarsCompletedChallenge } from "@/types/codewars";
import { AuthenticatedUser } from "@/types/users";
import { Session } from "next-auth";

export interface CurrentUserState {
  session?: Session;
}

export interface CurrentUserContext extends CurrentUserState {
  currentUser: AuthenticatedUser;
}

export type CurrentUserAction = {
  type: "ADD_UNTRACKED_CHALLENGES_TO_LIST";
  untrackedChallenges: CodewarsCompletedChallenge[];
};

const currentUserReducer = (
  state: CurrentUserContext,
  action: CurrentUserAction
): CurrentUserContext => {
  switch (action.type) {
    case "ADD_UNTRACKED_CHALLENGES_TO_LIST": {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          codewars: {
            ...state.currentUser.codewars,
            codeChallenges: {
              ...state.currentUser.codewars.codeChallenges,
              list: [
                ...action.untrackedChallenges,
                ...state.currentUser.codewars.codeChallenges.list,
              ],
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
