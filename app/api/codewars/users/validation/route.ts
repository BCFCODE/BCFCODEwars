import { CodewarsUserResponse } from "@/types/codewars";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  
  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://www.codewars.com/api/v1/users/${username}`
    );

    if (!response.ok) {
      // Handle non-200 responses
      return NextResponse.json(
        { error: "You don't have this username on codewars.com" },
        { status: response.status }
      );
    }

    const user: CodewarsUserResponse = await response.json();

    if ("success" in user && user.success === false) {
      // Handle the "not found" response explicitly
      return NextResponse.json({ error: user.reason }, { status: 404 });
    }

    // If the response contains valid user, return it
    return NextResponse.json({ success: true, user });
  } catch (err: any) {
    console.error("Error fetching Codewars user:", err);

    return NextResponse.json(
      { error: "Something went wrong while fetching user data" },
      { status: 500 }
    );
  }
}
