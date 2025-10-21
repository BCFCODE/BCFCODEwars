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
  getChampionsKataData,
  isConnected
} from '@/app/repositories/codewarsRepository';
import { getDb } from '@/lib/mongodb';
import {
  codewarsProfileDataSchema,
  isConnectedToCodewarsSchema,
  recentlySolvedKata,
  recentlySolvedKataSchema
} from '@/types';
import { z } from 'zod';
import { getEmail } from './clerkService';
import { ClientSession } from 'mongodb';

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
 * Fetches the list of recently solved katas across all users within a MongoDB transaction.
 *
 * - Calls repository `getChampionsKataData` with transactional session
 * - Validates the response with Zod
 * - Returns a simplified object with success status and data
 *
 * @param {Object} params
 * @param {number} [params.limit=25] - Maximum number of katas to return
 * @param {number} [params.skip=0] - Number of katas to skip for pagination
 * @param {ClientSession} params.session - MongoDB session for transactional operations
 *
 * @returns {Promise<{ success: boolean; data: RecentlySolvedKata[] }>}
 *          An object with success status and typed data. Use `.success` to check validity and `.data` to get katas.
 *
 * @example
 * const session = client.startSession();
 * try {
 *   await session.withTransaction(async () => {
 *     const result = await getRecentlySolvedData({ limit: 50, skip: 0, session });
 *     if (result.success) {
 *       console.log(result.data[0].kataName); // e.g., "Valid Braces"
 *     }
 *   });
 * } finally {
 *   await session.endSession();
 * }
 */
export async function getRecentlySolvedData(
  {
    limit = 25,
    skip = 0
  }: {
    limit?: number;
    skip?: number;
  },
  session?: ClientSession
): Promise<{ success: boolean; data: recentlySolvedKata[] }> {
  try {
    // Validate input parameters
    if (typeof limit !== 'number' || !Number.isInteger(limit) || limit < 1) {
      throw new Error('Limit must be a positive integer');
    }
    if (typeof skip !== 'number' || !Number.isInteger(skip) || skip < 0) {
      throw new Error('Skip must be a non-negative integer');
    }

    // Fetch data from repository
    const { success, data } = await getChampionsKataData(
      { limit, skip },
      session
    );

    // Check repository response
    if (!success) {
      console.error('Failed to fetch champions kata data from repository');
      return {
        success: false,
        data: []
      };
    }

    // Validate with Zod
    const result = z.array(recentlySolvedKataSchema).safeParse(data);

    if (!result.success) {
      console.error(
        'Zod validation failed for recently solved katas:',
        result.error
      );
      return {
        success: false,
        data: []
      };
    }

    return { success: true, data: result.data };
  } catch (error) {
    console.error('Error in getRecentlySolvedData:', error);
    return {
      success: false,
      data: []
    };
  }
}
