import NextAuth, { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import GithubProvider from "next-auth/providers/github";
import { NextRequest } from "next/server";

// Configure authentication providers
const providers = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),
  /*
  Uncomment if needed:
  GithubProvider({
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  }),
  */
];

// Utility function to check and log missing environment variables
const checkEnvVariables = (vars: { [key: string]: string | undefined }) => {
  const missingVars = Object.keys(vars).filter(key => !vars[key]);
  
  if (missingVars.length > 0) {
    const message = `Missing environment variables: ${missingVars.join(", ")}`;
    if (process.env.NODE_ENV === "production") {
      console.warn(`warn: ${message}`);
    } else {
      console.warn(`\u001b[33mwarn:\u001b[0m ${message}`);
    }
  }
};

// Check required environment variables
checkEnvVariables({
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  // Uncomment if needed:
  // GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  // GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
});

// Create a provider map for custom use
export const providerMap = providers.map((provider) => ({
  id: provider.id as "google" /* | "github" */,
  name: provider.name,
}));

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Ensure redirect points to the base URL or a safe internal path
      return url.startsWith(baseUrl) ? url : `${baseUrl}/dashboard`;
    },
    async authorized({
      auth,
      request,
    }: {
      auth: Session | null;
      request: NextRequest;
    }) {
      const isLoggedIn = !!auth?.user;
      const isPublicPage = request.nextUrl.pathname.startsWith("/public");

      return isPublicPage || isLoggedIn; // Allow access to public pages or logged-in users
    },
  },
});
