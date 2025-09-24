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
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import {
  Upload,
  FileText,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react'

const submissionSchema = z.object({
  file: z.instanceof(File).refine(
    (file) => file.size <= 10 * 1024 * 1024, // 10MB
    { message: 'File size must be less than 10MB' }
  ),
  comments: z.string().optional()
})

type SubmissionFormData = z.infer<typeof submissionSchema>

interface Assignment {
  id: string
  title: string
  description: string
  instructions: string
  dueDate: string
  maxPoints: number
  allowedFileTypes: string[]
  maxFileSize: number
  course: {
    name: string
    code: string
  }
  submission?: {
    id: string
    fileName: string
    submittedAt: string
    status: 'SUBMITTED' | 'GRADED' | 'UNDER_REVIEW' | 'RETURNED'
    grade?: number
  }
}

interface AssignmentSubmissionProps {
  assignment: Assignment
  onSubmit: (data: SubmissionFormData) => Promise<void>
}

export function AssignmentSubmission({ assignment, onSubmit }: AssignmentSubmissionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<SubmissionFormData>({
    resolver: zodResolver(submissionSchema)
  })

  const selectedFile = watch('file')
  const isLate = new Date() > new Date(assignment.dueDate)
  const timeUntilDue = new Date(assignment.dueDate).getTime() - new Date().getTime()
  const daysUntilDue = Math.ceil(timeUntilDue / (1000 * 60 * 60 * 24))

  const handleFormSubmit = async (data: SubmissionFormData) => {
    setIsSubmitting(true)
    try {
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i)
        await new Promise(resolve => setTimeout(resolve, 100))
      }
      await onSubmit(data)
    } catch (error) {
      console.error('Submission failed:', error)
    } finally {
      setIsSubmitting(false)
      setUploadProgress(0)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setValue('file', e.dataTransfer.files[0])
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-6">
      {/* Assignment Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">{assignment.title}</CardTitle>
              <CardDescription className="text-base">
                {assignment.course.name} ({assignment.course.code})
              </CardDescription>
            </div>
            <Badge variant={isLate ? 'destructive' : 'default'}>
              {assignment.maxPoints} points
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">{assignment.description}</p>
          
          {/* Due Date Info */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>
                {isLate ? (
                  <span className="text-destructive">Overdue</span>
                ) : daysUntilDue === 0 ? (
                  <span className="text-warning">Due today</span>
                ) : (
                  <span>{daysUntilDue} days remaining</span>
                )}
              </span>
            </div>
          </div>

          {/* Status Alert */}
          {isLate && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                This assignment is overdue. Late submissions may receive reduced credit.
              </AlertDescription>
            </Alert>
          )}

          {assignment.submission && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                You have already submitted this assignment on{' '}
                {new Date(assignment.submission.submittedAt).toLocaleDateString()}.
                You can resubmit to replace your previous submission.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p>{assignment.instructions}</p>
          </div>
        </CardContent>
      </Card>

      {/* Submission Form */}
      <Card>
        <CardHeader>
          <CardTitle>Submit Your Work</CardTitle>
          <CardDescription>
            Upload your assignment file. Accepted formats: {assignment.allowedFileTypes.join(', ')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            {/* File Upload */}
            <div className="space-y-2">
              <Label>Assignment File *</Label>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? 'border-primary bg-primary/5'
                    : 'border-muted-foreground/25 hover:border-muted-foreground/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {selectedFile ? (
                  <div className="space-y-2">
                    <FileText className="h-8 w-8 mx-auto text-primary" />
                    <div>
                      <p className="font-medium">{selectedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatFileSize(selectedFile.size)}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setValue('file', null as unknown as File)}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Max file size: {formatFileSize(assignment.maxFileSize)}
                      </p>
                    </div>
                  </div>
                )}
                <Input
                  type="file"
                  className="sr-only"
                  accept={assignment.allowedFileTypes.map(type => `.${type}`).join(',')}
                  {...register('file')}
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setValue('file', e.target.files[0])
                    }
                  }}
                />
              </div>
              {errors.file && (
                <p className="text-sm text-destructive">{errors.file.message}</p>
              )}
            </div>

            {/* Comments */}
            <div className="space-y-2">
              <Label htmlFor="comments">Comments (Optional)</Label>
              <Textarea
                id="comments"
                placeholder="Any additional comments or notes about your submission..."
                {...register('comments')}
              />
            </div>

            {/* Upload Progress */}
            {isSubmitting && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} />
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={!selectedFile || isSubmitting}
            >
              {isSubmitting ? (
                'Submitting...'
              ) : assignment.submission ? (
                'Resubmit Assignment'
              ) : (
                'Submit Assignment'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Previous Submission */}
      {assignment.submission && (
        <Card>
          <CardHeader>
            <CardTitle>Previous Submission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{assignment.submission.fileName}</p>
                <p className="text-sm text-muted-foreground">
                  Submitted on {new Date(assignment.submission.submittedAt).toLocaleDateString()}
                </p>
              </div>
              <Badge variant="outline">{assignment.submission.status}</Badge>
            </div>
            {assignment.submission.grade !== undefined && (
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Grade:</span>
                  <span className="text-lg font-bold">
                    {assignment.submission.grade}/{assignment.maxPoints}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}