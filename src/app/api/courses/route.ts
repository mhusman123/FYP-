import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'

// GET /api/courses - Get all courses or user's enrolled courses
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const enrolled = searchParams.get('enrolled') === 'true'
    const role = session.user.role || 'STUDENT'

    if (enrolled && role === 'STUDENT') {
      // Get courses the student is enrolled in
      const enrollments = await prisma.courseEnrollment.findMany({
        where: { studentId: session.user.id },
        include: {
          course: {
            include: {
              educator: {
                select: { name: true, email: true }
              },
              _count: {
                select: { 
                  enrollments: true,
                  assignments: true
                }
              }
            }
          }
        }
      })

      const courses = enrollments.map(enrollment => ({
        ...enrollment.course,
        instructor: enrollment.course.educator.name,
        studentsCount: enrollment.course._count.enrollments,
        assignmentsCount: enrollment.course._count.assignments,
        progress: Math.floor(Math.random() * 100), // TODO: Calculate real progress
        completedLessons: Math.floor(Math.random() * 20),
        totalLessons: 20 + Math.floor(Math.random() * 10),
        nextDeadline: '2025-10-15', // TODO: Get next assignment deadline
        status: 'active' as const,
        color: `bg-${['blue', 'green', 'purple', 'orange', 'red'][Math.floor(Math.random() * 5)]}-500`
      }))

      return NextResponse.json(courses)
    }

    if (role === 'EDUCATOR') {
      // Get courses taught by the educator
      const courses = await prisma.course.findMany({
        where: { educatorId: session.user.id },
        include: {
          _count: {
            select: { 
              enrollments: true,
              assignments: true
            }
          }
        }
      })

      const coursesWithStats = courses.map(course => ({
        ...course,
        instructor: session.user.name,
        studentsCount: course._count.enrollments,
        assignmentsCount: course._count.assignments,
        status: 'active' as const,
        color: `bg-${['blue', 'green', 'purple', 'orange', 'red'][Math.floor(Math.random() * 5)]}-500`
      }))

      return NextResponse.json(coursesWithStats)
    }

    // Get all available courses
    const courses = await prisma.course.findMany({
      include: {
        educator: {
          select: { name: true, email: true }
        },
        _count: {
          select: { 
            enrollments: true,
            assignments: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    const coursesWithStats = courses.map(course => ({
      ...course,
      instructor: course.educator.name,
      studentsCount: course._count.enrollments,
      assignmentsCount: course._count.assignments,
      status: 'active' as const,
      color: `bg-${['blue', 'green', 'purple', 'orange', 'red'][Math.floor(Math.random() * 5)]}-500`
    }))

    return NextResponse.json(coursesWithStats)
  } catch (error) {
    console.error('Error fetching courses:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/courses - Create a new course (Educators only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'EDUCATOR') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, code, description, credits, semester, year } = body

    if (!name || !code || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const course = await prisma.course.create({
      data: {
        name,
        code,
        description,
        credits: credits || 3,
        semester: semester || 'Fall',
        year: year || 2025,
        educatorId: session.user.id,
        difficulty: 'INTERMEDIATE', // Default difficulty
        prerequisites: []
      },
      include: {
        educator: {
          select: { name: true, email: true }
        },
        _count: {
          select: { 
            enrollments: true,
            assignments: true
          }
        }
      }
    })

    return NextResponse.json({
      ...course,
      title: course.name, // Map name to title for frontend compatibility
      instructor: course.educator.name,
      studentsCount: course._count.enrollments,
      assignmentsCount: course._count.assignments,
      status: 'active' as const,
      color: 'bg-blue-500'
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating course:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}