// app/api/db/online-users/route.ts

import DatabaseService from "@/app/services/db";
import { NextRequest, NextResponse } from "next/server";
import { AuthenticatedUser } from "@/types/users";

export interface GetOnlineUsersResponse {
  list?: Pick<AuthenticatedUser, "name" | "image" | "email">[];
  totalUsers?: number;
  success: boolean;
  error?: string;
}

const db = new DatabaseService();

export async function GET(
  req: NextRequest
): Promise<NextResponse<GetOnlineUsersResponse>> {
  try {
    const { list, totalUsers} = await db.getOnlineUsers();

    return NextResponse.json(
      { success: true, list, totalUsers },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ [GET /api/db/online-users] Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to fetch online users from database.",
      },
      { status: 500 }
    );
  }
}
