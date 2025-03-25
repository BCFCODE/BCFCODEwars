import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { baseURL } from "./utils/constants";

// Define authentication providers
const providers = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),
];

const missingVars: string[] = [];

// Utility to check for missing environment variables
const isMissing = (name: string, envVar: string | undefined) => {
  if (!envVar) {
    missingVars.push(name);
  }
};

// Validate required environment variables
isMissing("GOOGLE_CLIENT_ID", process.env.GOOGLE_CLIENT_ID);
isMissing("GOOGLE_CLIENT_SECRET", process.env.GOOGLE_CLIENT_SECRET);

if (missingVars.length > 0) {
  const message = `The following environment variables are missing: ${missingVars.join(", ")}`;
  console.warn(`\u001b[33mwarn:\u001b[0m ${message}`);
}

export const providerMap = providers.map((provider) => ({
  id: provider.id as "google",
  name: provider.name,
}));

export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth({
  providers,
  secret: process.env.AUTH_SECRET,
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      },
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const response = await fetch(`${baseURL}/api/auth`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user: {
                email: user.email,
                name: user.name,
                image: user.image,
              },
            }),
          });

          const data = await response.json();
          if (data.user) {
            console.log("User data stored in MongoDB:", data.user);
          } else {
            console.error("Error storing user:", data.error);
          }
        } catch (error) {
          console.error("API error during sign-in:", error);
        }
      }

      return true; // Continue sign-in
    },
    async authorized({ request, auth }) {
      const isLoggedIn = !!auth?.user;
      const isPublicPage = request.nextUrl.pathname.startsWith("/public");

      if (isPublicPage || isLoggedIn) {
        return true;
      }

      return false;
    },
  },
  events: {
    async signOut(message) {
      if ("token" in message && message.token) {
        const token = message.token;
        const email = token.email;
        if (email) {
          try {
            await fetch(`${baseURL}/api/auth/logout`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email }),
            });
          } catch (error) {
            console.error("Error logging sign-out:", error);
          }
        }
      }
    },
  },
});
