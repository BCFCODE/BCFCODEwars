// lib/MongoDB/saveUser.ts
import { NewDatabaseUser } from "@/types/user";
import { GoogleUser } from "@/types/google";
import { MongoClient } from "mongodb";
import { getDatabase } from "./database";

// MongoDB connection setup
const client = new MongoClient(process.env.MONGODB_URI || "");

export async function saveUserDataToDatabase(user: GoogleUser) {
  try {
    const db = await getDatabase();
    const usersCollection = db.collection("users");

    const { email, name, image } = user;
    // Check if the user already exists
    const existingUser = await usersCollection.findOne({ email });

    if (existingUser) {
      // Update user data if needed
      await usersCollection.updateOne(
        { email },
        { $set: { lastLogin: new Date().toISOString(), image, name } }
      );
    } else {
      // Create the new user object, replacing `id` with `googleId`
      const newUser: NewDatabaseUser = {
        email,
        name,
        image,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        codewars: { isConnected: false },
      };

      // Cast the NewDatabaseUser to a GoogleUser type for MongoDB insertion
      await usersCollection.insertOne(newUser); // Type cast to GoogleUser
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
