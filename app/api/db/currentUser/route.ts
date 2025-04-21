import DatabaseService from "@/app/services/db";
import { auth } from "@/auth";
import { AuthenticatedUser } from "@/types/users";
import { NextRequest, NextResponse } from "next/server";

const { updateCurrentUser } = new DatabaseService();

export async function GET(request: NextRequest) {
  
  const session = await auth();

  try {
    if (session)
      return NextResponse.json({ success: true, session }, { status: 200 });
    return NextResponse.json({ success: false, session }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, session }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const currentUser: AuthenticatedUser = await request.json();

    await updateCurrentUser(currentUser);

    return NextResponse.json(
      { success: true, message: "currentUser updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Unable to update currentUser" },
      { status: 500 }
    );
  }
}
