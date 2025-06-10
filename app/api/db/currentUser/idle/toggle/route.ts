import DatabaseService from "@/app/services/db";
import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";

const { updateSingleUser } = new DatabaseService();

export async function PATCH(
  request: NextRequest
): Promise<NextResponse<{ success: boolean; message: string }>> {
  try {
    const body = await request.json();

    const validation = schema.safeParse(body);

    if (!validation.success) {
      const message = validation.error.errors.map((e) => e.message).join(", ");

      return NextResponse.json({ success: false, message }, { status: 400 });
    }

    const { email, isIdle } = validation.data;

    await updateSingleUser({
      email, 
      $set: {
        "activity.isIdle": isIdle,
      },
    });

    return NextResponse.json({
      success: true,
      message: "User idle status updated successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected server error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
