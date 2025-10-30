/**
 * UploadThing API Route Handler
 * 
 * This route handles file uploads via UploadThing.
 * 
 * Endpoints:
 * - GET /api/uploadthing - Returns upload configuration
 * - POST /api/uploadthing - Handles file upload requests
 */

import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "@/lib/uploadthing";

// Export routes for Next.js App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  
  // Optional: Add custom config
  config: {
    // Customize upload endpoint if needed
    // uploadthingId: process.env.UPLOADTHING_APP_ID,
    // uploadthingSecret: process.env.UPLOADTHING_SECRET,
  }
});
