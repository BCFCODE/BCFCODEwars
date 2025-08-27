import { z } from 'zod';

export const schema = z.object({
  _id: z.object({
    $oid: z.string()
  }),
  name: z.string(),
  image: z.string()
});
