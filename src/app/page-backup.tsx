import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { GraduationCap, BookOpen, Trophy, FileText, Award, BarChart3 } from 'lucide-react'

export default async function Home() {
  const session = await getServerSession(authOptions)
  
  // If authenticated, redirect to dashboard
  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">EduPlatform</span>
          </div>
          <Button asChild>
            <Link href="/auth/signin">Sign In</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            Your Complete Educational
            <span className="text-primary"> Management System</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Streamline your educational experience with course management, assignment tracking, 
            gamification, and comprehensive analytics all in one place.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/auth/signin">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/demo">View Demo</Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <BookOpen className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Course Management</CardTitle>
              <CardDescription>
                Track your courses, progress, and deadlines in one unified dashboard.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <FileText className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Assignment Tracking</CardTitle>
              <CardDescription>
                Submit assignments, track progress, and manage deadlines effortlessly.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Trophy className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Gamification</CardTitle>
              <CardDescription>
                Earn points, climb leaderboards, and unlock achievements for your progress.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Award className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Badge System</CardTitle>
              <CardDescription>
                Collect badges for completing courses, assignments, and achieving milestones.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                Get insights into your performance and track your learning progress.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <GraduationCap className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Grade Management</CardTitle>
              <CardDescription>
                Request grade adjustments for special circumstances and track responses.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Transform Your Education?</CardTitle>
              <CardDescription>
                Join thousands of students and educators already using EduPlatform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="lg" asChild className="w-full">
                <Link href="/auth/signin">Sign In to Continue</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
