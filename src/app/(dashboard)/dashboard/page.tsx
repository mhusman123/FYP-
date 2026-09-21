import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import {
  BookOpen,
  Calendar,
  Trophy,
  TrendingUp,
  Clock,
  FileText,
  Award,
  Target,
  Users,
  BarChart3,
  ClipboardCheck,
  AlertTriangle,
  GraduationCap
} from 'lucide-react'
import { fetchCourses, fetchAssignments, fetchBadges } from '@/lib/api'
import { AiInsightsPanel } from '@/components/features/ai-insights'

// Helper function to get upcoming deadlines from assignments
async function getUpcomingDeadlines() {
  try {
    const assignments = await fetchAssignments()
    const upcoming = assignments
      .filter(assignment => {
        const dueDate = new Date(assignment.dueDate)
        const now = new Date()
        const daysUntil = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        return daysUntil >= 0 && daysUntil <= 14 // Next 2 weeks
      })
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
      .slice(0, 5)
      .map(assignment => ({
        id: assignment.id,
        title: assignment.title,
        course: assignment.course,
        dueDate: assignment.dueDate.split('T')[0], // Format date
        status: assignment.studentProgress?.submitted ? 'submitted' : 'pending'
      }))
    
    return upcoming
  } catch (error) {
    console.error('Error fetching upcoming deadlines:', error)
    return []
  }
}

// Helper function to get recent badges
async function getRecentBadges() {
  try {
    const earnedBadges = await fetchBadges(true)
    return earnedBadges
      .sort((a, b) => new Date(b.earnedAt!).getTime() - new Date(a.earnedAt!).getTime())
      .slice(0, 3)
      .map(badge => ({
        id: badge.id,
        name: badge.name,
        icon: badge.icon,
        color: badge.color,
        earnedAt: badge.earnedAt!
      }))
  } catch (error) {
    console.error('Error fetching recent badges:', error)
    return []
  }
}

// Get user statistics
async function getUserStats() {
  try {
    const [courses, assignments, badges] = await Promise.all([
      fetchCourses(), // enrolled courses
      fetchAssignments(),
      fetchBadges(true) // earned badges
    ])

    const totalPoints = badges.reduce((sum, badge) => sum + badge.points, 0)
    const currentRank = Math.floor(Math.random() * 50) + 1 // TODO: Calculate real rank
    const completedAssignments = assignments.filter(a => a.studentProgress?.submitted).length

    return {
      totalPoints,
      currentRank,
      completedAssignments,
      activeCourses: courses.length
    }
  } catch (error) {
    console.error('Error fetching user stats:', error)
    return {
      totalPoints: 0,
      currentRank: 0,
      completedAssignments: 0,
      activeCourses: 0
    }
  }
}


// Mock data for educators
const educatorMockData = {
  pendingGrading: [
    {
      id: '1',
      studentName: 'Alice Johnson',
      assignment: 'Database Design Project',
      course: 'Database Systems',
      submittedDate: '2025-09-20',
      priority: 'high' as const
    },
    {
      id: '2', 
      studentName: 'Bob Chen',
      assignment: 'React Component Library',
      course: 'Advanced Web Development',
      submittedDate: '2025-09-21',
      priority: 'medium' as const
    }
  ],
  teachingStats: {
    totalStudents: 156,
    totalCourses: 4,
    pendingSubmissions: 23,
    averageGrade: 87.2,
    completionRate: 94.5
  },
  activeCourses: [
    {
      id: '1',
      name: 'Advanced Web Development',
      code: 'CS-401',
      students: 45,
      pendingGrades: 8
    },
    {
      id: '2',
      name: 'Database Systems', 
      code: 'CS-380',
      students: 52,
      pendingGrades: 12
    },
    {
      id: '3',
      name: 'Human-Computer Interaction',
      code: 'CS-425', 
      students: 38,
      pendingGrades: 3
    }
  ],
  recentActivity: [
    {
      id: '1',
      type: 'submission',
      message: 'New submission from Sarah Kim in CS-401',
      time: '2 hours ago'
    },
    {
      id: '2',
      type: 'grade_request',
      message: 'Grade adjustment request from Mike Rodriguez',
      time: '4 hours ago'
    }
  ]
}

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  const userRole = session?.user?.role || 'STUDENT'
  const userName = session?.user?.name || 'User'

  
  // Fetch real data
  const [upcomingDeadlines, recentBadges, stats, courses] = await Promise.all([
    getUpcomingDeadlines(),
    getRecentBadges(),
    getUserStats(),
    fetchCourses()
  ])

  const dashboardData = {
    upcomingDeadlines,
    recentBadges,
    stats,
    courses: courses.map(course => ({
      id: course.id,
      name: course.title,
      code: course.code,
      progress: course.progress || Math.floor(Math.random() * 40) + 60,
      nextAssignment: `Next assignment in ${course.title}`
    }))
  }
  
  if (userRole === 'EDUCATOR') {
    return <EducatorDashboard userName={userName} />
  }
  
  return <StudentDashboard userName={userName} data={dashboardData} />
}

