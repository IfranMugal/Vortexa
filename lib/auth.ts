import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/db"; // Make sure this path is correct for your project
import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      // These credentials are used to generate a generic sign-in form.
      // We only need phone and password for authentication.
      credentials: {
        phone: { label: "Phone", type: "text", placeholder: "9876543210" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // 1. Check if phone and password were provided
        if (!credentials?.phone || !credentials?.password) {
          return null;
        }

        // 2. Find the user in the database
        const user = await prisma.user.findUnique({
          where: { phone: credentials.phone },
        });

        // If no user is found, authentication fails
        if (!user) {
          return null;
        }

        // 3. Compare the provided password with the hashed password in the database
        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        // If passwords match, return the user object
        if (passwordsMatch) {
          return {
            id: user.id,
            name: user.name,
            phone: user.phone,
            state: user.state,
            district: user.district,
            city: user.city,
            // Do NOT include the password in the returned object
          };
        }

        // If passwords do not match, authentication fails
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  // Callbacks are used to control what happens when an action is performed.
  callbacks: {
    async jwt({ token, user }) {
      // When a user successfully signs in, the 'user' object is available in this callback.
      // We add the user's ID and phone number to the token.
      if (user) {
        token.id = user.id;
        token.phone = user.phone;
      }
      return token;
    },
    async session({ session, token }) {
      // The session callback is called whenever a session is checked.
      // We forward the custom properties from the token to the session object.
      if (session.user) {
        session.user.id = token.id as string;
        session.user.phone = token.phone as string;
      }
      return session;
    },
  },
  
  // Optional: You can specify custom pages if you don't want to use the default NextAuth pages.
  // pages: {
  //   signIn: '/login', 
  // },
};