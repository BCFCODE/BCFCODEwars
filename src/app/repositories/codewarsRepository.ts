import { getDb } from '@/lib/mongodb';

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
