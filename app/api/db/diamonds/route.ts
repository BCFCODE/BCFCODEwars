// app/api/db/diamonds/route.ts

import DatabaseService from "@/app/services/db";
import { Diamonds } from "@/types/diamonds";
import { NextRequest, NextResponse } from "next/server";

export interface GetDiamondsResponse {
  data?: Diamonds[];
  success: boolean;
  error?: string;
}

const { getDiamonds } = new DatabaseService();

export async function GET(
  request: NextRequest
): Promise<NextResponse<GetDiamondsResponse>> {
  try {
    const data = await getDiamonds();
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Unable to fetch diamonds from database." },
      { status: 500 }
    );
  }
}
