/**
 * File Upload Component with UploadThing
 * 
 * Reusable component for uploading files with:
 * - Drag and drop support
 * - Progress tracking
 * - File validation
 * - Preview support
 */

'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { useUploadThing } from '@/lib/uploadthing-utils'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent } from '@/components/ui/card'
import {
  Upload,
  X,
  FileText,
  Image as ImageIcon,
  File as FileIcon,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  formatFileSize,
  validateFiles,
  isImageFile,
  getFileExtension
} from '@/lib/uploadthing-utils'

export interface FileUploadProps {
  /** Assignment ID for context */
  assignmentId?: string
  /** Allowed file types (e.g., ['pdf', 'doc', 'docx']) */
  allowedTypes?: string[]
  /** Maximum file size in bytes */
  maxSize?: number
  /** Maximum number of files */
  maxFiles?: number
  /** Callback when upload completes */
  onUploadComplete?: (files: UploadedFile[]) => void
  /** Callback when upload fails */
  onUploadError?: (error: Error) => void
  /** Upload endpoint to use */
  endpoint?: 'assignmentUploader' | 'courseFileUploader' | 'profileImageUploader'
  /** Show preview for images */
  showPreview?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Custom className */
  className?: string
}

export interface UploadedFile {
  url: string
  name: string
  size: number
  key: string
}

interface FileWithPreview extends File {
  preview?: string
}

export function FileUpload({
  assignmentId,
  allowedTypes = ['pdf', 'doc', 'docx', 'txt'],
  maxSize = 10 * 1024 * 1024, // 10MB default
  maxFiles = 5,
  onUploadComplete,
  onUploadError,
  endpoint = 'assignmentUploader',
  showPreview = true,
  disabled = false,
  className
}: FileUploadProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  const { startUpload, isUploading } = useUploadThing(endpoint, {
    onClientUploadComplete: (res) => {
      console.log('Upload completed:', res)
      setUploadSuccess(true)
      setUploadProgress(100)
      
      if (onUploadComplete && res) {
        const uploadedFiles: UploadedFile[] = res.map((file) => ({
          url: file.url,
          name: file.name,
          size: file.size,
          key: file.key
        }))
        onUploadComplete(uploadedFiles)
      }

      // Clear files after successful upload
      setTimeout(() => {
        setFiles([])
        setUploadProgress(0)
        setUploadSuccess(false)
      }, 2000)
    },
    onUploadError: (error) => {
      console.error('Upload error:', error)
      setUploadError(error.message)
      setUploadProgress(0)
      
      if (onUploadError) {
        onUploadError(error)
      }
    },
    onUploadProgress: (progress) => {
      setUploadProgress(progress)
    }
  })

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadError(null)
    setUploadSuccess(false)

    // Validate files
    const validation = validateFiles(acceptedFiles, {
      allowedTypes,
      maxSize,
      maxFiles: maxFiles - files.length
    })

    if (!validation.valid) {
      setUploadError(validation.errors.join('. '))
      return
    }

    // Add preview for images
    const filesWithPreview = acceptedFiles.map((file) => {
      if (showPreview && isImageFile(file.name)) {
        const preview = URL.createObjectURL(file)
        return Object.assign(file, { preview })
      }
      return file
    })

    setFiles((prev) => [...prev, ...filesWithPreview])
  }, [files.length, allowedTypes, maxSize, maxFiles, showPreview])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: disabled || isUploading || files.length >= maxFiles,
    accept: allowedTypes.reduce((acc, type) => {
      acc[`application/${type}`] = [`.${type}`]
      return acc
    }, {} as Record<string, string[]>)
  })

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const newFiles = [...prev]
      const removed = newFiles.splice(index, 1)[0]
      
      // Revoke preview URL if exists
      if (removed.preview) {
        URL.revokeObjectURL(removed.preview)
      }
      
      return newFiles
    })
  }

  const handleUpload = async () => {
    if (files.length === 0) return

    setUploadError(null)
    setUploadSuccess(false)
    setUploadProgress(0)

    try {
      // Pass assignmentId if provided for validation on server
      // UploadThing will include it in the request URL
      if (assignmentId && endpoint === 'assignmentUploader') {
        // Assignment ID will be read from URL params in middleware
        console.log('Uploading for assignment:', assignmentId)
      }
      await startUpload(files)
    } catch (error) {
      console.error('Upload failed:', error)
      setUploadError(error instanceof Error ? error.message : 'Upload failed')
    }
  }

  const getFileIcon = (filename: string) => {
    if (isImageFile(filename)) return <ImageIcon className="h-8 w-8" />
    const ext = getFileExtension(filename)
    if (['.pdf'].includes(ext)) return <FileText className="h-8 w-8 text-red-500" />
    return <FileIcon className="h-8 w-8" />
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Dropzone */}
      {files.length < maxFiles && !disabled && (
        <div
          {...getRootProps()}
          className={cn(
            'border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer',
            isDragActive
              ? 'border-primary bg-primary/5'
              : 'border-muted-foreground/25 hover:border-muted-foreground/50',
            (isUploading || disabled) && 'opacity-50 cursor-not-allowed'
          )}
        >
          <input {...getInputProps()} />
          <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
          
          {isDragActive ? (
            <p className="text-sm font-medium">Drop files here...</p>
          ) : (
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">
                Allowed types: {allowedTypes.join(', ')} • Max {formatFileSize(maxSize)}
              </p>
              <p className="text-xs text-muted-foreground">
                Up to {maxFiles} file{maxFiles !== 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  {/* File icon or preview */}
                  {file.preview ? (
                    <div className="relative h-16 w-16 flex-shrink-0">
                      <Image
                        src={file.preview}
                        alt={file.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  ) : (
                    <div className="flex-shrink-0">
                      {getFileIcon(file.name)}
                    </div>
                  )}

                  {/* File info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                  </div>

                  {/* Remove button */}
                  {!isUploading && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      disabled={disabled}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Upload Progress */}
      {isUploading && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Uploading...
            </span>
            <span>{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} />
        </div>
      )}

      {/* Success Message */}
      {uploadSuccess && (
        <Alert className="border-green-500">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-500">
            Files uploaded successfully!
          </AlertDescription>
        </Alert>
      )}

      {/* Error Message */}
      {uploadError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{uploadError}</AlertDescription>
        </Alert>
      )}

      {/* Upload Button */}
      {files.length > 0 && !uploadSuccess && (
        <Button
          onClick={handleUpload}
          disabled={isUploading || disabled}
          className="w-full"
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload {files.length} file{files.length !== 1 ? 's' : ''}
            </>
          )}
        </Button>
      )}
    </div>
  )
}
