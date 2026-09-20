'use client'

import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  FileText,
  Clock,
  CheckCircle,
  Upload,
  Filter,
  Search,
  Plus,
  Bot,
  Settings,
  Eye,
  Edit,
  BarChart3
} from 'lucide-react'

// Assignment interface with autograding support
interface Assignment {
  id: string
  title: string
  course: string
  courseCode: string
  description: string
  dueDate: string
  assignedDate: string
  points: number
  status: 'draft' | 'published' | 'closed'
  priority: 'low' | 'medium' | 'high'
  submissionType: string[]
  instructions: string
  estimatedTime: number
  hasAutograding: boolean
  autogradingConfig?: {
    id: string
    language: string
    totalTests: number
    passingRate: number
  }
  submissions?: {
    total: number
    graded: number
    pending: number
  }
  studentProgress?: {
    submitted: boolean
    score?: number
    submissionDate?: string
    feedback?: string
  }
}

// Mock assignments with autograding data
const mockAssignments: Assignment[] = [
  {
    id: '1',
    title: 'Binary Search Algorithm',
    course: 'Data Structures',
    courseCode: 'CS 380',
    description: 'Implement an efficient binary search algorithm with proper error handling.',
    dueDate: '2025-09-25T23:59:00',
    assignedDate: '2025-09-10T00:00:00',
    points: 100,
    status: 'published',
    priority: 'high',
    submissionType: ['python', 'java', 'cpp'],
    instructions: 'Implement binary search function that returns the index of target element or -1 if not found.',
    estimatedTime: 8,
    hasAutograding: true,
    autogradingConfig: {
      id: 'config-1',
      language: 'python',
      totalTests: 15,
      passingRate: 89.5
    },
    submissions: {
      total: 45,
      graded: 42,
      pending: 3
    },
    studentProgress: {
      submitted: true,
      score: 87,
      submissionDate: '2025-09-20T14:30:00',
      feedback: 'Great implementation! Consider edge cases for empty arrays.'
    }
  },
  {
    id: '2',
    title: 'React Component Library',
    course: 'Web Development',
    courseCode: 'CS 401',
    description: 'Build a reusable component library with TypeScript and automated testing.',
    dueDate: '2025-09-30T23:59:00',
    assignedDate: '2025-09-15T00:00:00',
    points: 150,
    status: 'published',
    priority: 'medium',
    submissionType: ['zip', 'github'],
    instructions: 'Create at least 10 components with Storybook documentation and Jest tests.',
    estimatedTime: 20,
    hasAutograding: true,
    autogradingConfig: {
      id: 'config-2',
      language: 'javascript',
      totalTests: 28,
      passingRate: 72.1
    },
    submissions: {
      total: 38,
      graded: 25,
      pending: 13
    },
    studentProgress: {
      submitted: false
    }
  },
  {
    id: '3',
    title: 'Database Query Optimization',
    course: 'Database Systems',
    courseCode: 'CS 320',
    description: 'Optimize SQL queries for better performance on large datasets.',
    dueDate: '2025-10-05T23:59:00',
    assignedDate: '2025-09-20T00:00:00',
    points: 120,
    status: 'published',
    priority: 'medium',
    submissionType: ['sql', 'pdf'],
    instructions: 'Analyze and optimize the provided queries, document your approach.',
    estimatedTime: 12,
    hasAutograding: false,
    submissions: {
      total: 42,
      graded: 8,
      pending: 34
    },
    studentProgress: {
      submitted: false
    }
  }
]

export default function AssignmentsPage() {
  const { data: session } = useSession()
  const isEducator = session?.user?.role === 'EDUCATOR'

  if (isEducator) {
    return <EducatorAssignmentsView assignments={mockAssignments} />
  }

  return <StudentAssignmentsView assignments={mockAssignments} />
}

