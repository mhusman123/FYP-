import { NextRequest, NextResponse } from "next/server"
import { registerUser } from "@/lib/auth-store"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, password, role } = body

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      )
    }

    // Register user via resilient dual-layer auth store
    const user = await registerUser({
      name: name || null,
      email,
      password,
      role: role || "STUDENT"
    })

    return NextResponse.json(
      { 
        message: "User created successfully", 
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error details:", error)
    const errorMessage = error instanceof Error ? error.message : "An error occurred during registration"
    const status = errorMessage.includes("already exists") ? 400 : 500
    return NextResponse.json(
      { 
        error: errorMessage,
        message: errorMessage
      },
      { status }
    )
  }
}
