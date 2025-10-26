import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Users, 
  Search, 
  Filter, 
  Download,
  Mail,
  MessageCircle,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  FileText,
  Award,
  BarChart3
} from 'lucide-react'

// Enhanced mock student data with detailed analytics
const students = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.johnson@university.edu',
    studentId: 'CS2021001',
    avatar: '/placeholder-avatar.jpg',
    enrolledCourses: ['CS-401', 'CS-380', 'CS-425'],
    overallGrade: 94.5,
    completionRate: 98.2,
    submissionsTotal: 47,
    submissionsLate: 1,
    submissionsOnTime: 46,
    assignmentsCompleted: 47,
    assignmentsPending: 2,
    lastActivity: '2025-09-22T10:30:00',
    trend: 'up' as const,
    status: 'active' as const,
    badges: 8,
    totalPoints: 1580,
    weeklyStudyHours: 28,
    attendanceRate: 96.8,
    participationScore: 92,
    recentGrades: [95, 98, 92, 96, 94],
    courseBreakdown: {
      'CS-401': { grade: 96.2, points: 580, assignments: 18, completed: 18 },
      'CS-380': { grade: 93.8, points: 520, assignments: 16, completed: 16 },
      'CS-425': { grade: 93.5, points: 480, assignments: 13, completed: 13 }
    },
    strengthAreas: ['Frontend Development', 'UI/UX Design', 'Problem Solving'],
    improvementAreas: ['Backend Systems', 'Database Optimization'],
    nextDeadlines: [
      { course: 'CS-401', assignment: 'Final Project', dueDate: '2025-10-15', priority: 'high' },
      { course: 'CS-380', assignment: 'Query Optimization Lab', dueDate: '2025-10-02', priority: 'medium' }
    ]
  },
  {
    id: '2', 
    name: 'Bob Chen',
    email: 'bob.chen@university.edu',
    studentId: 'CS2021002',
    avatar: '/placeholder-avatar.jpg',
    enrolledCourses: ['CS-401', 'CS-380'],
    overallGrade: 87.3,
    completionRate: 92.1,
    submissionsTotal: 32,
    submissionsLate: 3,
    submissionsOnTime: 29,
    assignmentsCompleted: 32,
    assignmentsPending: 3,
    lastActivity: '2025-09-21T16:45:00',
    trend: 'up' as const,
    status: 'active' as const,
    badges: 5,
    totalPoints: 1240,
    weeklyStudyHours: 22,
    attendanceRate: 89.4,
    participationScore: 78,
    recentGrades: [85, 89, 82, 91, 88],
    courseBreakdown: {
      'CS-401': { grade: 89.1, points: 640, assignments: 18, completed: 17 },
      'CS-380': { grade: 85.5, points: 600, assignments: 16, completed: 15 }
    },
    strengthAreas: ['Logical Thinking', 'Code Debugging', 'Algorithm Design'],
    improvementAreas: ['Presentation Skills', 'Code Documentation', 'Time Management'],
    nextDeadlines: [
      { course: 'CS-401', assignment: 'React Components', dueDate: '2025-09-30', priority: 'high' },
      { course: 'CS-380', assignment: 'Database Design', dueDate: '2025-10-05', priority: 'medium' }
    ]
  },
  {
    id: '3',
    name: 'Sarah Kim',
    email: 'sarah.kim@university.edu', 
    studentId: 'CS2021003',
    avatar: '/placeholder-avatar.jpg',
    enrolledCourses: ['CS-425', 'CS-450'],
    overallGrade: 96.8,
    completionRate: 100.0,
    submissionsTotal: 28,
    submissionsLate: 0,
    submissionsOnTime: 28,
    assignmentsCompleted: 28,
    assignmentsPending: 0,
    lastActivity: '2025-09-22T14:20:00',
    trend: 'up' as const,
    status: 'active' as const,
    badges: 12,
    totalPoints: 1890,
    weeklyStudyHours: 32,
    attendanceRate: 100.0,
    participationScore: 98,
    recentGrades: [98, 97, 99, 95, 96],
    courseBreakdown: {
      'CS-425': { grade: 97.2, points: 980, assignments: 15, completed: 15 },
      'CS-450': { grade: 96.4, points: 910, assignments: 13, completed: 13 }
    },
    strengthAreas: ['Research Skills', 'User Experience', 'Project Management', 'Technical Writing'],
    improvementAreas: ['Public Speaking'],
    nextDeadlines: [
      { course: 'CS-425', assignment: 'Usability Study', dueDate: '2025-10-08', priority: 'medium' },
      { course: 'CS-450', assignment: 'ML Model Deployment', dueDate: '2025-10-12', priority: 'high' }
    ]
  },
  {
    id: '4',
    name: 'Mike Rodriguez',
    email: 'mike.rodriguez@university.edu',
    studentId: 'CS2021004',
    avatar: '/placeholder-avatar.jpg',
    enrolledCourses: ['CS-380', 'CS-450'],
    overallGrade: 78.2,
    completionRate: 85.4,
    submissionsTotal: 25,
    submissionsLate: 6,
    submissionsOnTime: 19,
    assignmentsCompleted: 25,
    assignmentsPending: 7,
    lastActivity: '2025-09-20T09:15:00',
    trend: 'down' as const,
    status: 'at_risk' as const,
    badges: 3,
    totalPoints: 890,
    weeklyStudyHours: 15,
    attendanceRate: 72.3,
    participationScore: 58,
    recentGrades: [72, 68, 85, 75, 80],
    courseBreakdown: {
      'CS-380': { grade: 76.8, points: 440, assignments: 16, completed: 12 },
      'CS-450': { grade: 79.6, points: 450, assignments: 13, completed: 10 }
    },
    strengthAreas: ['Mathematical Concepts', 'Data Analysis'],
    improvementAreas: ['Time Management', 'Assignment Submission', 'Class Attendance', 'Study Habits'],
    nextDeadlines: [
      { course: 'CS-380', assignment: 'SQL Assignment (OVERDUE)', dueDate: '2025-09-25', priority: 'urgent' },
      { course: 'CS-450', assignment: 'Data Visualization', dueDate: '2025-10-01', priority: 'high' }
    ]
  },
  {
    id: '5',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@university.edu',
    studentId: 'CS2021005',
    avatar: '/placeholder-avatar.jpg',
    enrolledCourses: ['CS-401', 'CS-425', 'CS-450'],
    overallGrade: 91.7,
    completionRate: 94.8,
    submissionsTotal: 38,
    submissionsLate: 2,
    submissionsOnTime: 36,
    assignmentsCompleted: 38,
    assignmentsPending: 3,
    lastActivity: '2025-09-22T11:55:00',
    trend: 'up' as const,
    status: 'active' as const,
    badges: 7,
    totalPoints: 1450,
    weeklyStudyHours: 26,
    attendanceRate: 93.2,
    participationScore: 88,
    recentGrades: [90, 94, 89, 93, 91],
    courseBreakdown: {
      'CS-401': { grade: 92.8, points: 520, assignments: 18, completed: 17 },
      'CS-425': { grade: 90.1, points: 480, assignments: 15, completed: 14 },
      'CS-450': { grade: 92.2, points: 450, assignments: 13, completed: 12 }
    },
    strengthAreas: ['Collaboration', 'Creative Problem Solving', 'Testing & QA'],
    improvementAreas: ['Advanced Algorithms', 'System Architecture'],
    nextDeadlines: [
      { course: 'CS-401', assignment: 'API Integration', dueDate: '2025-10-03', priority: 'medium' },
      { course: 'CS-425', assignment: 'Prototype Testing', dueDate: '2025-10-06', priority: 'medium' }
    ]
  },
  {
    id: '6',
    name: 'David Park',
    email: 'david.park@university.edu',
    studentId: 'CS2021006',
    avatar: '/placeholder-avatar.jpg',
    enrolledCourses: ['CS-401', 'CS-380', 'CS-450'],
    overallGrade: 85.9,
    completionRate: 89.7,
    submissionsTotal: 35,
    submissionsLate: 4,
    submissionsOnTime: 31,
    assignmentsCompleted: 35,
    assignmentsPending: 4,
    lastActivity: '2025-09-22T08:20:00',
    trend: 'up' as const,
    status: 'active' as const,
    badges: 6,
    totalPoints: 1320,
    weeklyStudyHours: 24,
    attendanceRate: 91.5,
    participationScore: 82,
    recentGrades: [87, 82, 89, 85, 88],
    courseBreakdown: {
      'CS-401': { grade: 87.3, points: 480, assignments: 18, completed: 16 },
      'CS-380': { grade: 83.8, points: 420, assignments: 16, completed: 14 },
      'CS-450': { grade: 86.6, points: 420, assignments: 13, completed: 12 }
    },
    strengthAreas: ['System Design', 'Code Optimization', 'Team Leadership'],
    improvementAreas: ['Frontend Styling', 'User Interface Design'],
    nextDeadlines: [
      { course: 'CS-401', assignment: 'Performance Testing', dueDate: '2025-10-04', priority: 'medium' },
      { course: 'CS-450', assignment: 'Predictive Model', dueDate: '2025-10-07', priority: 'high' }
    ]
  }
]

