import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  const pageNumber = searchParams.get("pageNumber");

  // Validate input
  if (!pageNumber) {
    return NextResponse.json(
      { error: "challengeId field is required to fetch codewars challenge." },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://www.codewars.com/api/v1/users/${username}/code-challenges/completed?page=${pageNumber}`
    );

    const data = await response.json();

    const reason =
      "An error occurred while fetching codewars completed challenge list, username not found and it is probably because of invalid username...";

    if (!response.ok)
      return NextResponse.json({ success: false, reason }, { status: 404 });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Error fetching codewars completed challenges", error);
    return NextResponse.json(
      {
        success: false,
        reason:
          "An unknown network error occurred while fetching codewars completed challenges.",
      },
      { status: 500 }
    );
  }
}
