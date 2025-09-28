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

// Mock data - replace with actual API calls
const mockData = {
  upcomingDeadlines: [
    {
      id: '1',
      title: 'Research Paper Draft',
      course: 'Advanced Web Development',
      dueDate: '2025-09-20',
      status: 'pending' as const
    },
    {
      id: '2',
      title: 'Database Design Project',
      course: 'Database Systems',
      dueDate: '2025-09-22',
      status: 'pending' as const
    },
    {
      id: '3',
      title: 'UI/UX Case Study',
      course: 'Human-Computer Interaction',
      dueDate: '2025-09-25',
      status: 'submitted' as const
    }
  ],
  recentBadges: [
    {
      id: '1',
      name: 'Early Bird',
      description: 'Submitted 5 assignments before deadline',
      icon: '🐦',
      earnedAt: '2025-09-15'
    },
    {
      id: '2',
      name: 'Perfect Score',
      description: 'Achieved 100% on an assignment',
      icon: '💯',
      earnedAt: '2025-09-10'
    }
  ],
  stats: {
    totalPoints: 1250,
    rank: 8,
    totalStudents: 156,
    completedAssignments: 12,
    totalAssignments: 15,
    averageGrade: 88.5
  },
  courses: [
    {
      id: '1',
      name: 'Advanced Web Development',
      code: 'CS-401',
      progress: 75,
      nextAssignment: 'Research Paper Draft'
    },
    {
      id: '2',
      name: 'Database Systems',
      code: 'CS-320',
      progress: 60,
      nextAssignment: 'Database Design Project'
    },
    {
      id: '3',
      name: 'Human-Computer Interaction',
      code: 'CS-425',
      progress: 90,
      nextAssignment: 'Final Project Presentation'
    },
    {
      id: '4',
      name: 'Machine Learning',
      code: 'CS-410',
      progress: 45,
      nextAssignment: 'Neural Network Implementation'
    },
    {
      id: '5',
      name: 'Data Structures & Algorithms',
      code: 'CS-200',
      progress: 82,
      nextAssignment: 'Graph Algorithms Lab'
    }
  ]
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

export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  const userRole = session?.user?.role || 'STUDENT'
  const userName = session?.user?.name || 'User'
  
  if (userRole === 'EDUCATOR') {
    return <EducatorDashboard userName={userName} />
  }
  
  return <StudentDashboard userName={userName} />
}

function StudentDashboard({ userName }: { userName: string }) {
  const { upcomingDeadlines, recentBadges, stats, courses } = mockData

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {userName}!</h1>
        <p className="text-muted-foreground">
          Here&apos;s what&apos;s happening with your courses today.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Points</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPoints}</div>
            <p className="text-xs text-muted-foreground">
              Rank #{stats.rank} of {stats.totalStudents}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageGrade}%</div>
            <p className="text-xs text-muted-foreground">
              +2.5% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assignments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.completedAssignments}/{stats.totalAssignments}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((stats.completedAssignments / stats.totalAssignments) * 100)}% complete
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.length}</div>
            <p className="text-xs text-muted-foreground">
              Fall 2025 semester
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Deadlines
            </CardTitle>
            <CardDescription>
              Don&apos;t miss these important dates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingDeadlines.map((deadline) => (
              <div key={deadline.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{deadline.title}</p>
                  <p className="text-sm text-muted-foreground">{deadline.course}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Due {new Date(deadline.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <Badge variant={deadline.status === 'submitted' ? 'default' : 'destructive'}>
                  {deadline.status === 'submitted' ? 'Submitted' : 'Pending'}
                </Badge>
              </div>
            ))}
            <Button className="w-full" variant="outline" asChild>
              <Link href="/assignments">View All Assignments</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Course Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Course Progress
            </CardTitle>
            <CardDescription>
              Your progress in enrolled courses
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {courses.map((course) => (
              <div key={course.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{course.name}</p>
                    <p className="text-sm text-muted-foreground">{course.code}</p>
                  </div>
                  <span className="text-sm font-medium">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Next: {course.nextAssignment}
                </p>
              </div>
            ))}
            <Button className="w-full" variant="outline" asChild>
              <Link href="/courses">View All Courses</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Badges */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Recent Achievements
            </CardTitle>
            <CardDescription>
              Badges you&apos;ve earned recently
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentBadges.map((badge) => (
              <div key={badge.id} className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="text-2xl">{badge.icon}</div>
                <div className="flex-1">
                  <p className="font-medium">{badge.name}</p>
                  <p className="text-sm text-muted-foreground">{badge.description}</p>
                  <p className="text-xs text-muted-foreground">
                    Earned on {new Date(badge.earnedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
            <Button className="w-full" variant="outline" asChild>
              <Link href="/badges">View All Badges</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/submissions">
                <FileText className="h-4 w-4 mr-2" />
                Submit Assignment
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/assignments">
                <Calendar className="h-4 w-4 mr-2" />
                View Schedule
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/leaderboard">
                <Trophy className="h-4 w-4 mr-2" />
                Check Leaderboard
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/grade-requests">
                <Award className="h-4 w-4 mr-2" />
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
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {userName}!</h1>
        <p className="text-muted-foreground">
          Here&apos;s your teaching overview and pending tasks.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teachingStats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              Across {teachingStats.totalCourses} courses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Grades</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teachingStats.pendingSubmissions}</div>
            <p className="text-xs text-muted-foreground">
              Submissions to review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teachingStats.averageGrade}%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teachingStats.completionRate}%</div>
            <p className="text-xs text-muted-foreground">
              Student assignment completion
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Pending Grading Queue */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5" />
              Grading Queue
            </CardTitle>
            <CardDescription>
              Submissions requiring your attention
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingGrading.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{item.studentName}</p>
                  <p className="text-sm text-muted-foreground">{item.assignment}</p>
                  <p className="text-xs text-muted-foreground">{item.course}</p>
                </div>
                <div className="text-right space-y-1">
                  <Badge variant={item.priority === 'high' ? 'destructive' : 'secondary'}>
                    {item.priority}
                  </Badge>
                  <p className="text-xs text-muted-foreground">
                    {new Date(item.submittedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
            <Button className="w-full" variant="outline" asChild>
              <Link href="/grading">View Grading Queue</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Active Courses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Teaching Courses
            </CardTitle>
            <CardDescription>
              Your active courses this semester
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeCourses.map((course) => (
              <div key={course.id} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium">{course.name}</p>
                    <p className="text-sm text-muted-foreground">{course.code}</p>
                  </div>
                  <span className="text-sm font-medium">{course.students} students</span>
                </div>
                {course.pendingGrades > 0 && (
                  <p className="text-xs text-orange-600">
                    {course.pendingGrades} submissions need grading
                  </p>
                )}
              </div>
            ))}
            <Button className="w-full" variant="outline" asChild>
              <Link href="/courses">Manage All Courses</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
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
                  <p className="text-sm">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
            <Button className="w-full" variant="outline" asChild>
              <Link href="/analytics">View Analytics Dashboard</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common teaching tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/grading">
                <ClipboardCheck className="h-4 w-4 mr-2" />
                Review Submissions
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/students">
                <Users className="h-4 w-4 mr-2" />
                Manage Students
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/analytics">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analytics
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/grade-requests">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Grade Requests
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}