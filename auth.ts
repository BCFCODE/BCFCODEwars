import NextAuth, { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { NextRequest } from "next/server";

const providers = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),
  GithubProvider({
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  }),
];

const missingVars: string[] = [];

const isMissing = (name: string, envVar: string | undefined) => {
  if (!envVar) {
    missingVars.push(name);
  }
};

isMissing("GOOGLE_CLIENT_ID", process.env.GOOGLE_CLIENT_ID);
isMissing("GOOGLE_CLIENT_SECRET", process.env.GOOGLE_CLIENT_SECRET);
isMissing("GITHUB_CLIENT_ID", process.env.GITHUB_CLIENT_ID);
isMissing("GITHUB_CLIENT_SECRET", process.env.GITHUB_CLIENT_SECRET);

if (missingVars.length > 0) {
  const baseMessage =
    "Authentication is configured but the following environment variables are missing:";

  if (process.env.NODE_ENV === "production") {
    console.warn(`warn: ${baseMessage} ${missingVars.join(", ")}`);
  } else {
    console.warn(
      `\u001b[33mwarn:\u001b[0m ${baseMessage} \u001b[31m${missingVars.join(", ")}\u001b[0m`
    );
  }
}

export const providerMap = providers.map((provider) => ({
  id: provider.id as "google" | "github",
  name: provider.name,
}));

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async authorized({
      auth,
      request,
    }: {
      auth: Session | null;
      request: NextRequest;
    }) {
      const isLoggedIn = !!auth?.user;
      const isPublicPage = request.nextUrl.pathname.startsWith("/public");

      if (isPublicPage || isLoggedIn) {
        return true;
      }

      return false; // Redirect unauthenticated users to login page
    },
  },
});
