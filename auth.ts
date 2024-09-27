import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import type { AuthProvider, SupportedAuthProvider } from "@toolpad/core"; // Ensure you import the types

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

// Create providerMap ensuring proper type for AuthProvider
export const providerMap: AuthProvider[] = providers.map((provider) => {
  let providerId: SupportedAuthProvider;

  // Ensure that the provider.id matches the SupportedAuthProvider type
  switch (provider.name) {
    case "Google":
      providerId = "google"; // Match the supported ID
      break;
    case "GitHub":
      providerId = "github"; // Match the supported ID
      break;
    default:
      throw new Error(`Unsupported provider: ${provider.name}`);
  }

  return { id: providerId, name: provider.name };
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  secret: process.env.AUTH_SECRET!,
  pages: {
    signIn: "/auth/signin",
  },
  /* 
   When you set trustHost: true, it allows the application to accept requests from all hosts. While this can be useful for development, it’s important to understand the security implications. This is not recommended for production environments since it can expose your application to potential security risks.
   Setting trustHost: true opens your application to requests from any host, which can expose your app to security vulnerabilities, even in development. If you accidentally deploy your app without removing this option, it could lead to serious security issues.
  */
  // trustHost: true,
  callbacks: {
    async authorized({
      auth: session,
      request: { nextUrl },
    }: {
      auth: any;
      request: { nextUrl: URL };
    }) {
      const isLoggedIn = !!session?.user;
      const isPublicPage = nextUrl.pathname.startsWith("/public");

      return isPublicPage || isLoggedIn; // Simplified return statement
    },
  },
});
