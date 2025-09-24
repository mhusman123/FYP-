import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  FileText, 
  Calendar, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  Upload,
  Filter,
  Search
} from 'lucide-react'

// Mock data - replace with actual API calls
const mockAssignments = [
  {
    id: '1',
    title: 'Database Design Project',
    course: 'Database Systems',
    courseCode: 'CS 3320',
    description: 'Design and implement a relational database for a library management system.',
    dueDate: '2025-09-25T23:59:00',
    assignedDate: '2025-09-10T00:00:00',
    points: 100,
    status: 'pending' as const,
    priority: 'high' as const,
    submissionType: ['pdf', 'sql', 'doc'],
    instructions: 'Create an ER diagram, normalize tables, and write SQL queries.',
    estimatedTime: 15,
    hasSubmission: false
  },
  {
    id: '2',
    title: 'React Component Library',
    course: 'Advanced Web Development',
    courseCode: 'CS 4350',
    description: 'Build a reusable component library with TypeScript and Storybook.',
    dueDate: '2025-09-30T23:59:00',
    assignedDate: '2025-09-15T00:00:00',
    points: 150,
    status: 'in_progress' as const,
    priority: 'medium' as const,
    submissionType: ['zip', 'github'],
    instructions: 'Create at least 10 components with documentation and tests.',
    estimatedTime: 20,
    hasSubmission: true,
    submissionDate: '2025-09-20T14:30:00'
  },
  {
    id: '3',
    title: 'Usability Testing Report',
    course: 'Human-Computer Interaction',
    courseCode: 'CS 4550',
    description: 'Conduct usability testing on a mobile app and write a comprehensive report.',
    dueDate: '2025-10-05T23:59:00',
    assignedDate: '2025-09-20T00:00:00',
    points: 120,
    status: 'pending' as const,
    priority: 'medium' as const,
    submissionType: ['pdf', 'video'],
    instructions: 'Test with at least 5 users and provide actionable recommendations.',
    estimatedTime: 12,
    hasSubmission: false
  },
  {
    id: '4',
    title: 'Algorithm Analysis',
    course: 'Data Structures & Algorithms',
    courseCode: 'CS 2400',
    description: 'Analyze time and space complexity of sorting algorithms.',
    dueDate: '2025-08-15T23:59:00',
    assignedDate: '2025-08-01T00:00:00',
    points: 80,
    status: 'completed' as const,
    priority: 'low' as const,
    submissionType: ['pdf'],
    instructions: 'Compare bubble sort, merge sort, and quicksort performance.',
    estimatedTime: 8,
    hasSubmission: true,
    submissionDate: '2025-08-14T10:15:00',
    grade: 85,
    feedback: 'Excellent analysis! Clear explanations and good test cases.'
  },
  {
    id: '5',
    title: 'Software Requirements Document',
    course: 'Software Engineering',
    courseCode: 'CS 3300',
    description: 'Create a comprehensive SRS for a hypothetical e-commerce platform.',
    dueDate: '2025-09-28T23:59:00',
    assignedDate: '2025-09-12T00:00:00',
    points: 110,
    status: 'overdue' as const,
    priority: 'high' as const,
    submissionType: ['pdf', 'doc'],
    instructions: 'Follow IEEE SRS template and include use cases.',
    estimatedTime: 18,
    hasSubmission: false
  }
]

function getStatusColor(status: string) {
  switch (status) {
    case 'completed': return 'text-green-600 bg-green-50'
    case 'in_progress': return 'text-blue-600 bg-blue-50'
    case 'overdue': return 'text-red-600 bg-red-50'
    default: return 'text-yellow-600 bg-yellow-50'
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'completed': return CheckCircle
    case 'in_progress': return Upload
    case 'overdue': return AlertCircle
    default: return Clock
  }
}

function getPriorityColor(priority: string) {
  switch (priority) {
    case 'high': return 'border-red-500 text-red-700'
    case 'medium': return 'border-yellow-500 text-yellow-700'
    default: return 'border-green-500 text-green-700'
  }
}

