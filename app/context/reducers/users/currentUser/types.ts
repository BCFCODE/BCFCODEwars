import { CurrentUserContextState } from "@/app/context/providers/db/currentUser/types";
import { Diamonds } from "@/types/db/diamonds";

export type CurrentUserState = CurrentUserContextState;

export type CurrentUserAction =
  | { type: "SET_USER_DIAMONDS"; diamonds: Diamonds }
  | { type: "SET_COLLAPSE_OPEN"; isCollapse: boolean };
