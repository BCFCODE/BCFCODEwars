// app/api/db/users/route.ts

import DatabaseService, { GetUsers } from "@/app/services/db";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const { getUsers } = new DatabaseService();

export interface GetUsersResponse extends GetUsers {
  error?: string;
  session: Session | null;
  success: boolean;
}

export async function GET(
  request: NextRequest
): Promise<NextResponse<GetUsersResponse>> {
  try {
    const { list, currentUser, session } = await getUsers();
    return NextResponse.json(
      { success: true, list, currentUser, session },
      { status: 200 }
    );
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
