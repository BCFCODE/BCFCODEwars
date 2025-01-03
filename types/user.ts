// types/user.ts

import { CodewarsUser } from "./codewars";
import { GoogleUser } from "./google";

export interface NewDatabaseUser extends GoogleUser {
  createdAt: string;
  lastLogin: string;
  codewars: CodewarsUser | { isConnected: boolean };
}
