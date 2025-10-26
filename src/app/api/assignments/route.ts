import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'

// GET /api/assignments - Get assignments
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get('courseId')
    const role = session.user.role || 'STUDENT'

    const whereClause: { courseId?: string | { in: string[] } } = {}
    
    if (courseId) {
      whereClause.courseId = courseId
    }

    if (role === 'STUDENT') {
      // Get assignments from courses the student is enrolled in
      const enrollments = await prisma.courseEnrollment.findMany({
        where: { studentId: session.user.id },
        select: { courseId: true }
      })
      
      const enrolledCourseIds = enrollments.map(e => e.courseId)
      whereClause.courseId = { in: enrolledCourseIds }
    } else if (role === 'EDUCATOR') {
      // Get assignments from courses taught by the educator
      const courses = await prisma.course.findMany({
        where: { educatorId: session.user.id },
        select: { id: true }
      })
      
      const taughtCourseIds = courses.map(c => c.id)
      whereClause.courseId = { in: taughtCourseIds }
    }

    const assignments = await prisma.assignment.findMany({
      where: whereClause,
      include: {
        course: {
          select: { name: true, code: true, educator: { select: { name: true } } }
        },
        submissions: role === 'EDUCATOR' ? {
          include: {
            student: { select: { name: true, email: true } }
          }
        } : {
          where: { studentId: session.user.id },
          take: 1
        },
        _count: {
          select: { submissions: true }
        }
      },
      orderBy: { dueDate: 'asc' }
    })

    const formattedAssignments = assignments.map(assignment => {
      const daysUntilDue = Math.ceil((new Date(assignment.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
      
      let priority: 'high' | 'medium' | 'low' = 'medium'
      if (daysUntilDue <= 1) priority = 'high'
      else if (daysUntilDue <= 7) priority = 'medium'
      else priority = 'low'

      const baseAssignment = {
        id: assignment.id,
        title: assignment.title,
        course: assignment.course.name,
        courseCode: assignment.course.code,
        description: assignment.description,
        instructions: assignment.instructions,
        dueDate: assignment.dueDate.toISOString(),
        assignedDate: assignment.createdAt.toISOString(),
        points: assignment.maxPoints,
        status: assignment.isPublished ? 'published' : 'draft',
        priority,
        submissionType: Array.isArray(assignment.allowedFileTypes) 
          ? assignment.allowedFileTypes as string[]
          : JSON.parse(assignment.allowedFileTypes as string),
        estimatedTime: Math.floor(Math.random() * 20) + 5, // TODO: Add to schema
        hasAutograding: false, // TODO: Add autograding support
        submissions: {
          total: assignment._count.submissions,
          graded: assignment.submissions.filter((s: { grade: number | null }) => s.grade !== null).length,
          pending: assignment.submissions.filter((s: { grade: number | null }) => s.grade === null).length
        }
      }

      if (role === 'STUDENT') {
        const userSubmission = assignment.submissions[0]
        return {
          ...baseAssignment,
          studentProgress: userSubmission ? {
            submitted: true,
            score: userSubmission.grade || undefined,
            submissionDate: userSubmission.submittedAt.toISOString(),
            feedback: userSubmission.feedback || undefined,
            isLate: userSubmission.isLate
          } : {
            submitted: false
          }
        }
      }

      return baseAssignment
    })

    return NextResponse.json(formattedAssignments)
  } catch (error) {
    console.error('Error fetching assignments:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/assignments - Create a new assignment (Educators only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'EDUCATOR') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { 
      title, 
      description, 
      instructions, 
      dueDate, 
      maxPoints, 
      courseId, 
      allowedFileTypes,
      maxFileSize 
    } = body

    if (!title || !description || !instructions || !dueDate || !maxPoints || !courseId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Verify the educator owns the course
    const course = await prisma.course.findFirst({
      where: { 
        id: courseId, 
        educatorId: session.user.id 
      }
    })

    if (!course) {
      return NextResponse.json({ error: 'Course not found or unauthorized' }, { status: 404 })
    }

    const assignment = await prisma.assignment.create({
      data: {
        title,
        description,
        instructions,
        dueDate: new Date(dueDate),
        maxPoints,
        courseId,
        allowedFileTypes: JSON.stringify(allowedFileTypes || ['pdf', 'doc', 'docx', 'txt']),
        maxFileSize: maxFileSize || 10485760, // 10MB default
        isPublished: true
      },
      include: {
        course: {
          select: { name: true, code: true }
        },
        _count: {
          select: { submissions: true }
        }
      }
    })

    return NextResponse.json({
      id: assignment.id,
      title: assignment.title,
      course: assignment.course.name,
      courseCode: assignment.course.code,
      description: assignment.description,
      instructions: assignment.instructions,
      dueDate: assignment.dueDate.toISOString(),
      assignedDate: assignment.createdAt.toISOString(),
      points: assignment.maxPoints,
      status: assignment.isPublished ? 'published' : 'draft',
      priority: 'medium' as const,
      submissionType: JSON.parse(assignment.allowedFileTypes as string),
      estimatedTime: 10,
      hasAutograding: false,
      submissions: {
        total: assignment._count.submissions,
        graded: 0,
        pending: 0
      }
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating assignment:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}