interface DashboardData {
  upcomingDeadlines: Array<{ 
    id: string; 
    title: string; 
    course: string; 
    dueDate: string; 
    status: string;
    priority?: string;
  }>
  courses: Array<{ 
    id: string; 
    name: string; 
    code: string; 
    progress: number;
    nextAssignment?: string;
  }>
  recentBadges: Array<{ 
    id: string; 
    name: string; 
    description?: string; 
    icon: string;
    color?: string;
    earnedAt?: string;
  }>
  stats: { 
    totalPoints: number; 
    currentRank: number; 
    rank?: number;
    totalStudents?: number;
    completedAssignments: number; 
    totalAssignments?: number;
    activeCourses: number;
    averageGrade?: number;
  }
}

function StudentDashboard({ userName, data }: { userName: string; data?: DashboardData }) {
  const { upcomingDeadlines, recentBadges, stats, courses } = data || {
    upcomingDeadlines: [],
    recentBadges: [],
    stats: { totalPoints: 0, currentRank: 0, completedAssignments: 0, activeCourses: 0 },
    courses: []
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Welcome back, {userName}!</h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-1">
          Here&apos;s what&apos;s happening with your courses today.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground">Total Points</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{stats.totalPoints}</div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Rank #{stats.rank} of {stats.totalStudents}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground">Average Grade</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{stats.averageGrade}%</div>
            <p className="text-xs text-muted-foreground mt-0.5">
              +2.5% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground">Assignments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              {stats.completedAssignments}/{stats.totalAssignments}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {Math.round((stats.completedAssignments / (stats.totalAssignments || 1)) * 100)}% complete
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{courses.length}</div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Fall 2025 semester
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg font-bold tracking-tight flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Upcoming Deadlines
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Don&apos;t miss these important dates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingDeadlines.map((deadline) => (
              <div key={deadline.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-foreground leading-tight">{deadline.title}</p>
                  <p className="text-xs font-medium text-muted-foreground">{deadline.course}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 font-normal">
                    <Clock className="h-3.5 w-3.5" />
                    Due {new Date(deadline.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <Badge variant={deadline.status === 'submitted' ? 'default' : 'destructive'} className="text-xs font-semibold">
                  {deadline.status === 'submitted' ? 'Submitted' : 'Pending'}
                </Badge>
              </div>
            ))}
            <Button className="w-full font-semibold text-xs tracking-normal" variant="outline" asChild>
              <Link href="/assignments">View All Assignments</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Course Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg font-bold tracking-tight flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Course Progress
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Your progress in enrolled courses
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {courses.map((course) => (
              <div key={course.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-semibold text-foreground leading-tight">{course.name}</p>
                    <p className="text-xs font-mono font-medium text-muted-foreground">{course.code}</p>
                  </div>
                  <span className="text-sm font-bold text-foreground">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Next: {course.nextAssignment}
                </p>
              </div>
            ))}
            <Button className="w-full font-semibold text-xs tracking-normal" variant="outline" asChild>
              <Link href="/courses">View All Courses</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Badges */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg font-bold tracking-tight flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Recent Achievements
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Badges you&apos;ve earned recently
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentBadges.map((badge) => (
              <div key={badge.id} className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="text-2xl">{badge.icon}</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground leading-tight">{badge.name}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{badge.description}</p>
                  <p className="text-xs text-muted-foreground font-normal">
                    Earned on {badge.earnedAt ? new Date(badge.earnedAt).toLocaleDateString() : 'Recently'}
                  </p>
                </div>
              </div>
            ))}
            <Button className="w-full font-semibold text-xs tracking-normal" variant="outline" asChild>
              <Link href="/badges">View All Badges</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg font-bold tracking-tight">Quick Actions</CardTitle>
            <CardDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start font-semibold text-xs tracking-normal" variant="outline" asChild>
              <Link href="/submissions">
                <FileText className="h-4 w-4 mr-2 text-primary" />
                Submit Assignment
              </Link>
            </Button>
            <Button className="w-full justify-start font-semibold text-xs tracking-normal" variant="outline" asChild>
              <Link href="/assignments">
                <Calendar className="h-4 w-4 mr-2 text-primary" />
                View Schedule
              </Link>
            </Button>
            <Button className="w-full justify-start font-semibold text-xs tracking-normal" variant="outline" asChild>
              <Link href="/leaderboard">
                <Trophy className="h-4 w-4 mr-2 text-primary" />
                Check Leaderboard
              </Link>
            </Button>
            <Button className="w-full justify-start font-semibold text-xs tracking-normal" variant="outline" asChild>
              <Link href="/grade-requests">
                <Award className="h-4 w-4 mr-2 text-primary" />
                Request Grade Review
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function EducatorDashboard({ userName }: { userName: string }) {
  const { pendingGrading, teachingStats, activeCourses, recentActivity } = educatorMockData

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Welcome back, {userName}!</h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-1">
          Here&apos;s your teaching overview and pending tasks.
        </p>
      </div>

      {/* AI Insights Panel */}
      <div className="border-t border-b py-6">
        <AiInsightsPanel />
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{teachingStats.totalStudents}</div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Across {teachingStats.totalCourses} courses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground">Pending Grades</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{teachingStats.pendingSubmissions}</div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Submissions to review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground">Average Grade</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{teachingStats.averageGrade}%</div>
            <p className="text-xs text-muted-foreground mt-0.5">
              +2.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground">Completion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{teachingStats.completionRate}%</div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Student assignment completion
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Pending Grading Queue */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg font-bold tracking-tight flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-primary" />
              Grading Queue
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Submissions requiring your attention
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingGrading.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground leading-tight">{item.studentName}</p>
                  <p className="text-xs font-medium text-muted-foreground">{item.assignment}</p>
                  <p className="text-xs text-muted-foreground font-normal">{item.course}</p>
                </div>
                <div className="text-right space-y-1">
                  <Badge variant={item.priority === 'high' ? 'destructive' : 'secondary'} className="text-xs font-semibold">
                    {item.priority}
                  </Badge>
                  <p className="text-xs text-muted-foreground">
                    {new Date(item.submittedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
            <Button className="w-full font-semibold text-xs tracking-normal" variant="outline" asChild>
              <Link href="/grading">View Grading Queue</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Active Courses */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg font-bold tracking-tight flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              Teaching Courses
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Your active courses this semester
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeCourses.map((course) => (
              <div key={course.id} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-semibold text-foreground leading-tight">{course.name}</p>
                    <p className="text-xs font-mono font-medium text-muted-foreground">{course.code}</p>
                  </div>
                  <span className="text-xs font-semibold text-foreground">{course.students} students</span>
                </div>
                {course.pendingGrades > 0 && (
                  <p className="text-xs font-medium text-orange-600">
                    {course.pendingGrades} submissions need grading
                  </p>
                )}
              </div>
            ))}
            <Button className="w-full font-semibold text-xs tracking-normal" variant="outline" asChild>
              <Link href="/courses">Manage All Courses</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg font-bold tracking-tight flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Latest updates from your courses
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="mt-1">
                  {activity.type === 'submission' ? (
                    <FileText className="h-4 w-4 text-blue-500" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground leading-snug">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
            <Button className="w-full font-semibold text-xs tracking-normal" variant="outline" asChild>
              <Link href="/analytics">View Analytics Dashboard</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg font-bold tracking-tight">Quick Actions</CardTitle>
            <CardDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Common teaching tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start font-semibold text-xs tracking-normal" variant="outline" asChild>
              <Link href="/grading">
                <ClipboardCheck className="h-4 w-4 mr-2 text-primary" />
                Review Submissions
              </Link>
            </Button>
            <Button className="w-full justify-start font-semibold text-xs tracking-normal" variant="outline" asChild>
              <Link href="/students">
                <Users className="h-4 w-4 mr-2 text-primary" />
                Manage Students
              </Link>
            </Button>
            <Button className="w-full justify-start font-semibold text-xs tracking-normal" variant="outline" asChild>
              <Link href="/analytics">
                <BarChart3 className="h-4 w-4 mr-2 text-primary" />
                View Analytics
              </Link>
            </Button>
            <Button className="w-full justify-start font-semibold text-xs tracking-normal" variant="outline" asChild>
              <Link href="/grade-requests">
                <AlertTriangle className="h-4 w-4 mr-2 text-primary" />
                Grade Requests
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}