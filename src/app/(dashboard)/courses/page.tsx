import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { BookOpen, Clock, Users, TrendingUp, Play, Settings, BarChart3, FileText, Award, Calendar, CheckCircle, AlertTriangle, Target } from 'lucide-react'
import { prisma } from '@/lib/db/prisma'
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

export default async function CoursesPage() {
  const session = await getServerSession(authOptions)
  const userRole = session?.user?.role || 'STUDENT'
  
  // Fetch real courses data using Prisma directly for server-side rendering  
  let courses: DatabaseCourse[] = []
  
  if (session?.user?.id) {
    if (userRole === 'STUDENT') {
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
                select: { enrollments: true }
              }
            }
          }
        }
      })
      courses = enrollments.map(enrollment => ({
        id: enrollment.course.id,
        title: enrollment.course.name,
        code: enrollment.course.code,
        description: enrollment.course.description,
        instructor: enrollment.course.educator,
        _count: enrollment.course._count
      }))
    } else {
      // Get courses the educator teaches
      const educatorCourses = await prisma.course.findMany({
        where: { educatorId: session.user.id },
        include: {
          educator: {
            select: { name: true, email: true }
          },
          _count: {
            select: { enrollments: true }
          }
        }
      })
      courses = educatorCourses.map(course => ({
        id: course.id,
        title: course.name,
        code: course.code,
        description: course.description,
        instructor: course.educator,
        _count: course._count
      }))
    }
  }
  
  if (userRole === 'EDUCATOR') {
    return <EducatorCoursesView />
  }
  
  return <StudentCoursesView courses={courses} />
}

interface DatabaseCourse {
  id: string
  title: string
  code: string
  description: string | null
  instructor: { name: string | null; email?: string }
  _count: { enrollments: number }
}

// Enhanced mock data for student courses with detailed analytics
const enhancedMockCourses = [
  {
    id: '1',
    title: 'Data Structures & Algorithms',
    code: 'CS 200',
    instructor: { name: 'Prof. Lisa Wang', email: 'lisa.wang@university.edu' },
    progress: 92,
    totalLessons: 18,
    completedLessons: 16,
    nextDeadline: '2025-10-05',
    status: 'active' as const,
    credits: 4,
    description: 'Fundamental data structures and algorithm analysis for efficient problem solving.',
    color: 'bg-blue-500',
    currentGrade: 94.2,
    totalPoints: 1520,
    earnedPoints: 1432,
    assignments: 12,
    completedAssignments: 11,
    attendanceRate: 96.4,
    participationScore: 89,
    upcomingDeadlines: [
      { title: 'Graph Algorithms Assignment', dueDate: '2025-10-05', priority: 'high' as const },
      { title: 'Final Project Proposal', dueDate: '2025-10-12', priority: 'medium' as const }
    ],
    recentGrades: [95, 92, 96, 89, 94],
    strengths: ['Problem Solving', 'Algorithm Design', 'Code Optimization'],
    improvements: ['Time Complexity Analysis', 'Documentation'],
    studyHours: 8.5,
    lastActivity: '2025-09-22T14:30:00'
  },
  {
    id: '2',
    title: 'Advanced Web Development',
    code: 'CS 401',
    instructor: { name: 'Dr. Sarah Johnson', email: 'sarah.johnson@university.edu' },
    progress: 78,
    totalLessons: 20,
    completedLessons: 15,
    nextDeadline: '2025-09-30',
    status: 'active' as const,
    credits: 3,
    description: 'Advanced concepts in modern web development including React, Next.js, and full-stack applications.',
    color: 'bg-green-500',
    currentGrade: 87.8,
    totalPoints: 1200,
    earnedPoints: 1054,
    assignments: 15,
    completedAssignments: 13,
    attendanceRate: 89.2,
    participationScore: 92,
    upcomingDeadlines: [
      { title: 'React Components Lab', dueDate: '2025-09-30', priority: 'high' as const },
      { title: 'API Integration Project', dueDate: '2025-10-08', priority: 'medium' as const }
    ],
    recentGrades: [85, 89, 91, 84, 88],
    strengths: ['Frontend Development', 'UI/UX Design', 'Component Architecture'],
    improvements: ['Backend Integration', 'Testing Practices'],
    studyHours: 6.2,
    lastActivity: '2025-09-21T16:45:00'
  },
  {
    id: '3',
    title: 'Programming Fundamentals',
    code: 'CS 150',
    instructor: { name: 'Prof. David Wilson', email: 'david.wilson@university.edu' },
    progress: 100,
    totalLessons: 16,
    completedLessons: 16,
    nextDeadline: null,
    status: 'completed' as const,
    credits: 3,
    description: 'Introduction to programming using Python. Variables, control structures, functions, and basic data structures.',
    color: 'bg-purple-500',
    currentGrade: 96.5,
    totalPoints: 800,
    earnedPoints: 772,
    assignments: 10,
    completedAssignments: 10,
    attendanceRate: 98.1,
    participationScore: 95,
    upcomingDeadlines: [],
    recentGrades: [98, 95, 97, 94, 99],
    strengths: ['Python Mastery', 'Logic Implementation', 'Code Structure'],
    improvements: ['Advanced Libraries', 'Performance Optimization'],
    studyHours: 4.8,
    lastActivity: '2025-08-15T10:00:00'
  }
]

