import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { Prisma } from '@prisma/client'

// ============================================
// Error Types
// ============================================

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public details?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, details?: unknown) {
    super(400, message, details)
    this.name = 'ValidationError'
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized') {
    super(401, message)
    this.name = 'UnauthorizedError'
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = 'Forbidden') {
    super(403, message)
    this.name = 'ForbiddenError'
  }
}

export class NotFoundError extends ApiError {
  constructor(resource = 'Resource') {
    super(404, `${resource} not found`)
    this.name = 'NotFoundError'
  }
}

export class ConflictError extends ApiError {
  constructor(message: string) {
    super(409, message)
    this.name = 'ConflictError'
  }
}

// ============================================
// Error Response Formatter
// ============================================

interface ErrorResponse {
  error: string
  message: string
  details?: unknown
  statusCode: number
  timestamp: string
}

export function formatErrorResponse(
  error: unknown,
  defaultMessage = 'Internal server error'
): NextResponse<ErrorResponse> {
  console.error('API Error:', error)

  const timestamp = new Date().toISOString()

  // Handle ApiError (custom errors)
  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        error: error.name,
        message: error.message,
        details: error.details,
        statusCode: error.statusCode,
        timestamp
      },
      { status: error.statusCode }
    )
  }

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: 'ValidationError',
        message: 'Validation failed',
        details: error.issues.map((err) => ({
          path: err.path.join('.'),
          message: err.message
        })),
        statusCode: 400,
        timestamp
      },
      { status: 400 }
    )
  }

  // Handle Prisma errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return NextResponse.json(
          {
            error: 'ConflictError',
            message: 'A record with this unique field already exists',
            details: { field: error.meta?.target },
            statusCode: 409,
            timestamp
          },
          { status: 409 }
        )
      case 'P2025':
        return NextResponse.json(
          {
            error: 'NotFoundError',
            message: 'Record not found',
            statusCode: 404,
            timestamp
          },
          { status: 404 }
        )
      case 'P2003':
        return NextResponse.json(
          {
            error: 'ValidationError',
            message: 'Foreign key constraint failed',
            details: { field: error.meta?.field_name },
            statusCode: 400,
            timestamp
          },
          { status: 400 }
        )
      default:
        return NextResponse.json(
          {
            error: 'DatabaseError',
            message: 'Database operation failed',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined,
            statusCode: 500,
            timestamp
          },
          { status: 500 }
        )
    }
  }

  // Handle generic errors
  if (error instanceof Error) {
    return NextResponse.json(
      {
        error: error.name || 'Error',
        message: error.message || defaultMessage,
        statusCode: 500,
        timestamp
      },
      { status: 500 }
    )
  }

  // Unknown error type
  return NextResponse.json(
    {
      error: 'UnknownError',
      message: defaultMessage,
      statusCode: 500,
      timestamp
    },
    { status: 500 }
  )
}

// ============================================
// Success Response Formatter
// ============================================

interface SuccessResponse<T = unknown> {
  success: boolean
  data: T
  message?: string
  meta?: {
    page?: number
    limit?: number
    total?: number
    totalPages?: number
  }
}

export function formatSuccessResponse<T>(
  data: T,
  message?: string,
  meta?: SuccessResponse<T>['meta']
): NextResponse<SuccessResponse<T>> {
  return NextResponse.json({
    success: true,
    data,
    message,
    meta
  })
}

// ============================================
// Validation Helpers
// ============================================

export async function validateRequestBody<T>(
  request: Request,
  schema: { parse: (data: unknown) => T }
): Promise<T> {
  try {
    const body = await request.json()
    return schema.parse(body)
  } catch (error) {
    if (error instanceof ZodError) {
      throw error
    }
    throw new ValidationError('Invalid request body')
  }
}

export function validateQueryParams<T>(
  searchParams: URLSearchParams,
  schema: { parse: (data: unknown) => T }
): T {
  const params = Object.fromEntries(searchParams.entries())
  return schema.parse(params)
}

// ============================================
// Authorization Helpers
// ============================================

export function requireAuth(session: { user?: { id: string; role?: string } } | null): asserts session is { user: { id: string; role: string } } {
  if (!session?.user) {
    throw new UnauthorizedError('Authentication required')
  }
}

export function requireRole(
  session: { user?: { role?: string } } | null,
  allowedRoles: string[]
): void {
  requireAuth(session as { user?: { id: string; role?: string } } | null)
  
  if (!session?.user?.role || !allowedRoles.includes(session.user.role)) {
    throw new ForbiddenError(`This action requires one of the following roles: ${allowedRoles.join(', ')}`)
  }
}

// ============================================
// Resource Ownership Validation
// ============================================

export function requireOwnership(
  resourceOwnerId: string,
  userId: string,
  resourceName = 'Resource'
): void {
  if (resourceOwnerId !== userId) {
    throw new ForbiddenError(`You don't have permission to access this ${resourceName}`)
  }
}

// ============================================
// Pagination Helpers
// ============================================

export function calculatePagination(page: number, limit: number, total: number) {
  const totalPages = Math.ceil(total / limit)
  const skip = (page - 1) * limit

  return {
    skip,
    take: limit,
    meta: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    }
  }
}
