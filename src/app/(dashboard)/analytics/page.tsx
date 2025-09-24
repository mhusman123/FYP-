import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users,
  BookOpen,
  Clock,
  Target,
  Award,
  Calendar,
  FileText,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'

// Mock analytics data
const analyticsData = {
  overview: {
    totalStudents: 156,
    activeCourses: 4,
    totalAssignments: 48,
    averageGrade: 87.2,
    completionRate: 94.5,
    engagementScore: 8.7
  },
  coursePerformance: [
    {
      id: '1',
      name: 'Advanced Web Development',
      code: 'CS-401',
      students: 45,
      avgGrade: 88.5,
      completionRate: 96.2,
      trend: 'up' as const,
      assignments: 12,
      submissions: 11
    },
    {
      id: '2',
      name: 'Database Systems',
      code: 'CS-380', 
      students: 52,
      avgGrade: 85.1,
      completionRate: 92.8,
      trend: 'up' as const,
      assignments: 15,
      submissions: 14
    },
    {
      id: '3',
      name: 'Human-Computer Interaction',
      code: 'CS-425',
      students: 38,
      avgGrade: 91.3,
      completionRate: 97.4,
      trend: 'up' as const,
      assignments: 10,
      submissions: 10
    },
    {
      id: '4',
      name: 'Data Science',
      code: 'CS-450',
      students: 21,
      avgGrade: 82.7,
      completionRate: 88.9,
      trend: 'down' as const,
      assignments: 11,
      submissions: 10
    }
  ],
  studentProgress: [
    {
      range: 'A (90-100%)',
      count: 45,
      percentage: 28.8,
      color: 'bg-green-500'
    },
    {
      range: 'B (80-89%)', 
      count: 62,
      percentage: 39.7,
      color: 'bg-blue-500'
    },
    {
      range: 'C (70-79%)',
      count: 35,
      percentage: 22.4,
      color: 'bg-yellow-500'
    },
    {
      range: 'D (60-69%)',
      count: 11,
      percentage: 7.1,
      color: 'bg-orange-500'
    },
    {
      range: 'F (0-59%)',
      count: 3,
      percentage: 1.9,
      color: 'bg-red-500'
    }
  ],
  weeklyActivity: [
    { week: 'Week 1', submissions: 42, grades: 38 },
    { week: 'Week 2', submissions: 48, grades: 45 },
    { week: 'Week 3', submissions: 51, grades: 49 },
    { week: 'Week 4', submissions: 45, grades: 43 },
    { week: 'Current', submissions: 23, grades: 18 }
  ],
  topPerformers: [
    { name: 'Alice Johnson', course: 'CS-401', avgGrade: 98.5, submissions: 12 },
    { name: 'Sarah Kim', course: 'CS-425', avgGrade: 96.8, submissions: 10 },
    { name: 'Michael Chen', course: 'CS-380', avgGrade: 95.2, submissions: 14 },
    { name: 'Emily Rodriguez', course: 'CS-401', avgGrade: 94.7, submissions: 11 },
    { name: 'David Park', course: 'CS-425', avgGrade: 93.9, submissions: 9 }
  ],
  recentTrends: {
    submissionTrend: 12.5, // percentage increase
    gradeTrend: 3.2,
    engagementTrend: -2.1,
    completionTrend: 8.7
  }
}

export default function Analytics() {
  const { overview, coursePerformance, studentProgress, weeklyActivity, topPerformers, recentTrends } = analyticsData

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into your teaching performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="semester">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="semester">This Semester</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              Across {overview.activeCourses} courses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview.averageGrade}%</div>
            <div className="flex items-center text-xs">
              {recentTrends.gradeTrend > 0 ? (
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span className={recentTrends.gradeTrend > 0 ? 'text-green-600' : 'text-red-600'}>
                {Math.abs(recentTrends.gradeTrend)}% from last month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview.completionRate}%</div>
            <div className="flex items-center text-xs">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-600">
                +{recentTrends.completionTrend}% from last month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview.totalAssignments}</div>
            <p className="text-xs text-muted-foreground">
              Created this semester
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Score</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overview.engagementScore}/10</div>
            <div className="flex items-center text-xs">
              <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              <span className="text-red-600">
                {Math.abs(recentTrends.engagementTrend)}% from last month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Submissions</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <div className="flex items-center text-xs">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-600">
                +{recentTrends.submissionTrend}% from last month
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Course Performance */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Course Performance
            </CardTitle>
            <CardDescription>
              Performance metrics across all your courses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {coursePerformance.map((course) => (
                <div key={course.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{course.name}</h4>
                      <p className="text-sm text-muted-foreground">{course.code} • {course.students} students</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {course.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                      <Badge variant="outline">
                        Avg: {course.avgGrade}%
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Completion Rate</p>
                      <div className="flex items-center gap-2">
                        <Progress value={course.completionRate} className="h-2 flex-1" />
                        <span className="font-medium">{course.completionRate}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Assignments</p>
                      <p className="font-medium">{course.assignments} created</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Submissions</p>
                      <p className="font-medium">{course.submissions} received</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Grade Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Grade Distribution
            </CardTitle>
            <CardDescription>
              Student performance breakdown
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studentProgress.map((grade, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{grade.range}</span>
                    <span className="text-muted-foreground">{grade.count} students ({grade.percentage}%)</span>
                  </div>
                  <Progress value={grade.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Top Performers
            </CardTitle>
            <CardDescription>
              Highest achieving students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topPerformers.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">{student.course}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{student.avgGrade}%</p>
                    <p className="text-xs text-muted-foreground">{student.submissions} submissions</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Weekly Activity
          </CardTitle>
          <CardDescription>
            Submissions and grading activity over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyActivity.map((week, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{week.week}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Submissions</p>
                  <p className="font-bold text-blue-600">{week.submissions}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Graded</p>
                  <p className="font-bold text-green-600">{week.grades}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completion</p>
                  <p className="font-bold">{Math.round((week.grades / week.submissions) * 100)}%</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Action Items
          </CardTitle>
          <CardDescription>
            Areas that need your attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 border rounded-lg border-orange-200 bg-orange-50">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <div className="flex-1">
                <p className="font-medium">CS-450 has lower completion rate (88.9%)</p>
                <p className="text-sm text-muted-foreground">Consider reviewing assignment difficulty or providing additional support</p>
              </div>
              <Button size="sm" variant="outline">
                View Details
              </Button>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg border-blue-200 bg-blue-50">
              <Clock className="h-5 w-5 text-blue-500" />
              <div className="flex-1">
                <p className="font-medium">23 submissions pending review</p>
                <p className="text-sm text-muted-foreground">Some submissions are approaching the 48-hour grading target</p>
              </div>
              <Button size="sm" variant="outline">
                Grade Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}