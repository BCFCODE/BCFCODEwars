import DBService from "@/app/services/db-service";
import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import seedData from "./data";

const { getCollections } = new DBService();

const uri: string | undefined = process.env.MONGODB_URI;

export async function GET(request: NextRequest) {
  /* 
    http://localhost:3000/seed/codewars?key=your-secret-key
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
    const { codewars } = await getCollections();
    // Insert seed data
    const result = await codewars.insertMany(seedData);
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
