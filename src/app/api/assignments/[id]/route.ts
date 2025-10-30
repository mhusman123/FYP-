import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { updateAssignmentSchema } from '@/lib/validations/api'
import { 
  formatErrorResponse, 
  formatSuccessResponse, 
  requireAuth, 
  requireRole,
  requireOwnership,
  validateRequestBody,
  NotFoundError
} from '@/lib/api/errors'

// GET /api/assignments/[id] - Get a single assignment
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    requireAuth(session)

    const assignment = await prisma.assignment.findUnique({
      where: { id: params.id },
      include: {
        course: {
          select: {
            id: true,
            name: true,
            code: true,
            educatorId: true,
            educator: {
              select: { name: true, email: true }
            }
          }
        },
        submissions: {
          include: {
            student: {
              select: { id: true, name: true, email: true }
            }
          }
        },
        _count: {
          select: { submissions: true }
        }
      }
    })

    if (!assignment) {
      throw new NotFoundError('Assignment')
    }

    const role = session.user.role || 'STUDENT'
    const isOwner = assignment.course.educatorId === session.user.id

    // Students can only see published assignments in courses they're enrolled in
    if (role === 'STUDENT') {
      if (!assignment.isPublished) {
        throw new NotFoundError('Assignment')
      }

      const enrollment = await prisma.courseEnrollment.findUnique({
        where: {
          courseId_studentId: {
            courseId: assignment.courseId,
            studentId: session.user.id
          }
        }
      })

      if (!enrollment) {
        const error = new Error('You are not enrolled in this course')
        return formatErrorResponse(error, 'Access denied')
      }

      // Get student's submission
      const userSubmission = assignment.submissions.find(s => s.studentId === session.user.id)

      const formattedAssignment = {
        id: assignment.id,
        title: assignment.title,
        description: assignment.description,
        instructions: assignment.instructions,
        dueDate: assignment.dueDate.toISOString(),
        maxPoints: assignment.maxPoints,
        allowedFileTypes: assignment.allowedFileTypes,
        maxFileSize: assignment.maxFileSize,
        isPublished: assignment.isPublished,
        course: {
          id: assignment.course.id,
          name: assignment.course.name,
          code: assignment.course.code,
          instructor: assignment.course.educator.name
        },
        submission: userSubmission ? {
          id: userSubmission.id,
          fileName: userSubmission.fileName,
          fileUrl: userSubmission.fileUrl,
          fileSize: userSubmission.fileSize,
          submittedAt: userSubmission.submittedAt.toISOString(),
          isLate: userSubmission.isLate,
          grade: userSubmission.grade,
          feedback: userSubmission.feedback,
          status: userSubmission.status
        } : null,
        createdAt: assignment.createdAt.toISOString(),
        updatedAt: assignment.updatedAt.toISOString()
      }

      return formatSuccessResponse(formattedAssignment)
    }

    // Educators/Admins see all submissions
    const formattedAssignment = {
      id: assignment.id,
      title: assignment.title,
      description: assignment.description,
      instructions: assignment.instructions,
      dueDate: assignment.dueDate.toISOString(),
      maxPoints: assignment.maxPoints,
      allowedFileTypes: assignment.allowedFileTypes,
      maxFileSize: assignment.maxFileSize,
      isPublished: assignment.isPublished,
      course: {
        id: assignment.course.id,
        name: assignment.course.name,
        code: assignment.course.code,
        instructor: assignment.course.educator.name
      },
      submissions: assignment.submissions.map(s => ({
        id: s.id,
        student: {
          id: s.student.id,
          name: s.student.name,
          email: s.student.email
        },
        fileName: s.fileName,
        fileUrl: s.fileUrl,
        fileSize: s.fileSize,
        submittedAt: s.submittedAt.toISOString(),
        isLate: s.isLate,
        grade: s.grade,
        feedback: s.feedback,
        status: s.status
      })),
      stats: {
        totalSubmissions: assignment._count.submissions,
        graded: assignment.submissions.filter(s => s.grade !== null).length,
        pending: assignment.submissions.filter(s => s.grade === null).length
      },
      isOwner,
      createdAt: assignment.createdAt.toISOString(),
      updatedAt: assignment.updatedAt.toISOString()
    }

    return formatSuccessResponse(formattedAssignment)
  } catch (error) {
    return formatErrorResponse(error, 'Failed to fetch assignment')
  }
}

// PUT /api/assignments/[id] - Update an assignment (Educators only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    requireAuth(session)
    requireRole(session, ['EDUCATOR', 'ADMIN'])

    const assignment = await prisma.assignment.findUnique({
      where: { id: params.id },
      include: {
        course: {
          select: { educatorId: true }
        }
      }
    })

    if (!assignment) {
      throw new NotFoundError('Assignment')
    }

    // Only the course owner or admin can update
    if (session.user.role !== 'ADMIN') {
      requireOwnership(assignment.course.educatorId, session.user.id, 'assignment')
    }

    const data = await validateRequestBody(request, updateAssignmentSchema)

    const updatedAssignment = await prisma.assignment.update({
      where: { id: params.id },
      data,
      include: {
        course: {
          select: {
            id: true,
            name: true,
            code: true
          }
        },
        _count: {
          select: { submissions: true }
        }
      }
    })

    const formattedAssignment = {
      id: updatedAssignment.id,
      title: updatedAssignment.title,
      description: updatedAssignment.description,
      instructions: updatedAssignment.instructions,
      dueDate: updatedAssignment.dueDate.toISOString(),
      maxPoints: updatedAssignment.maxPoints,
      allowedFileTypes: updatedAssignment.allowedFileTypes,
      maxFileSize: updatedAssignment.maxFileSize,
      isPublished: updatedAssignment.isPublished,
      course: {
        id: updatedAssignment.course.id,
        name: updatedAssignment.course.name,
        code: updatedAssignment.course.code
      },
      stats: {
        totalSubmissions: updatedAssignment._count.submissions
      },
      createdAt: updatedAssignment.createdAt.toISOString(),
      updatedAt: updatedAssignment.updatedAt.toISOString()
    }

    return formatSuccessResponse(formattedAssignment, 'Assignment updated successfully')
  } catch (error) {
    return formatErrorResponse(error, 'Failed to update assignment')
  }
}

// DELETE /api/assignments/[id] - Delete an assignment (Educators only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    requireAuth(session)
    requireRole(session, ['EDUCATOR', 'ADMIN'])

    const assignment = await prisma.assignment.findUnique({
      where: { id: params.id },
      include: {
        course: {
          select: { educatorId: true }
        }
      }
    })

    if (!assignment) {
      throw new NotFoundError('Assignment')
    }

    // Only the course owner or admin can delete
    if (session.user.role !== 'ADMIN') {
      requireOwnership(assignment.course.educatorId, session.user.id, 'assignment')
    }

    await prisma.assignment.delete({
      where: { id: params.id }
    })

    return formatSuccessResponse({ id: params.id }, 'Assignment deleted successfully')
  } catch (error) {
    return formatErrorResponse(error, 'Failed to delete assignment')
  }
}
