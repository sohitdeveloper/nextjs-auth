//  @ts-nocheck
// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          const res = await fetch(
            `https://run.mocky.io/v3/0a98ebc8-064f-42ea-9d2f-0b3060d861ab`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            }
          );
          const user = await res.json();

          if (res.status === 200 && user) {
            return user;
          }
          return null;
        } catch {
          throw new Error("Email or Password is invalid");
        }
      },
    }),
    GoogleProvider({
      clientId:
        "1054150548382-hpqnjiu6hlamum5l40apkma1oaauvjrd.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  callbacks: {
    async jwt(params) {
      if (params.user) {
        params.token.role = params.user.role;
        params.token.jwtToken = params.user.jwtToken;
      }
      if (params.user?.email) {
        params.token.email = params.user.email;
      }

      return params.token;
    },
    async session(params) {
      // session.role = token.role;
      // session.jwtToken = token.jwtToken;
      return params.token;
    },
  },
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
