import { CurrentUserState } from "@/app/context/reducers/currentUser";
import { CodewarsUser } from "./codewars";
import { Diamonds } from "./diamonds";
import { Session } from "next-auth";

export interface UserActivity {
  firstLogin: Date;
  lastLogin: Date;
  lastLogout: Date;
  loginHistory: Date[];
  logoutHistory: Date[];
  idleHistory: { from: Date; to?: Date; duration?: number }[];
  isIdle: boolean;
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

export enum UserRole {
  SuperAdmin = "superAdmin",
  // Admin = "admin",
  // Moderator = "moderator",
  // User = "user",
  // Guest = "guest",
}

export interface DatabaseUser extends BaseUser {
  activity: UserActivity;
  role?: UserRole.SuperAdmin;
  websiteUrl?: string;
}

export interface AuthenticatedUser extends DatabaseUser, CurrentUserState {
  codewars: CodewarsUser;
  diamonds: Diamonds;
  session: Session;
}
