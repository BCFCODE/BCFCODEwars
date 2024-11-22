// lib/database.ts
import { MongoClient } from "mongodb";
import { GoogleUser } from "@/types/user";
import { getDatabase } from "./database";

// MongoDB connection setup
const client = new MongoClient(process.env.MONGODB_URI || "");

export async function saveUserDataToDatabase(user: GoogleUser) {
  try {
    const db = await getDatabase();
    const usersCollection = db.collection("users");

    // Check if the user already exists
    const existingUser = await usersCollection.findOne({ email: user.email });

    if (existingUser) {
      // Update user data if needed
      await usersCollection.updateOne(
        { email: user.email },
        { $set: { ...user, lastLogin: new Date() } }
      );
    } else {
      // Create new user entry
      await usersCollection.insertOne({ ...user, createdAt: new Date() });
    }
  } catch (error) {
    console.error("Error saving user data to the database:", error);
  } finally {
    await client.close();
  }
}
