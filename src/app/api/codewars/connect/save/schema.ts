import { CodewarsApiSchema, ToastTypeSchema } from '@/types';
import { z } from 'zod';

// Input validation
export const SaveBodySchema = z.object({
  userData: CodewarsApiSchema
});

// Unified API response schema
const ApiResponseSchema = z.union([
  z.object({
    success: z.literal(true),
    message: z.string(),
    toastType: ToastTypeSchema
  }),
  z.object({
    success: z.literal(false),
    reason: z.string(),
    toastType: ToastTypeSchema
  })
]);

export type ApiResponse = z.infer<typeof ApiResponseSchema>;
