'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from 'recharts'
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Clock, 
  CheckCircle2,
  Users,
  BarChart3,
  RefreshCw,
  Calendar
} from 'lucide-react'

interface InsightData {
  averageGrade: number
  lateSubmissions: number
  riskStudents: number
  atRiskStudents: Array<{
    id: string
    name: string
    averageGrade: number
    lateSubmissions: number
  }>
  trend: number[]
  completionRate: number
  gradeDistribution: {
    'A (90-100)': number
    'B (80-89)': number
    'C (70-79)': number
    'D (60-69)': number
    'F (<60)': number
  }
  insights: Array<{
    type: string
    message: string
    severity: string
  }>
  period: string
  totalSubmissions: number
  totalStudents: number
  totalCourses: number
  trendChange: number
}

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6']

export function AiInsightsPanel() {
  const [insights, setInsights] = useState<InsightData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [period, setPeriod] = useState<'week' | 'month' | 'semester'>('week')

  const fetchInsights = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`/api/ai/insights?period=${period}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch insights')
      }
      
      const data = await response.json()
      setInsights(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      console.error('Error fetching insights:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInsights()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period])

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">AI Wrapper Insights Panel</h2>
            <p className="text-muted-foreground">Loading analytics...</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-muted rounded w-24" />
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error || !insights) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-600">Error Loading Insights</CardTitle>
          <CardDescription className="text-red-600">
            {error || 'No data available'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={fetchInsights} variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Prepare trend data for chart
  const trendData = insights.trend.map((grade, index) => ({
    period: `Week ${index + 1}`,
    grade
  }))

  // Prepare grade distribution data for chart
  const gradeDistData = Object.entries(insights.gradeDistribution).map(([grade, count]) => ({
    grade,
    count
  }))

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between animate-slide-down">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-blue-600" />
            AI Wrapper Insights Panel
          </h2>
          <p className="text-muted-foreground">
            Analytics and predictions on student performance
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={period === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPeriod('week')}
            className="transition-all duration-300"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Week
          </Button>
          <Button
            variant={period === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPeriod('month')}
            className="transition-all duration-300"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Month
          </Button>
          <Button
            variant={period === 'semester' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPeriod('semester')}
            className="transition-all duration-300"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Semester
          </Button>
          <Button onClick={fetchInsights} variant="ghost" size="sm" className="transition-all duration-300">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 animate-slide-up">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Grade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{insights.averageGrade}%</div>
              <div className={`flex items-center text-sm ${
                insights.trendChange >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {insights.trendChange >= 0 ? (
                  <TrendingUp className="h-4 w-4 mr-1 animate-ai-spark" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                {Math.abs(insights.trendChange)}%
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {insights.trendChange >= 0 ? '↑' : '↓'} {Math.abs(insights.trendChange)}% from last period
            </p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 animate-slide-up" style={{animationDelay: '100ms'}}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Late Submissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{insights.lateSubmissions}</div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Out of {insights.totalSubmissions} total submissions
            </p>
          </CardContent>
        </Card>

        <Card className={`transition-all duration-300 hover:shadow-lg hover:scale-105 animate-slide-up ${insights.riskStudents > 0 ? 'border-red-200 bg-red-50' : ''}`} style={{animationDelay: '200ms'}}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Students at Risk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-red-600">
                {insights.riskStudents}
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Require immediate attention
            </p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50 transition-all duration-300 hover:shadow-lg hover:scale-105 animate-slide-up" style={{animationDelay: '300ms'}}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-green-600">
                {insights.completionRate}%
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-600 animate-ai-spark" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Assignment completion rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-blue-600" />
            AI-Generated Insights
          </CardTitle>
          <CardDescription>
            Key observations and recommendations based on performance data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {insights.insights.map((insight, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border flex items-start gap-3 ${
                  insight.severity === 'high' || insight.severity === 'negative'
                    ? 'bg-red-50 border-red-200'
                    : insight.severity === 'medium'
                    ? 'bg-orange-50 border-orange-200'
                    : insight.severity === 'positive'
                    ? 'bg-green-50 border-green-200'
                    : 'bg-blue-50 border-blue-200'
                }`}
              >
                {insight.type === 'warning' ? (
                  <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                    insight.severity === 'high' ? 'text-red-600' : 'text-orange-600'
                  }`} />
                ) : insight.severity === 'positive' ? (
                  <TrendingUp className="h-5 w-5 mt-0.5 text-green-600" />
                ) : (
                  <BarChart3 className="h-5 w-5 mt-0.5 text-blue-600" />
                )}
                <div className="flex-1">
                  <p className="font-medium">{insight.message}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Grade Trend Chart */}
        <Card className="transition-all duration-300 hover:shadow-lg animate-slide-up">
          <CardHeader>
            <CardTitle>Grade Trend</CardTitle>
            <CardDescription>
              Average grade progression over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="grade" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Average Grade"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Grade Distribution Chart */}
        <Card className="transition-all duration-300 hover:shadow-lg animate-slide-up" style={{animationDelay: '100ms'}}>
          <CardHeader>
            <CardTitle>Grade Distribution</CardTitle>
            <CardDescription>
              Distribution of grades across all submissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={gradeDistData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="grade" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" name="Number of Students">
                  {gradeDistData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* At-Risk Students Table */}
      {insights.atRiskStudents.length > 0 && (
        <Card className="transition-all duration-300 hover:shadow-lg animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-red-600" />
              At-Risk Students
            </CardTitle>
            <CardDescription>
              Students who may need additional support or intervention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left text-sm font-medium">Student Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Average Grade</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Late Submissions</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Risk Level</th>
                  </tr>
                </thead>
                <tbody>
                  {insights.atRiskStudents.map((student) => (
                    <tr key={student.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors duration-200">
                      <td className="px-4 py-3 font-medium">{student.name}</td>
                      <td className="px-4 py-3">
                        <Badge variant={student.averageGrade < 50 ? 'destructive' : 'outline'}>
                          {student.averageGrade}%
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        {student.lateSubmissions > 0 && (
                          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                            {student.lateSubmissions}
                          </Badge>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <Badge 
                          variant="destructive"
                          className={
                            student.averageGrade < 50 || student.lateSubmissions >= 3
                              ? 'bg-red-600'
                              : 'bg-orange-500'
                          }
                        >
                          {student.averageGrade < 50 || student.lateSubmissions >= 3 ? 'High' : 'Medium'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Overview Statistics</CardTitle>
          <CardDescription>
            Summary of key metrics for the selected period
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{insights.totalStudents}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Submissions</p>
                <p className="text-2xl font-bold">{insights.totalSubmissions}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Courses</p>
                <p className="text-2xl font-bold">{insights.totalCourses}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
