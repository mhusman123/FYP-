/**
 * UploadThing React Utilities
 * 
 * Client-side utilities for file uploads using UploadThing.
 * Includes hooks, helpers, and validation functions.
 */

import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@/lib/uploadthing";

// Generate typed hooks for the file router
export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();

/**
 * File validation utilities
 */

// Maximum file sizes in bytes
export const MAX_FILE_SIZES = {
  document: 16 * 1024 * 1024,      // 16MB
  image: 4 * 1024 * 1024,          // 4MB
  video: 32 * 1024 * 1024,         // 32MB
  audio: 8 * 1024 * 1024,          // 8MB
  code: 4 * 1024 * 1024,           // 4MB
  archive: 16 * 1024 * 1024        // 16MB
} as const;

// File type categories
export const FILE_TYPE_CATEGORIES = {
  document: ['.pdf', '.doc', '.docx', '.txt', '.rtf', '.odt'],
  image: ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'],
  video: ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm'],
  audio: ['.mp3', '.wav', '.ogg', '.m4a', '.flac'],
  code: [
    '.js', '.ts', '.jsx', '.tsx', '.py', '.java', '.cpp', '.c',
    '.cs', '.php', '.rb', '.go', '.rs', '.swift', '.kt', '.sql',
    '.html', '.css', '.scss', '.json', '.xml', '.yaml', '.yml'
  ],
  archive: ['.zip', '.rar', '.7z', '.tar', '.gz']
} as const;

export type FileCategory = keyof typeof FILE_TYPE_CATEGORIES;

/**
 * Get file extension from filename
 */
export function getFileExtension(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase();
  return ext ? `.${ext}` : '';
}

/**
 * Get file category based on extension
 */
export function getFileCategory(filename: string): FileCategory | null {
  const ext = getFileExtension(filename);
  
  for (const [category, extensions] of Object.entries(FILE_TYPE_CATEGORIES)) {
    if ((extensions as readonly string[]).includes(ext)) {
      return category as FileCategory;
    }
  }
  
  return null;
}

/**
 * Validate file type against allowed types
 */
export function isFileTypeAllowed(
  filename: string,
  allowedTypes: string[]
): boolean {
  const ext = getFileExtension(filename).replace('.', '');
  return allowedTypes.some(type => type.toLowerCase() === ext.toLowerCase());
}

/**
 * Validate file size
 */
export function isFileSizeValid(
  fileSize: number,
  maxSize: number
): boolean {
  return fileSize <= maxSize;
}

/**
 * Format file size to human-readable string
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Validate multiple files
 */
export interface FileValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateFiles(
  files: File[],
  options: {
    allowedTypes?: string[];
    maxSize?: number;
    maxFiles?: number;
  }
): FileValidationResult {
  const errors: string[] = [];

  // Check number of files
  if (options.maxFiles && files.length > options.maxFiles) {
    errors.push(`Maximum ${options.maxFiles} file(s) allowed`);
  }

  // Validate each file
  for (const file of files) {
    // Check file type
    if (options.allowedTypes && !isFileTypeAllowed(file.name, options.allowedTypes)) {
      errors.push(
        `File "${file.name}" has invalid type. Allowed: ${options.allowedTypes.join(', ')}`
      );
    }

    // Check file size
    if (options.maxSize && !isFileSizeValid(file.size, options.maxSize)) {
      errors.push(
        `File "${file.name}" (${formatFileSize(file.size)}) exceeds maximum size of ${formatFileSize(options.maxSize)}`
      );
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Get MIME type from file extension
 */
export function getMimeType(filename: string): string {
  const ext = getFileExtension(filename).toLowerCase();
  
  const mimeTypes: Record<string, string> = {
    // Documents
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.txt': 'text/plain',
    '.rtf': 'application/rtf',
    '.odt': 'application/vnd.oasis.opendocument.text',
    
    // Images
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    
    // Code/Text
    '.js': 'text/javascript',
    '.ts': 'text/typescript',
    '.jsx': 'text/javascript',
    '.tsx': 'text/typescript',
    '.py': 'text/x-python',
    '.java': 'text/x-java',
    '.cpp': 'text/x-c++',
    '.c': 'text/x-c',
    '.html': 'text/html',
    '.css': 'text/css',
    '.json': 'application/json',
    '.xml': 'application/xml',
    '.yaml': 'text/yaml',
    '.yml': 'text/yaml',
    
    // Archives
    '.zip': 'application/zip',
    '.rar': 'application/x-rar-compressed',
    '.7z': 'application/x-7z-compressed',
    '.tar': 'application/x-tar',
    '.gz': 'application/gzip'
  };

  return mimeTypes[ext] || 'application/octet-stream';
}

/**
 * Create a file preview URL
 */
export function createFilePreview(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

/**
 * Check if file is an image
 */
export function isImageFile(filename: string): boolean {
  const ext = getFileExtension(filename);
  return (FILE_TYPE_CATEGORIES.image as readonly string[]).includes(ext);
}

/**
 * Check if file is a document
 */
export function isDocumentFile(filename: string): boolean {
  const ext = getFileExtension(filename);
  return (FILE_TYPE_CATEGORIES.document as readonly string[]).includes(ext);
}

/**
 * Generate a safe filename
 */
export function sanitizeFilename(filename: string): string {
  // Remove special characters and spaces
  const name = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
  
  // Ensure the extension is preserved
  const ext = getFileExtension(filename);
  const baseName = name.replace(ext, '');
  
  return `${baseName}${ext}`;
}
