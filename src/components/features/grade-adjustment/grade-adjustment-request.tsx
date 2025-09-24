'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Heart,
  Users,
  Wifi,
  Eye,
  HelpCircle,
  Upload,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle
} from 'lucide-react'

const adjustmentSchema = z.object({
  reason: z.enum(['MEDICAL', 'FAMILY_EMERGENCY', 'TECHNICAL_ISSUES', 'ACCESSIBILITY', 'OTHER']),
  description: z.string().min(50, 'Please provide at least 50 characters of detail'),
  supportingDocuments: z.array(z.instanceof(File)).optional()
})

type AdjustmentFormData = z.infer<typeof adjustmentSchema>

interface Submission {
  id: string
  assignmentTitle: string
  courseName: string
  courseCode: string
  submittedAt: string
  currentGrade?: number
  maxPoints: number
  isLate: boolean
}

interface GradeAdjustmentRequest {
  id: string
  submissionId: string
  reason: string
  description: string
  requestedAt: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'REQUIRES_INFO'
  reviewedBy?: string
  reviewedAt?: string
  decision?: string
  adjustedGrade?: number
  submission: Submission
}

interface GradeAdjustmentProps {
  submission?: Submission
  existingRequest?: GradeAdjustmentRequest
  onSubmit: (data: AdjustmentFormData) => Promise<void>
}

const reasonConfig = {
  MEDICAL: {
    label: 'Medical Circumstances',
    icon: Heart,
    description: 'Health issues that affected your performance',
    examples: ['Illness during assignment period', 'Medical emergency', 'Mental health concerns']
  },
  FAMILY_EMERGENCY: {
    label: 'Family Emergency',
    icon: Users,
    description: 'Family circumstances that impacted your work',
    examples: ['Family illness', 'Bereavement', 'Family crisis requiring immediate attention']
  },
  TECHNICAL_ISSUES: {
    label: 'Technical Difficulties',
    icon: Wifi,
    description: 'Technology problems that prevented completion',
    examples: ['Computer malfunction', 'Internet connectivity issues', 'Software problems']
  },
  ACCESSIBILITY: {
    label: 'Accessibility Needs',
    icon: Eye,
    description: 'Accommodation requirements not met',
    examples: ['Required assistive technology unavailable', 'Format accessibility issues']
  },
  OTHER: {
    label: 'Other Circumstances',
    icon: HelpCircle,
    description: 'Other significant circumstances',
    examples: ['Exceptional personal circumstances', 'University-related conflicts']
  }
}

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'PENDING':
      return { icon: Clock, color: 'text-yellow-600', bgColor: 'bg-yellow-50', label: 'Under Review' }
    case 'APPROVED':
      return { icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-50', label: 'Approved' }
    case 'REJECTED':
      return { icon: XCircle, color: 'text-red-600', bgColor: 'bg-red-50', label: 'Rejected' }
    case 'REQUIRES_INFO':
      return { icon: AlertTriangle, color: 'text-orange-600', bgColor: 'bg-orange-50', label: 'More Info Needed' }
    default:
      return { icon: Clock, color: 'text-gray-600', bgColor: 'bg-gray-50', label: status }
  }
}