function getTimeUntilDue(dueDate: string) {
  const due = new Date(dueDate)
  const now = new Date()
  const diffMs = due.getTime() - now.getTime()
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))
  
  if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`
  if (diffDays === 0) return 'Due today'
  if (diffDays === 1) return 'Due tomorrow'
  return `Due in ${diffDays} days`
}

export default function AssignmentsPage() {
  const pendingAssignments = mockAssignments.filter(a => a.status === 'pending' || a.status === 'overdue')
  const inProgressAssignments = mockAssignments.filter(a => a.status === 'in_progress')
  const completedAssignments = mockAssignments.filter(a => a.status === 'completed')

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
          <p className="text-muted-foreground">
            View and manage all your course assignments
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
            <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAssignments.length}</div>
            <p className="text-xs text-muted-foreground">
              Across all courses
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{pendingAssignments.length}</div>
            <p className="text-xs text-muted-foreground">
              Need attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{inProgressAssignments.length}</div>
            <p className="text-xs text-muted-foreground">
              Being worked on
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedAssignments.length}</div>
            <p className="text-xs text-muted-foreground">
              Avg: {completedAssignments.length > 0 ? Math.round(completedAssignments.reduce((sum, a) => sum + (a.grade || 0), 0) / completedAssignments.length) : 0}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Pending & Overdue Assignments */}
      {pendingAssignments.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Pending Assignments</h2>
          <div className="space-y-4">
            {pendingAssignments.map((assignment) => {
              const StatusIcon = getStatusIcon(assignment.status)
              return (
                <Card key={assignment.id} className={`${assignment.status === 'overdue' ? 'border-red-200 bg-red-50/30' : ''}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-xl">{assignment.title}</CardTitle>
                          <Badge variant="outline" className={getPriorityColor(assignment.priority)}>
                            {assignment.priority} priority
                          </Badge>
                        </div>
                        <CardDescription className="flex items-center gap-4">
                          <span>{assignment.course} ({assignment.courseCode})</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {getTimeUntilDue(assignment.dueDate)}
                          </span>
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(assignment.status)}`}>
                          <StatusIcon className="h-3 w-3" />
                          {assignment.status === 'overdue' ? 'Overdue' : 'Pending'}
                        </div>
                        <span className="text-sm font-medium">{assignment.points} pts</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {assignment.description}
                    </p>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Instructions</h4>
                        <p className="text-sm text-muted-foreground">
                          {assignment.instructions}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Submission Requirements</h4>
                        <div className="flex flex-wrap gap-1">
                          {assignment.submissionType.map((type) => (
                            <Badge key={type} variant="secondary" className="text-xs">
                              .{type}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <span className="text-sm text-muted-foreground">
                        Estimated time: {assignment.estimatedTime} hours
                      </span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button size="sm">
                          <Upload className="mr-2 h-3 w-3" />
                          Submit Assignment
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* In Progress Assignments */}
      {inProgressAssignments.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">In Progress</h2>
          <div className="space-y-4">
            {inProgressAssignments.map((assignment) => (
              <Card key={assignment.id} className="border-blue-200 bg-blue-50/30">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-xl">{assignment.title}</CardTitle>
                      <CardDescription className="flex items-center gap-4">
                        <span>{assignment.course} ({assignment.courseCode})</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {getTimeUntilDue(assignment.dueDate)}
                        </span>
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                        <Upload className="h-3 w-3" />
                        Submitted
                      </div>
                      <span className="text-sm font-medium">{assignment.points} pts</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {assignment.description}
                  </p>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      ✓ Submitted on {assignment.submissionDate && new Date(assignment.submissionDate).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      You can resubmit before the deadline if needed
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Awaiting grading...
                    </span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Submission
                      </Button>
                      <Button size="sm" variant="secondary">
                        Resubmit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Completed Assignments */}
      {completedAssignments.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Completed Assignments</h2>
          <div className="space-y-4">
            {completedAssignments.map((assignment) => (
              <Card key={assignment.id} className="border-green-200 bg-green-50/30">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-xl">{assignment.title}</CardTitle>
                      <CardDescription className="flex items-center gap-4">
                        <span>{assignment.course} ({assignment.courseCode})</span>
                        <span className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Completed
                        </span>
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-700">{assignment.grade}%</div>
                        <div className="text-xs text-muted-foreground">{assignment.points} pts</div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {assignment.description}
                  </p>
                  {assignment.feedback && (
                    <div className="p-3 bg-green-50 rounded-lg">
                      <h4 className="text-sm font-medium text-green-800 mb-1">Instructor Feedback</h4>
                      <p className="text-sm text-green-700">
                        {assignment.feedback}
                      </p>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Submitted: {assignment.submissionDate && new Date(assignment.submissionDate).toLocaleDateString()}
                    </span>
                    <Button variant="outline" size="sm">
                      View Details
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