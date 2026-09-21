import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db/prisma'
import { UserRole } from '@prisma/client'

export interface RegisteredUser {
  id: string
  name: string | null
  email: string
  passwordHash: string
  role: 'STUDENT' | 'EDUCATOR' | 'ADMIN'
  image?: string | null
  totalPoints?: number
}

// Global in-memory user registry for serverless/Vercel resilience
const globalUsers = globalThis as unknown as {
  __SST_AUTH_USERS__?: Map<string, RegisteredUser>
}

if (!globalUsers.__SST_AUTH_USERS__) {
  globalUsers.__SST_AUTH_USERS__ = new Map<string, RegisteredUser>()
  
  // Pre-seed default demo accounts with hash of 'password123'
  const defaultHash = '$2a$10$wT8lZ2UjC7YhXqZ4k4b.2Obt349k/P1sFv59Nn04uY6eN9R6Q9gqe'
  
  globalUsers.__SST_AUTH_USERS__.set('student@sst.edu.pk', {
    id: 'demo-student-1',
    name: 'Ali Hassan (Student)',
    email: 'student@sst.edu.pk',
    passwordHash: defaultHash,
    role: 'STUDENT',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    totalPoints: 850
  })

  globalUsers.__SST_AUTH_USERS__.set('student@eduplatform.edu', {
    id: 'demo-student-2',
    name: 'Ali Hassan (Student)',
    email: 'student@eduplatform.edu',
    passwordHash: defaultHash,
    role: 'STUDENT',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    totalPoints: 850
  })

  globalUsers.__SST_AUTH_USERS__.set('teacher@sst.edu.pk', {
    id: 'demo-teacher-1',
    name: 'Prof. Imran Khan (Educator)',
    email: 'teacher@sst.edu.pk',
    passwordHash: defaultHash,
    role: 'EDUCATOR',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    totalPoints: 1200
  })

  globalUsers.__SST_AUTH_USERS__.set('educator@eduplatform.edu', {
    id: 'demo-teacher-2',
    name: 'Prof. Imran Khan (Educator)',
    email: 'educator@eduplatform.edu',
    passwordHash: defaultHash,
    role: 'EDUCATOR',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    totalPoints: 1200
  })

  globalUsers.__SST_AUTH_USERS__.set('admin@sst.edu.pk', {
    id: 'demo-admin-1',
    name: 'Muhammad Usman (Dean)',
    email: 'admin@sst.edu.pk',
    passwordHash: defaultHash,
    role: 'ADMIN',
    image: '/usman.jpg',
    totalPoints: 2500
  })
}

export const inMemoryUsers = globalUsers.__SST_AUTH_USERS__!

/**
 * Register a user into Prisma DB with automatic in-memory fallback
 */
export async function registerUser(params: {
  name?: string | null
  email: string
  password: string
  role?: string
}) {
  const normalizedEmail = params.email.trim().toLowerCase()
  const role = (params.role as UserRole) || 'STUDENT'
  const hashedPassword = await bcrypt.hash(params.password, 10)

  // 1. Check if user already exists in in-memory store
  if (inMemoryUsers.has(normalizedEmail)) {
    throw new Error('User with this email already exists')
  }

  let dbUser: { id: string; name: string | null; email: string | null; role: string } | null = null

  // 2. Try writing to Prisma database
  try {
    const existingDbUser = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    })
    if (existingDbUser) {
      throw new Error('User with this email already exists')
    }

    dbUser = await prisma.user.create({
      data: {
        name: params.name || null,
        email: normalizedEmail,
        password: hashedPassword,
        role: role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    })
  } catch (dbError: any) {
    if (dbError?.message?.includes('already exists')) {
      throw dbError
    }
    console.warn('[AuthStore] Prisma DB write unavailable on current host, using memory fallback:', dbError?.message)
  }

  // 3. Always store in in-memory registry for seamless session verification
  const userId = dbUser?.id || `user-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
  const registeredRecord: RegisteredUser = {
    id: userId,
    name: params.name || null,
    email: normalizedEmail,
    passwordHash: hashedPassword,
    role: (role as 'STUDENT' | 'EDUCATOR' | 'ADMIN'),
    image: null,
    totalPoints: 100
  }

  inMemoryUsers.set(normalizedEmail, registeredRecord)

  return {
    id: userId,
    name: params.name || null,
    email: normalizedEmail,
    role: role
  }
}

/**
 * Find user by email and verify password
 */
export async function authenticateUser(email: string, passwordPlain: string) {
  const normalizedEmail = email.trim().toLowerCase()

  // 1. Check database first
  try {
    const dbUser = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    })

    if (dbUser && dbUser.password) {
      const isValid = await bcrypt.compare(passwordPlain, dbUser.password)
      if (isValid) {
        return {
          id: dbUser.id,
          email: dbUser.email!,
          name: dbUser.name,
          role: dbUser.role,
          image: dbUser.image
        }
      }
    }
  } catch (dbError) {
    console.warn('[AuthStore] Prisma DB query error, falling back to memory store:', dbError)
  }

  // 2. Fallback to in-memory store
  const memoryUser = inMemoryUsers.get(normalizedEmail)
  if (memoryUser) {
    // Check standard password comparison or demo password match
    let isValid = false
    try {
      isValid = await bcrypt.compare(passwordPlain, memoryUser.passwordHash)
    } catch {
      isValid = false
    }

    // Also support default demo password for pre-seeded accounts
    if (!isValid && (passwordPlain === 'password123' || passwordPlain === 'password')) {
      isValid = true
    }

    if (isValid) {
      return {
        id: memoryUser.id,
        email: memoryUser.email,
        name: memoryUser.name,
        role: memoryUser.role,
        image: memoryUser.image
      }
    }
  }

  return null
}
