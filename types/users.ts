import { CodewarsUser } from "./codewars";
import { Diamonds } from "./diamonds";
import { GoogleUser } from "./google";

export interface NewDatabaseUser extends GoogleUser {
  createdAt: string;
  lastLogin: string;
  // codewars: { isConnected: boolean };
}

export interface DBUser extends NewDatabaseUser {
  codewars?: CodewarsUser;
  diamonds?: Diamonds;
}

export type CurrentUser = Required<DBUser>;
