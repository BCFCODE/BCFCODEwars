// lib/mongodb.ts
import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// In dev mode, cache connection across hot reloads
declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a helper to get DB
export async function getDb(dbName: string): Promise<Db> {
  const client = await clientPromise;
  return client.db(dbName);
}

export default clientPromise;
