import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  const challengeId = searchParams.get("challengeId");

  // Validate input
  if (!challengeId) {
    return NextResponse.json(
      { error: "challengeId field is required to fetch codewars challenge." },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://www.codewars.com/api/v1/code-challenges/${challengeId}`
    );

    const data = await response.json();

    if (!response.ok)
      return NextResponse.json(
        { success: false, reason: data.reason },
        { status: 404 }
      );

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Error fetching challenge", error);
    return NextResponse.json(
      {
        success: false,
        reason:
          "An unknown network error occurred while fetching codewars challenge.",
      },
      { status: 500 }
    );
  }
}

export function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  const challengeId = searchParams.get("challengeId");

  // Validate input
  if (!username || !challengeId) {
    return NextResponse.json(
      { error: "Both 'username' and 'challengeId' fields are required." },
      { status: 400 }
    );
  }

  try {
  } catch (error) {}
}
