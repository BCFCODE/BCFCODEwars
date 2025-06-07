import DatabaseService from "@/app/services/db";
import { NextRequest, NextResponse } from "next/server";

const { getUser, updateSingleUser } = new DatabaseService();

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const currentUser = await getUser(email);

    if (currentUser)
      updateSingleUser(email, {
        ...currentUser,
        activity: {
          ...currentUser.activity,
          lastLogout: new Date(),
          logoutHistory: [...currentUser.activity.logoutHistory, new Date()],
          // idleHistory: [],
          isIdle: false,
        },
      });

    return NextResponse.json(
      { message: "Sign-out recorded successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing sign-out request", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