function EducatorAssignmentsView({ assignments }: { assignments: Assignment[] }) {
  const draftAssignments = assignments.filter(a => a.status === 'draft')
  const publishedAssignments = assignments.filter(a => a.status === 'published')
  const autogradedAssignments = assignments.filter(a => a.hasAutograding)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assignment Management</h1>
          <p className="text-muted-foreground">
            Create and manage course assignments with automated grading
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Bot className="mr-2 h-4 w-4" />
            Autograding Dashboard
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Assignment
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignments.length}</div>
            <p className="text-xs text-muted-foreground">Active assignments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Autograded</CardTitle>
            <Bot className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{autogradedAssignments.length}</div>
            <p className="text-xs text-muted-foreground">With automated grading</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {assignments.reduce((sum, a) => sum + (a.submissions?.pending || 0), 0)}
            </div>
            <p className="text-xs text-muted-foreground">Submissions to review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82.4%</div>
            <p className="text-xs text-muted-foreground">Across all assignments</p>
          </CardContent>
        </Card>
      </div>

      {/* Assignment Cards */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Published Assignments</h2>
          <div className="grid gap-4">
            {publishedAssignments.map((assignment) => (
              <EducatorAssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </div>
        </div>

        {draftAssignments.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Draft Assignments</h2>
            <div className="grid gap-4">
              {draftAssignments.map((assignment) => (
                <EducatorAssignmentCard key={assignment.id} assignment={assignment} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function StudentAssignmentsView({ assignments }: { assignments: Assignment[] }) {
  const pendingAssignments = assignments.filter(a => !a.studentProgress?.submitted)
  const submittedAssignments = assignments.filter(a => a.studentProgress?.submitted)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Assignments</h1>
          <p className="text-muted-foreground">
            View and submit your course assignments
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingAssignments.length}</div>
            <p className="text-xs text-muted-foreground">Due soon</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Submitted</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{submittedAssignments.length}</div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {submittedAssignments.length > 0 
                ? Math.round(submittedAssignments.reduce((sum, a) => sum + (a.studentProgress?.score || 0), 0) / submittedAssignments.length)
                : 0}%
            </div>
            <p className="text-xs text-muted-foreground">Your performance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Autograded</CardTitle>
            <Bot className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {assignments.filter(a => a.hasAutograding).length}
            </div>
            <p className="text-xs text-muted-foreground">Instant feedback</p>
          </CardContent>
        </Card>
      </div>

      {/* Assignment Lists */}
      <div className="space-y-6">
        {pendingAssignments.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-orange-600">Pending Assignments</h2>
            <div className="grid gap-4">
              {pendingAssignments.map((assignment) => (
                <StudentAssignmentCard key={assignment.id} assignment={assignment} />
              ))}
            </div>
          </div>
        )}

        {submittedAssignments.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-green-600">Submitted Assignments</h2>
            <div className="grid gap-4">
              {submittedAssignments.map((assignment) => (
                <StudentAssignmentCard key={assignment.id} assignment={assignment} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function EducatorAssignmentCard({ assignment }: { assignment: Assignment }) {
  const getDaysUntilDue = (dueDate: string) => {
    const now = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - now.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const daysUntilDue = getDaysUntilDue(assignment.dueDate)

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">{assignment.title}</CardTitle>
              {assignment.hasAutograding && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  <Bot className="mr-1 h-3 w-3" />
                  Autograded
                </Badge>
              )}
              <Badge variant={assignment.status === 'published' ? 'default' : 'secondary'}>
                {assignment.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {assignment.courseCode} • {assignment.course}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{assignment.points} pts</p>
            <p className="text-sm text-muted-foreground">
              {daysUntilDue > 0 ? `${daysUntilDue} days left` : 'Overdue'}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm">{assignment.description}</p>
        
        {assignment.submissions && (
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Total Submissions</p>
              <p className="font-medium">{assignment.submissions.total}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Graded</p>
              <p className="font-medium text-green-600">{assignment.submissions.graded}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Pending</p>
              <p className="font-medium text-orange-600">{assignment.submissions.pending}</p>
            </div>
          </div>
        )}

        {assignment.autogradingConfig && (
          <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
            <Bot className="h-5 w-5 text-blue-600" />
            <div className="flex-1 text-sm">
              <p className="font-medium">Autograding Active</p>
              <p className="text-muted-foreground">
                {assignment.autogradingConfig.totalTests} test cases • {assignment.autogradingConfig.passingRate}% pass rate
              </p>
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-2 border-t">
          <Button size="sm" variant="outline">
            <Eye className="mr-1 h-3 w-3" />
            View Submissions
          </Button>
          <Button size="sm" variant="outline">
            <Edit className="mr-1 h-3 w-3" />
            Edit Assignment
          </Button>
          {assignment.hasAutograding && (
            <Button size="sm" variant="outline">
              <Settings className="mr-1 h-3 w-3" />
              Configure Autograding
            </Button>
          )}
          <Button size="sm">
            <BarChart3 className="mr-1 h-3 w-3" />
            View Analytics
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function StudentAssignmentCard({ assignment }: { assignment: Assignment }) {
  const getDaysUntilDue = (dueDate: string) => {
    const now = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - now.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const daysUntilDue = getDaysUntilDue(assignment.dueDate)
  const isSubmitted = assignment.studentProgress?.submitted

  return (
    <Card className={`hover:shadow-md transition-shadow ${isSubmitted ? 'border-green-200' : ''}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">{assignment.title}</CardTitle>
              {assignment.hasAutograding && (
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  <Bot className="mr-1 h-3 w-3" />
                  Auto-graded
                </Badge>
              )}
              {isSubmitted && (
                <Badge variant="default" className="bg-green-100 text-green-800">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Submitted
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {assignment.courseCode} • {assignment.course}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{assignment.points} pts</p>
            {isSubmitted && assignment.studentProgress?.score !== undefined ? (
              <p className="text-lg font-semibold text-green-600">
                {assignment.studentProgress.score}%
              </p>
            ) : (
              <p className={`text-sm ${daysUntilDue <= 3 ? 'text-red-600' : 'text-muted-foreground'}`}>
                {daysUntilDue > 0 ? `${daysUntilDue} days left` : 'Overdue'}
              </p>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm">{assignment.description}</p>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Due Date</p>
            <p className="font-medium">{new Date(assignment.dueDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Estimated Time</p>
            <p className="font-medium">{assignment.estimatedTime} hours</p>
          </div>
        </div>

        {assignment.hasAutograding && (
          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
            <Bot className="h-5 w-5 text-purple-600" />
            <div className="text-sm">
              <p className="font-medium">Instant Feedback Available</p>
              <p className="text-muted-foreground">Get automated scoring and detailed feedback upon submission</p>
            </div>
          </div>
        )}

        {isSubmitted && assignment.studentProgress?.feedback && (
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-sm font-medium text-green-800">Feedback:</p>
            <p className="text-sm text-green-700">{assignment.studentProgress.feedback}</p>
          </div>
        )}

        <div className="flex gap-2 pt-2 border-t">
          {isSubmitted ? (
            <>
              <Button size="sm" variant="outline">
                <Eye className="mr-1 h-3 w-3" />
                View Submission
              </Button>
              {assignment.hasAutograding && (
                <Button size="sm" variant="outline" onClick={() => window.location.href = '/submission-feedback'}>
                  <Bot className="mr-1 h-3 w-3" />
                  View AI Feedback
                </Button>
              )}
            </>
          ) : (
            <>
              <Button size="sm" variant="outline">
                <Eye className="mr-1 h-3 w-3" />
                View Details
              </Button>
              <Button size="sm">
                <Upload className="mr-1 h-3 w-3" />
                Submit Assignment
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}