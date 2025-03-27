To update a document in MongoDB, it's common to use the PATCH or PUT HTTP method, but it's not strictly necessary. You can use any HTTP method (e.g., POST, PUT, PATCH, etc.) depending on your use case.

Since you're updating a user document in the users collection, using a PATCH method makes sense because you're only updating specific fields (e.g., codewarsUsername) without changing the entire document.

Here’s how you can modify your existing API to update a user document using the PATCH method.

Steps:
Modify your route.ts to handle PATCH requests for updating a user.
Connect to MongoDB and update the document.
Return the updated user data.
Here’s an example of how to implement this:

Updated app/api/wars/users/route.ts

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/MongoDB/database"; // Adjust the path according to your file structure

// Handle GET requests to fetch users
export async function GET(request: NextRequest) {
  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB); // Your MongoDB database

    // Fetch the users from the 'users' collection
    const users = await db.collection("users").find({}).toArray();

    // Return the users as JSON
    return NextResponse.json({ users });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to fetch users" }, { status: 500 });
  }
}

// Handle PATCH requests to update a user's data
export async function PATCH(request: NextRequest) {
  try {
    // Parse the request body (assuming you're sending JSON data)
    const { username, codewarsUsername } = await request.json();

    if (!username || !codewarsUsername) {
      return NextResponse.json({ error: "Username and codewarsUsername are required" }, { status: 400 });
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB); // Your MongoDB database

    // Update the user in the 'users' collection based on the username
    const updatedUser = await db.collection("users").findOneAndUpdate(
      { username: username }, // Find user by their username
      { $set: { codewarsUsername: codewarsUsername } }, // Update the codewarsUsername
      { returnDocument: "after" } // Return the updated document
    );

    if (!updatedUser.value) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return the updated user data
    return NextResponse.json({ user: updatedUser.value });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
Explanation:
GET Request: The GET method remains the same. It fetches all users from the MongoDB database.
PATCH Request:
We’re expecting a username and codewarsUsername in the request body.
The PATCH handler updates the document with the given username and sets the codewarsUsername field.
If the update is successful, it returns the updated user document.
If the user is not found, it returns a 404 error with a message.
If there’s an error during the update, a 500 error is returned.
Frontend (Buttons Component):
Update your frontend Buttons component to call this new PATCH handler when the user confirms their codewars.username.


"use client";

import { CodewarsUser } from "@/types/codewars";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";

interface Props {
  currentStep: number;
  codewars: CodewarsUser;
}

const Buttons = ({ codewars, currentStep = 0 }: Props) => {
  const router = useRouter();

  const handleUpdateUser = async () => {
    try {
      const response = await fetch("/api/wars/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: codewars.username, // Assumes `codewars.username` is available
          codewarsUsername: codewars.username, // Update this field in MongoDB
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("User updated in MongoDB:", data.user);
      } else {
        console.error("Error updating user:", data.error);
      }
    } catch (error) {
      console.error("Error during update:", error);
    }
  };

  return (
    <>
      <Button
        color="inherit"
        disabled={currentStep === 3}
        onClick={() => router.push(`${currentStep - 1}`)}
        sx={{ mr: 1 }}
      >
        No
      </Button>
      <Box sx={{ flex: "1 1 auto" }} />
      <Button onClick={handleUpdateUser}>Yes, it is me</Button>
    </>
  );
};

export default Buttons;
Key Points:
The PATCH method is appropriate for partial updates (in this case, updating a specific field like codewarsUsername).
Make sure your MongoDB query and update logic matches your document structure, especially the field names (username and codewarsUsername).
On the frontend, when the user clicks "Yes, it is me", you send the PATCH request to update the database.
This will update the user's codewarsUsername field in the MongoDB database based on the provided username.