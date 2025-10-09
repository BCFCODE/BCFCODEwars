import { CodewarsApiSchema, ToastTypeSchema } from '@/types';
import { z } from 'zod';

// Input validation
export const ConnectBodySchema = z.object({
  username: z.string().trim().min(1, 'Please enter your Codewars username.')
});

// Unified API response schema
const ApiResponseSchema = z.union([
  z.object({
    success: z.literal(true),
    message: z.string(),
    toastType: ToastTypeSchema,
    userData: CodewarsApiSchema
  }),
  z.object({
    success: z.literal(false),
    reason: z.string(),
    toastType: ToastTypeSchema
  })
]);

export type ApiResponse = z.infer<typeof ApiResponseSchema>;
