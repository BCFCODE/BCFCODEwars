// app/auth/signin/signInHandler.ts

'use server'

import { signIn } from "@/auth";
import type { AuthProvider } from "@toolpad/core";
import { AuthError } from "next-auth";
import { cookies } from "next/headers";

export async function handleSignIn(
  provider: AuthProvider,
  formData: FormData,
  callbackUrl?: string
) {
  try {
    const cookiesList = await cookies();
    const cookieValue = cookiesList.get('authjs.pkce.code_verifier');
    
    return await signIn(provider.id, {
      redirectTo: callbackUrl ?? "/",
    });
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }
    if (error instanceof AuthError) {
      return {
        error: "An error with Auth.js occurred.",
        type: error.type,
      };
    }
    return {
      error: "Something went wrong.",
      type: "UnknownError",
    };
  }
}
