import DatabaseService from "@/app/services/db";
import { NextRequest, NextResponse } from "next/server";
import connectSchema from "./schema";

type ApiResponse = { success: true } | { success: false; error?: string | any };

const { connectCodewarsUser } = new DatabaseService();

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse>> {
  const body = await request.json();
  // console.log('connect route body', body)
  const validation = connectSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { success: false, error: validation.error.errors },
      { status: 400 }
    );
  }

  const initializedCodewarsUser = validation.data;
  console.log("POST/validation.data", validation.data);
  try {
    const { success } = await connectCodewarsUser(initializedCodewarsUser);
    if (!success) {
      console.warn("Connect failed for:", initializedCodewarsUser);
      return NextResponse.json({ success: false });
    }
    return NextResponse.json({ success }, { status: 200 });
  } catch (error) {
    console.error("Connect to codewars failed", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
