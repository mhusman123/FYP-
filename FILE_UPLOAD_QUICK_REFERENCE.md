# File Upload Service - Quick Reference

## 🚀 Quick Start

### 1. Setup (One-time)

```bash
# 1. Get UploadThing API keys
Visit: https://uploadthing.com/dashboard

# 2. Add to .env file
UPLOADTHING_SECRET=your_secret_key
UPLOADTHING_APP_ID=your_app_id

# 3. Restart dev server
npm run dev
```

### 2. Basic Usage

```tsx
import { FileUpload } from '@/components/features/file-upload/file-upload'

// In your component
<FileUpload
  endpoint="assignmentUploader"
  assignmentId={assignment.id}
  allowedTypes={['pdf', 'doc', 'docx']}
  maxSize={10 * 1024 * 1024}
  onUploadComplete={(files) => console.log('Done!', files)}
/>
```

## 📁 File Structure

```
src/
├── lib/
│   ├── uploadthing.ts           # Server config (3 endpoints)
│   └── uploadthing-utils.ts     # Client utilities
├── app/api/uploadthing/
│   └── route.ts                 # API handler
└── components/features/file-upload/
    └── file-upload.tsx          # UI component
```

## 🔑 Endpoints

| Endpoint | Role | Max Size | Use Case |
|----------|------|----------|----------|
| `assignmentUploader` | Student | 16MB | Assignment submissions |
| `courseFileUploader` | Educator | 128MB | Course materials |
| `profileImageUploader` | All | 4MB | Profile pictures |

## 📋 Common File Types

**Documents**: `pdf`, `doc`, `docx`, `txt`, `rtf`, `odt`  
**Code**: `js`, `ts`, `py`, `java`, `cpp`, `c`, `html`, `css`, `json`  
**Archives**: `zip`, `rar`, `7z`, `tar`, `gz`  
**Images**: `jpg`, `png`, `gif`, `svg`, `webp`

## 🛠️ Utilities

```typescript
import {
  formatFileSize,
  validateFiles,
  isFileTypeAllowed,
  getFileExtension
} from '@/lib/uploadthing-utils'

// Format size
formatFileSize(5242880) // "5 MB"

// Validate
const result = validateFiles(files, {
  allowedTypes: ['pdf'],
  maxSize: 10 * 1024 * 1024
})

// Check type
isFileTypeAllowed('doc.pdf', ['pdf', 'doc']) // true

// Get extension
getFileExtension('file.pdf') // ".pdf"
```

## 🎯 Complete Example

```tsx
'use client'

import { useState } from 'react'
import { FileUpload, UploadedFile } from '@/components/features/file-upload/file-upload'

export function SubmissionForm({ assignmentId }: { assignmentId: string }) {
  const [files, setFiles] = useState<UploadedFile[]>([])

  const handleComplete = async (uploadedFiles: UploadedFile[]) => {
    setFiles(uploadedFiles)
    
    // Submit to your API
    await fetch('/api/submissions', {
      method: 'POST',
      body: JSON.stringify({
        assignmentId,
        fileUrl: uploadedFiles[0].url,
        fileName: uploadedFiles[0].name,
        fileSize: uploadedFiles[0].size
      })
    })
  }

  return (
    <FileUpload
      assignmentId={assignmentId}
      endpoint="assignmentUploader"
      allowedTypes={['pdf', 'doc', 'docx', 'zip']}
      maxSize={10 * 1024 * 1024}
      maxFiles={5}
      onUploadComplete={handleComplete}
      onUploadError={(err) => alert(err.message)}
    />
  )
}
```

## 🔒 Security

✅ Authentication required  
✅ Role-based access control  
✅ File type validation (server-side)  
✅ File size limits (server-side)  
✅ Enrollment verification for students  
✅ Secure CDN storage with HTTPS

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Unauthorized" | Check user is logged in |
| Type rejected | Verify allowedTypes config |
| Size exceeded | Check maxSize setting |
| Upload fails | Verify API keys in .env |
| Not enrolled | Ensure student enrolled in course |

## 📊 Props Reference

### FileUpload Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `endpoint` | string | required | Upload endpoint to use |
| `assignmentId` | string | - | Assignment ID (for assignmentUploader) |
| `allowedTypes` | string[] | `['pdf','doc','docx','txt']` | Allowed file extensions |
| `maxSize` | number | `10485760` | Max file size in bytes |
| `maxFiles` | number | `5` | Max number of files |
| `onUploadComplete` | function | - | Called when upload succeeds |
| `onUploadError` | function | - | Called when upload fails |
| `showPreview` | boolean | `true` | Show image previews |
| `disabled` | boolean | `false` | Disable upload |

## 🔗 Links

- [Full Documentation](./FILE_UPLOAD_IMPLEMENTATION.md)
- [UploadThing Docs](https://docs.uploadthing.com)
- [React Dropzone](https://react-dropzone.js.org/)

## 💡 Tips

1. **Validate twice**: Client + Server
2. **Show progress**: Users love feedback
3. **Handle errors**: Provide clear messages
4. **Set limits**: Prevent abuse
5. **Clean previews**: Revoke URLs after use

## 📝 API Response

```typescript
// onUploadComplete receives:
{
  url: string      // CDN URL
  name: string     // Original filename
  size: number     // File size in bytes
  key: string      // Unique file key
}
```

## 🎨 Customization

```tsx
// Custom styling
<FileUpload
  className="my-custom-class"
  // ... other props
/>

// Custom max sizes
const MAX_SIZES = {
  pdf: 16 * 1024 * 1024,    // 16MB
  image: 4 * 1024 * 1024,   // 4MB
  video: 32 * 1024 * 1024   // 32MB
}
```

## ✅ Testing Checklist

- [ ] API keys configured in .env
- [ ] User can select files (click/drag)
- [ ] Progress bar shows during upload
- [ ] Success message appears
- [ ] File appears in database
- [ ] Invalid types are rejected
- [ ] Size limits are enforced
- [ ] Multiple files work
- [ ] Errors display properly
- [ ] Works for all user roles

---

**Need help?** Check [FILE_UPLOAD_IMPLEMENTATION.md](./FILE_UPLOAD_IMPLEMENTATION.md) for detailed guide.
