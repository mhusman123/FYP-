/**
 * Assignment Submission with File Upload Example
 * 
 * This component demonstrates how to integrate the FileUpload
 * component with the assignment submission flow.
 */

'use client'

import { useState } from 'react'
import { FileUpload, UploadedFile } from '@/components/features/file-upload/file-upload'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { formatFileSize } from '@/lib/uploadthing-utils'

interface Assignment {
  id: string
  title: string
  description: string
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
    fileUrl: string
    submittedAt: string
    status: string
  }
}

interface AssignmentSubmissionWithUploadProps {
  assignment: Assignment
  onSuccess?: () => void
}

export function AssignmentSubmissionWithUpload({
  assignment,
  onSuccess
}: AssignmentSubmissionWithUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [comments, setComments] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const isLate = new Date() > new Date(assignment.dueDate)
  const hasSubmission = !!assignment.submission

  const handleUploadComplete = (files: UploadedFile[]) => {
    setUploadedFiles(files)
    setError(null)
  }

  const handleUploadError = (error: Error) => {
    setError(error.message)
  }

  const handleSubmit = async () => {
    if (uploadedFiles.length === 0) {
      setError('Please upload at least one file')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Submit to the submissions API
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assignmentId: assignment.id,
          fileUrl: uploadedFiles[0].url,
          fileName: uploadedFiles[0].name,
          fileSize: uploadedFiles[0].size,
          comments
        })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to submit assignment')
      }

      setSuccess(true)
      setUploadedFiles([])
      setComments('')

      // Call success callback
      if (onSuccess) {
        onSuccess()
      }

      // Reload page after 2 seconds to show updated submission
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit assignment')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Assignment Info */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">{assignment.title}</CardTitle>
              <CardDescription>
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
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{new Date(assignment.dueDate).toLocaleTimeString()}</span>
            </div>
          </div>

          {isLate && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                This assignment is past due. Late submissions may receive reduced points.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Previous Submission */}
      {hasSubmission && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Previous Submission</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{assignment.submission!.fileName}</p>
                  <p className="text-sm text-muted-foreground">
                    Submitted on {new Date(assignment.submission!.submittedAt).toLocaleString()}
                  </p>
                </div>
                <Badge variant="outline">{assignment.submission!.status}</Badge>
              </div>
              <Button variant="outline" size="sm" asChild>
                <a href={assignment.submission!.fileUrl} target="_blank" rel="noopener noreferrer">
                  View Submission
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* File Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {hasSubmission ? 'Resubmit Assignment' : 'Submit Assignment'}
          </CardTitle>
          <CardDescription>
            Accepted formats: {assignment.allowedFileTypes.join(', ')} • 
            Max size: {formatFileSize(assignment.maxFileSize)}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Success Message */}
          {success && (
            <Alert className="border-green-500">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertDescription className="text-green-500">
                Assignment submitted successfully! Redirecting...
              </AlertDescription>
            </Alert>
          )}

          {/* Error Message */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* File Upload Component */}
          {!success && (
            <>
              <FileUpload
                endpoint="assignmentUploader"
                assignmentId={assignment.id}
                allowedTypes={assignment.allowedFileTypes}
                maxSize={assignment.maxFileSize}
                maxFiles={5}
                onUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
                disabled={isSubmitting}
              />

              {/* Uploaded Files Info */}
              {uploadedFiles.length > 0 && (
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm font-medium mb-2">
                    Ready to submit {uploadedFiles.length} file(s)
                  </p>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="text-sm text-muted-foreground">
                      • {file.name} ({formatFileSize(file.size)})
                    </div>
                  ))}
                </div>
              )}

              {/* Comments */}
              <div className="space-y-2">
                <Label htmlFor="comments">Comments (Optional)</Label>
                <Textarea
                  id="comments"
                  placeholder="Any notes or comments about your submission..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  disabled={isSubmitting}
                  rows={3}
                />
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                disabled={uploadedFiles.length === 0 || isSubmitting}
                className="w-full"
                size="lg"
              >
                {isSubmitting ? (
                  'Submitting...'
                ) : hasSubmission ? (
                  'Resubmit Assignment'
                ) : (
                  'Submit Assignment'
                )}
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* Upload Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Submission Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Make sure your file is in one of the accepted formats</li>
            <li>• File size must not exceed {formatFileSize(assignment.maxFileSize)}</li>
            <li>• You can upload up to 5 files at once</li>
            <li>• You can resubmit your assignment before the deadline</li>
            <li>• Late submissions may receive reduced points</li>
            <li>• Include all necessary files in your submission</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
