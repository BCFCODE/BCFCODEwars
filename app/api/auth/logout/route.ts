import DatabaseService from "@/app/services/db-service";
import { NextRequest, NextResponse } from "next/server";

const { getUser, updateSingleUser } = new DatabaseService();

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const currentUser = await getUser(email);
    // console.log(
    //   `>>>>User signed out and currentUser: ${email} at ${new Date()}`,
    //   currentUser
    // );

    if (currentUser)
      updateSingleUser(email, {
        ...currentUser,
        activity: {
          ...currentUser.activity,
          lastLogout: new Date(),
          logoutHistory: [...currentUser.activity.logoutHistory, new Date()],
          isActiveSession: false,
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
