// app/api/auth/route.ts
import { NextRequest, NextResponse } from "next/server";
import GoogleService from "@/app/services/google-service";

const { handleGoogleSignIn } = new GoogleService();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newUser = body.user;

    const processedUser = await handleGoogleSignIn(newUser);

    return NextResponse.json({ user: processedUser });
  } catch (error: any) {
    console.error("Error processing user data:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: error.status || 500 }
    );
  }
}
