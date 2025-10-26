import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  GraduationCap, 
  BookOpen, 
  Trophy, 
  FileText, 
  Award, 
  BarChart3, 
  Users, 
  Clock, 
  CheckCircle, 
  Star, 
  ArrowRight,
  Shield,
  Zap,
  Target,
  Heart,
  Globe,
  TrendingUp
} from 'lucide-react'

export default async function Home() {
  const session = await getServerSession(authOptions)
  
  // If authenticated, redirect to dashboard
  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                EduPlatform
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</Link>
              <Link href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</Link>
              <Link href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Reviews</Link>
              <Link href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</Link>
            </nav>
            <div className="flex items-center gap-3">
              <Button variant="ghost" asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/signin">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              🎓 Final Year Capstone Project 2025
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
              Next-Generation
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                {" "}Learning Management
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-10 leading-relaxed">
              An innovative educational platform featuring AI-powered autograding, gamification, 
              and comprehensive course management designed for the future of education.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button size="lg" className="px-8 py-4 text-lg" asChild>
                <Link href="/auth/signin">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg" asChild>
                <Link href="#features">Explore Features</Link>
              </Button>
            </div>
            <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Full-featured platform</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-600">Educators</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">1M+</div>
              <div className="text-gray-600">Assignments Graded</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">98%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools designed for modern education, from course management to AI-powered insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader>
                <div className="p-3 bg-blue-100 rounded-lg w-fit group-hover:bg-blue-200 transition-colors">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Smart Course Management</CardTitle>
                <CardDescription className="text-base">
                  Organize courses with AI-powered recommendations, progress tracking, and adaptive learning paths.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader>
                <div className="p-3 bg-purple-100 rounded-lg w-fit group-hover:bg-purple-200 transition-colors">
                  <Zap className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">AI-Powered Autograding</CardTitle>
                <CardDescription className="text-base">
                  Instant feedback with our advanced autograding system. Supports multiple programming languages and custom test cases.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader>
                <div className="p-3 bg-teal-100 rounded-lg w-fit group-hover:bg-teal-200 transition-colors">
                  <Trophy className="h-8 w-8 text-teal-600" />
                </div>
                <CardTitle className="text-xl">Gamification System</CardTitle>
                <CardDescription className="text-base">
                  Boost engagement with badges, leaderboards, achievements, and reward systems that motivate learning.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader>
                <div className="p-3 bg-orange-100 rounded-lg w-fit group-hover:bg-orange-200 transition-colors">
                  <BarChart3 className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Advanced Analytics</CardTitle>
                <CardDescription className="text-base">
                  Deep insights into learning patterns, performance trends, and personalized recommendations for improvement.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader>
                <div className="p-3 bg-red-100 rounded-lg w-fit group-hover:bg-red-200 transition-colors">
                  <Shield className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-xl">Plagiarism Detection</CardTitle>
                <CardDescription className="text-base">
                  Advanced plagiarism detection with detailed reports and similarity analysis across multiple sources.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader>
                <div className="p-3 bg-green-100 rounded-lg w-fit group-hover:bg-green-200 transition-colors">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Collaborative Learning</CardTitle>
                <CardDescription className="text-base">
                  Foster collaboration with group projects, peer reviews, discussion forums, and real-time communication.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Loved by Educators & Students</h2>
            <p className="text-xl text-gray-600">See what our community is saying about EduPlatform</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardDescription className="text-base italic">
                  "EduPlatform has revolutionized how I manage my computer science courses. The autograding system saves me hours every week!"
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    DR
                  </div>
                  <div>
                    <div className="font-semibold">Dr. Sarah Johnson</div>
                    <div className="text-sm text-gray-500">Computer Science Professor</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardDescription className="text-base italic">
                  "The gamification features keep me motivated! I love earning badges and seeing my progress on the leaderboard."
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
                    MR
                  </div>
                  <div>
                    <div className="font-semibold">Maria Rodriguez</div>
                    <div className="text-sm text-gray-500">Computer Science Student</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardDescription className="text-base italic">
                  "The analytics dashboard gives me incredible insights into my students' learning patterns. It's a game-changer!"
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                    JL
                  </div>
                  <div>
                    <div className="font-semibold">James Lee</div>
                    <div className="text-sm text-gray-500">Department Head</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that fits your educational needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Student Plan */}
            <Card className="border-2 border-gray-200 hover:border-blue-300 transition-colors">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Student</CardTitle>
                <div className="text-4xl font-bold text-blue-600 mt-4">Free</div>
                <CardDescription className="mt-2">Perfect for individual students</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Up to 5 courses</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Basic progress tracking</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Gamification features</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Community support</span>
                  </div>
                </div>
                <Button className="w-full mt-6" variant="outline" asChild>
                  <Link href="/auth/signin">Get Started Free</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Educator Plan */}
            <Card className="border-2 border-blue-500 relative scale-105 shadow-xl">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-500 text-white px-6 py-1">Most Popular</Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Educator</CardTitle>
                <div className="text-4xl font-bold text-blue-600 mt-4">
                  $29<span className="text-lg text-gray-500 font-normal">/month</span>
                </div>
                <CardDescription className="mt-2">For individual educators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Unlimited courses</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>AI-powered autograding</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Advanced analytics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Plagiarism detection</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Priority support</span>
                  </div>
                </div>
                <Button className="w-full mt-6" asChild>
                  <Link href="/auth/signin">Start Free Trial</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Institution Plan */}
            <Card className="border-2 border-gray-200 hover:border-purple-300 transition-colors">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Institution</CardTitle>
                <div className="text-4xl font-bold text-purple-600 mt-4">Custom</div>
                <CardDescription className="mt-2">For schools and universities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Everything in Educator</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Unlimited users</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Custom integrations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Dedicated support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Advanced security</span>
                  </div>
                </div>
                <Button className="w-full mt-6" variant="outline" asChild>
                  <Link href="/auth/signin">Contact Sales</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Education?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of educators and students who are already experiencing the future of learning.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4" asChild>
              <Link href="/auth/signin">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4" asChild>
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
          <p className="text-sm mt-6 opacity-75">Innovative • AI-Powered • Student-Centric</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">EduPlatform</span>
              </div>
              <p className="text-gray-400">
                A comprehensive educational platform developed as a final year capstone project, showcasing modern web technologies and AI integration.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <div className="space-y-2 text-gray-400">
                <div><Link href="#features" className="hover:text-white transition-colors">Features</Link></div>
                <div><Link href="#about" className="hover:text-white transition-colors">About Project</Link></div>
                <div><Link href="#testimonials" className="hover:text-white transition-colors">Testimonials</Link></div>
                <div><Link href="/auth/signin" className="hover:text-white transition-colors">Get Started</Link></div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2 text-gray-400">
                <div><Link href="#" className="hover:text-white transition-colors">About</Link></div>
                <div><Link href="#" className="hover:text-white transition-colors">Blog</Link></div>
                <div><Link href="#" className="hover:text-white transition-colors">Careers</Link></div>
                <div><Link href="#" className="hover:text-white transition-colors">Contact</Link></div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2 text-gray-400">
                <div><Link href="#" className="hover:text-white transition-colors">Help Center</Link></div>
                <div><Link href="#" className="hover:text-white transition-colors">Documentation</Link></div>
                <div><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></div>
                <div><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 EduPlatform - Final Year Capstone Project. Built with cutting-edge technology for the future of education.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}