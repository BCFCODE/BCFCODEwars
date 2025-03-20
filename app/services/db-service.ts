import { CodewarsCompletedChallenge, CodewarsUser } from "@/types/codewars";
import { GoogleUser } from "@/types/google";
import { CurrentUser } from "@/types/users";
import { Collection, Db, Document, MongoClient, WithId } from "mongodb";

class DBService {
  private clientPromise: Promise<MongoClient>;

  constructor() {
    const options = {};

    if (!process.env.MONGODB_URI) {
      throw new Error("Please add your MongoDB URI to .env.local");
    }

    if (process.env.NODE_ENV === "development") {
      // Reuse the client in development to avoid multiple connections
      if (!globalThis._mongoClientPromise) {
        const client = new MongoClient(process.env.MONGODB_URI, options);
        globalThis._mongoClientPromise = client.connect();
      }
      this.clientPromise = globalThis._mongoClientPromise;
    } else {
      // In production, always create a new client
      const client = new MongoClient(process.env.MONGODB_URI, options);
      this.clientPromise = client.connect();
    }
  }

  getDatabase = async (): Promise<Db> => {
    const client = await this.clientPromise;
    return client.db();
  };

  getCollections = async () => {
    const db = await this.getDatabase();
    const users = db.collection("users");
    const diamonds = db.collection("diamonds");
    const codewars = db.collection("codewars");
    return { users, diamonds, codewars };
  };

  getUsers = async (): Promise<Document[]> => {
    const { users } = await this.getCollections();

    return users
      .aggregate([
        // Join with diamonds collection based on the email field
        {
          $lookup: {
            from: "diamonds",
            localField: "email", // Use the email field in users collection
            foreignField: "email", // Use the email field in diamonds collection
            as: "diamonds",
          },
        },
        // Join with codewars collection based on the email field
        {
          $lookup: {
            from: "codewars",
            localField: "email", // Use the email field in users collection
            foreignField: "email", // Use the email field in codewars collection
            as: "codewars",
          },
        },
        // Optionally, unwind arrays to flatten them (if there are multiple matching documents)
        {
          $unwind: {
            path: "$diamonds",
            preserveNullAndEmptyArrays: true, // Keep users without diamonds
          },
        },
        {
          $unwind: {
            path: "$codewars",
            preserveNullAndEmptyArrays: true, // Keep users without codewars data
          },
        },
        // Project fields you want to return
        {
          $project: {
            email: 1,
            name: 1,
            diamonds: 1,
            codewars: 1,
            image: 1,
            createdAt: 1,
            lastLogin: 1,
          },
        },
      ])
      .toArray();
  };

  getCodewarsUsers = async (): Promise<CodewarsUser[]> => {
    const { codewars } = await this.getCollections();
    return await codewars.find<CodewarsUser>({}).toArray();
  };

  getUser = async (email: string): Promise<WithId<Document> | null> => {
    const { users } = await this.getCollections();
    return users.findOne({ email });
  };

  saveNewGoogleUser = async (user: GoogleUser) => {
    const { users } = await this.getCollections();
    await users.insertOne({
      email: user.email,
      name: user.name,
      image: user.image,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      // codewars: { isConnected: false },
    });
  };

  saveNewCodewarsUser = async (email: string) => {
    const { codewars } = await this.getCollections();
    const newUser = { email, isConnected: false };
    await codewars.insertOne(newUser);
  };

  saveChallengesList = async (
    list: CodewarsCompletedChallenge[],
    userId: string
  ) => {
    const db = await this.getDatabase();
    const codewars: Collection<CodewarsUser> =
      db.collection<CodewarsUser>("codewars");

    await codewars.findOneAndUpdate(
      { id: userId },
      { $set: { "codeChallenges.list": list } }
    );
  };

  getSingleCodewarsUser = async (
    email: string
  ): Promise<CodewarsUser | null> => {
    const { codewars } = await this.getCollections();
    return await codewars.findOne<CodewarsUser>({ email });
  };

  initializeDiamonds = async (email: string) => {
    const { diamonds } = await this.getCollections();
    await diamonds.insertOne({
      email,
      totals: {
        codewars: 0,
        missions: 0,
        total: 0,
      },
    });
  };

