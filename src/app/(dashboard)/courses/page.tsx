import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import {
  BookOpen,
  Clock,
  Users,
  TrendingUp,
  Play,
  Settings,
  BarChart3,
  FileText
} from 'lucide-react'
import { fetchCourses } from '@/lib/api'
const educatorCourses = [
  {
    id: '1',
    title: 'Advanced Web Development',
    code: 'CS 401',
    semester: 'Fall 2025',
    students: 45,
    capacity: 50,
    assignments: 12,
    pendingGrades: 8,
    status: 'active' as const,
    credits: 3,
    schedule: 'MWF 10:00-11:00 AM',
    description: 'Advanced concepts in modern web development including React, Next.js, and full-stack applications.',
    color: 'bg-blue-500'
  },
  {
    id: '2',
    title: 'Database Systems', 
    code: 'CS 320',
    semester: 'Fall 2025',
    students: 52,
    capacity: 55,
    assignments: 15,
    pendingGrades: 12,
    status: 'active' as const,
    credits: 4,
    schedule: 'TTh 2:00-3:30 PM',
    description: 'Comprehensive study of database design, SQL, NoSQL, and database management systems.',
    color: 'bg-green-500'
  },
  {
    id: '3',
    title: 'Human-Computer Interaction',
    code: 'CS 425',
    semester: 'Fall 2025',
    students: 38,
    capacity: 40,
    assignments: 10,
    pendingGrades: 3,
    status: 'active' as const,
    credits: 3,
    schedule: 'MW 1:00-2:30 PM',
    description: 'User experience design principles, usability testing, and interface design methodologies.',
    color: 'bg-purple-500'
  },
  {
    id: '4',
    title: 'Machine Learning',
    code: 'CS 410',
    semester: 'Spring 2025',
    students: 28,
    capacity: 35,
    assignments: 8,
    pendingGrades: 5,
    status: 'active' as const,
    credits: 4,
    schedule: 'TTh 10:00-11:30 AM',
    description: 'Supervised and unsupervised learning, neural networks, and practical ML applications.',
    color: 'bg-orange-500'
  },
  {
    id: '5',
    title: 'Operating Systems',
    code: 'CS 310',
    semester: 'Spring 2025',
    students: 42,
    capacity: 45,
    assignments: 6,
    pendingGrades: 2,
    status: 'active' as const,
    credits: 4,
    schedule: 'MWF 9:00-10:00 AM',
    description: 'Process management, memory management, file systems, and concurrent programming.',
    color: 'bg-red-500'
  },
  {
    id: '6',
    title: 'Data Structures & Algorithms',
    code: 'CS 200',
    semester: 'Fall 2025',
    students: 68,
    capacity: 70,
    assignments: 10,
    pendingGrades: 15,
    status: 'active' as const,
    credits: 4,
    schedule: 'MWF 11:00-12:00 PM',
    description: 'Fundamental data structures and algorithm analysis for efficient problem solving.',
    color: 'bg-indigo-500'
  }
]

// Mock student courses data
const mockCourses = [
  {
    id: '1',
    title: 'Advanced Web Development',
    code: 'CS 401',
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
    code: 'CS 320',
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
    code: 'CS 425',
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
    code: 'CS 340',
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
    code: 'CS 200',
    instructor: 'Prof. Lisa Wang',
    progress: 100,
    totalLessons: 18,
    completedLessons: 18,
    nextDeadline: null,
    status: 'completed' as const,
    credits: 4,
    description: 'Fundamental data structures and algorithm analysis for efficient problem solving.',
    color: 'bg-gray-500'
  },
  {
    id: '6',
    title: 'Machine Learning',
    code: 'CS 410',
    instructor: 'Dr. Amanda Lee',
    progress: 35,
    totalLessons: 20,
    completedLessons: 7,
    nextDeadline: '2025-10-02',
    status: 'active' as const,
    credits: 4,
    description: 'Supervised and unsupervised learning, neural networks, and practical ML applications.',
    color: 'bg-teal-500'
  },
  {
    id: '7',
    title: 'Programming Fundamentals',
    code: 'CS 150',
    instructor: 'Prof. David Wilson',
    progress: 100,
    totalLessons: 16,
    completedLessons: 16,
    nextDeadline: null,
    status: 'completed' as const,
    credits: 3,
    description: 'Introduction to programming using Python. Variables, control structures, functions, and basic data structures.',
    color: 'bg-cyan-500'
  },
  {
    id: '8',
    title: 'Cybersecurity',
    code: 'CS 430',
    instructor: 'Dr. Jennifer Martinez',
    progress: 58,
    totalLessons: 18,
    completedLessons: 10,
    nextDeadline: '2025-09-27',
    status: 'active' as const,
    credits: 3,
    description: 'Information security, cryptography, network security, and ethical hacking principles.',
    color: 'bg-red-600'
  }
]

