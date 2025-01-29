import {
  CodewarsChallengesResponse,
  CodewarsCompletedChallenge,
  CodewarsSingleChallenge,
  CodewarsUser,
} from "../codewars";

export interface DBCodewarsCompletedChallenge
  extends CodewarsCompletedChallenge,
    CodewarsSingleChallenge {}

export interface DBCompletedChallenges
  extends Omit<CodewarsChallengesResponse, "data"> {
  data: DBCodewarsCompletedChallenge[];
}

export interface DatabaseCodewars {
  email: string;
  userInformation: CodewarsUser;
  completedChallenges: DBCompletedChallenges;
}
