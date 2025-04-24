// app/api/db/users/route.ts

import DatabaseService, { GetUsers } from "@/app/services/db";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const { getUsers } = new DatabaseService();

export interface GetUsersResponse {
  data?: GetUsers;
  error?: string;
  session?: Session;
  success: boolean;
}

export async function GET(
  request: NextRequest
): Promise<NextResponse<GetUsersResponse>> {
  const data = await getUsers();

  try {
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        data,
        error: "Unable to fetch users from database. " + error,
      },
      { status: 500 }
    );
  }
}
