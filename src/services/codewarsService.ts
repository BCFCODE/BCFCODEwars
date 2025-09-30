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
  getRecentlySolved,
  isConnected
} from '@/app/repositories/codewarsRepository';
import { getDb } from '@/lib/mongodb';
import {
  codewarsProfileDataSchema,
  isConnectedToCodewarsSchema,
  recentlySolvedKataSchema
} from '@/types';
import { z } from 'zod';
import { getEmail } from './clerkService';

/**
 * Fetches the Codewars user ID for the currently signed-in user.
 *
 * - Uses Clerk to get the authenticated email
 * - Queries the `codewars` collection by email
 * - Returns only the `codewarsId` field
 *
 * @throws {Error} If the user is not authenticated or no Codewars account is found
 *
 * @returns {Promise<string>} The Codewars user ID
 *
 * @example
 * const codewarsId = await getCodewarsUserId();
 * console.log(codewarsId); // e.g. "john_doe123"
 */
export async function getCodewarsUserId(): Promise<string> {
  const email = await getEmail();
  if (!email) throw new Error('Not authenticated: missing email');

  const db = await getDb();
  const codewars = await db
    .collection('codewars')
    .findOne({ email }, { projection: { _id: 0, id: 1 } });

  if (!codewars?.id) {
    throw new Error(`No Codewars account found for email: ${email}`);
  }

  return codewars.id;
}

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

/**
 * Fetches the list of recently solved katas across all users.
 *
 * - Calls repository `getRecentlySolved()`
 * - Validates the response with Zod
 * - Returns a typed SafeParseReturn object
 *
 * @param {Object} [params]
 * @param {number} [params.limit=100] - Maximum number of katas to return
 *
 * @returns {Promise<ReturnType<typeof recentlySolvedKatasSchema.safeParse>>}
 *          A Zod SafeParseReturn. Use `.success` to check validity and `.data` to get typed data.
 *
 * @example
 * const result = await getRecentlySolvedData({ limit: 50 });
 * if (result.success) {
 *   console.log(result.data[0].name); // "Valid Braces"
 * }
 */
export async function getRecentlySolvedData({
  limit = 100
}: {
  limit?: number;
} = {}) {
  const raw = await getRecentlySolved({ limit });

  // Validate with Zod
  return z.array(recentlySolvedKataSchema).safeParse(raw);
}
