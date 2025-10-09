import { z } from 'zod';

export const ToastTypeSchema = z.enum(['success', 'error', 'warning']);

export type ToastType = z.infer<typeof ToastTypeSchema>;
