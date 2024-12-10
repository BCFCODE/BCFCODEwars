import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/MongoDB/database";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { error: "Email query parameter is required" },
      { status: 400 }
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db("BCFCODEwars");

    // Fetch the user with the given email
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User not found in the database" },
        { status: 404 }
      );
    }


    return NextResponse.json({
      codewars: {
        username: user.codewars ?? null
      },
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the user" },
      { status: 500 }
    );
  }
}
