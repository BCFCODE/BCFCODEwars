// app/api/wars/users/route.ts

import DBService from "@/app/services/db-service";
import { NextRequest, NextResponse } from "next/server";

const { getAllUsers } = new DBService();

export async function GET(request: NextRequest) {
  try {
    const users = getAllUsers();

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
