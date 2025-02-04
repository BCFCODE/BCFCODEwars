import { CodewarsCompletedChallenge } from "./codewars";
import { DBUser } from "./db/users";

export interface ICodewarsContext {
  completedChallenges: CodewarsCompletedChallenge[] | undefined;
}

export interface IDBUserProvider {
  currentUser: DBUser;
  allUsers: DBUser[];
}
