import { z } from 'zod';

// Reusable rank schema
const RankSchema = z.object({
  name: z.string(),
  color: z.string(), // could refine with hex/color regex if needed
  score: z.number().int().nonnegative()
});

// Profile data schema
export const codewarsProfileDataSchema = z.object({
  isConnected: z.boolean(),
  name: z.string().optional(),
  username: z.string().optional(),
  email: z.string().email().optional(),
  clan: z.string().optional(),
  honor: z.number().int().nonnegative().optional(),
  leaderboardPosition: z.number().int().nonnegative().optional(),
  ranks: z
    .object({
      overall: RankSchema,
      languages: z.record(RankSchema) // dynamic keys (JS, TS, etc.)
    })
    .optional(),
  skills: z.array(z.string()).optional(),
  totalDiamonds: z.number().default(0)
});

// ✅ Type inference for TypeScript
export type CodewarsProfileData = z.infer<typeof codewarsProfileDataSchema>;

export const isConnectedToCodewarsSchema = z.object({
  isConnected: z.boolean(),
  name: z.string(),
  username: z.string(),
  totalDiamonds: z.number().default(0),
  id: z.string()
});

export type isConnectedToCodewars = z.infer<typeof isConnectedToCodewarsSchema>;
