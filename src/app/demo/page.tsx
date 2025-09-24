import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎓 EduPlatform Demo
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Welcome to your comprehensive educational management system
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="px-8 py-3">
              Enter Dashboard
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>🎮 Gamification System</CardTitle>
              <CardDescription>
                Engage students with badges, leaderboards, and progress tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Achievement badges and progress tracking</li>
                <li>• Dynamic leaderboards with rankings</li>
                <li>• Points system and weekly goals</li>
                <li>• Visual progress indicators</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📝 Assignment Management</CardTitle>
              <CardDescription>
                Streamlined assignment submission and tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Drag & drop file upload interface</li>
                <li>• Deadline tracking and late submission warnings</li>
                <li>• File validation and progress tracking</li>
                <li>• Submission history and resubmission capability</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>⚖️ Grade Adjustment System</CardTitle>
              <CardDescription>
                Your unique feature for handling special circumstances
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Structured review process for grade adjustments</li>
                <li>• Medical and emergency circumstance categories</li>
                <li>• Supporting document upload system</li>
                <li>• Transparent status tracking</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📊 Student Dashboard</CardTitle>
              <CardDescription>
                Comprehensive overview of academic progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Course progress visualization</li>
                <li>• Upcoming deadlines and assignments</li>
                <li>• Points, rankings, and achievements</li>
                <li>• Quick action buttons for common tasks</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Link href="/dashboard">
            <Button variant="outline" size="lg">
              Explore Full Dashboard →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}