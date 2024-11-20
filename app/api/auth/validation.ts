import { z } from "zod";

export const UserSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  picture: z.string().url(),
});

export function validateUserData(user: any) {
  return UserSchema.parse(user); // Throws an error if validation fails
}
