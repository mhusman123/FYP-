import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  FileText,
  Download,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  Upload
} from 'lucide-react'

// Mock data - replace with actual API calls
const mockSubmissions = [
  {
    id: '1',
    assignmentId: '1',
    assignmentTitle: 'Database Design Project',
    course: 'Database Systems',
    courseCode: 'CS 3320',
    submittedAt: '2025-09-20T14:30:00',
    dueDate: '2025-09-25T23:59:00',
    files: [
      { name: 'library_erd.pdf', size: '2.3 MB', type: 'pdf' },
      { name: 'create_tables.sql', size: '15 KB', type: 'sql' },
      { name: 'queries.sql', size: '8 KB', type: 'sql' }
    ],
    status: 'submitted' as const,
    grade: null,
    feedback: null,
    isLate: false,
    canResubmit: true,
    version: 1
  },
  {
    id: '2',
    assignmentId: '2',
    assignmentTitle: 'React Component Library',
    course: 'Advanced Web Development',
    courseCode: 'CS 4350',
    submittedAt: '2025-09-18T16:45:00',
    dueDate: '2025-09-30T23:59:00',
    files: [
      { name: 'component-library.zip', size: '15.7 MB', type: 'zip' },
      { name: 'documentation.pdf', size: '3.2 MB', type: 'pdf' }
    ],
    status: 'graded' as const,
    grade: 92,
    feedback: 'Excellent work! Components are well-structured and documented. Minor improvement needed in accessibility features.',
    isLate: false,
    canResubmit: false,
    version: 2
  },
  {
    id: '3',
    assignmentId: '4',
    assignmentTitle: 'Algorithm Analysis',
    course: 'Data Structures & Algorithms',
    courseCode: 'CS 2400',
    submittedAt: '2025-08-14T10:15:00',
    dueDate: '2025-08-15T23:59:00',
    files: [
      { name: 'algorithm_analysis.pdf', size: '4.1 MB', type: 'pdf' },
      { name: 'test_results.xlsx', size: '890 KB', type: 'xlsx' }
    ],
    status: 'graded' as const,
    grade: 85,
    feedback: 'Good analysis of time complexity. Would like to see more detailed space complexity discussion.',
    isLate: false,
    canResubmit: false,
    version: 1
  },
  {
    id: '4',
    assignmentId: '5',
    assignmentTitle: 'Software Requirements Document',
    course: 'Software Engineering',
    courseCode: 'CS 3300',
    submittedAt: '2025-09-29T08:22:00',
    dueDate: '2025-09-28T23:59:00',
    files: [
      { name: 'srs_document.pdf', size: '6.8 MB', type: 'pdf' }
    ],
    status: 'graded' as const,
    grade: 78,
    feedback: 'Late submission penalty applied. Content is good but some use cases are incomplete.',
    isLate: true,
    canResubmit: false,
    version: 1
  }
]

function getStatusColor(status: string, isLate: boolean) {
  if (isLate) return 'text-red-600 bg-red-50'
  switch (status) {
    case 'graded': return 'text-green-600 bg-green-50'
    case 'submitted': return 'text-blue-600 bg-blue-50'
    default: return 'text-gray-600 bg-gray-50'
  }
}

function getStatusIcon(status: string, isLate: boolean) {
  if (isLate) return AlertCircle
  switch (status) {
    case 'graded': return CheckCircle
    case 'submitted': return Upload
    default: return FileText
  }
}

function getFileIcon(type: string) {
  switch (type) {
    case 'pdf': return '📄'
    case 'doc': return '📝'
    case 'xlsx': return '📊'
    case 'zip': return '📦'
    case 'sql': return '💾'
    default: return '📎'
  }
}

function getGradeColor(grade: number) {
  if (grade >= 90) return 'text-green-600'
  if (grade >= 80) return 'text-blue-600'
  if (grade >= 70) return 'text-yellow-600'
  return 'text-red-600'
}

