import { CurrentUserContextType } from "@/app/context/providers/db/currentUser/types";
import { Diamonds } from "@/types/db/diamonds";

export type CurrentUserState = CurrentUserContextType;

export type Action = { type: "SET_USER_DIAMONDS"; diamonds: Diamonds };
