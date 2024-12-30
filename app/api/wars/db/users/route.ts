// app/api/wars/users/route.ts

import clientPromise from "@/lib/MongoDB/database"; // Adjust the path according to your file structure
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // const { searchParams } = new URL(request.url);
  // const users = searchParams.get("users");

  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB); // Your MongoDB database

    // Fetch the users from the 'users' collection
    const users = db.collection("users").find({}).toArray();

    // Return the users as JSON
    return NextResponse.json({ users });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to fetch users" },
      { status: 500 }
    );
  }
}


