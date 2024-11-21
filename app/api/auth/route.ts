import { NextRequest, NextResponse } from "next/server";
import { validateUserData } from "./validation";
import { handleGoogleSignIn } from "./handler";
import { GoogleUser } from "@/types/user";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedUser: GoogleUser = validateUserData(body.user) as GoogleUser; // Validate input

    const processedUser = await handleGoogleSignIn(validatedUser);

    return NextResponse.json({ user: processedUser });
  } catch (error: any) {
    console.error("Error processing user data:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: error.status || 500 }
    );
  }
}
