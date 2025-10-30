import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { createGradeAdjustmentSchema, reviewGradeAdjustmentSchema } from '@/lib/validations/api'
import { 
  formatErrorResponse, 
  formatSuccessResponse, 
  requireAuth,
  requireRole,
  validateRequestBody
} from '@/lib/api/errors'

// GET /api/grades/adjustments - Get grade adjustment requests
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    requireAuth(session)

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const role = session.user.role || 'STUDENT'

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereClause: any = {}

    if (status) {
      whereClause.status = status
    }

    if (role === 'STUDENT') {
      whereClause.studentId = session.user.id
    } else if (role === 'EDUCATOR') {
      whereClause.submission = {
        assignment: {
          course: {
            educatorId: session.user.id
          }
        }
      }
    }

    const requests = await prisma.gradeAdjustmentRequest.findMany({
      where: whereClause,
      include: {
        submission: {
          include: {
            assignment: {
              select: {
                id: true,
                title: true,
                maxPoints: true,
                course: {
                  select: {
                    id: true,
                    name: true,
                    code: true
                  }
                }
              }
            }
          }
        },
        student: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        reviewer: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: { requestedAt: 'desc' }
    })

    const formattedRequests = requests.map(req => ({
      id: req.id,
      student: {
        id: req.student.id,
        name: req.student.name,
        email: req.student.email
      },
      submission: {
        id: req.submission.id,
        grade: req.submission.grade,
        maxPoints: req.submission.assignment.maxPoints
      },
      assignment: {
        id: req.submission.assignment.id,
        title: req.submission.assignment.title
      },
      course: {
        id: req.submission.assignment.course.id,
        name: req.submission.assignment.course.name,
        code: req.submission.assignment.course.code
      },
      reason: req.reason,
      description: req.description,
      supportingDocuments: req.supportingDocuments,
      status: req.status,
      decision: req.decision,
      adjustedGrade: req.adjustedGrade,
      reviewer: req.reviewer ? {
        id: req.reviewer.id,
        name: req.reviewer.name,
        email: req.reviewer.email
      } : null,
      requestedAt: req.requestedAt.toISOString(),
      reviewedAt: req.reviewedAt?.toISOString()
    }))

    return formatSuccessResponse(formattedRequests)
  } catch (error) {
    return formatErrorResponse(error, 'Failed to fetch grade adjustment requests')
  }
}

// POST /api/grades/adjustments - Create a grade adjustment request (Students only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    requireAuth(session)
    requireRole(session, ['STUDENT'])

    const data = await validateRequestBody(request, createGradeAdjustmentSchema)

    // Verify submission exists and belongs to student
    const submission = await prisma.submission.findUnique({
      where: { id: data.submissionId },
      include: {
        assignment: {
          select: { id: true, title: true }
        }
      }
    })

    if (!submission) {
      const error = new Error('Submission not found')
      return formatErrorResponse(error, 'Request failed')
    }

    if (submission.studentId !== session.user.id) {
      const error = new Error('You can only request adjustments for your own submissions')
      return formatErrorResponse(error, 'Request failed')
    }

    if (!submission.grade) {
      const error = new Error('Cannot request adjustment for ungraded submission')
      return formatErrorResponse(error, 'Request failed')
    }

    // Check if there's already a pending request
    const existingRequest = await prisma.gradeAdjustmentRequest.findFirst({
      where: {
        submissionId: data.submissionId,
        status: 'PENDING'
      }
    })

    if (existingRequest) {
      const error = new Error('A pending adjustment request already exists for this submission')
      return formatErrorResponse(error, 'Request failed')
    }

    const adjustmentRequest = await prisma.gradeAdjustmentRequest.create({
      data: {
        ...data,
        studentId: session.user.id
      },
      include: {
        submission: {
          include: {
            assignment: {
              select: {
                id: true,
                title: true,
                course: {
                  select: {
                    id: true,
                    name: true,
                    code: true
                  }
                }
              }
            }
          }
        }
      }
    })

    return formatSuccessResponse(adjustmentRequest, 'Grade adjustment request submitted successfully')
  } catch (error) {
    return formatErrorResponse(error, 'Failed to create grade adjustment request')
  }
}
