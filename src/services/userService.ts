import {
  findAllUsers,
  findCodewarsUsers
} from '@/app/repositories/userRepository';
import { z } from 'zod';

export async function getPublicUsers() {
  const users = await findAllUsers();

  const schema = z.object({
    email: z.string().optional(),
    name: z.string().optional(),
    image: z.string().optional(),
    lastActiveTime: z.date().optional(),
    firstLogin: z.date().optional(),
    totalDiamonds: z.number().optional()
  });

  return schema.array().parse(
    users.map((u) =>
      schema.parse({
        email: u.email,
        name: u.name,
        image: u.image,
        lastActiveTime: u.activity.lastActiveTime,
        firstLogin: u.activity.firstLogin,
        totalDiamonds: u.totalDiamonds
      })
    )
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
