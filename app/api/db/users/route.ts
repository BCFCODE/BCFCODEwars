// app/api/db/users/route.ts

import DatabaseService from "@/app/services/db-service";
import { NextRequest, NextResponse } from "next/server";

const { getUsers } = new DatabaseService();

export async function GET(request: NextRequest) {
  try {
    const users = await getUsers();

    // Return the users as JSON
    return NextResponse.json({ success: true, users }, { status: 200 });
  } catch (error) {
    // console.error(error);
    return NextResponse.json(
      { error: "Unable to fetch users from database." },
      { status: 500 }
    );
  }
}
