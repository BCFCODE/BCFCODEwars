export interface LeaderboardRow {
  name: string; // User's name
  createdAt: string; // Date user joined (e.g., '2024-01-01')
  rank: number; // User's rank
  position: number; // User's local position
  globalPosition: number; // User's global position
}
