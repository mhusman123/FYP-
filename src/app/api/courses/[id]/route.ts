import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { updateCourseSchema } from '@/lib/validations/api'
import { 
  formatErrorResponse, 
  formatSuccessResponse, 
  requireAuth, 
  requireRole,
  requireOwnership,
  validateRequestBody,
  NotFoundError
} from '@/lib/api/errors'

// GET /api/courses/[id] - Get a single course
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)
    requireAuth(session)

    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        educator: {
          select: { id: true, name: true, email: true }
        },
        assignments: {
          select: {
            id: true,
            title: true,
            dueDate: true,
            maxPoints: true,
            isPublished: true
          },
          orderBy: { dueDate: 'asc' }
        },
        enrollments: {
          include: {
            student: {
              select: { id: true, name: true, email: true }
            }
          }
        },
        _count: {
          select: { 
            enrollments: true,
            assignments: true
          }
        }
      }
    })

    if (!course) {
      throw new NotFoundError('Course')
    }

    const role = session.user.role || 'STUDENT'
    const isEnrolled = course.enrollments.some(e => e.student.id === session.user.id)
    const isOwner = course.educator.id === session.user.id

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
      assignments: course.assignments,
      students: isOwner || role === 'ADMIN' ? course.enrollments.map(e => e.student) : undefined,
      stats: {
        studentsCount: course._count.enrollments,
        assignmentsCount: course._count.assignments
      },
      isEnrolled,
      isOwner,
      createdAt: course.createdAt.toISOString(),
      updatedAt: course.updatedAt.toISOString()
    }

    return formatSuccessResponse(formattedCourse)
  } catch (error) {
    return formatErrorResponse(error, 'Failed to fetch course')
  }
}

// PUT /api/courses/[id] - Update a course (Educators only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)
    requireAuth(session)
    requireRole(session, ['EDUCATOR', 'ADMIN'])

    const course = await prisma.course.findUnique({
      where: { id },
      select: { educatorId: true }
    })

    if (!course) {
      throw new NotFoundError('Course')
    }

    // Only the course owner or admin can update
    if (session.user.role !== 'ADMIN') {
      requireOwnership(course.educatorId, session.user.id, 'course')
    }

    const data = await validateRequestBody(request, updateCourseSchema)

    // If updating code, check for duplicates
    if (data.code) {
      const existingCourse = await prisma.course.findFirst({
        where: { 
          code: data.code,
          id: { not: id }
        }
      })

      if (existingCourse) {
        const error = new Error('A course with this code already exists')
        return formatErrorResponse(error, 'Course update failed')
      }
    }

    const updatedCourse = await prisma.course.update({
      where: { id },
      data,
      include: {
        educator: {
          select: { id: true, name: true, email: true }
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
      id: updatedCourse.id,
      name: updatedCourse.name,
      code: updatedCourse.code,
      description: updatedCourse.description,
      semester: updatedCourse.semester,
      year: updatedCourse.year,
      credits: updatedCourse.credits,
      difficulty: updatedCourse.difficulty,
      prerequisites: updatedCourse.prerequisites,
      isActive: updatedCourse.isActive,
      instructor: {
        id: updatedCourse.educator.id,
        name: updatedCourse.educator.name,
        email: updatedCourse.educator.email
      },
      stats: {
        studentsCount: updatedCourse._count.enrollments,
        assignmentsCount: updatedCourse._count.assignments
      },
      createdAt: updatedCourse.createdAt.toISOString(),
      updatedAt: updatedCourse.updatedAt.toISOString()
    }

    return formatSuccessResponse(formattedCourse, 'Course updated successfully')
  } catch (error) {
    return formatErrorResponse(error, 'Failed to update course')
  }
}

// DELETE /api/courses/[id] - Delete a course (Educators only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)
    requireAuth(session)
    requireRole(session, ['EDUCATOR', 'ADMIN'])

    const course = await prisma.course.findUnique({
      where: { id },
      select: { educatorId: true }
    })

    if (!course) {
      throw new NotFoundError('Course')
    }

    // Only the course owner or admin can delete
    if (session.user.role !== 'ADMIN') {
      requireOwnership(course.educatorId, session.user.id, 'course')
    }

    await prisma.course.delete({
      where: { id }
    })

    return formatSuccessResponse({ id }, 'Course deleted successfully')
  } catch (error) {
    return formatErrorResponse(error, 'Failed to delete course')
  }
}
