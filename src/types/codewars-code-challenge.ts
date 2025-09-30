import { z } from 'zod';

// Define schemas for nested objects first
const UserSchema = z.object({
  id: z.string().uuid('User ID must be a valid UUID'),
  username: z.string().min(1, 'Username cannot be empty')
});

const RankSchema = z
  .object({
    id: z.number().int('Rank ID must be an integer'),
    name: z.string().min(1, 'Rank name cannot be empty'),
    color: z.string().min(1, 'Rank color cannot be empty')
  })
  .optional();

const UnresolvedSchema = z.object({
  issues: z
    .number()
    .int('Issues must be an integer')
    .nonnegative('Issues cannot be negative'),
  suggestions: z
    .number()
    .int('Suggestions must be an integer')
    .nonnegative('Suggestions cannot be negative')
});

// Main CodeChallenge schema
const CodeChallengeSchema = z.object({
  id: z.string().uuid('ID must be a valid UUID'),
  name: z.string().min(1, 'Name cannot be empty'),
  slug: z
    .string()
    .min(1, 'Slug cannot be empty')
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens'),
  url: z.string().url('URL must be a valid URL'),
  category: z.string().min(1, 'Category cannot be empty'),
  description: z.string().min(1, 'Description cannot be empty'),
  tags: z
    .array(z.string().min(1, 'Tag cannot be empty'))
    .min(1, 'At least one tag is required'),
  languages: z
    .array(z.string().min(1, 'Language cannot be empty'))
    .min(1, 'At least one language is required'),
  rank: RankSchema,
  createdBy: UserSchema,
  publishedAt: z.string().datetime('PublishedAt must be a valid ISO datetime'),
  approvedBy: UserSchema.optional(),
  approvedAt: z
    .string()
    .datetime('ApprovedAt must be a valid ISO datetime')
    .optional(),
  totalCompleted: z
    .number()
    .int('TotalCompleted must be an integer')
    .nonnegative('TotalCompleted cannot be negative'),
  totalAttempts: z
    .number()
    .int('TotalAttempts must be an integer')
    .nonnegative('TotalAttempts cannot be negative'),
  totalStars: z
    .number()
    .int('TotalStars must be an integer')
    .nonnegative('TotalStars cannot be negative'),
  voteScore: z.number().int('VoteScore must be an integer'),
  contributorsWanted: z.boolean(),
  unresolved: UnresolvedSchema
});

// Infer TypeScript type from Zod schema
type CodeChallenge = z.infer<typeof CodeChallengeSchema>;

// Export both schema and type
export { CodeChallengeSchema, type CodeChallenge };
