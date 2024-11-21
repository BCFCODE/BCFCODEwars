import clientPromise from "../lib/mongodb";
import { GoogleUser, NewUser } from "../types/user";

export async function handleUserData(user: GoogleUser) {
  const client = await clientPromise;
  const db = client.db("BCFCODEwars");
  const usersCollection = db.collection<GoogleUser>("users");

  const { email, name, image, id: googleId } = user;

  // Check if the user exists
  const existingUser = await usersCollection.findOne({ email });

  if (existingUser) {
    // Update last login timestamp
    await usersCollection.updateOne(
      { email },
      { $set: { lastLogin: new Date() } }
    );
    return existingUser;
  }

  // Create the new user object, replacing `id` with `googleId`
  const newUser: NewUser = {
    id: googleId, // Use googleId instead of id
    name,
    email,
    image,
    createdAt: new Date(),
    lastLogin: new Date(),
  };

  // Cast the NewUser to a GoogleUser type for MongoDB insertion
  await usersCollection.insertOne(newUser); // Type cast to GoogleUser
  return newUser;
}
