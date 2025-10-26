import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  AlertTriangle, 
  Search, 
  Filter,
  Eye,
  Download,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Shield,
  Zap,
  BarChart3
} from 'lucide-react'

// Mock plagiarism report data
const plagiarismReports = [
  {
    id: '1',
    studentName: 'Mike Rodriguez',
    studentId: 'CS2021004',
    assignment: 'Database Design Project',
    course: 'Database Systems (CS-380)',
    submissionDate: '2025-09-20T14:30:00',
    similarityScore: 87.5,
    status: 'flagged' as const,
    priority: 'high' as const,
    matchedSources: [
      { source: 'Internet Source', similarity: 45.2, type: 'external' },
      { source: 'Previous Submission - Sarah Kim (2024)', similarity: 32.1, type: 'internal' },
      { source: 'Academic Paper - IEEE', similarity: 10.2, type: 'academic' }
    ],
    reviewedAt: null,
    reviewedBy: null,
    action: null
  },
  {
    id: '2',
    studentName: 'Tom Wilson',
    studentId: 'CS2021015',
    assignment: 'React Component Library',
    course: 'Advanced Web Development (CS-401)',
    submissionDate: '2025-09-21T16:45:00',
    similarityScore: 34.7,
    status: 'review_needed' as const,
    priority: 'medium' as const,
    matchedSources: [
      { source: 'GitHub Repository', similarity: 28.1, type: 'code' },
      { source: 'Stack Overflow', similarity: 6.6, type: 'external' }
    ],
    reviewedAt: null,
    reviewedBy: null,
    action: null
  },
  {
    id: '3',
    studentName: 'Lisa Chen',
    studentId: 'CS2021008',
    assignment: 'UI/UX Case Study',
    course: 'Human-Computer Interaction (CS-425)',
    submissionDate: '2025-09-19T20:30:00',
    similarityScore: 15.2,
    status: 'cleared' as const,
    priority: 'low' as const,
    matchedSources: [
      { source: 'Common Design Patterns', similarity: 12.8, type: 'reference' },
      { source: 'Course Materials', similarity: 2.4, type: 'course' }
    ],
    reviewedAt: '2025-09-21T10:15:00',
    reviewedBy: 'Dr. Johnson',
    action: 'approved'
  },
  {
    id: '4',
    studentName: 'Kevin Park',
    studentId: 'CS2021012',
    assignment: 'Machine Learning Model',
    course: 'Data Science (CS-450)',
    submissionDate: '2025-09-18T11:20:00',
    similarityScore: 92.3,
    status: 'violation' as const,
    priority: 'critical' as const,
    matchedSources: [
      { source: 'Kaggle Notebook - Exact Match', similarity: 89.7, type: 'external' },
      { source: 'Previous Student Work', similarity: 2.6, type: 'internal' }
    ],
    reviewedAt: '2025-09-19T14:30:00',
    reviewedBy: 'Dr. Johnson',
    action: 'academic_misconduct'
  }
]

const stats = {
  totalSubmissions: 247,
  flaggedSubmissions: 23,
  reviewsPending: 8,
  violationsFound: 3,
  averageSimilarity: 12.7,
  reviewedThisWeek: 15
}

const riskCategories = [
  {
    range: 'Critical (>85%)',
    count: 3,
    percentage: 13.0,
    color: 'bg-red-500'
  },
  {
    range: 'High (65-85%)',
    count: 5,
    percentage: 21.7,
    color: 'bg-orange-500'
  },
  {
    range: 'Medium (35-65%)',
    count: 8,
    percentage: 34.8,
    color: 'bg-yellow-500'
  },
  {
    range: 'Low (15-35%)',
    count: 7,
    percentage: 30.4,
    color: 'bg-green-500'
  }
]

