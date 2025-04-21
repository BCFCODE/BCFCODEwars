import DatabaseService from "@/app/services/db";
import { auth } from "@/auth";
import { AuthenticatedUser } from "@/types/users";
import { NextRequest, NextResponse } from "next/server";

const { updateCurrentUser, getCurrentUser } = new DatabaseService();

export async function GET(request: NextRequest): Promise<
  NextResponse<{
    success: boolean;
    currentUser?: AuthenticatedUser;
    error?: string;
  }>
> {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { success: false, error: "Missing email parameter" },
      { status: 400 }
    );
  }

  try {
    const currentUser = await getCurrentUser(email);

    if (!currentUser) {
      return NextResponse.json(
        { success: false, error: "currentUser not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, currentUser });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
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
