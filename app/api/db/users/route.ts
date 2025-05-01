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
    const searchParams = request.nextUrl.searchParams;
    const skip = parseInt(searchParams.get("skip") ?? "0", 10);
    const limit = parseInt(searchParams.get("limit") ?? "0", 10);
    const safeSkip = Math.max(0, skip);
    const safeLimit = Math.min(Math.max(1, limit), 100);
    const list = await getUsers({ skip: safeSkip, limit: safeLimit });
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
