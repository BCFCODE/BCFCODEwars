import { CodewarsDatabase } from "../codewars";
import { NewDatabaseUser } from "../user";

export interface DBUser extends NewDatabaseUser {
  codewars: CodewarsDatabase;
}

