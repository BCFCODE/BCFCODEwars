// app/api/wars/codewars/user/route.ts

import DatabaseService from "@/app/services/db-service";
import { CodewarsUser, CodewarsUserResponse } from "@/types/codewars";
import { NextRequest, NextResponse } from "next/server";

const { getDatabase, getCollections } = new DatabaseService();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://www.codewars.com/api/v1/users/${username}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      // Handle non-200 responses
      return NextResponse.json(
        {
          success: false,
          error: "You don't have this username on codewars.com",
        },
        { status: response.status }
      );
    }

    const user: CodewarsUserResponse = await response.json();

    if ("success" in user && user.success === false) {
      // Handle the "not found" response explicitly
      return NextResponse.json(
        { success: user.success, error: "User not found" },
        { status: 404 }
      );
    }

    // If the response contains valid user, return it
    return NextResponse.json({ success: true, user });
  } catch (err: any) {
    console.error("Error fetching Codewars user:", err);

    return NextResponse.json(
      {
        error:
          "We encountered an issue while connecting to the Codewars database and fetching user data. Please try again later. If the issue persists, contact support.",
      },
      { status: 500 }
    );
  }
}

// export async function PATCH(request: NextRequest) {
//   // Parse the request body (assuming you're sending JSON data)
//   const codewarsUser: CodewarsUser = await request.json();

//   // Validate input
//   if (!codewarsUser) {
//     return NextResponse.json(
//       { error: "codewarsUser is required." },
//       { status: 400 }
//     );
//   }

//   try {
//     const { users, codewars } = await getCollections();

//     // Update the codewars property in the 'users' collection
//     const response = await users.findOneAndUpdate(
//       { email: codewarsUser.email }, // Find user by email
//       { $set: { name: codewarsUser.name } }, // Update the codewars object
//       { returnDocument: "after" } // Return the updated document
//     );

//     // await codewars.findOneAndUpdate(
//     //   { email: codewarsUser.email },
//     //   { $set: codewarsUser },
//     //   { returnDocument: "after" }
//     // );

//     // Log the result from MongoDB
//     // console.log("Database operation result:", response);

//     // Check if the user was found and updated
//     if (!response) {
//       return NextResponse.json(
//         { error: "User with the provided email does not exist." },
//         { status: 404 }
//       );
//     }

//     // Ensure the updated document includes a valid 'username' in the 'codewars' object
//     if (!response?.codewars?.username) {
//       return NextResponse.json(
//         {
//           error:
//             "The 'codewars' object does not contain a valid 'username'. Please verify your data.",
//         },
//         { status: 400 }
//       );
//     }

//     // Return the updated user
//     return NextResponse.json({
//       message: `codewars object in db successfully updated.`,
//       codewars: response,
//     });
//   } catch (error) {
//     // Log the error for debugging
//     // console.error("Error in PATCH handler:", error);

//     // Return a generic error message to the client
//     return NextResponse.json(
//       {
//         error:
//           "An unexpected error occurred while updating the codewars object. Please try again later.",
//       },
//       { status: 500 }
//     );
//   }
// }
