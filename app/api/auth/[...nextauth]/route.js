import { conntectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  session: {
    jwt: true,
    transient: true,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      prompt: "select_account",
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const { name, email } = user;
        try {
          await conntectMongoDB();

          const userExists = await User.findOne({ email });
          if (!userExists) {
            const res = await fetch(
              "https://invoicywebsite.netlify.app/api/userCreate",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name,
                  email,
                }),
              }
            );

            if (res.ok) {
              return user;
            }
          }
        } catch (error) {
          console.log("error", error);
        }
      }

      return user;
    },
  },
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
