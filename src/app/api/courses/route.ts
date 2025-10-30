import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { 
  createCourseSchema, 
  courseFilterSchema 
} from '@/lib/validations/api'
import { 
  formatErrorResponse, 
  formatSuccessResponse, 
  requireAuth, 
  requireRole,
  validateRequestBody,
  validateQueryParams,
  calculatePagination
} from '@/lib/api/errors'

// GET /api/courses - Get all courses or user's enrolled courses
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    requireAuth(session)

    const { searchParams } = new URL(request.url)
    const filters = validateQueryParams(searchParams, courseFilterSchema)
    
    const { page, limit, enrolled, semester, year, difficulty, search, sortBy, sortOrder } = filters
    const role = session.user.role || 'STUDENT'

    // Build where clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereClause: any = {}

    if (semester) whereClause.semester = semester
    if (year) whereClause.year = year
    if (difficulty) whereClause.difficulty = difficulty
    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { code: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Handle enrolled filter for students
    if (enrolled && role === 'STUDENT') {
      const enrollments = await prisma.courseEnrollment.findMany({
        where: { studentId: session.user.id },
        select: { courseId: true }
      })
      whereClause.id = { in: enrollments.map(e => e.courseId) }
    }

    // Handle educator filter
    if (role === 'EDUCATOR') {
      whereClause.educatorId = session.user.id
    }

    // Get total count for pagination
    const total = await prisma.course.count({ where: whereClause })
    const { skip, take, meta } = calculatePagination(page, limit, total)

    // Fetch courses
    const courses = await prisma.course.findMany({
      where: whereClause,
      skip,
      take,
      include: {
        educator: {
          select: { name: true, email: true, id: true }
        },
        enrollments: role === 'STUDENT' ? {
          where: { studentId: session.user.id },
          take: 1
        } : true,
        _count: {
          select: { 
            enrollments: true,
            assignments: true
          }
        }
      },
      orderBy: sortBy ? { [sortBy]: sortOrder } : { createdAt: sortOrder }
    })

    const formattedCourses = courses.map(course => ({
      id: course.id,
      name: course.name,
      code: course.code,
      description: course.description,
      semester: course.semester,
      year: course.year,
      credits: course.credits,
      difficulty: course.difficulty,
      prerequisites: course.prerequisites,
      isActive: course.isActive,
      instructor: {
        id: course.educator.id,
        name: course.educator.name,
        email: course.educator.email
      },
      stats: {
        studentsCount: course._count.enrollments,
        assignmentsCount: course._count.assignments
      },
      isEnrolled: role === 'STUDENT' ? course.enrollments.length > 0 : undefined,
      createdAt: course.createdAt.toISOString(),
      updatedAt: course.updatedAt.toISOString()
    }))

    return formatSuccessResponse(formattedCourses, undefined, meta)
  } catch (error) {
    return formatErrorResponse(error, 'Failed to fetch courses')
  }
}

// POST /api/courses - Create a new course (Educators only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    requireAuth(session)
    requireRole(session, ['EDUCATOR', 'ADMIN'])

    const data = await validateRequestBody(request, createCourseSchema)

    // Check for duplicate course code
    const existingCourse = await prisma.course.findUnique({
      where: { code: data.code }
    })

    if (existingCourse) {
      const error = new Error('A course with this code already exists')
      return formatErrorResponse(error, 'Course creation failed')
    }

    const course = await prisma.course.create({
      data: {
        ...data,
        educatorId: session.user.id
      },
      include: {
        educator: {
          select: { name: true, email: true, id: true }
        },
        _count: {
          select: { 
            enrollments: true,
            assignments: true
          }
        }
      }
    })

    const formattedCourse = {
      id: course.id,
      name: course.name,
      code: course.code,
      description: course.description,
      semester: course.semester,
      year: course.year,
      credits: course.credits,
      difficulty: course.difficulty,
      prerequisites: course.prerequisites,
      isActive: course.isActive,
      instructor: {
        id: course.educator.id,
        name: course.educator.name,
        email: course.educator.email
      },
      stats: {
        studentsCount: course._count.enrollments,
        assignmentsCount: course._count.assignments
      },
      createdAt: course.createdAt.toISOString(),
      updatedAt: course.updatedAt.toISOString()
    }

    return formatSuccessResponse(formattedCourse, 'Course created successfully')
  } catch (error) {
    return formatErrorResponse(error, 'Failed to create course')
  }
}