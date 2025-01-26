// app/services/db-service.ts

import { Db, Document, MongoClient, OptionalId, WithId } from "mongodb";

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

  getAllUsers = async (): Promise<WithId<Document>[]> => {
    const db = await this.getDatabase();
    return await db.collection("users").find({}).toArray();
  };

  getUser = async (email: string): Promise<WithId<Document> | null> => {
    const db = await this.getDatabase();
    return await db.collection("users").findOne({ email });
  };

  saveSingleUser = async <T>(newUser: T) => {
    const { users } = await this.getCollections();
    await users.insertOne(newUser as OptionalId<Document>);
  };

  updateSingleUser = async <T>(email: string, update: T) => {
    const { users } = await this.getCollections();
    await users.updateOne(
      { email },
      { $set: update as Readonly<Partial<Document>> }
    );
  };

  closeConnection = async () => {
    const client = await this.clientPromise;
    await client.close();
  };
}

export default DatabaseService;
