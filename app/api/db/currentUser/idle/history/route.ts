import DatabaseService from "@/app/services/db";
import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";

const { updateIdleHistory } = new DatabaseService();

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    // console.log("currentUser/idle/history/PATCH: body", body);
    const validation = schema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const { email, snapshot } = validation.data;

    await updateIdleHistory({
      email,
      $set: {
        "activity.isIdle": snapshot.isIdle,
        "activity.elapsedTimeMs": snapshot.elapsedTimeMs,
        "activity.lastActiveTime": snapshot.lastActiveTime,
        "activity.lastIdleTime": snapshot.lastIdleTime,
        "activity.activeTimeMs": snapshot.activeTimeMs,
        "activity.totalActiveTimeMs": snapshot.totalActiveTimeMs,
        "activity.isPrompted": snapshot.isPrompted,
        "activity.timestamp": snapshot.timestamp,
      },
      $push: {
        "activity.idleHistory": {
          $each: [
            {
              elapsedTimeMs: snapshot.elapsedTimeMs,
              lastActiveTime: snapshot.lastActiveTime,
              lastIdleTime: snapshot.lastIdleTime,
              activeTimeMs: snapshot.activeTimeMs,
              totalActiveTimeMs: snapshot.totalActiveTimeMs,
              isPrompted: snapshot.isPrompted,
              timestamp: snapshot.timestamp,
            },
          ],
          // Optional: limit array size to retain only the most recent snapshots
          // $slice: -10, // Dev
          $slice: -100000, // Production
        },
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "User idle history updated successfully. A new activity snapshot has been added to the idleHistory log.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          "A server error occurred while updating idle history. Please try again later.",
      },
      { status: 500 }
    );
  }
}
