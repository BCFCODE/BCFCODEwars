import { CodewarsUser } from "../codewars";
import { NewDatabaseUser } from "../user";
import { Diamonds } from "./diamonds";

export interface DBUser extends NewDatabaseUser {
  codewars?: CodewarsUser;
  diamonds?: Diamonds;
}

export type CurrentUser = Required<DBUser>;
