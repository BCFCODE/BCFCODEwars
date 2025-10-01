import { z } from 'zod';

// Zod schema for validating 24-character hexadecimal strings (not strictly ObjectId)
export const hexIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, {
  message: 'Invalid ID format: must be a 24-character hexadecimal string'
});

// Zod schema for the kata document
const kataSchema = z
  .object({
    userId: hexIdSchema, // User ID as 24-char hex string (MongoDB ObjectId)
    id: z.string().min(1, { message: 'Kata ID is required' }), // Codewars kata ID (less strict than ObjectId)
    name: z.string().min(1, { message: 'Kata name is required' }), // Kata name
    slug: z.string().min(1, { message: 'Kata slug is required' }), // URL-friendly slug
    completedLanguages: z
      .array(z.string().min(1, { message: 'Language name cannot be empty' }))
      .default([]), // Allow empty array for incomplete katas
    completedAt: z
      .string()
      .datetime({ message: 'Invalid ISO date format for completedAt' })
      .transform((val) => new Date(val))
      .or(z.date()), // Accept ISO string or Date, transform to Date
    rewardStatus: z.boolean().optional()
  })
  .strict() // Prevent unknown fields
  .refine(
    (data) =>
      data.completedAt instanceof Date && !isNaN(data.completedAt.getTime()),
    {
      message: 'completedAt must be a valid Date object',
      path: ['completedAt']
    }
  ); // Ensure valid Date after transform

// TypeScript type inferred from the Zod schema
type Kata = z.infer<typeof kataSchema>;

export { kataSchema, type Kata };
