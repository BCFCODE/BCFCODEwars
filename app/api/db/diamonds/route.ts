import DatabaseService from "@/app/services/db";
import { Diamonds } from "@/types/diamonds";
import { NextRequest, NextResponse } from "next/server";

export interface GetDiamondsResponse {
  data?: Diamonds[];
  success: boolean;
  error?: string;
}

const db = new DatabaseService();

export async function GET(
  req: NextRequest
): Promise<NextResponse<GetDiamondsResponse>> {
  try {
    const diamonds = await db.getDiamonds();

    return NextResponse.json(
      { success: true, data: diamonds },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ [GET /api/db/diamonds] Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to fetch diamonds from database.",
      },
      { status: 500 }
    );
  }
}
