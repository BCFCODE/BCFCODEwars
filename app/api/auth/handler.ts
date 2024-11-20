import { handleUserData } from "@/services/userService";

export async function handleGoogleSignIn(user: {
  email: string;
  name: string;
  picture: string;
}) {
  return handleUserData(user); // Interact with the service layer
}