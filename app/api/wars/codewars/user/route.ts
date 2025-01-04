// app/api/wars/codewars/user/route.ts

import clientPromise from "@/lib/db/database";
import {
  AddCodewarsUserToDB,
  CodewarsUser,
  CodewarsUserResponse,
} from "@/types/codewars";
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
      {
        error:
          "We encountered an issue while connecting to the Codewars database and fetching user data. Please try again later. If the issue persists, contact support.",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    // Parse the request body (assuming you're sending JSON data)
    const { email, codewars }: AddCodewarsUserToDB = await request.json();

    // Log the incoming payload
    // console.log("Received PATCH request with payload:", { email, codewars });

    // Validate input
    if (!email || !codewars) {
      return NextResponse.json(
        { error: "Both 'email' and 'codewars' fields are required." },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    // Update the codewars property in the 'users' collection
    const userInDB = await db.collection("users").findOneAndUpdate(
      { email }, // Find user by email
      { $set: { name: codewars.name, codewars } }, // Update the codewars object
      { returnDocument: "after" } // Return the updated document
    );

    // Log the result from MongoDB
    // console.log("Database operation result:", userInDB);

    // Check if the user was found and updated
    if (!userInDB) {
      return NextResponse.json(
        { error: "User with the provided email does not exist." },
        { status: 404 }
      );
    }

    // Ensure the updated document includes a valid 'username' in the 'codewars' object
    if (!userInDB?.codewars?.username) {
      return NextResponse.json(
        {
          error:
            "The 'codewars' object does not contain a valid 'username'. Please verify your data.",
        },
        { status: 400 }
      );
    }

    // Return the updated user
    return NextResponse.json({
      message: "codewars object successfully updated.",
      codewars: userInDB,
    });
  } catch (error) {
    // Log the error for debugging
    // console.error("Error in PATCH handler:", error);

    // Return a generic error message to the client
    return NextResponse.json(
      {
        error:
          "An unexpected error occurred while updating the codewars object. Please try again later.",
      },
      { status: 500 }
    );
  }
}
