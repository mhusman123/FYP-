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
  Target
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
      code: 'CS-380',
      progress: 60,
      nextAssignment: 'Database Design Project'
    },
    {
      id: '3',
      name: 'Human-Computer Interaction',
      code: 'CS-425',
      progress: 90,
      nextAssignment: 'Final Project Presentation'
    }
  ]
}

export default function StudentDashboard() {
  const { upcomingDeadlines, recentBadges, stats, courses } = mockData

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, John!</h1>
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
            <Button className="w-full" variant="outline">
              View All Assignments
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
            <Button className="w-full" variant="outline">
              View All Courses
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
            <Button className="w-full" variant="outline">
              View All Badges
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
            <Button className="w-full justify-start" variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Submit Assignment
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              View Schedule
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Trophy className="h-4 w-4 mr-2" />
              Check Leaderboard
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Award className="h-4 w-4 mr-2" />
              Request Grade Review
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}