import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { gradeSubmissionSchema } from '@/lib/validations/api'
import { 
  formatErrorResponse, 
  formatSuccessResponse, 
  requireAuth, 
  requireRole,
  validateRequestBody,
  NotFoundError,
  ForbiddenError
} from '@/lib/api/errors'

// POST /api/submissions/[id]/grade - Grade a submission (Educators only)
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    requireAuth(session)
    requireRole(session, ['EDUCATOR', 'ADMIN'])

    const submission = await prisma.submission.findUnique({
      where: { id: params.id },
      include: {
        assignment: {
          include: {
            course: {
              select: { educatorId: true, id: true }
            }
          }
        }
      }
    })

    if (!submission) {
      throw new NotFoundError('Submission')
    }

    // Only the course educator or admin can grade
    if (session.user.role !== 'ADMIN' && submission.assignment.course.educatorId !== session.user.id) {
      throw new ForbiddenError('You can only grade submissions from your courses')
    }

    const data = await validateRequestBody(request, gradeSubmissionSchema)

    // Validate grade doesn't exceed max points
    if (data.grade && data.grade > submission.assignment.maxPoints) {
      const error = new Error(`Grade cannot exceed maximum points (${submission.assignment.maxPoints})`)
      return formatErrorResponse(error, 'Grading failed')
    }

    const gradedSubmission = await prisma.submission.update({
      where: { id: params.id },
      data: {
        grade: data.grade,
        feedback: data.feedback,
        status: data.status || 'GRADED'
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

    return formatSuccessResponse(gradedSubmission, 'Submission graded successfully')
  } catch (error) {
    return formatErrorResponse(error, 'Failed to grade submission')
  }
}
