import { auth, currentUser, type User } from '@clerk/nextjs/server';
import type { UserResource } from '@clerk/types';

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
 * Utility: Fetches the full current Clerk user object.
 *
 * This is a thin wrapper around Clerk's `currentUser()` that:
 *  - Ensures a user is logged in using `auth()` for a lightweight check first.
 *  - Optionally selects specific fields for performance (e.g., to avoid fetching unnecessary data).
 *  - Optionally strips `_raw` or non-serializable fields (e.g., functions, private metadata) if passing to a Client Component.
 *
 * Best practices:
 * - Use in Server Components, Route Handlers, or Server Actions only.
 * - For quick auth checks without full user data, prefer `auth()` directly.
 * - Handle errors with Next.js error boundaries (`error.tsx`) for graceful recovery.
 *
 * @param options - Optional config for field selection and serialization.
 * @throws {AuthError} If there is no logged-in user.
 * @returns {Promise<User>} The full (or selected) Clerk `User` object for server-side use.
 *
 * @example
 * // Full user
 * const user = await getUser();
 * console.log(user.firstName, user.imageUrl);
 *
 * // Selected fields only (faster)
 * const user = await getUser({ select: { firstName: true, emailAddresses: true } });
 *
 * // Client-safe (stripped)
 * const safeUser = await getUser({ stripPrivate: true });
 */
export async function getUser(options?: {
  select?: UserResource;
  stripPrivate?: boolean;
}): Promise<User> {
  const { userId } = await auth();

  if (!userId) {
    throw new AuthError(
      'No authenticated user found (Clerk auth returned null userId).'
    );
  }

  const user = await currentUser();

  if (!user) {
    throw new AuthError(
      'No authenticated user found (Clerk currentUser returned null).'
    );
  }

  if (options?.stripPrivate) {
    // Strip non-serializable/private fields to avoid issues passing to Client Components
    const { ...safeUser } = user;
    return safeUser as User;
  }

  return user;
}

/**
 * Utility: Fetches the current user's primary email address from Clerk.
 *
 * This optimizes by selecting only email fields for better performance.
 * Builds on `auth()` and `currentUser()`; throws if no user or email.
 *
 * Best practices:
 * - For email-only needs, this avoids fetching the full user object.
 * - Use TypeScript for safe property access.
 * - In production, avoid logging sensitive data like emails.
 *
 * @throws {AuthError} If there is no logged-in user or no primary email found.
 * @returns {Promise<string>} The primary email address of the current user.
 *
 * @example
 * const email = await getEmail();
 * console.log(email); // e.g. "user@example.com"
 */
export async function getEmail(): Promise<string> {
  const { userId } = await auth();

  if (!userId) {
    throw new AuthError('Email is required but no authenticated user found.');
  }

  const user = await currentUser();

  if (!user) {
    throw new AuthError('Email is required but user data fetch failed.');
  }

  const email =
    user.emailAddresses?.[0]?.emailAddress ??
    user.primaryEmailAddress?.emailAddress ??
    null;

  if (!email) {
    throw new AuthError(
      'Email is required to fetch Codewars data (user missing email address).'
    );
  }

  return email;
}
