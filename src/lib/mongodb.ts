import { MongoClient, Db, MongoClientOptions } from 'mongodb';

// Environment variable validation with type guard
function getEnvVariable(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not defined in .env.local`);
  }
  return value;
}

const uri = getEnvVariable('MONGODB_URI');
const dbName = getEnvVariable('MONGODB_DB');

const options: MongoClientOptions = {
  maxPoolSize: 10, // Limit connection pool size
  connectTimeoutMS: 10000 // 10 seconds timeout for connection
};

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;
let cachedDb: Db | null = null;

// Use global to cache MongoClientPromise in development
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

/**
 * Initializes the MongoDB client connection if not already initialized.
 * Caches the connection in development to persist across hot reloads.
 */
function initializeClient(): Promise<MongoClient> {
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    if (!clientPromise) {
      client = new MongoClient(uri, options);
      clientPromise = client.connect();
    }
  }
  return clientPromise;
}

/**
 * Gets the MongoDB client instance.
 * @returns A promise resolving to the MongoClient instance.
 */
export async function getClient(): Promise<MongoClient> {
  if (!clientPromise) {
    clientPromise = initializeClient();
  }
  return clientPromise;
}

/**
 * Gets the MongoDB database instance.
 * @returns A promise resolving to the Db instance.
 */
export async function getDb(): Promise<Db> {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await getClient();
  cachedDb = client.db(dbName);
  return cachedDb;
}

/**
 * Closes the MongoDB client connection.
 * Useful for cleanup in tests or server shutdown.
 */
export async function closeClient(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    clientPromise = null;
    cachedDb = null;
    if (process.env.NODE_ENV === 'development') {
      global._mongoClientPromise = undefined;
    }
  }
}

// Export clientPromise for use in contexts requiring the raw promise
export default clientPromise;
