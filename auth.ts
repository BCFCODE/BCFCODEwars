import NextAuth from "next-auth";
import google from "next-auth/providers/google";
import github from "next-auth/providers/github";

const providers = [
  google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
  github({
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  }),
];

export const providerMap = providers.map((provider) => {
  const providerData = provider;
  return { id: providerData.id, name: providerData.name };
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized({ auth: session, request: { nextUrl } }) {
      const isLoggedIn = !!session?.user;
      const isPublicPage = nextUrl.pathname.startsWith("/public");

      return isPublicPage || isLoggedIn;
    },
  },
});
