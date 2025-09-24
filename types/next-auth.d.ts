import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

// Extend the JWT type
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    phone: string;
  }
}

// Extend the Session and User types
declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    phone: string;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      phone: string;
    } & DefaultSession["user"]; // Keep the default properties like name, email, image
  }
}