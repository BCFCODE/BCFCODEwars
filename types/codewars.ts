export type CodewarsUser = {
  id: string;
  username: string;
  name: string | null;
  honor: number;
  clan: string | null;
  leaderboardPosition: number | null;
  skills: string[] | null;
  ranks: {
    overall: {
      rank: number;
      name: string;
      color: string;
      score: number;
    };
    languages: {
      [language: string]: {
        rank: number;
        name: string;
        color: string;
        score: number;
      };
    };
  };
  codeChallenges: {
    totalAuthored: number;
    totalCompleted: number;
  };
};

export interface CodewarsDatabase {
  codewars: CodewarsUser;
  email?: string
}

export type CodewarsUserResponse =
  | { success: false; reason: "not found" }
  | CodewarsUser;

export interface CompletedChallenge {
  id: string; // Unique identifier for each challenge
  name: string; // Name of the challenge
  slug: string; // URL-friendly name of the challenge
  completedLanguages: string[]; // List of languages in which the challenge was completed
  completedAt: string; // ISO 8601 date string representing when the challenge was completed
}

export interface ApiResponse {
  totalPages: number; // Total number of pages in the response
  totalItems: number; // Total number of items across all pages
  data: CompletedChallenge[]; // Array of completed challenges
}

