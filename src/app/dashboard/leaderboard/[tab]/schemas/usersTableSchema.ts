import { z } from 'zod';

export const schema = z.object({
  email: z.string(),
  name: z.string(),
  image: z.string(),
  lastActiveTime: z.date().optional(),
  firstLogin: z.date(),
  totalDiamonds: z.number()
});
