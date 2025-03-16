import { CurrentUserContextState } from "@/app/context/providers/db/currentUser/types";
import { CodewarsCompletedChallenge } from "@/types/codewars";
import { Diamonds } from "@/types/db/diamonds";

export type CurrentUserState = CurrentUserContextState;

export type CurrentUserAction =
  | { type: "UPDATE_CODE_CHALLENGES_LIST"; list: CodewarsCompletedChallenge[] }
  | { type: "UPDATE_CODEWARS_DIAMONDS_SUM"; reward: number }
  | { type: "SET_USER_DIAMONDS"; diamonds: Diamonds }
  | { type: "SET_COLLAPSE_OPEN"; isCollapse: boolean };
