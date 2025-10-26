import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'

// GET /api/submissions - Get submissions
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const assignmentId = searchParams.get('assignmentId')
    const role = session.user.role || 'STUDENT'

    let whereClause = {}
    
    if (role === 'STUDENT') {
      whereClause = { studentId: session.user.id }
      if (assignmentId) {
        whereClause = { ...whereClause, assignmentId }
      }
    } else if (role === 'EDUCATOR') {
      // Get submissions from assignments in courses taught by the educator
      const courses = await prisma.course.findMany({
        where: { educatorId: session.user.id },
        include: { assignments: { select: { id: true } } }
      })
      
      const assignmentIds = courses.flatMap(course => 
        course.assignments.map(assignment => assignment.id)
      )
      
      whereClause = { assignmentId: { in: assignmentIds } }
      if (assignmentId) {
        // Verify educator owns this assignment
        if (!assignmentIds.includes(assignmentId)) {
          return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }
        whereClause = { assignmentId }
      }
    }

    const submissions = await prisma.submission.findMany({
      where: whereClause,
      include: {
        assignment: {
          include: {
            course: { select: { name: true, code: true } }
          }
        },
        student: {
          select: { name: true, email: true, id: true }
        }
      },
      orderBy: { submittedAt: 'desc' }
    })

    const formattedSubmissions = submissions.map(submission => ({
      id: submission.id,
      assignmentTitle: submission.assignment.title,
      course: submission.assignment.course.name,
      courseCode: submission.assignment.course.code,
      studentName: submission.student.name,
      studentId: submission.student.id,
      fileName: submission.fileName,
      fileUrl: submission.fileUrl,
      fileSize: submission.fileSize,
      submittedAt: submission.submittedAt.toISOString(),
      isLate: submission.isLate,
      grade: submission.grade,
      maxGrade: submission.assignment.maxPoints,
      feedback: submission.feedback,
      status: submission.status.toLowerCase(),
      plagiarismScore: submission.plagiarismScore,
      dueDate: submission.assignment.dueDate.toISOString()
    }))

    return NextResponse.json(formattedSubmissions)
  } catch (error) {
    console.error('Error fetching submissions:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/submissions - Create a new submission (Students only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'STUDENT') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { assignmentId, fileUrl, fileName, fileSize } = body

    if (!assignmentId || !fileUrl || !fileName || !fileSize) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Verify student is enrolled in the course
    const assignment = await prisma.assignment.findUnique({
      where: { id: assignmentId },
      include: {
        course: {
          include: {
            enrollments: {
              where: { studentId: session.user.id }
            }
          }
        }
      }
    })

    if (!assignment) {
      return NextResponse.json({ error: 'Assignment not found' }, { status: 404 })
    }

    if (assignment.course.enrollments.length === 0) {
      return NextResponse.json({ error: 'Not enrolled in course' }, { status: 403 })
    }

    // Check if submission already exists
    const existingSubmission = await prisma.submission.findUnique({
      where: {
        assignmentId_studentId: {
          assignmentId,
          studentId: session.user.id
        }
      }
    })

    const isLate = new Date() > assignment.dueDate
    const submissionData = {
      assignmentId,
      studentId: session.user.id,
      fileUrl,
      fileName,
      fileSize,
      isLate,
      status: 'SUBMITTED' as const
    }

    let submission
    if (existingSubmission) {
      // Update existing submission
      submission = await prisma.submission.update({
        where: { id: existingSubmission.id },
        data: submissionData,
        include: {
          assignment: {
            include: {
              course: { select: { name: true, code: true } }
            }
          },
          student: {
            select: { name: true, email: true, id: true }
          }
        }
      })
    } else {
      // Create new submission
      submission = await prisma.submission.create({
        data: submissionData,
        include: {
          assignment: {
            include: {
              course: { select: { name: true, code: true } }
            }
          },
          student: {
            select: { name: true, email: true, id: true }
          }
        }
      })
    }

    return NextResponse.json({
      id: submission.id,
      assignmentTitle: submission.assignment.title,
      course: submission.assignment.course.name,
      courseCode: submission.assignment.course.code,
      studentName: submission.student.name,
      studentId: submission.student.id,
      fileName: submission.fileName,
      fileUrl: submission.fileUrl,
      fileSize: submission.fileSize,
      submittedAt: submission.submittedAt.toISOString(),
      isLate: submission.isLate,
      grade: submission.grade,
      maxGrade: submission.assignment.maxPoints,
      feedback: submission.feedback,
      status: submission.status.toLowerCase(),
      plagiarismScore: submission.plagiarismScore,
      dueDate: submission.assignment.dueDate.toISOString()
    }, { status: existingSubmission ? 200 : 201 })
  } catch (error) {
    console.error('Error creating submission:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/submissions/[id] - Update submission (Grade, feedback, etc.)
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { id, grade, feedback, status } = body

    if (!id) {
      return NextResponse.json({ error: 'Submission ID required' }, { status: 400 })
    }

    // Get submission with assignment and course info
    const submission = await prisma.submission.findUnique({
      where: { id },
      include: {
        assignment: {
          include: {
            course: { select: { educatorId: true } }
          }
        }
      }
    })

    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 })
    }

    // Only educators can grade submissions from their courses
    if (session.user.role !== 'EDUCATOR' || 
        submission.assignment.course.educatorId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const updatedSubmission = await prisma.submission.update({
      where: { id },
      data: {
        ...(grade !== undefined && { grade }),
        ...(feedback !== undefined && { feedback }),
        ...(status !== undefined && { status: status.toUpperCase() })
      },
      include: {
        assignment: {
          include: {
            course: { select: { name: true, code: true } }
          }
        },
        student: {
          select: { name: true, email: true, id: true }
        }
      }
    })

    return NextResponse.json({
      id: updatedSubmission.id,
      assignmentTitle: updatedSubmission.assignment.title,
      course: updatedSubmission.assignment.course.name,
      courseCode: updatedSubmission.assignment.course.code,
      studentName: updatedSubmission.student.name,
      studentId: updatedSubmission.student.id,
      fileName: updatedSubmission.fileName,
      fileUrl: updatedSubmission.fileUrl,
      fileSize: updatedSubmission.fileSize,
      submittedAt: updatedSubmission.submittedAt.toISOString(),
      isLate: updatedSubmission.isLate,
      grade: updatedSubmission.grade,
      maxGrade: updatedSubmission.assignment.maxPoints,
      feedback: updatedSubmission.feedback,
      status: updatedSubmission.status.toLowerCase(),
      plagiarismScore: updatedSubmission.plagiarismScore,
      dueDate: updatedSubmission.assignment.dueDate.toISOString()
    })
  } catch (error) {
    console.error('Error updating submission:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}