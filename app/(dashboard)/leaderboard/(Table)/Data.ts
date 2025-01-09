// app/(dashboard)/leaderboard/(Table)/Data.ts

import {
  CodewarsChallenge,
  CodewarsCompletedChallenge,
  CodewarsCompletedChallengeApiResponse,
} from "@/types/codewars";
import { DatabaseUser } from "@/types/database";
import { baseURL } from "@/utils/constants";

export const completedChallenges = [
  {
    date: "2020-01-05",
    customerId: "11091700",
    amount: 3,
  },
  {
    date: "2020-01-02",
    customerId: "Anonymous",
    amount: 1,
  },
];

export async function fetchDatabaseUsers() {
  try {
    // Fetch the data from your API
    const response = await fetch(`${baseURL}/api/users`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await response.json();

    return data.users as DatabaseUser[];
  } catch (error) {
    console.error("Error fetching user data:", error);
    return [{ success: false }, { error: "Error fetching user data" }];
  }
}

export async function fetchCompletedChallenges(
  username: string,
  pageNumber: number
): Promise<CodewarsCompletedChallengeApiResponse> {
  // Fetch List Completed Challenges
  const response = await fetch(
    `https://www.codewars.com/api/v1/users/${username}/code-challenges/completed?page=${pageNumber}`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch completed challenges");
  }

  return await response.json();
}

export async function fetchSingleChallenge(
  id: string
): Promise<CodewarsChallenge> {
  // Fetch single challenge
  const response = await fetch(
    `https://www.codewars.com/api/v1/code-challenges/${id}`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch challenge");
  }

  return await response.json();
}
