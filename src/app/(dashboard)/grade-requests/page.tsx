'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { GradeAdjustmentRequest } from '@/components/features/grade-adjustment/grade-adjustment-request'
import { 
  ClipboardCheck, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  XCircle,
  FileText,
  Eye,
  Plus,
  HelpCircle,
  Download
} from 'lucide-react'

// Mock data - replace with actual API calls
const mockGradeRequests = [
  {
    id: '1',
    assignmentTitle: 'Database Design Project',
    course: 'Database Systems',
    courseCode: 'CS 3320',
    originalGrade: 78,
    requestedGrade: 85,
    category: 'Medical Circumstances',
    reason: 'Was hospitalized during the assignment period and could not access proper resources.',
    submittedAt: '2025-09-20T14:30:00',
    status: 'under_review' as const,
    supportingDocuments: [
      { name: 'medical_certificate.pdf', size: '1.2 MB' },
      { name: 'hospital_discharge.pdf', size: '890 KB' }
    ],
    reviewerNotes: null,
    reviewedAt: null,
    estimatedReviewTime: '3-5 business days'
  },
  {
    id: '2',
    assignmentTitle: 'React Component Library',
    course: 'Advanced Web Development',
    courseCode: 'CS 4350',
    originalGrade: 82,
    requestedGrade: 90,
    category: 'Technical Difficulties',
    reason: 'Experienced laptop hardware failure that corrupted my original submission. Had to recreate the project with limited time.',
    submittedAt: '2025-09-15T10:15:00',
    status: 'approved' as const,
    supportingDocuments: [
      { name: 'repair_receipt.pdf', size: '650 KB' },
      { name: 'original_code_backup.zip', size: '2.1 MB' }
    ],
    reviewerNotes: 'Valid technical circumstances. Evidence supports the claim. Grade adjustment approved.',
    reviewedAt: '2025-09-18T16:20:00',
    finalGrade: 88
  },
  {
    id: '3',
    assignmentTitle: 'Algorithm Analysis',
    course: 'Data Structures & Algorithms',
    courseCode: 'CS 2400',
    originalGrade: 75,
    requestedGrade: 82,
    category: 'Family Emergency',
    reason: 'Family emergency required me to travel out of state during the assignment period.',
    submittedAt: '2025-08-10T09:45:00',
    status: 'rejected' as const,
    supportingDocuments: [],
    reviewerNotes: 'Insufficient documentation provided. Please resubmit with proper supporting evidence.',
    reviewedAt: '2025-08-15T11:30:00',
    finalGrade: 75
  },
  {
    id: '4',
    assignmentTitle: 'UI/UX Case Study',
    course: 'Human-Computer Interaction',
    courseCode: 'CS 4550',
    originalGrade: 70,
    requestedGrade: 78,
    category: 'Accessibility Needs',
    reason: 'Needed additional time due to documented learning disability that was not properly accommodated.',
    submittedAt: '2025-09-22T13:20:00',
    status: 'more_info_needed' as const,
    supportingDocuments: [
      { name: 'disability_documentation.pdf', size: '1.8 MB' }
    ],
    reviewerNotes: 'Please provide updated accommodation letter from Student Services.',
    reviewedAt: '2025-09-24T14:15:00',
    estimatedReviewTime: 'Pending additional documentation'
  }
]

function getStatusColor(status: string) {
  switch (status) {
    case 'approved': return 'text-green-600 bg-green-50 border-green-200'
    case 'rejected': return 'text-red-600 bg-red-50 border-red-200'
    case 'under_review': return 'text-blue-600 bg-blue-50 border-blue-200'
    case 'more_info_needed': return 'text-orange-600 bg-orange-50 border-orange-200'
    default: return 'text-gray-600 bg-gray-50 border-gray-200'
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'approved': return CheckCircle
    case 'rejected': return XCircle
    case 'under_review': return Clock
    case 'more_info_needed': return HelpCircle
    default: return AlertCircle
  }
}

function getStatusText(status: string) {
  switch (status) {
    case 'approved': return 'Approved'
    case 'rejected': return 'Rejected'
    case 'under_review': return 'Under Review'
    case 'more_info_needed': return 'More Info Needed'
    default: return 'Unknown'
  }
}

