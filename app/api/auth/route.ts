// app/api/auth/route.ts
import { NextRequest, NextResponse } from "next/server";
import { handleGoogleSignIn } from "@/lib/MongoDB/saveUser";
import { validateUserData } from "./schema";
import { GoogleUser } from "@/types/google";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedUsername: GoogleUser = validateUserData(
      body.user
    ) as GoogleUser; // Validate input

    const processedUser = await handleGoogleSignIn(validatedUsername);

    return NextResponse.json({ user: processedUser });
  } catch (error: any) {
    console.error("Error processing user data:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: error.status || 500 }
    );
  }
}
