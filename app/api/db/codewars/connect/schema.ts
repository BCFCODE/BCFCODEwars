import { CodeChallengesFilter, RewardStatus } from "@/types/diamonds";
import { z } from "zod";

const CodewarsSingleChallengeSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  url: z.string(),
  category: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  languages: z.array(z.string()),
  rank: z.object({
    id: z.number(),
    name: z.string(),
    color: z.string(),
  }),
  createdBy: z.object({
    username: z.string(),
    url: z.string(),
  }),
  approvedBy: z.object({
    username: z.string(),
    url: z.string(),
  }),
  totalAttempts: z.number(),
  totalCompleted: z.number(),
  totalStars: z.number(),
  voteScore: z.number(),
  publishedAt: z.string(),
  approvedAt: z.string(),
});

const CodewarsCompletedChallengeSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  completedLanguages: z.array(z.string()),
  completedAt: z.string(),
  rewardStatus: z.union([
    z.nativeEnum(CodeChallengesFilter),
    z.nativeEnum(RewardStatus),
  ]),
  moreDetails: CodewarsSingleChallengeSchema.optional(),
});

const OverallRanksSchema = z.object({
  rank: z.number(),
  name: z.string(),
  color: z.string(),
  score: z.number(),
});

const LanguagesRanksSchema = z.record(
  z.object({
    rank: z.number(),
    name: z.string(),
    color: z.string(),
    score: z.number(),
  })
);

const RanksSchema = z.object({
  overall: OverallRanksSchema,
  languages: LanguagesRanksSchema,
});

const CodeChallengesSchema = z.object({
  totalAuthored: z.number(),
  totalCompleted: z.number(),
  challengeFilter: z.nativeEnum(CodeChallengesFilter),
  list: z.array(CodewarsCompletedChallengeSchema),
  untrackedChallengesAvailable: z.boolean().optional(),
});

const CodewarsUserSchema = z.object({
  success: z.boolean().optional(),
  isConnected: z.boolean(),
  email: z.string().email(),
  id: z.string(),
  username: z.string(),
  name: z.string().nullable(),
  honor: z.number(),
  clan: z.string().nullable(),
  leaderboardPosition: z.number().nullable(),
  skills: z.array(z.string()).nullable(),
  ranks: RanksSchema,
  codeChallenges: CodeChallengesSchema,
});

export type CodewarsUser = z.infer<typeof CodewarsUserSchema>;

const connectSchema = z.object({
  email: z.string().email(),
  initializedCodewarsUser: CodewarsUserSchema,
});

export default connectSchema;
