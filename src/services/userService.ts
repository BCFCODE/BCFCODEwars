import { usersTableSchema } from '@/app/dashboard/leaderboard/[tab]/schemas';
import { findAllUsers } from '@/app/repositories/userRepository';

export async function getPublicUsers() {
  const users = await findAllUsers();

  return usersTableSchema.array().parse(
    users.map((user) => ({
      email: user.email,
      name: user.name,
      image: user.image,
      lastActiveTime: user.activity?.lastActiveTime,
      firstLogin: user.activity.firstLogin
    }))
  );
}
