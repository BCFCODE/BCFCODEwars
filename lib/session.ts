// lib/session.ts
import { cookies } from "next/headers";
import { decodeJwt } from "some-jwt-library"; // Use your preferred library
import { GoogleUser } from "@/types/user";
import { NextRequest } from "next/server";

export async function getSession(req: NextRequest): Promise<{ user: GoogleUser } | null> {
  const cookieStore = cookies();
  const token = cookieStore.get("your-session-cookie");

  if (token) {
    try {
      // Decode JWT and return user information
      const decoded = decodeJwt(token.value); // Adjust decoding based on your setup
      return { user: decoded as GoogleUser };
    } catch (error) {
      console.error("Error decoding session token:", error);
    }
  }

  return null; // Return null if no valid session
}
