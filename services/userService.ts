import clientPromise from "../lib/mongodb";
import { User } from "../types/user";

export async function handleUserData(user: {
  email: string;
  name: string;
  picture: string;
}) {
  const client = await clientPromise;
  const db = client.db("BCFCODEwars");
  const usersCollection = db.collection<User>("users");

  const { email, name, picture } = user;

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

  // Insert a new user
  const newUser: User = {
    name,
    email,
    image: picture,
    createdAt: new Date(),
    lastLogin: new Date(),
  };

  await usersCollection.insertOne(newUser);
  return newUser;
}
