/**
 * Codewars Service Layer
 * ======================
 * This module provides **server-only** helper functions for fetching and validating
 * the current user’s Codewars connection and profile data.
 *
 * - `isConnectedToCodewars()` returns whether the signed-in user is connected.
 * - `getCodewarsProfileData()` returns the validated Codewars profile for the signed-in user.
 *
 * It uses:
 *  - `@clerk/nextjs/server` to get the authenticated user’s email
 *  - Repository layer `codewarsRepository` to fetch data from MongoDB
 *  - Zod schemas (`isConnectedToCodewarsSchema`, `codewarsProfileDataSchema`) to validate responses
 *
 * All functions throw if the user is not authenticated or if required fields are missing.
 */

import {
  getCodewarsProfile,
  isConnected
} from '@/app/repositories/codewarsRepository';
import {
  codewarsProfileDataSchema,
  isConnectedToCodewarsSchema
} from '@/types';

/**
 * Checks whether the currently signed-in user has connected their Codewars account.
 *
 * - Fetches the email from Clerk
 * - Calls `isConnected(email)` from the repository
 * - Validates the returned object with `isConnectedToCodewarsSchema`
 *
 * @returns {Promise<ReturnType<typeof isConnectedToCodewarsSchema.safeParse>>}
 *          A Zod SafeParseReturn. Use `.success` to check validity and `.data` to get typed data.
 *
 * @example
 * const result = await isConnectedToCodewars();
 * if (result.success) console.log(result.data.isConnected);
 */
export async function isConnectedToCodewars() {
  const raw = await isConnected();

  // Validate with Zod
  return isConnectedToCodewarsSchema.safeParse(raw);
}

/**
 * Fetches the full Codewars profile for the currently signed-in user.
 *
 * - Fetches the email from Clerk
 * - Calls `getCodewarsProfile(email)` from the repository
 * - Validates the returned object with `codewarsProfileDataSchema`
 *
 * @returns {Promise<ReturnType<typeof codewarsProfileDataSchema.safeParse>>}
 *          A Zod SafeParseReturn. Use `.success` to check validity and `.data` to get typed data.
 *
 * @example
 * const result = await getCodewarsProfileData();
 * if (result.success) {
 *   const profile = result.data;
 *   console.log(profile.honor);
 * }
 */
export async function getCodewarsProfileData() {
  const raw = await getCodewarsProfile();

  // Validate with Zod
  return codewarsProfileDataSchema.safeParse(raw);
}
