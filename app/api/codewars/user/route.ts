// app/api/codewars/user/route.ts

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
      `https://www.codewars.com/api/v1/users/${username}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      // Handle non-200 responses
      return NextResponse.json(
        {
          success: false,
          error: "You don't have this username on codewars.com",
        },
        { status: response.status }
      );
    }

    const user: CodewarsUserResponse = await response.json();

    if ("success" in user && user.success === false) {
      // Handle the "not found" response explicitly
      return NextResponse.json(
        { success: user.success, error: "User not found" },
        { status: 404 }
      );
    }

    // If the response contains valid user, return it
    return NextResponse.json({ success: true, user });
  } catch (err: any) {
    console.error("Error fetching Codewars user:", err);

    return NextResponse.json(
      {
        error:
          "We encountered an issue while connecting to the Codewars database and fetching user data. Please try again later. If the issue persists, contact support.",
      },
      { status: 500 }
    );
  }
}
