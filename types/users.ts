import { CurrentUserState } from "@/app/context/reducers/currentUserReducer";
import { CodewarsUser } from "./codewars";
import { Diamonds } from "./diamonds";
import { Session } from "next-auth";

export interface UserActivity {
  firstLogin: Date;
  lastLogin: Date;
  lastLogout: Date;
  loginHistory: Date[];
  logoutHistory: Date[];
  isActiveSession: boolean;
}

export interface GoogleUser {
  name: string;
  email: string;
  image?: string;
}

export interface BaseUser extends GoogleUser {
  firstLogin: Date;
  lastLogin: Date;
}

export interface DatabaseUser extends BaseUser, CurrentUserState {
  activity: UserActivity;
}

export interface AuthenticatedUser extends DatabaseUser {
  codewars: CodewarsUser;
  diamonds: Diamonds;
  session: Session;
}
