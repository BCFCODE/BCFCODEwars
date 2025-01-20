import { CodewarsCompletedChallenge } from "./codewars";
import { DatabaseUser } from "./database";

export interface ICodewarsContext {
  completedChallenges: CodewarsCompletedChallenge[] | undefined;
}

export interface IDatabaseUserProvider {
  currentUser: DatabaseUser;
  allUsers: DatabaseUser[];
}
