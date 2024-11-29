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
    const response = await fetch(`https://www.codewars.com/api/v1/users/${username}`);
    return NextResponse.json({ success: true, data: response.data });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Invalid username or not found" },
      { status: 404 }
    );
  }
}
