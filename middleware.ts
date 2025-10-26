import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware() {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Check if user is trying to access dashboard routes
        if (req.nextUrl.pathname.startsWith("/dashboard")) {
          return !!token;
        }
        
        // Allow all other routes
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    // Match all dashboard routes
    "/dashboard/:path*",
    // Match courses, assignments, submissions, etc.
    "/courses/:path*",
    "/assignments/:path*",
    "/submissions/:path*",
    "/leaderboard/:path*",
    "/badges/:path*",
    "/grade-requests/:path*"
  ]
};