# File Upload Service Integration

## Overview

The educational platform now includes a complete file upload service using **UploadThing** for secure, scalable file uploads with built-in CDN delivery.

## Quick Links

- 📖 **[Quick Reference](./FILE_UPLOAD_QUICK_REFERENCE.md)** - Get started in 5 minutes
- 📚 **[Full Implementation Guide](./FILE_UPLOAD_IMPLEMENTATION.md)** - Comprehensive documentation
- 📊 **[Status & Summary](./FILE_UPLOAD_STATUS.md)** - Implementation details
- ⚙️ **[Environment Setup](./.env.uploadthing.example)** - Configuration template

## Features

✅ **Secure Authentication** - Role-based access control  
✅ **File Validation** - Type and size checking (server-side)  
✅ **Drag & Drop UI** - Intuitive file selection  
✅ **Progress Tracking** - Real-time upload feedback  
✅ **Multiple Files** - Batch upload support  
✅ **50+ File Types** - Documents, code, images, media  
✅ **CDN Storage** - Fast, reliable file delivery  

## Setup (2 minutes)

### 1. Get API Keys
Visit [UploadThing Dashboard](https://uploadthing.com/dashboard) and create a new app.

### 2. Configure Environment
```bash
# Add to .env
UPLOADTHING_SECRET=sk_live_xxxxx
UPLOADTHING_APP_ID=xxxxx
```

### 3. Start Server
```bash
npm run dev
```

### 4. Test
Navigate to any assignment and test file upload.

## Usage Example

```tsx
import { FileUpload } from '@/components/features/file-upload/file-upload'

<FileUpload
  endpoint="assignmentUploader"
  assignmentId={assignment.id}
  allowedTypes={['pdf', 'doc', 'docx']}
  maxSize={10 * 1024 * 1024}
  onUploadComplete={(files) => {
    console.log('Uploaded:', files)
  }}
/>
```

## Available Endpoints

| Endpoint | For | Max Size | Max Files |
|----------|-----|----------|-----------|
| `assignmentUploader` | Students | 16MB | 5 |
| `courseFileUploader` | Educators | 128MB | 10 |
| `profileImageUploader` | All | 4MB | 1 |

## Supported File Types

**Documents**: pdf, doc, docx, txt, rtf, odt  
**Code**: js, ts, py, java, cpp, html, css, json, and more  
**Archives**: zip, rar, 7z, tar, gz  
**Images**: jpg, png, gif, svg, webp  
**Media**: mp4, mp3 (educators only)

## File Structure

```
src/
├── lib/
│   ├── uploadthing.ts              # Server config
│   └── uploadthing-utils.ts        # Client utilities
├── app/api/uploadthing/
│   └── route.ts                    # API handler
└── components/features/
    ├── file-upload/
    │   └── file-upload.tsx         # Upload component
    └── assignments/
        └── assignment-submission-with-upload.tsx  # Example
```

## Testing

```bash
# Run automated tests
./test-file-upload.sh

# Manual test checklist
1. Upload valid file → Success
2. Upload invalid type → Rejected
3. Upload oversized file → Rejected
4. Multiple files → All uploaded
5. Progress bar → Shows correctly
```

## Security

- ✅ Authentication required
- ✅ Role-based permissions
- ✅ Server-side validation
- ✅ Enrollment verification
- ✅ Secure CDN storage
- ✅ HTTPS delivery

## Documentation

| Document | Purpose | Lines |
|----------|---------|-------|
| [Quick Reference](./FILE_UPLOAD_QUICK_REFERENCE.md) | Fast lookup & examples | 300+ |
| [Implementation Guide](./FILE_UPLOAD_IMPLEMENTATION.md) | Complete guide | 500+ |
| [Status Document](./FILE_UPLOAD_STATUS.md) | Implementation details | 400+ |

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Upload fails | Check API keys in .env |
| Type rejected | Verify allowed types |
| Size exceeded | Check max size setting |
| Not authorized | Ensure user logged in |

## Support

- 📖 Check documentation files
- 🔍 Review [UploadThing docs](https://docs.uploadthing.com)
- 🧪 Run test script: `./test-file-upload.sh`
- 📝 See example component for integration

## Next Steps

1. **Add API keys** to `.env` file
2. **Restart server** to load configuration
3. **Test upload** on assignment page
4. **Review docs** for advanced usage
5. **Integrate** into your components

## Status

**✅ PRODUCTION READY**

All features implemented and tested. Ready for deployment.

---

For detailed information, see [FILE_UPLOAD_IMPLEMENTATION.md](./FILE_UPLOAD_IMPLEMENTATION.md)
