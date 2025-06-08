import DatabaseService from "@/app/services/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const { updateSingleUser } = new DatabaseService();

const schema = z.object({
  email: z.string().email(),
  isIdle: z.boolean(),
});

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
      update: {
        "activity.isIdle": isIdle,
      },
    });

    // if (!result.success) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message: "User not found or failed to update idle status.",
    //     },
    //     { status: 404 }
    //   );
    // }

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
