import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { BookOpen, Clock, Users, Calendar, TrendingUp, Play } from 'lucide-react'

// Mock data - replace with actual API calls
const mockCourses = [
  {
    id: '1',
    title: 'Advanced Web Development',
    code: 'CS 4350',
    instructor: 'Dr. Sarah Johnson',
    progress: 78,
    totalLessons: 24,
    completedLessons: 19,
    nextDeadline: '2025-09-30',
    status: 'active' as const,
    credits: 3,
    description: 'Advanced concepts in modern web development including React, Next.js, and full-stack applications.',
    color: 'bg-blue-500'
  },
  {
    id: '2',
    title: 'Database Systems',
    code: 'CS 3320',
    instructor: 'Prof. Michael Chen',
    progress: 65,
    totalLessons: 20,
    completedLessons: 13,
    nextDeadline: '2025-09-25',
    status: 'active' as const,
    credits: 4,
    description: 'Comprehensive study of database design, SQL, NoSQL, and database management systems.',
    color: 'bg-green-500'
  },
  {
    id: '3',
    title: 'Human-Computer Interaction',
    code: 'CS 4550',
    instructor: 'Dr. Emily Rodriguez',
    progress: 92,
    totalLessons: 16,
    completedLessons: 15,
    nextDeadline: '2025-10-05',
    status: 'active' as const,
    credits: 3,
    description: 'User experience design principles, usability testing, and interface design methodologies.',
    color: 'bg-purple-500'
  },
  {
    id: '4',
    title: 'Software Engineering',
    code: 'CS 3300',
    instructor: 'Dr. Robert Kim',
    progress: 45,
    totalLessons: 22,
    completedLessons: 10,
    nextDeadline: '2025-09-28',
    status: 'active' as const,
    credits: 3,
    description: 'Software development lifecycle, project management, and team collaboration practices.',
    color: 'bg-orange-500'
  },
  {
    id: '5',
    title: 'Data Structures & Algorithms',
    code: 'CS 2400',
    instructor: 'Prof. Lisa Wang',
    progress: 100,
    totalLessons: 18,
    completedLessons: 18,
    nextDeadline: null,
    status: 'completed' as const,
    credits: 4,
    description: 'Fundamental data structures and algorithm analysis for efficient problem solving.',
    color: 'bg-gray-500'
  }
]

export default function CoursesPage() {
  const activeCourses = mockCourses.filter(course => course.status === 'active')
  const completedCourses = mockCourses.filter(course => course.status === 'completed')

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
          <p className="text-muted-foreground">
            Track your progress and manage your enrolled courses
          </p>
        </div>
        <Button>
          <BookOpen className="mr-2 h-4 w-4" />
          Browse All Courses
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCourses.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeCourses.length} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockCourses.reduce((sum, course) => sum + course.credits, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Credit hours enrolled
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(activeCourses.reduce((sum, course) => sum + course.progress, 0) / activeCourses.length)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Across active courses
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedCourses.length}</div>
            <p className="text-xs text-muted-foreground">
              Courses finished
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Active Courses */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Active Courses</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activeCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-lg ${course.color} flex items-center justify-center text-white font-bold text-lg mb-3`}>
                    {course.code.split(' ')[1]}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {course.credits} Credits
                  </Badge>
                </div>
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {course.instructor}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {course.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                  <div className="text-right text-sm text-muted-foreground">
                    {course.progress}% complete
                  </div>
                </div>

                {course.nextDeadline && (
                  <div className="flex items-center gap-2 p-2 bg-orange-50 rounded-md">
                    <Calendar className="h-4 w-4 text-orange-600" />
                    <span className="text-sm text-orange-800">
                      Next deadline: {new Date(course.nextDeadline).toLocaleDateString()}
                    </span>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1">
                    <Play className="mr-2 h-3 w-3" />
                    Continue
                  </Button>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Completed Courses */}
      {completedCourses.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Completed Courses</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {completedCourses.map((course) => (
              <Card key={course.id} className="opacity-75 hover:opacity-100 transition-opacity">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-lg ${course.color} flex items-center justify-center text-white font-bold text-lg mb-3`}>
                      ✓
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      Completed
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {course.instructor}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {course.description}
                  </p>
                  
                  <div className="space-y-2">
                    <Progress value={100} className="h-2" />
                    <div className="text-right text-sm text-green-600 font-medium">
                      100% Complete
                    </div>
                  </div>

                  <Button size="sm" variant="outline" className="w-full">
                    View Certificate
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}