import { Session } from "next-auth";
import { CodewarsCompletedChallenge, CodewarsUser } from "./codewars";
import { Diamonds } from "./diamonds";
import { GoogleUser } from "./google";

export interface BaseUser extends GoogleUser {
  firstLogin: Date;
  lastLogin: Date;
}

export interface UserActivity {
  firstLogin: Date;
  lastLogin: Date;
  lastLogout: Date;
  loginHistory: Date[];
  logoutHistory: Date[];
  isActiveSession: boolean;
}

export interface CurrentUserState {
  session?: Session;
}

export interface DatabaseUser extends BaseUser, CurrentUserState {
  codewars?: CodewarsUser;
  diamonds?: Diamonds;
  activity: UserActivity;
}

export type CurrentUser = Required<DatabaseUser>;
