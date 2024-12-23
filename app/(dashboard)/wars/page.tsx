// app/(dashboard)/wars/page.tsx

import { auth } from "@/auth";
import clientPromise from "@/lib/MongoDB/database";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

const WarsPage = async () => {
  const session = await auth();
  const email = session?.user.email;

  let isConnectedToCodewarsBefore;

  if (email) {
    try {
      // Connect to MongoDB
      const client = await clientPromise;
      const db = client.db("BCFCODEwars");

      // Fetch the user from the database
      const user = await db.collection("users").findOne({ email });

      isConnectedToCodewarsBefore = user?.hasOwnProperty("codewars");
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  }

  if (!isConnectedToCodewarsBefore) {
    return (
      <Box>
        <Typography>
          Oh {session?.user.name}! it looks like you&apos;re new here! 🎉
          &quot;We&apos;ve checked your Codewars connection, and it seems this
          is your first time linking your BCFCODE Wars profile to Codewars. No
          worries—let’s get you connected so you can start climbing the
          leaderboard!&quot;
        </Typography>
        <Button LinkComponent={Link} href="/wars/validation/steps/0">
          Connect My Codewars Account
        </Button>
      </Box>
    );
  }

  return <div>WarsPage</div>;
};

export default WarsPage;

/* 
  If you want to handle this entirely on the server side without using useState or useEffect, you can fetch the user data during the server-side rendering process in your WarsPage component. Here's how to do it:

  Updated /app/(dashboard)/wars/page.tsx
  typescript
  Copy code
  import { auth } from '@/auth';
  import clientPromise from '@/lib/MongoDB/database';
  import { headers } from 'next/headers';
  import React from 'react';

  const WarsPage = async () => {
    // Get session details for the logged-in user
    const session = await auth();
    const username = session?.user.name;

    // Initialize codewarsCheck variable
    let codewarsCheck = null;

    if (username) {
      try {
        // Connect to MongoDB
        const client = await clientPromise;
        const db = client.db('BCFCODEwars');

        // Fetch the user from the database
        const user = await db.collection('users').findOne({ name: username });

        // Check if the user has a 'codewars' key
        codewarsCheck = user ? user.hasOwnProperty('codewars') : null;
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    return (
      <div>
        <h1>WarsPage</h1>
        {codewarsCheck === null ? (
          <p>User not found or no session available.</p>
        ) : codewarsCheck ? (
          <p>Your profile has a Codewars key!</p>
        ) : (
          <p>Your profile does not have a Codewars key.</p>
        )}
      </div>
    );
  };

  export default WarsPage;
  How It Works
  Fetch Session on the Server:

  Use the auth() function to get the logged-in user's session.
  Connect to MongoDB:

  Use the clientPromise to connect to your MongoDB database.
  Query the User Collection:

  Find the user by name (from the session) and check if the codewars key exists in their object.
  Render on the Server:

  The entire logic is executed during the server-side rendering process. No need for useState or useEffect.
  Advantages
  Fully Server-Side: All data fetching and processing occur before the component is rendered.
  Simpler State Management: No React hooks (useState or useEffect) are needed.
  Improved SEO: Since the result is rendered on the server, it can be indexed by search engines.
  Error Handling
  If the user is not logged in or their profile is not found, the UI displays an appropriate message.
  Any server errors are logged, and a fallback message is shown to the user.
  This approach keeps the entire flow server-side, simplifying the component logic.
*/

/* 
  To implement a check in your /api/users endpoint to verify if a specific user in your MongoDB database has a codewars key in their object, you can modify your GET function to accept a query parameter for the user and then perform the necessary check.

  Updated /app/api/users/route.ts
  Here’s the implementation:

  typescript
  Copy code
  // app/api/users/route.ts
  import clientPromise from "@/lib/MongoDB/database";
  import { NextRequest, NextResponse } from "next/server";

  export async function GET(request: NextRequest) {
    try {
      // Parse the query parameters
      const { searchParams } = new URL(request.url);
      const username = searchParams.get("username"); // Expecting 'username' as query parameter

      // Connect to MongoDB
      const client = await clientPromise;
      const db = client.db("BCFCODEwars"); // Your MongoDB database

      if (!username) {
        return NextResponse.json(
          { error: "Username is required" },
          { status: 400 }
        );
      }

      // Fetch the specific user from the 'users' collection
      const user = await db.collection("users").findOne({ name: username });

      if (!user) {
        return NextResponse.json(
          { error: `User with name '${username}' not found` },
          { status: 404 }
        );
      }

      // Check if the user has the 'codewars' key
      const hasCodewarsKey = user.hasOwnProperty("codewars");

      // Return the result
      return NextResponse.json({ username, hasCodewarsKey });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Unable to fetch user information" },
        { status: 500 }
      );
    }
  }
  How to Use the API
  You can call this API with the username query parameter to check if the codewars key exists for that user.

  Example Request
  http
  Copy code
  GET /api/users?username=JohnDoe
  Example Response
  If the user exists and has the codewars key:
  json
  Copy code
  {
    "username": "JohnDoe",
    "hasCodewarsKey": true
  }
  If the user exists but does not have the codewars key:
  json
  Copy code
  {
    "username": "JohnDoe",
    "hasCodewarsKey": false
  }
  If the user does not exist:
  json
  Copy code
  {
    "error": "User with name 'JohnDoe' not found"
  }
  Client-Side Implementation (/app/(dashboard)/wars/page.tsx)
  To call this API from the client and check the result:

  typescript
  Copy code
  import { auth } from '@/auth';
  import React, { useEffect, useState } from 'react';

  const WarsPage = async () => {
    const session = await auth();

    const [codewarsCheck, setCodewarsCheck] = useState<{ hasCodewarsKey: boolean | null }>({
      hasCodewarsKey: null,
    });

    useEffect(() => {
      const checkUser = async () => {
        if (session?.user.name) {
          try {
            const response = await fetch(`/api/users?username=${session.user.name}`);
            const data = await response.json();
            setCodewarsCheck({ hasCodewarsKey: data.hasCodewarsKey });
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        }
      };

      checkUser();
    }, [session]);

    return (
      <div>
        <h1>WarsPage</h1>
        {codewarsCheck.hasCodewarsKey === null ? (
          <p>Loading...</p>
        ) : codewarsCheck.hasCodewarsKey ? (
          <p>Your profile has a Codewars key!</p>
        ) : (
          <p>Your profile does not have a Codewars key.</p>
        )}
      </div>
    );
  };

  export default WarsPage;
  Key Changes
  Backend (/api/users/route.ts):

  Added support for query parameters.
  Implemented logic to check for the existence of the codewars key.
  Frontend (/app/(dashboard)/wars/page.tsx):

  Fetched the API to determine if the logged-in user has a codewars key.
  Dynamically updated the UI to reflect the result.
  This setup ensures a seamless user experience and reliable API integration.
*/
