import { handleUserData } from "@/services/userService";
import { GoogleUser } from "@/types/user";

export async function handleGoogleSignIn(user: GoogleUser) {
  return handleUserData(user); // Interact with the service layer
}
