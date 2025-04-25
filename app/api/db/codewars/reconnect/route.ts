// import DatabaseService from "@/app/services/db";
// import { NextRequest, NextResponse } from "next/server";
// import connectSchema from "./schema";

// type ApiResponse = { success: true } | { success: false; error?: string | any };

// const { connectCodewarsUser } = new DatabaseService();

// export async function POST(
//   request: NextRequest
// ): Promise<NextResponse<ApiResponse>> {
//   const body = await request.json();

//   const validation = connectSchema.safeParse(body);

//   if (!validation.success) {
//     return NextResponse.json(
//       { success: false, error: validation.error.errors },
//       { status: 400 }
//     );
//   }

//   const { clan, email, name, username } = validation.data;

//   try {
//     const { success } = await reconnectCodewarsUser({
//       clan,
//       email,
//       name,
//       username,
//     });
//     if (!success) {
//       console.warn("Reconnect failed for:", { email, username });
//       return NextResponse.json({ success: false });
//     }
//     return NextResponse.json({ success });
//   } catch (error) {
//     console.error("Reconnect to codewars failed", error);
//     return NextResponse.json(
//       { success: false, error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
