import { currentUser, type User } from '@clerk/nextjs/server';

/**
 * Utility: Fetches the full current Clerk user object.
 *
 * This is a thin wrapper around Clerk's `currentUser()` that:
 *  - Ensures a user is logged in.
 *  - Optionally strips `_raw` or non-serialisable fields if you need to pass it to a Client Component.
 *
 * @throws {Error} If there is no logged-in user.
 * @returns {Promise<User>} The full Clerk `User` object for server-side use.
 *
 * @example
 * const user = await getUser();
 * console.log(user.firstName, user.imageUrl);
 */
export async function getUser(): Promise<User> {
  const user = await currentUser();
  if (!user) {
    throw new Error(
      'No authenticated user found (Clerk currentUser returned null).'
    );
  }
  return user;
}

/**
 * Utility: Fetches the current user's primary email address from Clerk.
 *
 * This builds on top of `getUser()` and extracts the email in a safe way.
 * Throws if the user has no email (shouldn’t normally happen if email auth is required).
 *
 * @throws {Error} If there is no logged-in user or no primary email found.
 * @returns {Promise<string>} The primary email address of the current user.
 *
 * @example
 * const email = await getEmail();
 * console.log(email); // e.g. "user@example.com"
 */
export async function getEmail(): Promise<string> {
  const user = await getUser();
  const email =
    user.emailAddresses?.[0]?.emailAddress ??
    user.primaryEmailAddress?.emailAddress ??
    null;

  if (!email) {
    throw new Error(
      'Email is required to fetch Codewars data (user not authenticated or missing email).'
    );
  }

  return email;
}
