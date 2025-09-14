import { isConnected } from '@/app/repositories/codewarsRepository';
import z from 'zod';

export async function isConnectedToCodewars(email: string) {
  const isConnectedToCodewars = await isConnected(email);

  const schema = z.object({
    isConnected: z.boolean(),
    name: z.string()
  });

  return schema.safeParse(isConnectedToCodewars);
}
