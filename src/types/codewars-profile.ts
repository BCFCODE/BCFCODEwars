import { z } from 'zod';

// Schema for individual rank (e.g., overall or language-specific)
export const RankSchema = z.object({
  rank: z.number().int(), // Rank value (e.g., -8 to 8 for kyu/dan)
  name: z.string(), // Rank name (e.g., "8 kyu", "1 dan")
  color: z.string(), // Rank color (e.g., "white", "yellow", "black")
  score: z.number()
});

// Schema for code challenges
export const CodeChallengesSchema = z.object({
  totalAuthored: z.number().int().nonnegative(), // Number of authored katas
  totalCompleted: z.number().int().nonnegative() // Number of completed katas
});

// Profile data schema
export const codewarsProfileDataSchema = z.object({
  isConnected: z.boolean(), // Indicates if user is connected to Codewars
  username: z.string(), // Required: Username from Codewars API
  name: z.string().nullable(), // Name can be null per API
  email: z.string().email().optional(), // Email not provided by API but used in DB
  clan: z.string().nullable(), // Clan can be null per API
  honor: z.number().int().nonnegative(), // Total honor points
  leaderboardPosition: z.number().int().nonnegative().nullable(), // Leaderboard position can be null
  ranks: z.object({
    overall: RankSchema, // Overall rank
    languages: z.record(z.string(), RankSchema) // Language-specific ranks (e.g., { javascript: RankSchema })
  }), // Required per API
  skills: z.array(z.string()).nullable(), // Skills can be null per API
  codeChallenges: CodeChallengesSchema, // Code challenges data from API
  totalDiamonds: z.number().int().nonnegative().default(0) // Added via addDiamondsStages
});

// Type inference for TypeScript
export type CodewarsProfileData = z.infer<typeof codewarsProfileDataSchema>;

export const isConnectedToCodewarsSchema = z.object({
  isConnected: z.boolean(),
  name: z.string(),
  username: z.string(),
  totalDiamonds: z.number().default(0),
  id: z.string()
});

export type isConnectedToCodewars = z.infer<typeof isConnectedToCodewarsSchema>;
