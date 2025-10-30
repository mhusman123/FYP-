import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { updateSubmissionSchema } from '@/lib/validations/api'
import { 
  formatErrorResponse, 
  formatSuccessResponse, 
  requireAuth, 
  requireRole,
  requireOwnership,
  validateRequestBody,
  NotFoundError,
  ForbiddenError
} from '@/lib/api/errors'

// GET /api/submissions/[id] - Get a single submission
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    requireAuth(session)

    const submission = await prisma.submission.findUnique({
      where: { id: params.id },
      include: {
        assignment: {
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
            }
          }
        },
        student: {
          select: { id: true, name: true, email: true }
        },
        plagiarismReport: true,
        aiFeedback: true
      }
    })

    if (!submission) {
      throw new NotFoundError('Submission')
    }

    const role = session.user.role || 'STUDENT'
    const isStudent = submission.studentId === session.user.id
    const isEducator = submission.assignment.course.educatorId === session.user.id

    // Only the student who submitted, the course educator, or admin can view
    if (role === 'STUDENT' && !isStudent) {
      throw new ForbiddenError('You can only view your own submissions')
    }

    if (role === 'EDUCATOR' && !isEducator) {
      throw new ForbiddenError('You can only view submissions from your courses')
    }

    const formattedSubmission = {
      id: submission.id,
      student: {
        id: submission.student.id,
        name: submission.student.name,
        email: submission.student.email
      },
      assignment: {
        id: submission.assignment.id,
        title: submission.assignment.title,
        dueDate: submission.assignment.dueDate.toISOString(),
        maxPoints: submission.assignment.maxPoints
      },
      course: {
        id: submission.assignment.course.id,
        name: submission.assignment.course.name,
        code: submission.assignment.course.code,
        instructor: submission.assignment.course.educator.name
      },
      fileName: submission.fileName,
      fileUrl: submission.fileUrl,
      fileSize: submission.fileSize,
      submittedAt: submission.submittedAt.toISOString(),
      isLate: submission.isLate,
      grade: submission.grade,
      feedback: submission.feedback,
      status: submission.status,
      plagiarismScore: submission.plagiarismScore,
      plagiarismReport: submission.plagiarismReport,
      aiFeedback: submission.aiFeedback
    }

    return formatSuccessResponse(formattedSubmission)
  } catch (error) {
    return formatErrorResponse(error, 'Failed to fetch submission')
  }
}

// PUT /api/submissions/[id] - Update a submission (Students only, before grading)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    requireAuth(session)
    requireRole(session, ['STUDENT'])

    const submission = await prisma.submission.findUnique({
      where: { id: params.id },
      include: {
        assignment: {
          select: { dueDate: true }
        }
      }
    })

    if (!submission) {
      throw new NotFoundError('Submission')
    }

    // Only the student who submitted can update
    requireOwnership(submission.studentId, session.user.id, 'submission')

    // Can't update if already graded
    if (submission.grade !== null) {
      const error = new Error('Cannot update a graded submission')
      return formatErrorResponse(error, 'Update failed')
    }

    const data = await validateRequestBody(request, updateSubmissionSchema)

    // Check if resubmission is late
    const isLate = new Date() > submission.assignment.dueDate

    const updatedSubmission = await prisma.submission.update({
      where: { id: params.id },
      data: {
        ...data,
        isLate,
        status: 'SUBMITTED'
      },
      include: {
        assignment: {
          select: {
            id: true,
            title: true,
            maxPoints: true
          }
        },
        student: {
          select: { id: true, name: true, email: true }
        }
      }
    })

    return formatSuccessResponse(updatedSubmission, 'Submission updated successfully')
  } catch (error) {
    return formatErrorResponse(error, 'Failed to update submission')
  }
}

// DELETE /api/submissions/[id] - Delete a submission (Students only, before grading)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    requireAuth(session)
    requireRole(session, ['STUDENT'])

    const submission = await prisma.submission.findUnique({
      where: { id: params.id }
    })

    if (!submission) {
      throw new NotFoundError('Submission')
    }

    // Only the student who submitted can delete
    requireOwnership(submission.studentId, session.user.id, 'submission')

    // Can't delete if already graded
    if (submission.grade !== null) {
      const error = new Error('Cannot delete a graded submission')
      return formatErrorResponse(error, 'Delete failed')
    }

    await prisma.submission.delete({
      where: { id: params.id }
    })

    return formatSuccessResponse({ id: params.id }, 'Submission deleted successfully')
  } catch (error) {
    return formatErrorResponse(error, 'Failed to delete submission')
  }
}
