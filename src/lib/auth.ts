import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { authenticateUser } from "@/lib/auth-store"

export const authOptions: NextAuthOptions = {
  providers: [
    // Email/Password credentials provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your@email.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.error("Missing email or password")
            return null
          }

          const user = await authenticateUser(credentials.email, credentials.password)
          if (!user) {
            console.error("Authentication failed for:", credentials.email)
            return null
          }

          console.log("User authenticated successfully:", user.email)
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            image: user.image
          }
        } catch (error) {
          console.error("Authorization error:", error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        token.role = user.role || "STUDENT"
        token.email = user.email
        token.name = user.name
        token.image = user.image
      }
      if (trigger === "update" && session) {
        if (session.name) token.name = session.name
        if (session.image !== undefined) token.image = session.image
        if (session.email) token.email = session.email
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.image = token.image as string
      }
      return session
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error"
  },
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET || "sindh-school-secret-key-2026-prod-fallback",
  debug: process.env.NODE_ENV === "development",
}