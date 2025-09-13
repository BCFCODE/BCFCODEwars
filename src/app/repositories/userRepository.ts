import { getDb } from '@/lib/mongodb';

export async function findAllUsers() {
  const db = await getDb();
  const users = await db
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
      {
        $lookup: {
          from: 'codewars', // Collection to join with
          localField: 'email', // Field in users collection
          foreignField: 'email', // Field in diamonds collection
          as: 'codewarsData' // Output array field
        }
      },
      // Step 2: Unwind diamondsData (optional, for one-to-one mapping)
      {
        $unwind: {
          path: '$diamondsData',
          preserveNullAndEmptyArrays: true // Keep users without diamonds data
        }
      },
      {
        $unwind: {
          path: '$codewarsData',
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
          totalDiamonds: '$diamondsData.totals.total', // From diamonds.totals.total
          isCodewarsConnected: '$codewarsData.isConnected'
        }
      }
    ])
    .toArray();

  return users;
}

export async function findCodewarsUsers() {
  const db = await getDb();
  return await db
    .collection('codewars')
    .aggregate([
      // Step 1: Filter for isConnected: true
      {
        $match: {
          isConnected: true
        }
      },
      // Step 2: Join with users collection
      {
        $lookup: {
          from: 'users',
          localField: 'email', // Assuming codewars collection has an email field
          foreignField: 'email',
          as: 'userData'
        }
      },
      {
        $lookup: {
          from: 'diamonds', // Collection to join with
          localField: 'email', // Field in users collection
          foreignField: 'email', // Field in diamonds collection
          as: 'diamondsData' // Output array field
        }
      },
      // Step 3: Unwind userData (assuming one-to-one mapping)
      {
        $unwind: {
          path: '$userData',
          preserveNullAndEmptyArrays: false // Exclude codewars users without matching user data
        }
      },
      {
        $unwind: {
          path: '$diamondsData',
          preserveNullAndEmptyArrays: true // Keep users without diamonds data
        }
      },
      // Step 4: Project only name and image
      {
        $project: {
          _id: 0,
          email: '$userData.email',
          name: '$userData.name',
          image: '$userData.image',
          totalDiamonds: '$diamondsData.totals.total' // From diamonds.totals.total
        }
      }
    ])
    .toArray();
}
