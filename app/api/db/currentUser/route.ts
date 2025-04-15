import DatabaseService from "@/app/services/db";
import { AuthenticatedUser } from "@/types/users";
import { NextRequest, NextResponse } from "next/server";

const { updateCurrentUser, getUser } = new DatabaseService();

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email");

  if (!email)
    return NextResponse.json(
      { success: false, error: "Email is required" },
      { status: 400 }
    );

  try {
    const currentUser = await getUser(email);

    return NextResponse.json({ success: true, currentUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Unable to fetch currentUser from db" },
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
