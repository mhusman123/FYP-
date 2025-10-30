/**
 * UploadThing Core Configuration
 * 
 * This file configures the file upload service with:
 * - File type validation based on assignment requirements
 * - File size limits
 * - Authentication checks
 * - Metadata handling
 */

import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";

const f = createUploadthing();

// Allowed file extensions for assignments
const ALLOWED_DOCUMENT_TYPES = [
  "pdf",
  "doc",
  "docx",
  "txt",
  "rtf",
  "odt"
] as const;

const ALLOWED_CODE_TYPES = [
  "js",
  "ts",
  "jsx",
  "tsx",
  "py",
  "java",
  "cpp",
  "c",
  "cs",
  "php",
  "rb",
  "go",
  "rs",
  "swift",
  "kt",
  "sql",
  "html",
  "css",
  "scss",
  "json",
  "xml",
  "yaml",
  "yml"
] as const;

const ALLOWED_ARCHIVE_TYPES = [
  "zip",
  "rar",
  "7z",
  "tar",
  "gz"
] as const;

const ALLOWED_IMAGE_TYPES = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "svg",
  "webp"
] as const;

// Combine all allowed types
export const ALL_ALLOWED_TYPES = [
  ...ALLOWED_DOCUMENT_TYPES,
  ...ALLOWED_CODE_TYPES,
  ...ALLOWED_ARCHIVE_TYPES,
  ...ALLOWED_IMAGE_TYPES
] as const;

// Helper function to check if user is authenticated and authorized
const auth = async () => {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    throw new Error("Unauthorized - Please log in");
  }
  
  return { userId: session.user.id, role: session.user.role };
};

// Helper function to validate assignment and enrollment
async function validateAssignmentAccess(
  assignmentId: string,
  userId: string,
  role: string
) {
  const assignment = await prisma.assignment.findUnique({
    where: { id: assignmentId },
    include: {
      course: {
        include: {
          enrollments: {
            where: { studentId: userId }
          }
        }
      }
    }
  });

  if (!assignment) {
    throw new Error("Assignment not found");
  }

  // Check if student is enrolled in the course
  if (role === "STUDENT" && assignment.course.enrollments.length === 0) {
    throw new Error("You are not enrolled in this course");
  }

  return assignment;
}

// Define file upload routes
export const ourFileRouter = {
  // Assignment submission uploader for students
  assignmentUploader: f({
    // Accept multiple file types based on assignment configuration
    // Default to reasonable limits
    pdf: { maxFileSize: "16MB", maxFileCount: 5 },
    image: { maxFileSize: "4MB", maxFileCount: 10 },
    text: { maxFileSize: "4MB", maxFileCount: 10 },
    video: { maxFileSize: "32MB", maxFileCount: 2 },
    audio: { maxFileSize: "8MB", maxFileCount: 5 },
    blob: { maxFileSize: "16MB", maxFileCount: 5 }
  })
    .middleware(async ({ req, files }) => {
      // Authenticate user
      const { userId, role } = await auth();

      if (role !== "STUDENT") {
        throw new Error("Only students can upload assignment submissions");
      }

      // Get assignment ID from request
      const url = new URL(req.url);
      const assignmentId = url.searchParams.get("assignmentId");

      if (!assignmentId) {
        throw new Error("Assignment ID is required");
      }

      // Validate assignment and enrollment
      const assignment = await validateAssignmentAccess(assignmentId, userId, role);

      // Parse allowed file types
      let allowedTypes: string[] = [];
      if (typeof assignment.allowedFileTypes === "string") {
        try {
          allowedTypes = JSON.parse(assignment.allowedFileTypes);
        } catch {
          allowedTypes = ["pdf", "doc", "docx", "txt"];
        }
      } else if (Array.isArray(assignment.allowedFileTypes)) {
        allowedTypes = assignment.allowedFileTypes as string[];
      }

      // Validate file types
      for (const file of files) {
        const fileExt = file.name.split(".").pop()?.toLowerCase();
        
        if (!fileExt) {
          throw new Error(`Invalid file: ${file.name}`);
        }

        // Check against allowed types
        if (!allowedTypes.some(type => type.toLowerCase() === fileExt)) {
          throw new Error(
            `File type .${fileExt} is not allowed. Allowed types: ${allowedTypes.join(", ")}`
          );
        }

        // Check file size
        if (file.size > assignment.maxFileSize) {
          const maxSizeMB = (assignment.maxFileSize / (1024 * 1024)).toFixed(2);
          const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
          throw new Error(
            `File ${file.name} is too large (${fileSizeMB}MB). Maximum allowed: ${maxSizeMB}MB`
          );
        }
      }

      // Return metadata to be available in onUploadComplete
      return {
        userId,
        assignmentId,
        maxFileSize: assignment.maxFileSize,
        allowedTypes
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);

      // Return data that will be sent to the client
      return {
        uploadedBy: metadata.userId,
        assignmentId: metadata.assignmentId,
        fileUrl: file.url,
        fileName: file.name,
        fileSize: file.size,
        fileKey: file.key
      };
    }),

  // Educator file uploader for course materials
  courseFileUploader: f({
    pdf: { maxFileSize: "32MB", maxFileCount: 10 },
    image: { maxFileSize: "8MB", maxFileCount: 20 },
    video: { maxFileSize: "128MB", maxFileCount: 5 },
    audio: { maxFileSize: "16MB", maxFileCount: 10 }
  })
    .middleware(async () => {
      const { userId, role } = await auth();

      if (role !== "EDUCATOR" && role !== "ADMIN") {
        throw new Error("Only educators can upload course files");
      }

      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Course file uploaded by:", metadata.userId);
      
      return {
        uploadedBy: metadata.userId,
        fileUrl: file.url,
        fileName: file.name,
        fileSize: file.size,
        fileKey: file.key
      };
    }),

  // Profile image uploader
  profileImageUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 }
  })
    .middleware(async () => {
      const { userId } = await auth();
      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Profile image uploaded for user:", metadata.userId);

      // Update user profile with new image (if avatar field exists in schema)
      // await prisma.user.update({
      //   where: { id: metadata.userId },
      //   data: { avatar: file.url }
      // });

      return {
        uploadedBy: metadata.userId,
        fileUrl: file.url
      };
    })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
