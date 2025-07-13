import { CodewarsUser } from "@/app/api/db/codewars/connect/schema";
import { CodeChallengesFilter, RewardStatus } from "./diamonds";

interface OverallRanks {
  rank: number;
  name: string;
  color: string;
  score: number;
}

interface LanguagesRanks {
  [language: string]: {
    rank: number;
    name: string;
    color: string;
    score: number;
  };
}

export interface Ranks {
  overall: OverallRanks;
  languages: LanguagesRanks;
}

export interface CodeChallenges {
  totalPages: number;
  totalItems: number;
  totalAuthored: number;
  totalCompleted: number;
  challengeFilter: CodeChallengesFilter;
  list: CodewarsCompletedChallenge[];
}
/* 
  export type CodewarsUser = {
    success?: boolean;
    isConnected: boolean;
    email: string;
    id: string;
    username: string;
    name: string | null;
    honor: number;
    clan: string | null;
    leaderboardPosition: number | null;
    skills: string[] | null;
    ranks: Ranks;
    codeChallenges: CodeChallenges;
    role: UserRole;
    websiteUrl?: string;
  };
*/

export { type CodewarsUser };

// export type InitialCodewarsUser = Pick<CodewarsUser, "email" | "isConnected">;

// export interface CodewarsDatabase extends CodewarsUser {
//   isConnected: boolean;
// }

// export interface AddCodewarsUserToDB {
//   codewars: CodewarsUser;
//   email: string;
// }

export type CodewarsUserResponse =
  | { success: false; reason: "not found" }
  | CodewarsUser;

export interface CodewarsCompletedChallenge {
  // isUntracked: boolean;
  // isLatestUntracked: boolean;
  id: string; // Unique identifier for each challenge
  name: string; // Name of the challenge
  slug: string; // URL-friendly name of the challenge
  completedLanguages: string[]; // List of languages in which the challenge was completed
  completedAt: string; // ISO 8601 date string representing when the challenge was completed
  rewardStatus: CodeChallengesFilter | RewardStatus;
  moreDetails?: CodewarsSingleChallenge;
}

export interface CodewarsSingleChallenge {
  id: string; // Unique identifier for the challenge
  name: string; // Name of the challenge
  slug: string; // URL-friendly name of the challenge
  url: string; // Full URL to the challenge on Codewars
  category: string; // The category of the challenge (e.g., "algorithms")
  description: string; // Description of the challenge
  tags: string[]; // Array of tags associated with the challenge
  languages: string[]; // Programming languages available for the challenge
  rank: {
    id: number; // Numerical rank ID (e.g., -4 for "4 kyu")
    name: string; // Human-readable rank name (e.g., "4 kyu")
    color: string; // Color associated with the rank
  };
  createdBy: {
    username: string; // Username of the creator
    url: string; // URL to the creator's profile
  };
  approvedBy: {
    username: string; // Username of the approver
    url: string; // URL to the approver's profile
  };
  totalAttempts: number; // Total number of attempts on the challenge
  totalCompleted: number; // Total number of successful completions
  totalStars: number; // Number of stars received
  voteScore: number; // Total vote score
  publishedAt: string; // ISO 8601 date string of when the challenge was published
  approvedAt: string; // ISO 8601 date string of when the challenge was approved
}