const stats = {
  totalStudents: 156,
  activeStudents: 142,
  atRiskStudents: 8,
  inactiveStudents: 6,
  averageGrade: 87.2,
  averageCompletion: 92.4,
  totalPoints: 198450,
  averagePoints: 1272,
  totalAssignments: 2184,
  completedAssignments: 2016,
  averageStudyHours: 24.5,
  topPerformer: 'Sarah Kim',
  mostImproved: 'Emily Rodriguez',
  attendanceRate: 88.7,
  engagementScore: 84.3
}

const courseSummary = [
  { 
    code: 'CS-401', 
    name: 'Advanced Web Development', 
    students: 45, 
    avgGrade: 88.5,
    totalPoints: 24750,
    avgPoints: 550,
    assignments: 18,
    completionRate: 92.3,
    attendanceRate: 89.2,
    topStudent: 'Alice Johnson',
    strugglingStudents: 3
  },
  { 
    code: 'CS-380', 
    name: 'Database Systems', 
    students: 52, 
    avgGrade: 85.1,
    totalPoints: 26520,
    avgPoints: 510,
    assignments: 16,
    completionRate: 88.7,
    attendanceRate: 85.8,
    topStudent: 'Sarah Kim',
    strugglingStudents: 5
  },
  { 
    code: 'CS-425', 
    name: 'Human-Computer Interaction', 
    students: 38, 
    avgGrade: 91.3,
    totalPoints: 28120,
    avgPoints: 740,
    assignments: 15,
    completionRate: 95.1,
    attendanceRate: 93.4,
    topStudent: 'Sarah Kim',
    strugglingStudents: 1
  },
  { 
    code: 'CS-450', 
    name: 'Data Science', 
    students: 21, 
    avgGrade: 82.7,
    totalPoints: 14070,
    avgPoints: 670,
    assignments: 13,
    completionRate: 86.9,
    attendanceRate: 87.1,
    topStudent: 'Emily Rodriguez',
    strugglingStudents: 4
  }
]

