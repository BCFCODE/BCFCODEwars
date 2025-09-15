import { getPublicCodewarsUsers } from '@/services/userService';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  // Authenticate the request
  const { sessionStatus, getToken } = await auth();

  if (sessionStatus !== 'active') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get JWT for verification or backend calls
  const token = await getToken({ template: 'bcfcode-jwt-service' });

  console.log('JWT Token for user:', token); // optional: debugging

  try {
    const users = await getPublicCodewarsUsers();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
