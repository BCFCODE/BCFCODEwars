import { getDb } from '@/lib/mongodb';

export async function findAllUsers() {
  const db = await getDb(process.env.MONGODB_DB as string);
  return await db
    .collection('users')
    .aggregate([
      // Step 1: Join with diamonds collection
      {
        $lookup: {
          from: 'diamonds', // Collection to join with
          localField: 'email', // Field in users collection
          foreignField: 'email', // Field in diamonds collection
          as: 'diamondsData' // Output array field
        }
      },
      // Step 2: Unwind diamondsData (optional, for one-to-one mapping)
      {
        $unwind: {
          path: '$diamondsData',
          preserveNullAndEmptyArrays: true // Keep users without diamonds data
        }
      },
      // Step 3: Project desired fields
      {
        $project: {
          _id: 0,
          email: 1,
          name: 1,
          image: 1,
          'activity.lastActiveTime': 1,
          'activity.firstLogin': 1,
          totalDiamonds: '$diamondsData.totals.total' // From diamonds.totals.total
        }
      }
    ])
    .toArray();
}
