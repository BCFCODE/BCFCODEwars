import { usersTableSchema } from '@/app/dashboard/leaderboard/[tab]/schemas';
import {
  findAllUsers,
  findCodewarsUsers
} from '@/app/repositories/userRepository';
import { z } from 'zod';

export async function getPublicUsers() {
  const users = await findAllUsers();

  return usersTableSchema.array().parse(
    users.map((user) => ({
      email: user.email,
      name: user.name,
      image: user.image,
      lastActiveTime: user.activity?.lastActiveTime,
      firstLogin: user.activity.firstLogin,
      totalDiamonds: user.totalDiamonds
    }))
  );
}

export async function getPublicCodewarsUsers() {
  const codewarsUsers = await findCodewarsUsers();

  const schema = z.object({
    email: z.string().optional(),
    name: z.string().optional(),
    image: z.string().optional()
  });

  return schema.array().parse(codewarsUsers);
}
