import { MongoClient, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const uri: string | undefined = process.env.MONGODB_URI;

const scoreMap = {
  // Map reference for diamond rewards for each solved challenge
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
    8: 5,
  },
};

const seedData = [
  {
    _id: new ObjectId("66de10e40acbb5c30fc4e49b"),
    diamonds: {
      codewars: 0, // Sum of codewars diamonds awards
      missions: 0,  
    },
    codewars: {
      challenges: [
        {
          id: "5782dd86202c0e43410001f6",
          name: "Number , number ... wait LETTER !",
          slug: "number-number-dot-dot-dot-wait-letter",
          completedLanguages: ["javascript"],
          completedAt: "2025-01-11T10:08:25.255Z",
        },
        {
          id: "6210fb7aabf047000f3a3ad6",
          name: "Assemble string",
          slug: "assemble-string",
          completedLanguages: ["javascript"],
          completedAt: "2025-01-11T07:15:17.608Z",
        },
        {
          id: "5a49f074b3bfa89b4c00002b",
          name: "String subpattern recognition I",
          slug: "string-subpattern-recognition-i",
          completedLanguages: ["javascript"],
          completedAt: "2025-01-10T10:46:49.721Z",
        },
        {
          id: "5bc7bb444be9774f100000c3",
          name: "Versions manager",
          slug: "versions-manager",
          completedLanguages: ["javascript"],
          completedAt: "2025-01-08T16:01:49.068Z",
        },
        {
          id: "536c6b8749aa8b3c2600029a",
          name: "A String of Sorts",
          slug: "a-string-of-sorts",
          completedLanguages: ["javascript"],
          completedAt: "2025-01-06T14:19:50.740Z",
        },
        {
          id: "59b7571bbf10a48c75000070",
          name: "String tops",
          slug: "string-tops",
          completedLanguages: ["javascript"],
          completedAt: "2025-01-06T13:51:48.865Z",
        },
        {
          id: "57ebdf1c2d45a0ecd7002cd5",
          name: "Inside Out Strings",
          slug: "inside-out-strings",
          completedLanguages: ["javascript"],
          completedAt: "2025-01-06T12:39:29.984Z",
        },
        {
          id: "57d165ad95497ea150000020",
          name: "Pairs of Bears",
          slug: "pairs-of-bears",
          completedLanguages: ["javascript"],
          completedAt: "2025-01-06T12:13:47.514Z",
        },
        {
          id: "56b5dc75d362eac53d000bc8",
          name: "Basics 03: Strings, Numbers and Calculation",
          slug: "basics-03-strings-numbers-and-calculation",
          completedLanguages: ["javascript"],
          completedAt: "2025-01-04T09:40:39.524Z",
        },
        {
          id: "558878ab7591c911a4000007",
          name: "Single Word Pig Latin",
          slug: "single-word-pig-latin",
          completedLanguages: ["javascript"],
          completedAt: "2025-01-04T09:25:40.915Z",
        },
      ],
    },
  },
];

export async function GET(request: NextRequest) {
  /* 
    http://localhost:3000/seed/diamonds?key=your-secret-key
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
    const usersCollection = db.collection("diamonds");
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
