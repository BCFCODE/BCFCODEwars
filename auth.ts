import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"; // Import directly without typing 'Provider'
import GithubProvider from "next-auth/providers/github";

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

export const providerMap = providers.map((provider) => {
  const providerData = provider;
  return { id: providerData.id, name: providerData.name };
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  secret: process.env.AUTH_SECRET!,
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async authorized({ auth: session, request: { nextUrl } }: { auth: any, request: { nextUrl: URL } }) {
      const isLoggedIn = !!session?.user;
      const isPublicPage = nextUrl.pathname.startsWith("/public");

      if (isPublicPage || isLoggedIn) {
        return true;
      }

      return false;
    },
  },
});
