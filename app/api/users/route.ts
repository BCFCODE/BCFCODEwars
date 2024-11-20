import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb"; // Adjust the path according to your file structure

export async function GET(request: NextRequest) {
  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("BCFCODEwars"); // Your MongoDB database

    // Fetch the users from the 'users' collection
    const users = await db.collection("users").find({}).toArray();

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
