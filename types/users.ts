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

export interface DatabaseUser extends BaseUser {
  activity: UserActivity;
}

export interface LeaderboardState {
  isCollapsed: boolean;
}

export interface AuthenticatedUser extends DatabaseUser, LeaderboardState {
  codewars: CodewarsUser;
  diamonds: Diamonds;
  session: Session;
}
