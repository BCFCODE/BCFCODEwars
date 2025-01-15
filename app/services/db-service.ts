// app/services/db-service.ts

import { baseURL } from "@/utils/constants";
import { Db, MongoClient } from "mongodb";
import { User } from "next-auth";

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
  /* 
    TODO: CRUD
    // lib/MongoDB/saveUser.ts
    and ...
  */

  getDatabase = async (): Promise<Db> => {
    const client = await this.clientPromise;
    return client.db();
  };

  createUser = async (user: User) => {
    try {
      const response = await fetch(`${baseURL}/api/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          name: user.name,
          image: user.image,
        }),
      });

      const data = await response.json();
      if (data.user) {
        console.log("User data stored in MongoDB:", data.user);
      } else {
        console.error("Error storing user:", data.error);
      }
    } catch (error) {
      console.error("API error during sign-in:", error);
    }
  };
}

export default DatabaseService;
