import { usersTableSchema } from '@/app/dashboard/leaderboard/[tab]/schemas';
import { findAllUsers } from '@/app/repositories/userRepository';

export async function getPublicUsers() {
  const users = await findAllUsers();
  return users.map((u) => usersTableSchema.parse(u));
}