function getCategoryColor(category: string) {
  switch (category) {
    case 'Medical Circumstances': return 'bg-red-100 text-red-800'
    case 'Family Emergency': return 'bg-orange-100 text-orange-800'
    case 'Technical Difficulties': return 'bg-blue-100 text-blue-800'
    case 'Accessibility Needs': return 'bg-purple-100 text-purple-800'
    case 'Other Circumstances': return 'bg-gray-100 text-gray-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

export default function GradeRequestsPage() {
  const pendingRequests = mockGradeRequests.filter(r => 
    r.status === 'under_review' || r.status === 'more_info_needed'
  )
  const completedRequests = mockGradeRequests.filter(r => 
    r.status === 'approved' || r.status === 'rejected'
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Grade Requests</h1>
          <p className="text-muted-foreground">
            Request grade adjustments for special circumstances
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Request
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockGradeRequests.length}</div>
            <p className="text-xs text-muted-foreground">
              All time submissions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{pendingRequests.length}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting decision
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockGradeRequests.filter(r => r.status === 'approved').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Successful requests
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {Math.round((mockGradeRequests.filter(r => r.status === 'approved').length / completedRequests.length) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Approval rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Pending Requests</h2>
          <div className="space-y-4">
            {pendingRequests.map((request) => {
              const StatusIcon = getStatusIcon(request.status)
              return (
                <Card key={request.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-xl">{request.assignmentTitle}</CardTitle>
                        <CardDescription className="flex items-center gap-4">
                          <span>{request.course} ({request.courseCode})</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Submitted {new Date(request.submittedAt).toLocaleDateString()}
                          </span>
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${getStatusColor(request.status)}`}>
                          <StatusIcon className="h-3 w-3" />
                          {getStatusText(request.status)}
                        </div>
                        <Badge className={getCategoryColor(request.category)}>
                          {request.category}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Grade Change */}
                    <div className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Original</div>
                        <div className="text-2xl font-bold text-red-600">{request.originalGrade}%</div>
                      </div>
                      <div className="text-xl text-muted-foreground">→</div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Requested</div>
                        <div className="text-2xl font-bold text-green-600">{request.requestedGrade}%</div>
                      </div>
                    </div>

                    {/* Reason */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Reason for Request</h4>
                      <p className="text-sm text-muted-foreground">
                        {request.reason}
                      </p>
                    </div>

                    {/* Supporting Documents */}
                    {request.supportingDocuments.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Supporting Documents</h4>
                        <div className="space-y-1">
                          {request.supportingDocuments.map((doc, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm p-2 bg-gray-50 rounded">
                              <FileText className="h-4 w-4" />
                              <span className="flex-1">{doc.name}</span>
                              <span className="text-xs text-muted-foreground">{doc.size}</span>
                              <Button size="sm" variant="ghost">
                                <Download className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Reviewer Notes */}
                    {request.reviewerNotes && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Reviewer Notes</h4>
                        <div className={`p-3 rounded-lg ${request.status === 'more_info_needed' ? 'bg-orange-50' : 'bg-blue-50'}`}>
                          <p className={`text-sm ${request.status === 'more_info_needed' ? 'text-orange-800' : 'text-blue-800'}`}>
                            {request.reviewerNotes}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Status Info */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="text-sm text-muted-foreground">
                        {request.estimatedReviewTime && (
                          <>Estimated review time: {request.estimatedReviewTime}</>
                        )}
                      </span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-3 w-3" />
                          View Details
                        </Button>
                        {request.status === 'more_info_needed' && (
                          <Button size="sm">
                            Update Request
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* Completed Requests */}
      {completedRequests.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Completed Requests</h2>
          <div className="space-y-4">
            {completedRequests.map((request) => {
              const StatusIcon = getStatusIcon(request.status)
              return (
                <Card key={request.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-xl">{request.assignmentTitle}</CardTitle>
                        <CardDescription className="flex items-center gap-4">
                          <span>{request.course} ({request.courseCode})</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Reviewed {request.reviewedAt && new Date(request.reviewedAt).toLocaleDateString()}
                          </span>
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${getStatusColor(request.status)}`}>
                          <StatusIcon className="h-3 w-3" />
                          {getStatusText(request.status)}
                        </div>
                        <Badge className={getCategoryColor(request.category)}>
                          {request.category}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Grade Change Result */}
                    <div className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Original</div>
                        <div className="text-2xl font-bold text-red-600">{request.originalGrade}%</div>
                      </div>
                      <div className="text-xl text-muted-foreground">→</div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Final</div>
                        <div className={`text-2xl font-bold ${request.status === 'approved' ? 'text-green-600' : 'text-red-600'}`}>
                          {request.finalGrade || request.originalGrade}%
                        </div>
                      </div>
                      {request.status === 'approved' && (
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground">Increase</div>
                          <div className="text-lg font-bold text-green-600">
                            +{(request.finalGrade || request.originalGrade) - request.originalGrade}%
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Reviewer Decision */}
                    {request.reviewerNotes && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Review Decision</h4>
                        <div className={`p-3 rounded-lg ${request.status === 'approved' ? 'bg-green-50' : 'bg-red-50'}`}>
                          <p className={`text-sm ${request.status === 'approved' ? 'text-green-800' : 'text-red-800'}`}>
                            {request.reviewerNotes}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="text-sm text-muted-foreground">
                        Request submitted: {new Date(request.submittedAt).toLocaleDateString()}
                      </span>
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-3 w-3" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* New Request Form */}
      <Card>
        <CardHeader>
          <CardTitle>Submit New Grade Request</CardTitle>
          <CardDescription>
            Request a grade adjustment for special circumstances that affected your academic performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GradeAdjustmentRequest 
            onSubmit={async (data) => {
              console.log('Grade request submitted:', data)
              // Handle form submission - integrate with API
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}