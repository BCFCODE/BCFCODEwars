import DatabaseService from "@/app/services/db";
import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";

const { updateSingleUser } = new DatabaseService();

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("currentUser/idle/history/PATCH: body", body);
    const validation = schema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const { email, snapshot } = validation.data;

    await updateSingleUser({
      email,
      $set: {
        "activity.isIdle": snapshot.isIdle,
      },
    });

    /* 
 await db.collection("users").updateOne(
  { email: "user@example.com" },
  {
    $push: {
      "activity.idleHistory": {
        $each: [newIdleSnapshot],
        $slice: -50
      }
    }
  }
);
*/

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
