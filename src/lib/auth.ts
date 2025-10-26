import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/db/prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // Test credentials provider
    CredentialsProvider({
      name: "Test Account",
      credentials: {
        email: { label: "Email", type: "email" },
        role: { label: "Role", type: "select" }
      },
      async authorize(credentials) {
        // Test accounts for platform demonstration
        const testUsers = [
          {
            id: "test-student",
            email: "student@eduplatform.edu",
            name: "Test Student",
            role: "STUDENT",
            image: "/placeholder-avatar.jpg"
          },
          {
            id: "test-educator", 
            email: "educator@eduplatform.edu",
            name: "Test Educator",
            role: "EDUCATOR",
            image: "/placeholder-avatar.jpg"
          }
        ]

        const user = testUsers.find(u => u.email === credentials?.email)
        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            image: user.image
          }
        }
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role || "STUDENT"
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!
        session.user.role = token.role as string
      }
      return session
    }
  },
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error"
  }
}