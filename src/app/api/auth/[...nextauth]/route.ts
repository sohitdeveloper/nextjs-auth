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
        const { identifier, email, password } = credentials as {
          identifier: any;
          email: string;
          password: string;
        };
        let info = identifier ? JSON.parse(identifier) : "";
        if (info) {
          console.log(JSON.stringify(identifier), "someinfo");
          console.log(info, "someinfo");
          console.log(identifier, "someinfo");
          try {
            const res = await fetch(
              `https://run.mocky.io/v3/3b1c0852-a986-4a18-94df-6548b57d5bc9`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: identifier,
              }
            );
            const user = await res.json();

            if (res.status === 200) {
              return user;
            }
            return null;
          } catch {
            throw new Error("Email or Password is invalid");
          }
        }
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
    // GoogleProvider({
    //   clientId:
    //     "767583294795-964hrdj7bp4lmatnuue3jn3qtq7gd8oh.apps.googleusercontent.com",
    //   clientSecret: "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",
    // }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session, account }) {
      if (account?.provider === "google") {
        const { id_token } = account;
        token.jwtToken = "some token";
        token.accessToken = id_token;
        token.refreshToken = "some refresh token";
        return token;
      }
      if (trigger === "update") {
        console.log(trigger, "updateishere");
      }
      if (user) {
        token.role = user.role;
        token.jwtToken = user.jwtToken;
        token.status = user.status;
        token.message = user.message;
      }
      if (user?.email) {
        token.email = user.email;
      }

      return token;
    },
    async session(params) {
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
