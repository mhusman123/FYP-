import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'

// GET /api/users/me - Get current user data
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        enrolledCourses: {
          include: {
            course: { 
              select: { 
                id: true, 
                name: true, 
                code: true, 
                semester: true, 
                year: true,
                educator: { select: { name: true } }
              } 
            }
          }
        },
        educatedCourses: {
          select: { 
            id: true, 
            name: true, 
            code: true, 
            semester: true, 
            year: true,
            _count: { select: { enrollments: true, assignments: true } }
          }
        },
        submissions: {
          include: {
            assignment: { 
              select: { 
                title: true, 
                maxPoints: true, 
                dueDate: true,
                course: { select: { name: true, code: true } }
              } 
            }
          },
          orderBy: { submittedAt: 'desc' },
          take: 10
        },
        userBadges: {
          include: {
            badge: { 
              select: { 
                name: true, 
                description: true, 
                icon: true, 
                color: true, 
                points: true 
              } 
            }
          },
          orderBy: { earnedAt: 'desc' }
        }
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.image,
      totalPoints: user.totalPoints,
      enrolledCourses: user.enrolledCourses.map(ec => ({
        ...ec.course,
        instructor: ec.course.educator?.name || 'Unknown'
      })),
      educatedCourses: user.educatedCourses,
      recentSubmissions: user.submissions.map(s => ({
        id: s.id,
        assignmentTitle: s.assignment.title,
        course: s.assignment.course.name,
        courseCode: s.assignment.course.code,
        submittedAt: s.submittedAt.toISOString(),
        grade: s.grade,
        maxGrade: s.assignment.maxPoints,
        isLate: s.isLate,
        status: s.status.toLowerCase()
      })),
      badges: user.userBadges.map(ub => ({
        ...ub.badge,
        earnedAt: ub.earnedAt.toISOString()
      })),
      stats: {
        coursesEnrolled: user.enrolledCourses.length,
        coursesTeaching: user.educatedCourses.length,
        totalSubmissions: user.submissions.length,
        badgesEarned: user.userBadges.length,
        averageGrade: user.submissions.length > 0 
          ? user.submissions.reduce((sum, s) => sum + (s.grade || 0), 0) / user.submissions.filter(s => s.grade !== null).length
          : 0
      }
    })
  } catch (error) {
    console.error('Error fetching user data:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}