  updateSingleUser = async <T>(email: string, update: T) => {
    const { users } = await this.getCollections();
    await users.updateOne(
      { email },
      { $set: update as Readonly<Partial<Document>> }
    );
  };

  updateCurrentUser = async (currentUser: CurrentUser) => {
    console.log("updateCurrentUser in DB service", currentUser);
    //   Yes! You can update two different MongoDB collections in a single request using transactions or bulk operations, depending on your needs.
    //   1️⃣ Best Practice: Use Transactions (For Atomic Updates)
    //   If you need both updates to succeed together (or fail together if one fails), use transactions with MongoDB Sessions.
    //   ✅ Example: Updating users and challenges Collections Atomically
    //   ts
    //   Copy
    //   Edit
    //   import { Db, ClientSession } from "mongodb";
    //   async function updateUserAndChallenges(
    //     db: Db,
    //     userId: string,
    //     newChallengeList: CodewarsCompletedChallenge[],
    //     newUserRank: number
    //   ) {
    //     const session: ClientSession = db.client.startSession();
    //     try {
    //       session.startTransaction();
    //       const usersCollection = db.collection("users");
    //       const challengesCollection = db.collection("challenges");
    //       // Update the user's rank
    //       await usersCollection.updateOne(
    //         { id: userId },
    //         { $set: { rank: newUserRank } },
    //         { session }
    //       );
    //       // Update the user's challenge list in another collection
    //       await challengesCollection.updateOne(
    //         { userId: userId },
    //         { $set: { challengeList: newChallengeList } },
    //         { upsert: true, session }
    //       );
    //       // Commit the transaction (both updates succeed together)
    //       await session.commitTransaction();
    //     } catch (error) {
    //       await session.abortTransaction(); // Rollback changes if any error occurs
    //       console.error("Transaction failed:", error);
    //     } finally {
    //       session.endSession();
    //     }
    //   }
    //   🔥 Why Use Transactions?
    //   ✅ Ensures both collections update together (either both succeed or both fail)
    //   ✅ Prevents partial updates if one operation fails
    //   ✅ Best for financial operations, user state updates, and data consistency
    //   2️⃣ Alternative: Use Bulk Operations (Faster, But Not Atomic)
    //   If you want to update multiple collections without strict atomicity, use bulk operations.
    //   ✅ Example: Updating users and challenges in One Request
    //   ts
    //   Copy
    //   Edit
    //   async function updateUserAndChallenges(db: Db, userId: string, newChallengeList: CodewarsCompletedChallenge[], newUserRank: number) {
    //     const usersCollection = db.collection("users");
    //     const challengesCollection = db.collection("challenges");
    //     await Promise.all([
    //       usersCollection.updateOne({ id: userId }, { $set: { rank: newUserRank } }),
    //       challengesCollection.updateOne(
    //         { userId: userId },
    //         { $set: { challengeList: newChallengeList } },
    //         { upsert: true }
    //       )
    //     ]);
    //   }
    //   🔥 Why Use Bulk Operations?
    //   ✅ Faster than transactions
    //   ✅ Good when updates don’t depend on each other
    //   ❌ Not atomic (one update may succeed while the other fails)
    //   🚀 When to Use Which?
    //   🔹 Use Transactions if data consistency is critical (e.g., user balance updates, game scores).
    //   🔹 Use Bulk Operations if speed matters more than atomicity (e.g., updating logs, analytics).
    //   Would you like an optimized version for your specific use case? 🚀
    // */
  };

  updateSingleCodewarsUser = async <T>(email: string = "", update: T) => {
    const { codewars } = await this.getCollections();
    await codewars.updateOne(
      { email },
      { $set: update as Readonly<Partial<Document>> }
    );
  };

  getDiamonds = async (): Promise<WithId<Document>[]> => {
    const { diamonds } = await this.getCollections();
    return diamonds.find({}).toArray();
  };

  closeConnection = async () => {
    const client = await this.clientPromise;
    await client.close();
  };
}

export default DBService;
