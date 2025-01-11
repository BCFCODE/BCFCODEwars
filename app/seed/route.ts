import { MongoClient, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const uri: string | undefined = process.env.MONGODB_URI;

const usersSeedData = [
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

const diamondsSeedData = {
  scoreMap: { // Map reference for diamond rewards for each solved challenge
    codewars: {
    /* 
    Number of diamonds according to its kyo (8 = 8kyo)
      Scores:
        8kyo = 5💎
        7kyo = 10💎
        6kyo = 25💎
        5kyo = 50💎
        4kyo = 100💎
        3kyo = 200💎
        2kyo = 300💎
        1kyo = 500💎
    */
      1: 500,
      2: 300,
      3: 200,
      4: 100,
      5: 50,
      6: 25,
      7: 10,
      8: 5
    },
  },
  data: [
    {
      _id: new ObjectId("66de10e40acbb5c30fc4e49b"),
      codewars: {
       
      }
    },
  ],
};

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
  if (secretKey !== process.env.SEED_SECRET_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!uri) throw new Error("MongoDB URI is not defined");

  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    const db = client.db(process.env.MONGODB_DB); // Use your database name
    const usersCollection = db.collection("users");
    // Insert seed data
    const result = await usersCollection.insertMany(usersSeedData);
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
