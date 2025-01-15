import DatabaseService from "@/app/services/db-service";
import { MongoClient, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const { getCollections } = new DatabaseService();

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
    http://localhost:3000/seed/users?key=your-secret-key
    And in your .env.local file, you’d have:

    SECRET_KEY=your-secret-key
    This way, only requests with the correct key will succeed in seeding the database.
  */
  const { searchParams } = new URL(request.url);
  const secretKey = searchParams.get("key");

  // Check if the secret key matches
  if (secretKey !== process.env.SEED_SECRET_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!uri) throw new Error("MongoDB URI is not defined");

  const client = new MongoClient(uri);

  try {
    const { users } = await getCollections();
    // Insert seed data
    const result = await users.insertMany(seedData);
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
