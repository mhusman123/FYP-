import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import bcrypt from "bcryptjs"
import { UserRole } from "@prisma/client"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, password, role } = body

    console.log('Registration attempt:', { email, name, role, hasPassword: !!password })

    // Validate required fields
    if (!email || !password) {
      console.error('Missing required fields:', { email: !!email, password: !!password })
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.error('Invalid email format:', email)
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Validate password length
    if (password.length < 8) {
      console.error('Password too short')
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      console.error('User already exists:', email)
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      )
    }

    // Hash password
    console.log('Hashing password...')
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log('Password hashed successfully')

    // Create user
    console.log('Creating user in database...')
    const user = await prisma.user.create({
      data: {
        name: name || null,
        email,
        password: hashedPassword,
        role: (role as UserRole) || "STUDENT",
      }
    })
    console.log('User created successfully:', user.email)

    // Return user without password
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
    return NextResponse.json(
      { 
        error: "An error occurred during registration",
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    )
  }
}
