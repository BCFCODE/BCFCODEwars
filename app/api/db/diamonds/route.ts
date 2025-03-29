// app/api/db/diamonds/route.ts

import DatabaseService from "@/app/services/db";
import { NextRequest, NextResponse } from "next/server";

const { getDiamonds } = new DatabaseService();

export async function GET(request: NextRequest) {
  try {
    const [data] = await getDiamonds();
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Unable to fetch diamonds from database." },
      { status: 500 }
    );
  }
}
