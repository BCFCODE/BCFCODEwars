import { getDb } from '@/lib/mongodb';

export async function findAllUsers() {
  const db = await getDb(process.env.MONGODB_DB as string);
  return await db
    .collection('users')
    .find(
      {},
      {
        projection: {
          _id: 0,
          email: 1,
          name: 1,
          image: 1,
          'activity.lastActiveTime': 1,
          'activity.firstLogin': 1
        }
      }
    )
    .toArray();
}
