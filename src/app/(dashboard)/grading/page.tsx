import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  FileText,
  Clock,
  Download,
  Eye,
  CheckCircle,
  AlertTriangle,
  Filter,
  Search,
  X
} from 'lucide-react'

// Mock data for grading queue
const gradingQueue = [
  {
    id: '1',
    studentName: 'Alice Johnson',
    studentId: 'CS2021001',
    assignment: 'Database Design Project',
    course: 'Database Systems (CS-380)',
    submittedDate: '2025-09-20T14:30:00',
    dueDate: '2025-09-21T23:59:00',
    status: 'submitted' as const,
    priority: 'high' as const,
    fileSize: '2.5 MB',
    files: ['database_design.pdf', 'er_diagram.png', 'sql_queries.sql'],
    isLate: false,
    attempt: 1
  },
  {
    id: '2',
    studentName: 'Bob Chen',
    studentId: 'CS2021002', 
    assignment: 'React Component Library',
    course: 'Advanced Web Development (CS-401)',
    submittedDate: '2025-09-21T16:45:00',
    dueDate: '2025-09-22T23:59:00',
    status: 'under_review' as const,
    priority: 'medium' as const,
    fileSize: '15.2 MB',
    files: ['component_library.zip', 'documentation.md'],
    isLate: false,
    attempt: 1
  },
  {
    id: '3',
    studentName: 'Sarah Kim',
    studentId: 'CS2021003',
    assignment: 'UI/UX Case Study',
    course: 'Human-Computer Interaction (CS-425)',
    submittedDate: '2025-09-22T02:15:00',
    dueDate: '2025-09-21T23:59:00',
    status: 'submitted' as const,
    priority: 'high' as const,
    fileSize: '8.7 MB',
    files: ['ux_case_study.pdf', 'wireframes.fig', 'user_testing_results.xlsx'],
    isLate: true,
    attempt: 2
  },
  {
    id: '4',
    studentName: 'Mike Rodriguez',
    studentId: 'CS2021004',
    assignment: 'Machine Learning Model',
    course: 'Data Science (CS-450)',
    submittedDate: '2025-09-19T20:30:00',
    dueDate: '2025-09-20T23:59:00',
    status: 'graded' as const,
    priority: 'low' as const,
    fileSize: '45.1 MB',
    files: ['ml_model.ipynb', 'dataset.csv', 'model_analysis.pdf'],
    isLate: false,
    attempt: 1,
    grade: 85
  }
]

const stats = {
  totalSubmissions: 156,
  pendingReview: 23,
  underReview: 8,
  gradedThisWeek: 45,
  averageGradingTime: '2.5 hours'
}

export default function GradingQueue() {
  const pendingSubmissions = gradingQueue.filter(s => s.status === 'submitted')
  const underReview = gradingQueue.filter(s => s.status === 'under_review')
  const recentlyGraded = gradingQueue.filter(s => s.status === 'graded')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Grading Queue</h1>
          <p className="text-muted-foreground">
            Review and grade student submissions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Select defaultValue="priority">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="date">Date Submitted</SelectItem>
              <SelectItem value="course">Course</SelectItem>
              <SelectItem value="student">Student Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSubmissions}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.pendingReview}</div>
            <p className="text-xs text-muted-foreground">Needs attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            <Eye className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.underReview}</div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Graded This Week</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.gradedThisWeek}</div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Grading Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageGradingTime}</div>
            <p className="text-xs text-muted-foreground">Per submission</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by student name, assignment, or course..." className="pl-10" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="graded">Graded</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="cs380">CS-380</SelectItem>
                <SelectItem value="cs401">CS-401</SelectItem>
                <SelectItem value="cs425">CS-425</SelectItem>
                <SelectItem value="cs450">CS-450</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Grading Sections */}
      <div className="space-y-6">
        {/* Priority Submissions */}
        {pendingSubmissions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Priority Submissions ({pendingSubmissions.length})
              </CardTitle>
              <CardDescription>
                Submissions requiring immediate attention
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingSubmissions.map((submission) => (
                <SubmissionCard key={submission.id} submission={submission} />
              ))}
            </CardContent>
          </Card>
        )}

        {/* Under Review */}
        {underReview.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-blue-500" />
                Under Review ({underReview.length})
              </CardTitle>
              <CardDescription>
                Submissions currently being graded
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {underReview.map((submission) => (
                <SubmissionCard key={submission.id} submission={submission} />
              ))}
            </CardContent>
          </Card>
        )}

        {/* Recently Graded */}
        {recentlyGraded.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Recently Graded ({recentlyGraded.length})
              </CardTitle>
              <CardDescription>
                Recently completed submissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentlyGraded.map((submission) => (
                <SubmissionCard key={submission.id} submission={submission} />
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

function SubmissionCard({ submission }: { submission: typeof gradingQueue[0] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-orange-100 text-orange-800'
      case 'under_review': return 'bg-blue-100 text-blue-800'
      case 'graded': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive'
      case 'medium': return 'secondary'
      case 'low': return 'outline'
      default: return 'secondary'
    }
  }

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{submission.studentName}</h3>
            <span className="text-sm text-muted-foreground">({submission.studentId})</span>
            {submission.isLate && (
              <Badge variant="destructive" className="text-xs">Late</Badge>
            )}
            {submission.attempt > 1 && (
              <Badge variant="outline" className="text-xs">Attempt {submission.attempt}</Badge>
            )}
          </div>
          <p className="text-sm font-medium">{submission.assignment}</p>
          <p className="text-sm text-muted-foreground">{submission.course}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Submitted: {new Date(submission.submittedDate).toLocaleString()}</span>
            <span>Size: {submission.fileSize}</span>
            <span>{submission.files.length} files</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={getPriorityColor(submission.priority)}>
            {submission.priority}
          </Badge>
          <Badge className={getStatusColor(submission.status)}>
            {submission.status.replace('_', ' ')}
          </Badge>
          {submission.grade && (
            <Badge variant="outline">
              Grade: {submission.grade}%
            </Badge>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FileText className="h-4 w-4" />
          Files: {submission.files.join(', ')}
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline">
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
          <Button size="sm" variant="outline">
            <Eye className="h-4 w-4 mr-1" />
            Preview
          </Button>
          {submission.status === 'submitted' ? (
            <Button size="sm">
              Start Grading
            </Button>
          ) : submission.status === 'under_review' ? (
            <Button size="sm">
              Continue Grading
            </Button>
          ) : (
            <Button size="sm" variant="outline">
              View Grade
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}