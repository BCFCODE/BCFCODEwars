import { GoogleUser } from "@/types/user";
import { z } from "zod";

export const UserSchema = z.object({

  email: z.string().email(),
  name: z.string(),
  image: z.string().url(),
});

export function validateUserData(user: GoogleUser) {
  return UserSchema.parse(user); // Throws an error if validation fails
}
