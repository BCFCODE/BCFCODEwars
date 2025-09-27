import { z } from 'zod';

// Zod schema for validating MongoDB ObjectId strings (24-character hex)
const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, {
  message: 'Invalid ObjectId format: must be a 24-character hexadecimal string'
});

// Zod schema for the kata document
const kataSchema = z
  .object({
    name: z.string().min(1, { message: 'Kata name is required' }), // Kata name
    slug: z.string().min(1, { message: 'Kata slug is required' }), // URL-friendly slug
    completedLanguages: z
      .array(z.string().min(1, { message: 'Language name cannot be empty' }))
      .min(1, { message: 'At least one completed language is required' }), // Array of languages
    completedAt: z
      .string()
      .datetime({ message: 'Invalid ISO date format for completedAt' })
      .transform((val) => new Date(val)), // Parse ISO string to Date
    rewardStatus: z.enum(['claimedDiamonds', 'pending', 'unclaimed'], {
      errorMap: (issue, ctx) => ({
        message: `Invalid reward status: must be one of 'claimedDiamonds', 'pending', 'unclaimed', got '${ctx.data}'`
      })
    }), // Enum for reward status
    userId: objectIdSchema // User ID as ObjectId string
  })
  .strict(); // Prevent unknown fields

// TypeScript type inferred from the Zod schema
type Kata = z.infer<typeof kataSchema>;

export { kataSchema, type Kata };
