// app/api/db/users/route.ts

import DatabaseService from "@/app/services/db";
import { AuthenticatedUser } from "@/types/users";
import { NextRequest, NextResponse } from "next/server";

const { getUsers } = new DatabaseService();

export interface GetUsersResponse {
  list: AuthenticatedUser[];
  success: boolean;
  error?: string;
}

export async function GET(
  request: NextRequest
): Promise<NextResponse<GetUsersResponse>> {
  try {
    const list = await getUsers();
    return NextResponse.json({ success: true, list }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        list: [],
        session: null,
        error: "Unable to fetch users from database. " + error,
      },
      { status: 500 }
    );
  }
}
