import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"

// In a real app, this would be a database call
const users = [
  {
    id: "1",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "$2b$10$Rq.rVQDvUUm8qVL3Ym.GWOJwBXqJRFfAMnOJ8YxCZyEcfIk61n59W", // "password123"
    image: null,
  },
]

export const authOptions: NextAuthOptions = {
  debug: true, // Enable debug mode
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("Authorizing with credentials:", credentials?.email);
          
          if (!credentials?.email || !credentials?.password) {
            console.log("Missing email or password");
            return null;
          }

          // In a real app, look up the user from the database
          const user = users.find((user) => user.email === credentials.email);

          if (!user) {
            console.log("User not found");
            return null;
          }

          console.log("User found, comparing passwords");
          const passwordMatch = await bcrypt.compare(credentials.password, user.password);

          if (!passwordMatch) {
            console.log("Password doesn't match");
            return null;
          }

          console.log("Authentication successful");
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
    newUser: "/register",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-for-development",
}
