import { getDb } from '@/lib/mongodb';
import { CodewarsProfileData } from '@/types';

export async function isConnected(email: string) {
  try {
    const db = await getDb();
    return await db
      .collection('codewars')
      .findOne({ email }, { projection: { isConnected: 1, name: 1 } });
  } catch (error) {
    console.error('Error in isConnectedToCodewars:', error);
    throw new Error('Failed to check Codewars connection');
  }
}

export async function getCodewarsProfile(
  email: string
): Promise<CodewarsProfileData | null> {
  try {
    const db = await getDb();

    const profile = await db
      .collection<CodewarsProfileData>('codewars')
      .findOne(
        { email },
        {
          projection: {
            _id: 0,
            isConnected: 1,
            name: 1,
            username: 1,
            email: 1,
            clan: 1,
            honor: 1,
            leaderboardPosition: 1,
            ranks: 1,
            skills: 1
          }
        }
      );

    if (!profile) {
      return null; // ❌ no profile found
    }

    return profile; // ✅ return the profile doc
  } catch (error) {
    console.error('Error in getCodewarsProfile:', error);
    throw new Error('Failed to fetch Codewars profile');
  }
}
