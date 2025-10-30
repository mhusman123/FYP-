# File Upload Service Implementation Guide

## Overview

This educational platform uses **UploadThing** for secure, scalable file uploads with built-in validation, progress tracking, and cloud storage.

## Features

- ✅ **Secure Authentication**: Only authenticated users can upload files
- ✅ **File Type Validation**: Configurable allowed file types per assignment
- ✅ **Size Validation**: Customizable file size limits
- ✅ **Progress Tracking**: Real-time upload progress feedback
- ✅ **Drag & Drop**: Intuitive file selection
- ✅ **Multiple Files**: Support for batch uploads
- ✅ **Role-Based Access**: Different upload endpoints for students and educators

## Setup

### 1. Environment Variables

Create or update your `.env` file with UploadThing credentials:

```bash
# UploadThing Configuration
UPLOADTHING_SECRET=your_secret_key_here
UPLOADTHING_APP_ID=your_app_id_here
```

**Getting Your Keys:**

1. Visit [https://uploadthing.com/dashboard](https://uploadthing.com/dashboard)
2. Create a new account or sign in
3. Create a new app
4. Copy your App ID and Secret Key
5. Add them to your `.env` file

### 2. Dependencies

Already installed in this project:

```json
{
  "@uploadthing/react": "^7.3.3",
  "uploadthing": "^7.7.4",
  "react-dropzone": "^14.x"
}
```

## Architecture

### Core Files

```
src/
├── lib/
│   ├── uploadthing.ts              # Server-side configuration
│   └── uploadthing-utils.ts        # Client utilities & validation
├── app/
│   └── api/
│       └── uploadthing/
│           └── route.ts            # API route handler
└── components/
    └── features/
        └── file-upload/
            └── file-upload.tsx     # Reusable upload component
```

## Upload Endpoints

### 1. Assignment Uploader (Students)

**Endpoint:** `assignmentUploader`

**Features:**
- Validates student enrollment in course
- Checks file types against assignment configuration
- Enforces assignment-specific size limits
- Records upload metadata

**Usage:**
```tsx
<FileUpload
  endpoint="assignmentUploader"
  assignmentId="assignment_id_here"
  allowedTypes={['pdf', 'doc', 'docx', 'zip']}
  maxSize={10 * 1024 * 1024} // 10MB
  maxFiles={5}
  onUploadComplete={(files) => {
    console.log('Uploaded:', files)
  }}
/>
```

### 2. Course File Uploader (Educators)

**Endpoint:** `courseFileUploader`

**Features:**
- Educators and admins only
- Higher file size limits
- Support for course materials (PDFs, videos, images)

**Usage:**
```tsx
<FileUpload
  endpoint="courseFileUploader"
  allowedTypes={['pdf', 'mp4', 'jpg', 'png']}
  maxSize={128 * 1024 * 1024} // 128MB
  maxFiles={10}
/>
```

### 3. Profile Image Uploader

**Endpoint:** `profileImageUploader`

**Features:**
- Image files only
- Automatically updates user profile
- 4MB size limit

**Usage:**
```tsx
<FileUpload
  endpoint="profileImageUploader"
  allowedTypes={['jpg', 'jpeg', 'png']}
  maxSize={4 * 1024 * 1024}
  maxFiles={1}
  showPreview={true}
/>
```

## File Type Categories

### Documents
`.pdf`, `.doc`, `.docx`, `.txt`, `.rtf`, `.odt`

### Images
`.jpg`, `.jpeg`, `.png`, `.gif`, `.svg`, `.webp`

### Code Files
`.js`, `.ts`, `.jsx`, `.tsx`, `.py`, `.java`, `.cpp`, `.c`, `.cs`, `.php`, `.rb`, `.go`, `.rs`, `.swift`, `.kt`, `.sql`, `.html`, `.css`, `.json`, `.xml`, `.yaml`

### Archives
`.zip`, `.rar`, `.7z`, `.tar`, `.gz`

### Media
- **Video**: `.mp4`, `.avi`, `.mov`, `.wmv`, `.webm`
- **Audio**: `.mp3`, `.wav`, `.ogg`, `.m4a`, `.flac`

## Validation

### File Type Validation

```typescript
import { isFileTypeAllowed } from '@/lib/uploadthing-utils'

const allowed = isFileTypeAllowed('document.pdf', ['pdf', 'doc'])
// Returns: true
```

### File Size Validation

```typescript
import { isFileSizeValid } from '@/lib/uploadthing-utils'

const valid = isFileSizeValid(5000000, 10000000) // 5MB file, 10MB limit
// Returns: true
```

### Batch Validation

```typescript
import { validateFiles } from '@/lib/uploadthing-utils'

const result = validateFiles(files, {
  allowedTypes: ['pdf', 'doc'],
  maxSize: 10 * 1024 * 1024,
  maxFiles: 5
})

if (!result.valid) {
  console.error('Validation errors:', result.errors)
}
```

## Integration Example

### Assignment Submission with File Upload

```tsx
'use client'

import { useState } from 'react'
import { FileUpload } from '@/components/features/file-upload/file-upload'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function AssignmentSubmissionForm({ assignment }: { assignment: Assignment }) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [comments, setComments] = useState('')

  const handleSubmit = async () => {
    if (uploadedFiles.length === 0) {
      alert('Please upload at least one file')
      return
    }

    // Submit to API
    const response = await fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        assignmentId: assignment.id,
        fileUrl: uploadedFiles[0].url,
        fileName: uploadedFiles[0].name,
        fileSize: uploadedFiles[0].size,
        comments
      })
    })

    if (response.ok) {
      alert('Submission successful!')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Assignment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FileUpload
          endpoint="assignmentUploader"
          assignmentId={assignment.id}
          allowedTypes={assignment.allowedFileTypes}
          maxSize={assignment.maxFileSize}
          onUploadComplete={setUploadedFiles}
          onUploadError={(error) => alert(error.message)}
        />

        {uploadedFiles.length > 0 && (
          <div>
            <label>Comments (optional)</label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div>
        )}

        <Button 
          onClick={handleSubmit}
          disabled={uploadedFiles.length === 0}
        >
          Submit Assignment
        </Button>
      </CardContent>
    </Card>
  )
}
```

## Utility Functions

### Format File Size

```typescript
import { formatFileSize } from '@/lib/uploadthing-utils'

formatFileSize(1024)        // "1 KB"
formatFileSize(1048576)     // "1 MB"
formatFileSize(5242880)     // "5 MB"
```

### Get File Extension

```typescript
import { getFileExtension } from '@/lib/uploadthing-utils'

getFileExtension('document.pdf')  // ".pdf"
getFileExtension('code.tsx')      // ".tsx"
```

### Check File Category

```typescript
import { getFileCategory, isImageFile, isDocumentFile } from '@/lib/uploadthing-utils'

getFileCategory('photo.jpg')      // "image"
isImageFile('photo.png')          // true
isDocumentFile('report.pdf')      // true
```

## Security Features

### Authentication
- All uploads require valid user session
- Session validated via NextAuth

### Authorization
- **Students**: Can only upload to assignments in courses they're enrolled in
- **Educators**: Can upload course materials for their courses
- **All Users**: Can upload profile images

### File Validation
- Type checking (server-side)
- Size limits (server-side)
- Assignment-specific rules
- Enrollment verification

### Storage
- Files stored securely on UploadThing's CDN
- Automatic virus scanning
- HTTPS delivery
- Unique file keys

## Error Handling

### Common Errors

**Unauthorized**
```
Error: "Unauthorized - Please log in"
Solution: Ensure user is authenticated
```

**Invalid File Type**
```
Error: "File type .exe is not allowed"
Solution: Check allowed file types for the assignment
```

**File Too Large**
```
Error: "File exceeds maximum size of 10MB"
Solution: Compress file or split into smaller parts
```

**Not Enrolled**
```
Error: "You are not enrolled in this course"
Solution: Student must enroll in course first
```

## Testing

### Test File Upload

```bash
# Start the development server
npm run dev

# Navigate to assignment submission page
# Upload a test file
# Check console for upload progress and completion
```

### Test Validation

```typescript
// Test file type validation
const testFiles = [
  new File(['content'], 'test.pdf', { type: 'application/pdf' }),
  new File(['content'], 'test.exe', { type: 'application/x-msdownload' })
]

const result = validateFiles(testFiles, {
  allowedTypes: ['pdf'],
  maxSize: 10 * 1024 * 1024
})

console.log(result) // Should show error for .exe file
```

## Performance Optimization

### File Size Limits

**Recommended Limits:**
- Documents: 16MB max
- Images: 4MB max
- Code files: 4MB max
- Archives: 16MB max
- Videos: 32MB max (educators only)

### Upload Progress

The FileUpload component automatically tracks and displays upload progress using UploadThing's built-in progress events.

## Monitoring

### Server Logs

Upload events are logged on the server:

```typescript
console.log("Upload complete for userId:", metadata.userId)
console.log("File URL:", file.url)
```

### Client Callbacks

Track upload lifecycle:

```tsx
<FileUpload
  onUploadComplete={(files) => {
    console.log('Success:', files)
    // Update UI, save to database, etc.
  }}
  onUploadError={(error) => {
    console.error('Error:', error)
    // Show error message to user
  }}
/>
```

## Troubleshooting

### Upload Fails Silently

**Check:**
1. Environment variables are set correctly
2. UploadThing API keys are valid
3. Network connection is stable
4. Browser console for errors

### File Type Rejected

**Check:**
1. Assignment's `allowedFileTypes` configuration
2. File extension matches allowed types
3. MIME type is correct

### Size Limit Exceeded

**Check:**
1. Assignment's `maxFileSize` setting
2. File size before upload
3. Network timeout settings for large files

## Best Practices

1. **Always Validate Client-Side**: Provide immediate feedback
2. **Re-Validate Server-Side**: Never trust client validation alone
3. **Show Progress**: Keep users informed during upload
4. **Handle Errors Gracefully**: Provide clear error messages
5. **Limit File Count**: Prevent abuse with reasonable limits
6. **Use Appropriate Limits**: Match limits to use case
7. **Clean Up Previews**: Revoke object URLs to prevent memory leaks

## Future Enhancements

- [ ] Chunk upload for large files
- [ ] Resume failed uploads
- [ ] File compression before upload
- [ ] Thumbnail generation for images
- [ ] Virus scanning integration
- [ ] Duplicate file detection
- [ ] Batch download for educators
- [ ] File version history

## Support

For issues or questions:
1. Check this documentation
2. Review UploadThing docs: https://docs.uploadthing.com
3. Check server logs for detailed error messages
4. Test with smaller files to isolate issues

## Resources

- [UploadThing Documentation](https://docs.uploadthing.com)
- [Next.js App Router](https://nextjs.org/docs/app)
- [React Dropzone](https://react-dropzone.js.org/)
