import { CodewarsDatabase } from "../codewars";
import { NewDatabaseUser } from "../user";
import { Diamonds } from "./diamonds";

export interface DBUser extends NewDatabaseUser {
  codewars: CodewarsDatabase;
  diamonds?: Diamonds;
}
