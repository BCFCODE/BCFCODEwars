'use server'

import type { AuthProvider } from "@toolpad/core";
import { AuthError } from "next-auth";
import { signIn } from "../../../auth";

export async function handleSignIn(
  provider: AuthProvider,
  formData: FormData,
  callbackUrl?: string
) {
  try {
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
