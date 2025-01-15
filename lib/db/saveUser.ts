// lib/MongoDB/saveUser.ts
import DatabaseService from "@/app/services/db-service";
import GoogleService from "@/app/services/google-service";
import { GoogleUser } from "@/types/google";
import { MongoClient } from "mongodb";

const { getUser, getCollections } = new DatabaseService();
const { createNewDatabaseUser } = new GoogleService();

// MongoDB connection setup
const client = new MongoClient(process.env.MONGODB_URI || "");

export async function saveUserDataToDatabase(user: GoogleUser) {
  try {
    const { email, name, image } = user;
    const { users } = await getCollections();

    const existingUser = await getUser(email);

    if (existingUser) {
      // Update user data if needed
      await users.updateOne(
        { email },
        { $set: { lastLogin: new Date().toISOString(), image, name } }
      );
    } else {
      const newUser = createNewDatabaseUser(user);

      await users.insertOne(newUser); // Type cast to GoogleUser
      return newUser;
    }
  } catch (error) {
    console.error("Error saving user data to the database:", error);
  } finally {
    await client.close();
  }
}

export async function handleGoogleSignIn(user: GoogleUser) {
  return saveUserDataToDatabase(user);
}
