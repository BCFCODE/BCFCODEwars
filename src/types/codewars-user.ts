import { z } from 'zod';

// ✅ Base schema: what Codewars API returns
const RankSchema = z.object({
  rank: z.number(),
  name: z.string(),
  color: z.string(),
  score: z.number()
});

const CodeChallengesSchema = z.object({
  totalAuthored: z.number().nonnegative(),
  totalCompleted: z.number().nonnegative()
});

const LanguagesRankSchema = z.record(RankSchema);

export const CodewarsApiSchema = z.object({
  id: z.string().min(1),
  username: z.string().min(1),
  name: z.string().min(1),
  clan: z.string().min(1),
  honor: z.number().int(),
  leaderboardPosition: z.number().int().nonnegative(),
  codeChallenges: CodeChallengesSchema,
  ranks: z.object({
    overall: RankSchema,
    languages: LanguagesRankSchema
  }),
  skills: z.array(z.string()).optional().default([])
});

// ✅ Extended schema: what you store in MongoDB
export const CodewarsUserSchema = CodewarsApiSchema.extend({
  email: z.string().email(),
  isConnected: z.boolean(),
  connectedAt: z.date()
});

export type CodewarsApiUser = z.infer<typeof CodewarsApiSchema>;
export type CodewarsUser = z.infer<typeof CodewarsUserSchema>;