export const dynamic = 'force-dynamic'

export default async function CoursesPage() {
  const session = await getServerSession(authOptions)
  const userRole = session?.user?.role || 'STUDENT'
  
  // Fetch real courses data
  const courses = await fetchCourses() // Get enrolled courses
  
  if (userRole === 'EDUCATOR') {
    return <EducatorCoursesView />
  }
  
  return <StudentCoursesView courses={courses.map(course => ({
    ...course,
    instructor: { name: course.instructor || 'Unknown' },
    _count: { enrollments: 0 }
  }))} />
}

interface DatabaseCourse {
  id: string
  title: string
  code: string
  description: string
  instructor: { name: string }
  _count: { enrollments: number }
}

function StudentCoursesView({ courses }: { courses: DatabaseCourse[] }) {
  const activeCourses = courses // All courses are considered active from database
  const completedCourses: DatabaseCourse[] = [] // No completed courses from database yet

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
              {Math.round(activeCourses.reduce((sum) => sum + 75, 0) / activeCourses.length)}% {/* Mock progress */}
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
                                    <div className={`w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold text-lg mb-3`}>
                    {course.code.slice(0, 2)}
                  </div>
                  <Badge variant="secondary" className="mb-2">
                    3 Credits
                  </Badge>
                </div>
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {course.instructor.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {course.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                                        <span>8/12 lessons</span>
                  </div>
                  <Progress value={67} className="h-2" />
                  <div className="text-sm text-muted-foreground text-right">
                    67% complete
                  </div>
                </div>



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
                    <div className={`w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center text-white font-bold text-lg mb-3`}>
                      ✓
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      Completed
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {course.instructor.name}
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

function EducatorCoursesView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
          <p className="text-muted-foreground">
            Manage your teaching courses and track student progress
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Course Settings
          </Button>
          <Button>
            <BookOpen className="mr-2 h-4 w-4" />
            Create Course
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{educatorCourses.length}</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {educatorCourses.reduce((sum, course) => sum + course.students, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Enrolled across all courses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assignments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {educatorCourses.reduce((sum, course) => sum + course.assignments, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Total created</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Grades</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {educatorCourses.reduce((sum, course) => sum + course.pendingGrades, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Need review</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Courses */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Teaching Courses ({educatorCourses.length})
          </CardTitle>
          <CardDescription>
            Your current semester courses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {educatorCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className={`h-2 ${course.color}`} />
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <CardDescription>{course.code} • {course.semester}</CardDescription>
                    </div>
                    <Badge variant="outline">{course.credits} credits</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{course.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Enrollment</span>
                      <span className="font-medium">{course.students}/{course.capacity}</span>
                    </div>
                    <Progress value={(course.students / course.capacity) * 100} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Schedule</p>
                      <p className="font-medium">{course.schedule}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Assignments</p>
                      <p className="font-medium">{course.assignments} created</p>
                    </div>
                  </div>

                  {course.pendingGrades > 0 && (
                    <div className="flex items-center gap-2 p-2 bg-orange-50 rounded text-sm text-orange-800">
                      <Clock className="h-4 w-4" />
                      <span>{course.pendingGrades} submissions need grading</span>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1">
                      <BarChart3 className="mr-2 h-3 w-3" />
                      Analytics
                    </Button>
                    <Button size="sm" variant="outline">
                      <Settings className="mr-2 h-3 w-3" />
                      Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}