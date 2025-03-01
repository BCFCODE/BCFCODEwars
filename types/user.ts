// types/user.ts

import { GoogleUser } from "./google";

export interface NewDatabaseUser extends GoogleUser {
  createdAt: string;
  lastLogin: string;
  // codewars: { isConnected: boolean };
}
