import { CodewarsDatabase } from "./codewars";
import { NewDatabaseUser } from "./user";

export interface DatabaseUser extends NewDatabaseUser {
  codewars: CodewarsDatabase;
}