export function GradeAdjustmentRequest({ submission, existingRequest, onSubmit }: GradeAdjustmentProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<AdjustmentFormData>({
    resolver: zodResolver(adjustmentSchema)
  })

  const selectedReason = watch('reason')

  const handleFormSubmit = async (data: AdjustmentFormData) => {
    try {
      await onSubmit({ ...data, supportingDocuments: selectedFiles })
      setIsDialogOpen(false)
    } catch (error) {
      console.error('Failed to submit grade adjustment request:', error)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files))
    }
  }

  if (existingRequest) {
    const statusConfig = getStatusConfig(existingRequest.status)
    const StatusIcon = statusConfig.icon

    return (
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Grade Adjustment Request</CardTitle>
              <CardDescription>
                {existingRequest.submission.assignmentTitle} - {existingRequest.submission.courseName}
              </CardDescription>
            </div>
            <Badge variant="outline" className={`${statusConfig.color} ${statusConfig.bgColor}`}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {statusConfig.label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label className="text-sm font-medium">Reason</Label>
              <p className="text-sm text-muted-foreground">
                {reasonConfig[existingRequest.reason as keyof typeof reasonConfig]?.label}
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium">Submitted</Label>
              <p className="text-sm text-muted-foreground">
                {new Date(existingRequest.requestedAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">Description</Label>
            <p className="text-sm text-muted-foreground mt-1">{existingRequest.description}</p>
          </div>

          {existingRequest.status === 'APPROVED' && existingRequest.adjustedGrade !== undefined && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Your grade has been adjusted to {existingRequest.adjustedGrade}/{existingRequest.submission.maxPoints} points.
              </AlertDescription>
            </Alert>
          )}

          {existingRequest.status === 'REJECTED' && existingRequest.decision && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>{existingRequest.decision}</AlertDescription>
            </Alert>
          )}

          {existingRequest.status === 'REQUIRES_INFO' && existingRequest.decision && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Additional information required: {existingRequest.decision}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Request Grade Review
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Request Grade Adjustment</DialogTitle>
          <DialogDescription>
            If you experienced circumstances that affected your assignment performance, you can request a grade review.
          </DialogDescription>
        </DialogHeader>

        {submission && (
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-2 md:grid-cols-2">
                <div>
                  <Label className="text-sm font-medium">Assignment</Label>
                  <p className="text-sm text-muted-foreground">{submission.assignmentTitle}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Course</Label>
                  <p className="text-sm text-muted-foreground">
                    {submission.courseName} ({submission.courseCode})
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Current Grade</Label>
                  <p className="text-sm text-muted-foreground">
                    {submission.currentGrade !== undefined 
                      ? `${submission.currentGrade}/${submission.maxPoints}` 
                      : 'Not graded yet'}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Submitted</Label>
                  <p className="text-sm text-muted-foreground">
                    {new Date(submission.submittedAt).toLocaleDateString()}
                    {submission.isLate && <span className="text-red-600 ml-1">(Late)</span>}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Reason Selection */}
          <div className="space-y-3">
            <Label>Reason for Request *</Label>
            <Select onValueChange={(value) => setValue('reason', value as 'MEDICAL' | 'FAMILY_EMERGENCY' | 'TECHNICAL_ISSUES' | 'ACCESSIBILITY' | 'OTHER')}>
              <SelectTrigger>
                <SelectValue placeholder="Select the reason for your request" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(reasonConfig).map(([key, config]) => {
                  const Icon = config.icon
                  return (
                    <SelectItem key={key} value={key}>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <span>{config.label}</span>
                      </div>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
            {errors.reason && (
              <p className="text-sm text-destructive">{errors.reason.message}</p>
            )}
          </div>

          {/* Reason Details */}
          {selectedReason && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2">
                  <p className="font-medium">
                    {reasonConfig[selectedReason]?.description}
                  </p>
                  <p className="text-sm">Examples:</p>
                  <ul className="text-sm list-disc list-inside space-y-1">
                    {reasonConfig[selectedReason]?.examples.map((example, index) => (
                      <li key={index}>{example}</li>
                    ))}
                  </ul>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Detailed Description *</Label>
            <Textarea
              id="description"
              placeholder="Please provide detailed information about the circumstances that affected your performance. Include dates, how it impacted your work, and any other relevant details..."
              className="min-h-[120px]"
              {...register('description')}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>

          {/* Supporting Documents */}
          <div className="space-y-3">
            <Label>Supporting Documents (Optional)</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
              <div className="text-center space-y-2">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                <div>
                  <Input
                    type="file"
                    multiple
                    className="sr-only"
                    id="documents"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                  <Label htmlFor="documents" className="cursor-pointer">
                    <span className="font-medium">Click to upload</span> or drag and drop
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    PDF, DOC, images up to 10MB each
                  </p>
                </div>
              </div>
              {selectedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4" />
                      <span>{file.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedFiles(files => files.filter((_, i) => i !== index))}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Supporting documents help validate your request. Examples: medical certificates, official letters, screenshots of technical issues.
            </p>
          </div>

          {/* Important Notice */}
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Important:</strong> Grade adjustment requests are reviewed carefully and decisions are final. 
              Only submit requests for genuine circumstances that significantly impacted your performance.
            </AlertDescription>
          </Alert>

          {/* Submit Button */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}