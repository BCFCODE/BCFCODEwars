// app/api/wars/users/route.ts

import DatabaseService from "@/app/services/db-service";
import { NextRequest, NextResponse } from "next/server";

const { getDatabase } = new DatabaseService();

export async function GET(request: NextRequest) {
  // const { searchParams } = new URL(request.url);
  // const users = searchParams.get("users");

  try {
    // Connect to MongoDB
    const db = await getDatabase();

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
