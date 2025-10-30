import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { 
  formatErrorResponse, 
  formatSuccessResponse, 
  requireAuth
} from '@/lib/api/errors'

// GET /api/grades - Get grades for the authenticated user
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    requireAuth(session)

    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get('courseId')
    const assignmentId = searchParams.get('assignmentId')
    const role = session.user.role || 'STUDENT'

    if (role === 'STUDENT') {
      // Get student's grades
      const whereClause: {
        studentId: string
        grade: { not: null }
        assignmentId?: string
        assignment?: { courseId: string }
      } = {
        studentId: session.user.id,
        grade: { not: null }
      }

      if (assignmentId) {
        whereClause.assignmentId = assignmentId
      } else if (courseId) {
        whereClause.assignment = { courseId }
      }

      const submissions = await prisma.submission.findMany({
        where: whereClause,
        include: {
          assignment: {
            select: {
              id: true,
              title: true,
              maxPoints: true,
              dueDate: true,
              course: {
                select: {
                  id: true,
                  name: true,
                  code: true
                }
              }
            }
          }
        },
        orderBy: { submittedAt: 'desc' }
      })

      const grades = submissions.map(submission => ({
        submissionId: submission.id,
        assignmentId: submission.assignment.id,
        assignmentTitle: submission.assignment.title,
        courseId: submission.assignment.course.id,
        courseName: submission.assignment.course.name,
        courseCode: submission.assignment.course.code,
        grade: submission.grade,
        maxPoints: submission.assignment.maxPoints,
        percentage: submission.grade ? (submission.grade / submission.assignment.maxPoints) * 100 : null,
        feedback: submission.feedback,
        submittedAt: submission.submittedAt.toISOString(),
        isLate: submission.isLate,
        status: submission.status
      }))

      // Calculate course statistics if filtering by course
      let courseStats = null
      if (courseId) {
        const totalGrades = grades.length
        const totalPoints = grades.reduce((sum, g) => sum + (g.grade || 0), 0)
        const maxPossiblePoints = grades.reduce((sum, g) => sum + g.maxPoints, 0)
        const averageGrade = totalGrades > 0 ? totalPoints / totalGrades : 0
        const overallPercentage = maxPossiblePoints > 0 ? (totalPoints / maxPossiblePoints) * 100 : 0

        courseStats = {
          totalAssignments: totalGrades,
          averageGrade,
          overallPercentage,
          totalPoints,
          maxPossiblePoints
        }
      }

      return formatSuccessResponse({ grades, stats: courseStats })
    }

    // Educators/Admins get class grades
    if (role === 'EDUCATOR' || role === 'ADMIN') {
      if (!courseId) {
        const error = new Error('courseId is required for educators')
        return formatErrorResponse(error, 'Missing required parameter')
      }

      // Verify educator owns the course
      if (role === 'EDUCATOR') {
        const course = await prisma.course.findFirst({
          where: {
            id: courseId,
            educatorId: session.user.id
          }
        })

        if (!course) {
          const error = new Error('Course not found or access denied')
          return formatErrorResponse(error, 'Access denied')
        }
      }

      // Get all graded submissions for the course
      const submissions = await prisma.submission.findMany({
        where: {
          assignment: { courseId },
          grade: { not: null }
        },
        include: {
          assignment: {
            select: {
              id: true,
              title: true,
              maxPoints: true,
              dueDate: true
            }
          },
          student: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        },
        orderBy: [
          { assignment: { dueDate: 'desc' } },
          { student: { name: 'asc' } }
        ]
      })

      const grades = submissions.map(submission => ({
        submissionId: submission.id,
        studentId: submission.student.id,
        studentName: submission.student.name,
        studentEmail: submission.student.email,
        assignmentId: submission.assignment.id,
        assignmentTitle: submission.assignment.title,
        grade: submission.grade,
        maxPoints: submission.assignment.maxPoints,
        percentage: submission.grade ? (submission.grade / submission.assignment.maxPoints) * 100 : null,
        feedback: submission.feedback,
        submittedAt: submission.submittedAt.toISOString(),
        isLate: submission.isLate,
        status: submission.status
      }))

      // Calculate class statistics
      const studentGrades = new Map<string, {
        studentId: string
        studentName: string | null
        totalPoints: number
        maxPossiblePoints: number
        assignmentCount: number
      }>()

      grades.forEach(grade => {
        const existing = studentGrades.get(grade.studentId) || {
          studentId: grade.studentId,
          studentName: grade.studentName,
          totalPoints: 0,
          maxPossiblePoints: 0,
          assignmentCount: 0
        }

        existing.totalPoints += grade.grade || 0
        existing.maxPossiblePoints += grade.maxPoints
        existing.assignmentCount += 1

        studentGrades.set(grade.studentId, existing)
      })

      const classStats = Array.from(studentGrades.values()).map(student => ({
        ...student,
        averageGrade: student.assignmentCount > 0 ? student.totalPoints / student.assignmentCount : 0,
        overallPercentage: student.maxPossiblePoints > 0 ? (student.totalPoints / student.maxPossiblePoints) * 100 : 0
      }))

      return formatSuccessResponse({ grades, classStats })
    }

    const error = new Error('Invalid role')
    return formatErrorResponse(error, 'Access denied')
  } catch (error) {
    return formatErrorResponse(error, 'Failed to fetch grades')
  }
}
