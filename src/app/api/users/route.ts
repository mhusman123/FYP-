import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'

// GET /api/users - Get users/students
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const role = searchParams.get('role') || 'STUDENT'
    const courseId = searchParams.get('courseId')

    const whereClause = { role: role.toUpperCase() as 'STUDENT' | 'EDUCATOR' }

    if (courseId && session.user.role === 'EDUCATOR') {
      // Get students enrolled in a specific course taught by the educator
      const course = await prisma.course.findFirst({
        where: { 
          id: courseId, 
          educatorId: session.user.id 
        }
      })

      if (!course) {
        return NextResponse.json({ error: 'Course not found or unauthorized' }, { status: 404 })
      }

      const enrollments = await prisma.courseEnrollment.findMany({
        where: { courseId },
        include: {
          student: {
            include: {
              submissions: {
                where: {
                  assignment: { courseId }
                },
                include: {
                  assignment: {
                    select: { maxPoints: true }
                  }
                }
              },
              enrolledCourses: {
                include: {
                  course: { select: { code: true, name: true } }
                }
              },
              userBadges: {
                include: {
                  badge: { select: { name: true, points: true } }
                }
              }
            }
          }
        }
      })

      const students = enrollments.map(enrollment => {
        const student = enrollment.student
        const submissions = student.submissions
        const totalSubmissions = submissions.length
        const lateSubmissions = submissions.filter((s: { isLate: boolean }) => s.isLate).length
        const gradedSubmissions = submissions.filter((s: { grade: number | null }) => s.grade !== null)
        
        // Calculate overall grade
        const totalPoints = gradedSubmissions.reduce((sum: number, s: { grade: number | null }) => sum + (s.grade || 0), 0)
        const maxPossiblePoints = gradedSubmissions.reduce((sum: number, s: { assignment: { maxPoints: number } }) => sum + s.assignment.maxPoints, 0)
        const overallGrade = maxPossiblePoints > 0 ? (totalPoints / maxPossiblePoints) * 100 : 0
        
        // Calculate completion rate
        const totalAssignments = 10 // TODO: Get actual count from course assignments
        const completionRate = totalAssignments > 0 ? (totalSubmissions / totalAssignments) * 100 : 0

        return {
          id: student.id,
          name: student.name,
          email: student.email,
          studentId: `CS${new Date().getFullYear()}${student.id.slice(-3)}`, // Generate student ID
          avatar: student.image || '/placeholder-avatar.jpg',
          enrolledCourses: student.enrolledCourses.map((ec: { course: { code: string } }) => ec.course.code),
          overallGrade: Math.round(overallGrade * 10) / 10,
          completionRate: Math.round(completionRate * 10) / 10,
          submissionsTotal: totalSubmissions,
          submissionsLate: lateSubmissions,
          lastActivity: student.updatedAt.toISOString(),
          trend: overallGrade >= 80 ? 'up' : overallGrade >= 60 ? 'stable' : 'down',
          status: 'active' as const,
          badges: student.userBadges.length,
          totalPoints: student.totalPoints || student.userBadges.reduce((sum: number, ub: { badge: { points: number } }) => sum + ub.badge.points, 0)
        }
      })

      return NextResponse.json(students)
    }

    // Get all users of specified role
    const users = await prisma.user.findMany({
      where: whereClause,
      include: {
        enrolledCourses: {
          include: {
            course: { select: { code: true, name: true } }
          }
        },
        submissions: {
          include: {
            assignment: { select: { maxPoints: true } }
          }
        },
        userBadges: {
          include: {
            badge: { select: { name: true, points: true } }
          }
        },
        educatedCourses: session.user.role === 'ADMIN' ? {
          select: { code: true, name: true }
        } : undefined
      },
      orderBy: { createdAt: 'desc' }
    })

    const formattedUsers = users.map(user => {
      if (role.toUpperCase() === 'STUDENT') {
        const submissions = user.submissions
        const totalSubmissions = submissions.length
        const lateSubmissions = submissions.filter(s => s.isLate).length
        const gradedSubmissions = submissions.filter(s => s.grade !== null)
        
        // Calculate overall grade
        const totalPoints = gradedSubmissions.reduce((sum, s) => sum + (s.grade || 0), 0)
        const maxPossiblePoints = gradedSubmissions.reduce((sum, s) => sum + s.assignment.maxPoints, 0)
        const overallGrade = maxPossiblePoints > 0 ? (totalPoints / maxPossiblePoints) * 100 : 0
        
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          studentId: `CS${new Date().getFullYear()}${user.id.slice(-3)}`,
          avatar: user.image || '/placeholder-avatar.jpg',
          enrolledCourses: user.enrolledCourses.map(ec => ec.course.code),
          overallGrade: Math.round(overallGrade * 10) / 10,
          completionRate: Math.random() * 20 + 80, // TODO: Calculate real completion rate
          submissionsTotal: totalSubmissions,
          submissionsLate: lateSubmissions,
          lastActivity: user.updatedAt.toISOString(),
          trend: overallGrade >= 80 ? 'up' : overallGrade >= 60 ? 'stable' : 'down',
          status: 'active' as const,
          badges: user.userBadges.length,
          totalPoints: user.totalPoints || user.userBadges.reduce((sum, ub) => sum + ub.badge.points, 0)
        }
      }

      // For educators
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.image || '/placeholder-avatar.jpg',
        courses: user.educatedCourses?.map(c => ({ code: c.code, name: c.name })) || [],
        totalPoints: user.totalPoints,
        badges: user.userBadges.length,
        joinedAt: user.createdAt.toISOString(),
        lastActivity: user.updatedAt.toISOString(),
        status: 'active' as const
      }
    })

    return NextResponse.json(formattedUsers)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// GET /api/users/me - Get current user data
export async function getMe() {
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
        instructor: ec.course.educator.name
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