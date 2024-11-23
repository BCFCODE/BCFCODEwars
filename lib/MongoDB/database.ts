// lib/MongoDB/database.ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string; // Ensure this exists in .env.local
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // Reuse the client in development to avoid multiple connections
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // In production, always create a new client
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function getDatabase() {
  const client = await clientPromise;
  return client.db(process.env.MONGODB_DB); // Name of your MongoDB database
}

export default clientPromise;