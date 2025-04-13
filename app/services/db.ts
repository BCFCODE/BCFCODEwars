import { CodewarsCompletedChallenge, CodewarsUser } from "@/types/codewars";
import { Diamonds } from "@/types/diamonds";
import { AuthenticatedUser, DatabaseUser, GoogleUser } from "@/types/users";
import {
  ClientSession,
  Collection,
  Db,
  Document,
  MongoClient
} from "mongodb";

class DatabaseService {
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

  getClient = async (): Promise<MongoClient> => await this.clientPromise;

  getDatabase = async (): Promise<{ db: Db; client: MongoClient }> => {
    const client = await this.getClient();
    const db = client.db();
    return { db, client };
  };

  startClientSession = async (): Promise<{
    db: Db;
    client: MongoClient;
    session: ClientSession;
  }> => {
    const { db, client } = await this.getDatabase();
    const session: ClientSession = client.startSession();
    return { db, client, session };
  };

  getCollections = async () => {
    const { db } = await this.getDatabase();
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
            firstLogin: 1,
            lastLogin: 1,
            activity: 1,
          },
        },
      ])
      .toArray();
  };

  getCodewarsUsers = async (): Promise<CodewarsUser[]> => {
    const { codewars } = await this.getCollections();
    return await codewars.find<CodewarsUser>({}).toArray();
  };

  getUser = async (email: string): Promise<DatabaseUser | null> => {
    const { users } = await this.getCollections();
    return users.findOne<DatabaseUser>({ email });
  };

  saveNewGoogleUser = async (user: GoogleUser) => {
    const { users } = await this.getCollections();
    await users.insertOne({
      email: user.email,
      name: user.name,
      image: user.image,
      firstLogin: new Date(),
      lastLogin: new Date(),
      activity: {
        firstLogin: new Date(),
        lastLogin: new Date(),
        lastLogout: undefined,
        loginHistory: [new Date()],
        logoutHistory: [],
        isActiveSession: true,
      },
    });
  };

  saveNewCodewarsUser = async (email: string) => {
    const { codewars } = await this.getCollections();
    const newUser = { email, isConnected: false };
    await codewars.insertOne(newUser);
  };

  saveChallengesList = async ({
    list,
    userId,
  }: {
    list: CodewarsCompletedChallenge[];
    userId: string;
  }) => {
    const { db } = await this.getDatabase();
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
      codewars: [],
      totals: {
        codewars: {
          ranks: {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
          },
          total: 0,
        },
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

  updateCurrentUser = async (currentUser: AuthenticatedUser) => {
    const { db, session } = await this.startClientSession();
    const { email } = currentUser;

    const list = currentUser.codewars.codeChallenges.list;
    const totals = currentUser.diamonds.totals;
    const codewarsDiamondsRecords = currentUser.diamonds.codewars;

    try {
      session.startTransaction();

      const codewars = db.collection("codewars");
      const diamonds = db.collection("diamonds");

      await codewars.updateOne(
        { email },
        { $set: { "codeChallenges.list": list } },
        { session }
      );

      await diamonds.updateOne(
        { email },
        {
          $set: {
            codewars: [...codewarsDiamondsRecords],
            totals: { ...totals },
          },
        },
        { session }
      );

      await session.commitTransaction();
      // console.log("Transaction committed successfully.");
    } catch (error) {
      await session.abortTransaction();
      // console.error("Transaction failed and was aborted!", error);
    } finally {
      session.endSession();
    }
  };

  updateSingleCodewarsUser = async <T>(email: string = "", update: T) => {
    const { codewars } = await this.getCollections();
    await codewars.updateOne(
      { email },
      { $set: update as Readonly<Partial<Document>> }
    );
  };

  getDiamonds = async (): Promise<Diamonds[]> => {
    const { diamonds } = await this.getCollections();
    return diamonds.find<Diamonds>({}).toArray();
  };

  closeConnection = async () => {
    const client = await this.getClient();
    await client.close();
  };
}

export default DatabaseService;
