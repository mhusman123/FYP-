import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { reviewGradeAdjustmentSchema } from '@/lib/validations/api'
import { 
  formatErrorResponse, 
  formatSuccessResponse, 
  requireAuth,
  requireRole,
  validateRequestBody,
  NotFoundError,
  ForbiddenError
} from '@/lib/api/errors'

// POST /api/grades/adjustments/[id]/review - Review a grade adjustment request (Educators only)
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    requireAuth(session)
    requireRole(session, ['EDUCATOR', 'ADMIN'])

    const adjustmentRequest = await prisma.gradeAdjustmentRequest.findUnique({
      where: { id: params.id },
      include: {
        submission: {
          include: {
            assignment: {
              include: {
                course: {
                  select: { educatorId: true }
                }
              }
            }
          }
        }
      }
    })

    if (!adjustmentRequest) {
      throw new NotFoundError('Grade adjustment request')
    }

    // Only the course educator or admin can review
    if (session.user.role !== 'ADMIN' && adjustmentRequest.submission.assignment.course.educatorId !== session.user.id) {
      throw new ForbiddenError('You can only review adjustment requests for your courses')
    }

    if (adjustmentRequest.status !== 'PENDING') {
      const error = new Error('This request has already been reviewed')
      return formatErrorResponse(error, 'Review failed')
    }

    const data = await validateRequestBody(request, reviewGradeAdjustmentSchema)

    // Validate adjusted grade if provided
    if (data.adjustedGrade && data.adjustedGrade > adjustmentRequest.submission.assignment.maxPoints) {
      const error = new Error(`Adjusted grade cannot exceed maximum points (${adjustmentRequest.submission.assignment.maxPoints})`)
      return formatErrorResponse(error, 'Review failed')
    }

    // Update the adjustment request
    const reviewedRequest = await prisma.gradeAdjustmentRequest.update({
      where: { id: params.id },
      data: {
        status: data.status,
        decision: data.decision,
        adjustedGrade: data.adjustedGrade,
        reviewedBy: session.user.id,
        reviewedAt: new Date()
      }
    })

    // If approved and adjusted grade provided, update the submission
    if (data.status === 'APPROVED' && data.adjustedGrade !== undefined) {
      await prisma.submission.update({
        where: { id: adjustmentRequest.submissionId },
        data: {
          grade: data.adjustedGrade,
          feedback: `${adjustmentRequest.submission.feedback || ''}\n\nGrade adjusted: ${data.decision}`.trim()
        }
      })
    }

    return formatSuccessResponse(reviewedRequest, 'Adjustment request reviewed successfully')
  } catch (error) {
    return formatErrorResponse(error, 'Failed to review adjustment request')
  }
}
