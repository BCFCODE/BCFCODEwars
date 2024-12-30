// app/api/wars/codewars/user/route.ts

import clientPromise from "@/lib/MongoDB/database";
import { CodewarsDatabase, CodewarsUserResponse } from "@/types/codewars";
import { NextRequest, NextResponse } from "next/server";

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

// Handle PATCH requests to update a user's data
export async function PATCH(request: NextRequest) {
  try {
    // Parse the request body (assuming you're sending JSON data)
    const { email, codewars }: CodewarsDatabase = await request.json();

    console.log(
      email,
      codewars,
      "from PATCH app/api/wars/codewars/user/route.ts"
    );
    if (!codewars || !email) {
      return NextResponse.json({
        error: "codewars object, and email is required",
      });
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    // Update the codewars property in the 'users' collection based on the codewars object
    const codewarsUser = await db.collection("users").findOneAndUpdate(
      { email }, // Find user by their email
      { $set: { codewars } }, // Update the codewars object
      { returnDocument: "after" } // Return the updated document
    );

    if (!codewarsUser?.username) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return the updated codewarsUser
    return NextResponse.json({ codewarsUser });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update codewarsUser object" },
      { status: 500 }
    );
  }
}
