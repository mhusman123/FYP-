import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { 
  formatErrorResponse, 
  formatSuccessResponse, 
  requireAuth, 
  requireRole,
  NotFoundError
} from '@/lib/api/errors'

// POST /api/courses/[id]/enroll - Enroll in a course (Students only)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)
    requireAuth(session)
    requireRole(session, ['STUDENT'])

    const course = await prisma.course.findUnique({
      where: { id }
    })

    if (!course) {
      throw new NotFoundError('Course')
    }

    if (!course.isActive) {
      const error = new Error('This course is not currently active')
      return formatErrorResponse(error, 'Enrollment failed')
    }

    // Check if already enrolled
    const existingEnrollment = await prisma.courseEnrollment.findUnique({
      where: {
        courseId_studentId: {
          courseId: id,
          studentId: session.user.id
        }
      }
    })

    if (existingEnrollment) {
      const error = new Error('You are already enrolled in this course')
      return formatErrorResponse(error, 'Enrollment failed')
    }

    const enrollment = await prisma.courseEnrollment.create({
      data: {
        courseId: id,
        studentId: session.user.id
      },
      include: {
        course: {
          select: {
            id: true,
            name: true,
            code: true
          }
        }
      }
    })

    return formatSuccessResponse(enrollment, 'Successfully enrolled in course')
  } catch (error) {
    return formatErrorResponse(error, 'Failed to enroll in course')
  }
}

// DELETE /api/courses/[id]/enroll - Unenroll from a course (Students only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getServerSession(authOptions)
    requireAuth(session)
    requireRole(session, ['STUDENT'])

    const enrollment = await prisma.courseEnrollment.findUnique({
      where: {
        courseId_studentId: {
          courseId: id,
          studentId: session.user.id
        }
      }
    })

    if (!enrollment) {
      throw new NotFoundError('Enrollment')
    }

    await prisma.courseEnrollment.delete({
      where: {
        courseId_studentId: {
          courseId: id,
          studentId: session.user.id
        }
      }
    })

    return formatSuccessResponse({ id: enrollment.id }, 'Successfully unenrolled from course')
  } catch (error) {
    return formatErrorResponse(error, 'Failed to unenroll from course')
  }
}
