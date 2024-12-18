import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    emailVerified: Date | null; // Include emailVerified as it is part of AdapterUser
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      name: string;
      image: string;
      emailVerified: Date | null;
    } & DefaultSession["user"];
  }
}
