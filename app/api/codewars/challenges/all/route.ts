import { CodewarsCompletedChallenge } from "@/types/codewars";
import { NextRequest, NextResponse } from "next/server";

export interface CodewarsChallengesResponse {
  totalPages: number; // Total number of pages in the response
  totalItems: number; // Total number of items across all pages
  data: CodewarsCompletedChallenge[]; // Array of completed challenges
}

export interface GetCompletedChallengesResponse {
  totalItems: number;
  totalPages: number;
  list: CodewarsCompletedChallenge[];
  error?: string;
}

export async function GET(
  request: NextRequest
): Promise<NextResponse<GetCompletedChallengesResponse>> {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  const pageNumber = searchParams.get("pageNumber");

  // Validate input
  if (!pageNumber) {
    return NextResponse.json(
      {
        error: "challengeId field is required to fetch codewars challenge.",
        list: [],
        totalItems: 0,
        totalPages: 0,
      },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://www.codewars.com/api/v1/users/${username}/code-challenges/completed?page=${pageNumber}`
    );

    if (!response.ok)
      return NextResponse.json(
        {
          list: [],
          totalItems: 0,
          totalPages: 0,
          error:
            "An error occurred while fetching codewars completed challenge list, username not found and it is probably because of invalid username...",
        },
        { status: 404 }
      );

    const {
      data: list,
      totalItems,
      totalPages,
    } = (await response.json()) as CodewarsChallengesResponse;

    return NextResponse.json({ list, totalItems, totalPages }, { status: 200 });
  } catch (error) {
    console.error("Error fetching codewars completed challenges", error);
    return NextResponse.json(
      {
        error:
          "An unknown network error occurred while fetching codewars completed challenges.",
        list: [],
        totalItems: 0,
        totalPages: 0,
      },
      { status: 500 }
    );
  }
}
