import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { withAiLogging } from '@/lib/ai-wrapper'

/**
 * AI Insights API Endpoint
 * Provides analytics and predictions on student performance for educators
 * 
 * GET /api/ai/insights
 * Query params:
 * - courseId (optional): Filter insights by specific course
 * - period (optional): 'week' | 'month' | 'semester' (default: 'week')
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Only educators can access insights
    if (session.user.role !== 'EDUCATOR' && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden: Educator access required' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get('courseId')
    const period = searchParams.get('period') || 'week'

    // Wrap insights generation with AI logging
    const result = await withAiLogging(
      async () => {
        // Calculate date range based on period
        const now = new Date()
        const startDate = new Date()
        
        switch (period) {
          case 'week':
            startDate.setDate(now.getDate() - 7)
            break
          case 'month':
            startDate.setMonth(now.getMonth() - 1)
            break
          case 'semester':
            startDate.setMonth(now.getMonth() - 4)
            break
          default:
            startDate.setDate(now.getDate() - 7)
        }

        // Build query filters
        const courseFilter = courseId ? { id: courseId } : {}

        // Get educator's courses
        const courses = await prisma.course.findMany({
          where: session.user.role === 'EDUCATOR' 
            ? { educatorId: session.user.id, ...courseFilter }
            : courseFilter,
          include: {
            assignments: {
              include: {
                submissions: {
                  include: {
                    student: true
                  }
                }
              }
            },
            enrollments: true
          }
        })

        const courseIds = courses.map(c => c.id)

        // Get all submissions for the educator's courses
        const submissions = await prisma.submission.findMany({
          where: {
            assignment: {
              courseId: { in: courseIds },
              ...courseFilter
            },
            submittedAt: {
              gte: startDate
            }
          },
          include: {
            assignment: true,
            student: true
          },
          orderBy: {
            submittedAt: 'asc'
          }
        })

        // Calculate average grade
        const gradedSubmissions = submissions.filter(s => s.grade !== null)
        const averageGrade = gradedSubmissions.length > 0
          ? Math.round(gradedSubmissions.reduce((sum, s) => sum + (s.grade || 0), 0) / gradedSubmissions.length)
          : 0

        // Count late submissions
        const lateSubmissions = submissions.filter(s => s.isLate).length

        // Identify at-risk students (students with average grade < 60 or multiple late submissions)
        const studentPerformance = new Map<string, { 
          totalGrade: number, 
          count: number, 
          lateCount: number,
          name: string 
        }>()

        submissions.forEach(sub => {
          if (!studentPerformance.has(sub.studentId)) {
            studentPerformance.set(sub.studentId, {
              totalGrade: 0,
              count: 0,
              lateCount: 0,
              name: sub.student.name || 'Unknown'
            })
          }
          const perf = studentPerformance.get(sub.studentId)!
          if (sub.grade !== null) {
            perf.totalGrade += sub.grade
            perf.count++
          }
          if (sub.isLate) {
            perf.lateCount++
          }
        })

        const atRiskStudents = Array.from(studentPerformance.entries())
          .filter(([, perf]) => {
            const avgGrade = perf.count > 0 ? perf.totalGrade / perf.count : 0
            return avgGrade < 60 || perf.lateCount >= 2
          })
          .map(([studentId, perf]) => ({
            id: studentId,
            name: perf.name,
            averageGrade: perf.count > 0 ? Math.round(perf.totalGrade / perf.count) : 0,
            lateSubmissions: perf.lateCount
          }))

        const riskStudents = atRiskStudents.length

        // Calculate trend data (weekly average grades)
        const trendData: number[] = []
        const weekCount = period === 'week' ? 4 : period === 'month' ? 4 : 12
        const weekInMs = 7 * 24 * 60 * 60 * 1000

        for (let i = weekCount - 1; i >= 0; i--) {
          const weekEnd = new Date(now.getTime() - (i * weekInMs))
          const weekStart = new Date(weekEnd.getTime() - weekInMs)
          
          const weekSubmissions = submissions.filter(s => {
            const subDate = new Date(s.submittedAt)
            return subDate >= weekStart && subDate < weekEnd && s.grade !== null
          })

          if (weekSubmissions.length > 0) {
            const weekAvg = Math.round(
              weekSubmissions.reduce((sum, s) => sum + (s.grade || 0), 0) / weekSubmissions.length
            )
            trendData.push(weekAvg)
          } else {
            // Use previous value or 0 if no data
            trendData.push(trendData.length > 0 ? trendData[trendData.length - 1] : 0)
          }
        }

        // Calculate completion rate
        const totalAssignments = courses.reduce((sum, c) => sum + c.assignments.length, 0)
        const totalStudents = courses.reduce((sum, c) => sum + c.enrollments.length, 0)
        const expectedSubmissions = totalAssignments * totalStudents
        const actualSubmissions = submissions.length
        const completionRate = expectedSubmissions > 0 
          ? Math.round((actualSubmissions / expectedSubmissions) * 100)
          : 0

        // Calculate grade distribution
        const gradeDistribution = {
          'A (90-100)': 0,
          'B (80-89)': 0,
          'C (70-79)': 0,
          'D (60-69)': 0,
          'F (<60)': 0
        }

        gradedSubmissions.forEach(sub => {
          const grade = sub.grade || 0
          if (grade >= 90) gradeDistribution['A (90-100)']++
          else if (grade >= 80) gradeDistribution['B (80-89)']++
          else if (grade >= 70) gradeDistribution['C (70-79)']++
          else if (grade >= 60) gradeDistribution['D (60-69)']++
          else gradeDistribution['F (<60)']++
        })

        // Calculate trend percentage change
        const trendChange = trendData.length >= 2
          ? Math.round(((trendData[trendData.length - 1] - trendData[trendData.length - 2]) / trendData[trendData.length - 2]) * 100)
          : 0

        // AI-generated insights (placeholder for future ML model)
        const insights = [
          {
            type: 'warning',
            message: `${riskStudents} student${riskStudents !== 1 ? 's' : ''} at risk of failing`,
            severity: riskStudents > 5 ? 'high' : riskStudents > 0 ? 'medium' : 'low'
          },
          {
            type: 'info',
            message: trendChange >= 0 
              ? `Average grade ↑ ${Math.abs(trendChange)}% this period`
              : `Average grade ↓ ${Math.abs(trendChange)}% this period`,
            severity: trendChange >= 5 ? 'positive' : trendChange <= -5 ? 'negative' : 'neutral'
          },
          {
            type: 'metric',
            message: `${completionRate}% assignment completion rate`,
            severity: completionRate >= 80 ? 'positive' : completionRate >= 60 ? 'neutral' : 'negative'
          }
        ]

        if (lateSubmissions > 10) {
          insights.push({
            type: 'warning',
            message: `High number of late submissions (${lateSubmissions})`,
            severity: 'medium'
          })
        }

        return {
          averageGrade,
          lateSubmissions,
          riskStudents,
          atRiskStudents: atRiskStudents.slice(0, 10), // Return top 10 at-risk students
          trend: trendData,
          completionRate,
          gradeDistribution,
          insights,
          period,
          totalSubmissions: submissions.length,
          totalStudents,
          totalCourses: courses.length,
          trendChange
        }
      },
      {
        type: 'insights',
        userId: session.user.id,
        metadata: {
          courseId,
          period,
          role: session.user.role,
        },
      }
    );

    if (result.error) {
      return NextResponse.json(
        { error: 'Failed to generate insights', message: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ...result.data,
      latency: result.latency,
    });
  } catch (error) {
    console.error('Error fetching AI insights:', error)
    return NextResponse.json(
      { error: 'Failed to fetch insights', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
