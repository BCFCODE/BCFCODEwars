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
