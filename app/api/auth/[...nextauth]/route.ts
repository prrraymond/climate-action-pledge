import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"

// Configure NextAuth options
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // This is a simple example - in a real app, you would validate against a database
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // For demo purposes, accept any credentials
        // In a real app, you would check against your database
        const user = {
          id: "1",
          name: "Jane Smith",
          email: credentials.email,
          image: null,
        }

        return user
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  debug: true, // Enable debug mode to see more detailed errors
}

// Export handlers for GET and POST requests
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