function StudentCoursesView({ courses }: { courses: DatabaseCourse[] }) {
  const activeCourses = enhancedMockCourses.filter(c => c.status === 'active')
  const completedCourses = enhancedMockCourses.filter(c => c.status === 'completed')
  const allCourses = enhancedMockCourses
  
  // Calculate overall statistics
  const totalPoints = allCourses.reduce((sum, course) => sum + course.earnedPoints, 0)
  const maxPoints = allCourses.reduce((sum, course) => sum + course.totalPoints, 0)
  const overallGrade = ((totalPoints / maxPoints) * 100).toFixed(1)
  const avgAttendance = (allCourses.reduce((sum, course) => sum + course.attendanceRate, 0) / allCourses.length).toFixed(1)
  const totalStudyHours = allCourses.reduce((sum, course) => sum + course.studyHours, 0)
  const avgProgress = (activeCourses.reduce((sum, course) => sum + course.progress, 0) / activeCourses.length).toFixed(1)

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
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart3 className="mr-2 h-4 w-4" />
            View Analytics
          </Button>
          <Button>
            <BookOpen className="mr-2 h-4 w-4" />
            Browse All Courses
          </Button>
        </div>
      </div>

      {/* Enhanced Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Grade</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{overallGrade}%</div>
            <p className="text-xs text-muted-foreground">
              Across all courses
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Points</CardTitle>
            <Award className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{totalPoints.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Out of {maxPoints.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{avgProgress}%</div>
            <p className="text-xs text-muted-foreground">
              Active courses
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{avgAttendance}%</div>
            <p className="text-xs text-muted-foreground">
              Average rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
            <Clock className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{totalStudyHours}h</div>
            <p className="text-xs text-muted-foreground">
              This week
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
        <h2 className="text-2xl font-semibold mb-4">Active Courses ({activeCourses.length})</h2>
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {activeCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className={`w-16 h-16 rounded-lg ${course.color} flex items-center justify-center text-white font-bold text-xl mb-3`}>
                    {course.code.split(' ')[0]}
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="mb-2">
                      {course.credits} Credits
                    </Badge>
                    <div className="text-2xl font-bold text-green-600">{course.currentGrade}%</div>
                  </div>
                </div>
                <CardTitle className="text-xl">{course.title}</CardTitle>
                <CardDescription className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {course.instructor.name}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {course.code}
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-sm text-muted-foreground">
                  {course.description}
                </p>

                {/* Progress Section */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Course Progress</span>
                    <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                  </div>
                  <Progress value={course.progress} className="h-3" />
                  <div className="text-sm text-muted-foreground text-right">
                    {course.progress}% complete
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-4 py-4 border-t border-b">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{course.earnedPoints}</div>
                    <div className="text-xs text-muted-foreground">Points Earned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{course.attendanceRate}%</div>
                    <div className="text-xs text-muted-foreground">Attendance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">{course.studyHours}h</div>
                    <div className="text-xs text-muted-foreground">Weekly Study</div>
                  </div>
                </div>

                {/* Assignment Progress */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Assignments</span>
                    <span className="text-sm text-muted-foreground">
                      {course.completedAssignments}/{course.assignments} completed
                    </span>
                  </div>
                  <Progress 
                    value={(course.completedAssignments / course.assignments) * 100} 
                    className="h-2" 
                  />
                </div>

                {/* Upcoming Deadlines */}
                {course.upcomingDeadlines.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Upcoming Deadlines</h4>
                    {course.upcomingDeadlines.slice(0, 2).map((deadline, index) => (
                      <div key={index} className={`flex items-center justify-between p-3 rounded-lg border-l-4 ${
                        deadline.priority === 'high' ? 'border-red-500 bg-red-50' :
                        deadline.priority === 'medium' ? 'border-orange-500 bg-orange-50' :
                        'border-blue-500 bg-blue-50'
                      }`}>
                        <div>
                          <p className="text-sm font-medium">{deadline.title}</p>
                          <p className="text-xs text-muted-foreground">
                            Due: {new Date(deadline.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant={
                          deadline.priority === 'high' ? 'destructive' : 'default'
                        } className="text-xs">
                          {deadline.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}

                {/* Strengths and Improvements */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-green-700 mb-2">Strengths</h4>
                    <div className="flex flex-wrap gap-1">
                      {course.strengths.slice(0, 2).map((strength, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-green-100 text-green-700">
                          {strength}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-orange-700 mb-2">Focus Areas</h4>
                    <div className="flex flex-wrap gap-1">
                      {course.improvements.slice(0, 2).map((improvement, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                          {improvement}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  <Button size="sm" className="flex-1">
                    <Play className="mr-2 h-3 w-3" />
                    Continue Learning
                  </Button>
                  <Button size="sm" variant="outline">
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
      </div>

      {/* Completed Courses */}
      {completedCourses.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Completed Courses ({completedCourses.length})</h2>
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            {completedCourses.map((course) => (
              <Card key={course.id} className="border-green-200 bg-green-50 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`w-16 h-16 rounded-lg bg-green-500 flex items-center justify-center text-white font-bold text-2xl mb-3`}>
                      ✓
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-600 mb-2">
                        Completed
                      </Badge>
                      <div className="text-2xl font-bold text-green-600">{course.currentGrade}%</div>
                    </div>
                  </div>
                  <CardTitle className="text-xl text-green-800">{course.title}</CardTitle>
                  <CardDescription className="flex items-center justify-between text-green-700">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {course.instructor.name}
                    </div>
                    <Badge variant="outline" className="text-xs border-green-300">
                      {course.code}
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-green-700">
                    {course.description}
                  </p>
                  
                  {/* Final Stats */}
                  <div className="grid grid-cols-3 gap-4 py-4 border-t border-green-200">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{course.earnedPoints}</div>
                      <div className="text-xs text-green-600">Final Points</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{course.attendanceRate}%</div>
                      <div className="text-xs text-green-600">Attendance</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{course.credits}</div>
                      <div className="text-xs text-green-600">Credits Earned</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Progress value={100} className="h-3" />
                    <div className="text-right text-sm text-green-600 font-medium">
                      Course Completed Successfully
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1 border-green-300 text-green-700 hover:bg-green-100">
                      <Award className="mr-2 h-3 w-3" />
                      View Certificate
                    </Button>
                    <Button size="sm" variant="outline" className="border-green-300 text-green-700 hover:bg-green-100">
                      <BarChart3 className="mr-2 h-3 w-3" />
                      Final Report
                    </Button>
                  </div>
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