export default function Students() {
  const atRiskStudents = students.filter(s => s.status === 'at_risk')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Management</h1>
          <p className="text-muted-foreground">
            Monitor and manage student progress across all courses
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button variant="outline">
            <MessageCircle className="mr-2 h-4 w-4" />
            Send Message
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">Enrolled this semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.activeStudents}</div>
            <p className="text-xs text-muted-foreground">Regularly participating</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">At Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.atRiskStudents}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive</CardTitle>
            <Clock className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.inactiveStudents}</div>
            <p className="text-xs text-muted-foreground">No recent activity</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Grade</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageGrade}%</div>
            <p className="text-xs text-muted-foreground">All students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageCompletion}%</div>
            <p className="text-xs text-muted-foreground">Assignment rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Points</CardTitle>
            <Award className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.totalPoints.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Points</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.averagePoints}</div>
            <p className="text-xs text-muted-foreground">Per student</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
            <Clock className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.averageStudyHours}h</div>
            <p className="text-xs text-muted-foreground">Weekly average</p>
          </CardContent>
        </Card>
      </div>

      {/* Course Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Course Enrollment Summary
          </CardTitle>
          <CardDescription>
            Student distribution across your courses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {courseSummary.map((course) => (
              <div key={course.code} className="p-4 border rounded-lg">
                <h4 className="font-medium">{course.code}</h4>
                <p className="text-sm text-muted-foreground mb-2">{course.name}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm">{course.students} students</span>
                  <Badge variant="outline">Avg: {course.avgGrade}%</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by name, email, or student ID..." className="pl-10" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Students</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="at_risk">At Risk</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="cs401">CS-401</SelectItem>
                <SelectItem value="cs380">CS-380</SelectItem>
                <SelectItem value="cs425">CS-425</SelectItem>
                <SelectItem value="cs450">CS-450</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* At Risk Students Alert */}
      {atRiskStudents.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <AlertTriangle className="h-5 w-5" />
              Students at Risk ({atRiskStudents.length})
            </CardTitle>
            <CardDescription className="text-orange-700">
              These students need immediate attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {atRiskStudents.map((student) => (
                <StudentCard key={student.id} student={student} isHighlighted={true} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Students */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            All Students ({students.length})
          </CardTitle>
          <CardDescription>
            Complete list of enrolled students
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {students.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function StudentCard({ student, isHighlighted = false }: { 
  student: typeof students[0], 
  isHighlighted?: boolean 
}) {
  return (
    <div className={`border rounded-lg p-6 ${isHighlighted ? 'border-orange-200 bg-orange-50' : 'bg-white'}`}>
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={student.avatar} alt={student.name} />
            <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">
              {student.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-bold text-xl">{student.name}</h3>
            <p className="text-muted-foreground">{student.email}</p>
            <p className="text-sm text-muted-foreground">ID: {student.studentId}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge variant={student.status === 'active' ? 'default' : 'destructive'} className="capitalize">
            {student.status.replace('_', ' ')}
          </Badge>
          <div className="flex items-center gap-1">
            {student.trend === 'up' ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
            <span className="text-sm text-muted-foreground">
              {student.trend === 'up' ? 'Improving' : 'Declining'}
            </span>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-blue-600">{student.overallGrade}%</p>
          <p className="text-sm text-muted-foreground">Overall Grade</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-green-600">{student.totalPoints}</p>
          <p className="text-sm text-muted-foreground">Total Points</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-purple-600">{student.badges}</p>
          <p className="text-sm text-muted-foreground">Badges Earned</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-orange-600">{student.weeklyStudyHours}h</p>
          <p className="text-sm text-muted-foreground">Weekly Study</p>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Completion Rate</span>
            <span className="text-sm text-muted-foreground">{student.completionRate}%</span>
          </div>
          <Progress value={student.completionRate} className="h-3" />
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Attendance Rate</span>
            <span className="text-sm text-muted-foreground">{student.attendanceRate}%</span>
          </div>
          <Progress value={student.attendanceRate} className="h-3" />
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Participation</span>
            <span className="text-sm text-muted-foreground">{student.participationScore}%</span>
          </div>
          <Progress value={student.participationScore} className="h-3" />
        </div>
      </div>

      {/* Assignment Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="font-semibold text-green-600">{student.submissionsOnTime}</span>
          </div>
          <p className="text-xs text-muted-foreground">On Time</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Clock className="h-4 w-4 text-orange-500" />
            <span className="font-semibold text-orange-600">{student.submissionsLate}</span>
          </div>
          <p className="text-xs text-muted-foreground">Late</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <FileText className="h-4 w-4 text-blue-500" />
            <span className="font-semibold text-blue-600">{student.assignmentsCompleted}</span>
          </div>
          <p className="text-xs text-muted-foreground">Completed</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <span className="font-semibold text-red-600">{student.assignmentsPending}</span>
          </div>
          <p className="text-xs text-muted-foreground">Pending</p>
        </div>
      </div>

      {/* Course Breakdown */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Course Performance</h4>
        <div className="space-y-3">
          {Object.entries(student.courseBreakdown).map(([courseCode, data]) => (
            <div key={courseCode} className="bg-gray-50 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <Badge variant="outline">{courseCode}</Badge>
                <span className="text-sm font-medium">{data.grade}%</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                <span>{data.points} points</span>
                <span>{data.completed}/{data.assignments} assignments</span>
                <Progress value={(data.completed / data.assignments) * 100} className="h-1" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths and Areas for Improvement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <h4 className="font-semibold mb-2 text-green-700">Strengths</h4>
          <div className="flex flex-wrap gap-1">
            {student.strengthAreas.map((strength, index) => (
              <Badge key={index} variant="secondary" className="text-xs bg-green-100 text-green-700">
                {strength}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-orange-700">Areas for Improvement</h4>
          <div className="flex flex-wrap gap-1">
            {student.improvementAreas.map((area, index) => (
              <Badge key={index} variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                {area}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Upcoming Deadlines</h4>
        <div className="space-y-2">
          {student.nextDeadlines.map((deadline, index) => (
            <div key={index} className={`flex items-center justify-between p-2 rounded border-l-4 ${
              deadline.priority === 'urgent' ? 'border-red-500 bg-red-50' :
              deadline.priority === 'high' ? 'border-orange-500 bg-orange-50' :
              'border-blue-500 bg-blue-50'
            }`}>
              <div>
                <p className="text-sm font-medium">{deadline.assignment}</p>
                <p className="text-xs text-muted-foreground">{deadline.course}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{new Date(deadline.dueDate).toLocaleDateString()}</p>
                <Badge variant={
                  deadline.priority === 'urgent' ? 'destructive' :
                  deadline.priority === 'high' ? 'default' : 'secondary'
                } className="text-xs">
                  {deadline.priority}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="text-sm text-muted-foreground">
          Last activity: {new Date(student.lastActivity).toLocaleDateString()}
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline">
            <Mail className="h-4 w-4 mr-1" />
            Email
          </Button>
          <Button size="sm" variant="outline">
            <BarChart3 className="h-4 w-4 mr-1" />
            Full Report
          </Button>
          <Button size="sm">
            <MessageCircle className="h-4 w-4 mr-1" />
            Message
          </Button>
        </div>
      </div>
    </div>
  )
}