import NextAuth, { type DefaultSession } from "next-auth";

declare module "@auth/core" {
  interface Session {
    user: {
      role: string;
      jwtToken: string;
      // [key: string]: string;
    } & DefaultSession["user"];
  }
}