export default function PlagiarismReports() {
  const flaggedReports = plagiarismReports.filter(r => r.status === 'flagged' || r.status === 'review_needed')
  const clearedReports = plagiarismReports.filter(r => r.status === 'cleared')
  const violationReports = plagiarismReports.filter(r => r.status === 'violation')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Plagiarism Reports</h1>
          <p className="text-muted-foreground">
            Review and manage academic integrity violations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Reports
          </Button>
          <Button variant="outline">
            <Shield className="mr-2 h-4 w-4" />
            Run New Scan
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Scanned</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSubmissions}</div>
            <p className="text-xs text-muted-foreground">Submissions checked</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flagged</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.flaggedSubmissions}</div>
            <p className="text-xs text-muted-foreground">Need review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.reviewsPending}</div>
            <p className="text-xs text-muted-foreground">Awaiting decision</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Violations</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.violationsFound}</div>
            <p className="text-xs text-muted-foreground">Confirmed cases</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Similarity</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageSimilarity}%</div>
            <p className="text-xs text-muted-foreground">All submissions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reviewed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.reviewedThisWeek}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      {/* Risk Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Similarity Score Distribution
          </CardTitle>
          <CardDescription>
            Breakdown of flagged submissions by risk level
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {riskCategories.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{category.range}</span>
                  <span className="text-muted-foreground">{category.count} reports ({category.percentage}%)</span>
                </div>
                <Progress value={category.percentage} className="h-2" />
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
              <Input placeholder="Search by student name, assignment, or course..." className="pl-10" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reports</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
                <SelectItem value="review_needed">Review Needed</SelectItem>
                <SelectItem value="cleared">Cleared</SelectItem>
                <SelectItem value="violation">Violations</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Advanced Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Critical Reports Alert */}
      {violationReports.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <XCircle className="h-5 w-5" />
              Academic Violations ({violationReports.length})
            </CardTitle>
            <CardDescription className="text-red-700">
              Confirmed academic integrity violations requiring action
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {violationReports.map((report) => (
                <PlagiarismCard key={report.id} report={report} isHighlighted={true} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Flagged Reports */}
      {flaggedReports.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Reports Requiring Review ({flaggedReports.length})
            </CardTitle>
            <CardDescription>
              Submissions with high similarity scores needing manual review
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {flaggedReports.map((report) => (
                <PlagiarismCard key={report.id} report={report} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cleared Reports */}
      {clearedReports.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Cleared Reports ({clearedReports.length})
            </CardTitle>
            <CardDescription>
              Recently reviewed and cleared submissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clearedReports.map((report) => (
                <PlagiarismCard key={report.id} report={report} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function PlagiarismCard({ report, isHighlighted = false }: { 
  report: typeof plagiarismReports[0], 
  isHighlighted?: boolean 
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'flagged': return 'bg-orange-100 text-orange-800'
      case 'review_needed': return 'bg-blue-100 text-blue-800'
      case 'cleared': return 'bg-green-100 text-green-800'
      case 'violation': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'destructive'
      case 'high': return 'destructive'
      case 'medium': return 'secondary'
      case 'low': return 'outline'
      default: return 'secondary'
    }
  }

  const getSimilarityColor = (score: number) => {
    if (score >= 85) return 'text-red-600 bg-red-50'
    if (score >= 65) return 'text-orange-600 bg-orange-50'
    if (score >= 35) return 'text-yellow-600 bg-yellow-50'
    return 'text-green-600 bg-green-50'
  }

  return (
    <div className={`border rounded-lg p-4 space-y-4 ${isHighlighted ? 'border-red-200' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{report.studentName}</h3>
            <span className="text-sm text-muted-foreground">({report.studentId})</span>
            <Badge variant={getPriorityColor(report.priority)}>
              {report.priority}
            </Badge>
          </div>
          <p className="text-sm font-medium">{report.assignment}</p>
          <p className="text-sm text-muted-foreground">{report.course}</p>
          <p className="text-xs text-muted-foreground">
            Submitted: {new Date(report.submissionDate).toLocaleString()}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className={`px-3 py-1 rounded-lg ${getSimilarityColor(report.similarityScore)}`}>
            <p className="text-sm font-bold">{report.similarityScore}%</p>
            <p className="text-xs">Similarity</p>
          </div>
          <Badge className={getStatusColor(report.status)}>
            {report.status.replace('_', ' ')}
          </Badge>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Matched Sources:</p>
        {report.matchedSources.map((source, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-muted rounded text-sm">
            <span>{source.source}</span>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {source.type}
              </Badge>
              <span className="font-medium">{source.similarity}%</span>
            </div>
          </div>
        ))}
      </div>

      {report.reviewedAt && (
        <div className="p-2 bg-muted rounded text-sm">
          <p>Reviewed by {report.reviewedBy} on {new Date(report.reviewedAt).toLocaleDateString()}</p>
          <p>Action: <span className="font-medium capitalize">{report.action?.replace('_', ' ')}</span></p>
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Zap className="h-4 w-4" />
          <span>AI Confidence: High</span>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline">
            <Eye className="h-4 w-4 mr-1" />
            View Report
          </Button>
          <Button size="sm" variant="outline">
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
          {!report.reviewedAt ? (
            <Button size="sm">
              Review Case
            </Button>
          ) : (
            <Button size="sm" variant="outline">
              View Decision
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}