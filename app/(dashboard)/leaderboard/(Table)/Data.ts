// app/(dashboard)/leaderboard/(Table)/Data.ts

import { LeaderboardRow } from "@/types/leaderboard";
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

export async function fetchAndCreateRows() {
  try {
    // Fetch the data from your API
    const response = await fetch(`${baseURL}/api/users`, { cache: "no-store" });
    
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await response.json();

    // Transform user data into rows
    const rows = data.users.map((user: LeaderboardRow, index: number) => {
      return {
        name: user.name,
        createdAt: new Date(user.createdAt).toLocaleDateString(),
        rank: Math.floor(Math.random() * 1000), // Simulated rank
        position: index + 1, // Position based on index
        globalPosition: Math.floor(Math.random() * 1000), // Simulated global position
        image: user.image,
      };
    });

    return rows;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return [{ success: false }, { error: "Error fetching user data" }];
  }
}

export async function fetchCompletedChallenges() {
  try {
    // Fetch the data from your API
    const response = await fetch(`${baseURL}/api/wars/users`);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await response.json();

    // Transform user data into rows
    const rows = data.users.map((user: LeaderboardRow, index: number) => {
      return {
        name: user.name,
        createdAt: new Date(user.createdAt).toLocaleDateString(),
        rank: Math.floor(Math.random() * 1000), // Simulated rank
        position: index + 1, // Position based on index
        globalPosition: Math.floor(Math.random() * 1000), // Simulated global position
      };
    });

    return rows;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return [{ success: false }, { error: "Error fetching user data" }];
  }
}
