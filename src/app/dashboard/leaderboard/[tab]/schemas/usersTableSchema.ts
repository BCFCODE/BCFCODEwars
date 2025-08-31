import { z } from 'zod';

export const schema = z.object({
  email: z.string().optional(),
  name: z.string().optional(),
  image: z.string().optional(),
  lastActiveTime: z.date().optional(),
  firstLogin: z.date().optional(),
  totalDiamonds: z.number().optional(),
  id: z.number(),
  header: z.string(),
  type: z.string(),
  status: z.string(),
  target: z.string(),
  limit: z.string(),
  reviewer: z.string()
});
