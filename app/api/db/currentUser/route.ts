import DBService from "@/app/services/db-service";
import { CurrentUser } from "@/types/users";
import { NextRequest, NextResponse } from "next/server";

const { updateCurrentUser } = new DBService();

export async function POST(request: NextRequest) {
  try {
    const currentUser: CurrentUser = await request.json();

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
