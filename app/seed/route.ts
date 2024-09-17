import { MongoClient, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const uri: string | undefined = process.env.MONGODB_URI;

const seedData = [
  {
    _id: new ObjectId("66de10e40acbb5c30fc4e49b"),
    username: "Morteza",
    email: "bcfcode@gmail.com",
    password: "1234",
    createdAt: new Date("2024-09-08T21:02:28.684Z"),
  },
  {
    _id: new ObjectId(),
    username: "Sepehr",
    email: "sepehr.salimian11@gmail.com",
    password: "1234",
    createdAt: new Date(),
  },
  {
    _id: new ObjectId(),
    username: "Mahsa",
    email: "mahsa.alamdari95@gmail.com",
    password: "1234",
    createdAt: new Date("2024-09-08T21:41:41.283Z"),
  },
];

export async function GET(request: NextRequest) {
  /* 
    http://localhost:3000/seed?key=your-secret-key
    And in your .env.local file, you’d have:

    SECRET_KEY=your-secret-key
    This way, only requests with the correct key will succeed in seeding the database.
  */
  const { searchParams } = new URL(request.url);
  const secretKey = searchParams.get("key");

  // Check if the secret key matches
  if (secretKey !== process.env.SECRET_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!uri) throw new Error("MongoDB URI is not defined");

  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    const db = client.db("BCFCODEwars"); // Use your database name
    const usersCollection = db.collection("users");
    // Insert seed data
    const result = await usersCollection.insertMany(seedData);
    // Return a success response
    return NextResponse.json({
      message: `Seeded ${result.insertedCount} users.`,
    });
  } catch (error) {
    // Handle any errors during the seeding process
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Error seeding data.`, details: errorMessage },
      { status: 500 }
    );
  } finally {
    // Ensure the client connection is closed
    await client.close();
  }
}
/* 
  To implement a /app/seed/route.ts API route in your Next.js project (with the App Router) for the purpose of seeding your MongoDB database, you can follow these steps. This approach will allow you to trigger seeding of the database via an API request.

  Steps to Implement /app/seed/route.ts for Seeding
  1. Create the /app/seed/route.ts API Route
  In your Next.js project, inside the app directory, create a new folder called seed and a file named route.ts inside it:

  mkdir -p app/seed
  touch app/seed/route.ts

  2. Connect to MongoDB
  Since you're already using MongoDB in your project, reuse your existing MongoDB connection logic. Here’s an example of how to implement the API route to seed the users collection.

  /app/seed/route.ts

  import { NextResponse } from 'next/server';
  import { MongoClient } from 'mongodb';

  // MongoDB connection URI from your environment variables

  const uri = process.env.MONGODB_URI || "mongodb+srv://BCFCODE:<password>@bcfcodewars.i4yn9.mongodb.net/BCFCODEwars?retryWrites=true&w=majority&appName=BCFCODEwars";

  // Example seed data for the 'users' collection
  const seedData = [
    { name: "User1", email: "user1@example.com" },
    { name: "User2", email: "user2@example.com" },
    { name: "User3", email: "user3@example.com" }
  ];

  export async function GET() {
    const client = new MongoClient(uri);

    try {
      // Connect to the MongoDB cluster
      await client.connect();
      const db = client.db('BCFCODEwars'); // Use your database name
      const usersCollection = db.collection('users');

      // Insert seed data
      const result = await usersCollection.insertMany(seedData);

      // Return a success response
      return NextResponse.json({ message: `Seeded ${result.insertedCount} users.` });
    } catch (error) {
      // Handle any errors during the seeding process
      return NextResponse.json({ error: 'Error seeding data', details: error.message }, { status: 500 });
    } finally {
      // Ensure the client connection is closed
      await client.close();
    }
  }
  3. Handle Environment Variables
  Ensure that your MongoDB connection URI is stored in .env.local:

  # .env.local
  MONGODB_URI=mongodb+srv://BCFCODE:<password>@bcfcodewars.i4yn9.mongodb.net/BCFCODEwars?retryWrites=true&w=majority&appName=BCFCODEwars
  Next.js automatically loads environment variables from .env.local, so you can securely store sensitive data like the MongoDB connection string.

  4. Testing the Seed API Route
  Once the route is set up, you can trigger the database seeding by making a GET request to the /seed route.

  Start your Next.js development server:

  pnpm dev
  Open your browser and go to:

  http://localhost:3000/seed
  This will trigger the API route to run the seeding process. You should see a JSON response indicating how many users were seeded:

  {
    "message": "Seeded 3 users."
  }
  5. Secure the Seeding Route (Optional but Recommended)
  You may not want to expose the seeding route to everyone. You can add basic security (like an API key or a restricted check) to ensure only authorized users can trigger the seeding process.

  For example, you can pass a SECRET_KEY in the query string:

  export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const secretKey = searchParams.get('key');

    // Check if the secret key matches
    if (secretKey !== process.env.SECRET_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = new MongoClient(uri);

    try {
      await client.connect();
      const db = client.db('BCFCODEwars');
      const usersCollection = db.collection('users');

      const result = await usersCollection.insertMany(seedData);
      return NextResponse.json({ message: `Seeded ${result.insertedCount} users.` });
    } catch (error) {
      return NextResponse.json({ error: 'Error seeding data', details: error.message }, { status: 500 });
    } finally {
      await client.close();
    }
  }
  Then, when accessing the API, you would provide the secret key like this:

  http://localhost:3000/seed?key=your-secret-key
  And in your .env.local file, you’d have:

  SECRET_KEY=your-secret-key
  This way, only requests with the correct key will succeed in seeding the database.
*/
