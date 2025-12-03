import { auth, currentUser, type User } from '@clerk/nextjs/server';

/**
 * Custom error for authentication-related failures.
 */
export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

/**
 * Utility: Fetches the current authenticated Clerk user.
 *
 * A safe wrapper around `currentUser()` that:
 * - First checks authentication via `auth()` (lightweight)
 * - Throws a clear error if no user is signed in
 * - Returns the full, serializable `User` object (safe for Server Components, Route Handlers, and Server Actions)
 *
 * Note: In Clerk v5+, `currentUser()` returns only serializable data by default.
 * Field selection (`select`) is no longer supported.
 *
 * @throws {AuthError} If no user is authenticated
 * @returns {Promise<User>} The current Clerk user
 *
 * @example
 * const user = await getUser();
 * console.log(user.id, user.firstName, user.primaryEmailAddress?.emailAddress);
 */
export async function getUser(): Promise<User> {
  const { userId } = await auth();

  if (!userId) {
    throw new AuthError('No authenticated user found. User must be signed in.');
  }

  const user = await currentUser();

  if (!user) {
    throw new AuthError(
      'Authenticated user not found in Clerk (currentUser returned null).'
    );
  }

  return user;
}

/**
 * Utility: Gets the current user's primary email address.
 *
 * Lightweight and safe way to get just the email without exposing full user object.
 *
 * @throws {AuthError} If no user is signed in or no primary email exists
 * @returns {Promise<string>} The user's primary email address
 *
 * @example
 * const email = await getEmail();
 * console.log(`Welcome, ${email}!`);
 */
export async function getEmail(): Promise<string> {
  const { userId } = await auth();

  if (!userId) {
    throw new AuthError('No authenticated user found.');
  }

  const user = await currentUser();

  if (!user) {
    throw new AuthError('User not found in Clerk.');
  }

  const primaryEmail = user.primaryEmailAddress?.emailAddress;

  if (!primaryEmail) {
    throw new AuthError('No primary email address found for this user.');
  }

  return primaryEmail;
}
