import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  const pageNumber = searchParams.get("pageNumber");
  
  console.log("username", username, "pageNumber", pageNumber);
  // Validate input
  if (!username || !pageNumber) {
    return NextResponse.json(
      { error: `Both "username" and "pageNumber" fields are required.` },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://www.codewars.com/api/v1/users/${username}/code-challenges/completed?page=${pageNumber}`,
      { cache: "no-store" }
    );

    const data = response.json();

    const reason =
      "An error occurred while fetching codewars completed challenge list, it is probably because of invalid or not found username...";

    if (!response.ok)
      return NextResponse.json({ success: false, reason }, { status: 404 });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 404 });
  }
}
