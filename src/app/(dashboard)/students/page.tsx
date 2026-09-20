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

// Mock student data
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
    lastActivity: '2025-09-22T10:30:00',
    trend: 'up' as const,
    status: 'active' as const,
    badges: 8,
    totalPoints: 1580
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
    lastActivity: '2025-09-21T16:45:00',
    trend: 'up' as const,
    status: 'active' as const,
    badges: 5,
    totalPoints: 1240
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
    lastActivity: '2025-09-22T14:20:00',
    trend: 'up' as const,
    status: 'active' as const,
    badges: 12,
    totalPoints: 1890
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
    lastActivity: '2025-09-20T09:15:00',
    trend: 'down' as const,
    status: 'at_risk' as const,
    badges: 3,
    totalPoints: 890
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
    lastActivity: '2025-09-22T11:55:00',
    trend: 'up' as const,
    status: 'active' as const,
    badges: 7,
    totalPoints: 1450
  }
]

const stats = {
  totalStudents: 156,
  activeStudents: 142,
  atRiskStudents: 8,
  inactiveStudents: 6,
  averageGrade: 87.2,
  averageCompletion: 92.4
}

const courseSummary = [
  { code: 'CS-401', name: 'Advanced Web Development', students: 45, avgGrade: 88.5 },
  { code: 'CS-380', name: 'Database Systems', students: 52, avgGrade: 85.1 },
  { code: 'CS-425', name: 'Human-Computer Interaction', students: 38, avgGrade: 91.3 },
  { code: 'CS-450', name: 'Data Science', students: 21, avgGrade: 82.7 }
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
    <div className={`border rounded-lg p-4 ${isHighlighted ? 'border-orange-200' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={student.avatar} alt={student.name} />
            <AvatarFallback>{student.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{student.name}</h3>
            <p className="text-sm text-muted-foreground">{student.email}</p>
            <p className="text-xs text-muted-foreground">ID: {student.studentId}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={student.status === 'active' ? 'default' : 'destructive'}>
            {student.status.replace('_', ' ')}
          </Badge>
          {student.trend === 'up' ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
        <div>
          <p className="text-sm text-muted-foreground">Overall Grade</p>
          <p className="font-bold text-lg">{student.overallGrade}%</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Completion Rate</p>
          <div className="flex items-center gap-2">
            <Progress value={student.completionRate} className="h-2 flex-1" />
            <span className="text-sm font-medium">{student.completionRate}%</span>
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Submissions</p>
          <p className="font-medium">{student.submissionsTotal}</p>
          {student.submissionsLate > 0 && (
            <p className="text-xs text-orange-600">{student.submissionsLate} late</p>
          )}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Badges & Points</p>
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-yellow-500" />
            <span className="text-sm">{student.badges}</span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-sm">{student.totalPoints}pts</span>
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Last Activity</p>
          <p className="text-sm">{new Date(student.lastActivity).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Courses:</span>
          <div className="flex gap-1">
            {student.enrolledCourses.map((course) => (
              <Badge key={course} variant="outline" className="text-xs">
                {course}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline">
            <Mail className="h-4 w-4 mr-1" />
            Email
          </Button>
          <Button size="sm" variant="outline">
            <BarChart3 className="h-4 w-4 mr-1" />
            View Details
          </Button>
          <Button size="sm">
            Message
          </Button>
        </div>
      </div>
    </div>
  )
}