export default function SubmissionsPage() {
  const gradedSubmissions = mockSubmissions.filter(s => s.status === 'graded')
  const pendingSubmissions = mockSubmissions.filter(s => s.status === 'submitted')

  const averageGrade = gradedSubmissions.length > 0 
    ? Math.round(gradedSubmissions.reduce((sum, s) => sum + (s.grade || 0), 0) / gradedSubmissions.length)
    : 0

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Submissions</h1>
          <p className="text-muted-foreground">
            View your submitted assignments and track their status
          </p>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Submit New Assignment
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSubmissions.length}</div>
            <p className="text-xs text-muted-foreground">
              Across all courses
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getGradeColor(averageGrade)}`}>
              {averageGrade}%
            </div>
            <p className="text-xs text-muted-foreground">
              From {gradedSubmissions.length} graded
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{pendingSubmissions.length}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting grades
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Late Submissions</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {mockSubmissions.filter(s => s.isLate).length}
            </div>
            <p className="text-xs text-muted-foreground">
              With penalties
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Submissions */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Recent Submissions</h2>
        {mockSubmissions.map((submission) => {
          const StatusIcon = getStatusIcon(submission.status, submission.isLate)
          return (
            <Card key={submission.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-xl">{submission.assignmentTitle}</CardTitle>
                      {submission.version > 1 && (
                        <Badge variant="outline" className="text-xs">
                          v{submission.version}
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="flex items-center gap-4">
                      <span>{submission.course} ({submission.courseCode})</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Submitted: {new Date(submission.submittedAt).toLocaleDateString()}
                      </span>
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(submission.status, submission.isLate)}`}>
                      <StatusIcon className="h-3 w-3" />
                      {submission.isLate ? 'Late' : submission.status === 'graded' ? 'Graded' : 'Submitted'}
                    </div>
                    {submission.grade && (
                      <div className={`text-lg font-bold ${getGradeColor(submission.grade)}`}>
                        {submission.grade}%
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Submission Details */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Submitted Files</h4>
                    <div className="space-y-1">
                      {submission.files.map((file, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm p-2 bg-gray-50 rounded">
                          <span>{getFileIcon(file.type)}</span>
                          <span className="flex-1">{file.name}</span>
                          <span className="text-xs text-muted-foreground">{file.size}</span>
                          <Button size="sm" variant="ghost">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Submission Info</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Due Date:</span>
                        <span>{new Date(submission.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className={submission.isLate ? 'text-red-600' : 'text-green-600'}>
                          {submission.isLate ? 'Late Submission' : 'On Time'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Can Resubmit:</span>
                        <span className={submission.canResubmit ? 'text-green-600' : 'text-red-600'}>
                          {submission.canResubmit ? 'Yes' : 'No'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Feedback */}
                {submission.feedback && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Instructor Feedback</h4>
                    <div className={`p-3 rounded-lg ${submission.grade! >= 80 ? 'bg-green-50' : 'bg-yellow-50'}`}>
                      <p className={`text-sm ${submission.grade! >= 80 ? 'text-green-800' : 'text-yellow-800'}`}>
                        {submission.feedback}
                      </p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-3 w-3" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-3 w-3" />
                      Download All
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    {submission.canResubmit && (
                      <Button size="sm">
                        <Edit className="mr-2 h-3 w-3" />
                        Resubmit
                      </Button>
                    )}
                    {submission.status === 'submitted' && (
                      <Button variant="outline" size="sm">
                        <Trash2 className="mr-2 h-3 w-3" />
                        Withdraw
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Submit Section */}
      <Card>
        <CardHeader>
          <CardTitle>Need to Submit an Assignment?</CardTitle>
          <CardDescription>
            Go to the Assignments page to submit new work or resubmit existing assignments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full">
            <Upload className="mr-2 h-4 w-4" />
            Go to Assignments Page
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}