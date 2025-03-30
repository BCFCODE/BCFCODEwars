// app/api/auth/route.ts
import { NextRequest, NextResponse } from "next/server";
import GoogleService from "@/app/services/google";

const { handleGoogleSignIn } = new GoogleService();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newUser = body.user;
    // const processedUser =
    await handleGoogleSignIn(newUser);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Error processing user data:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: error.status || 500 }
    );
  }
}
