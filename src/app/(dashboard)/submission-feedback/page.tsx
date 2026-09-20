'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Bot,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Code,
  Zap,
  BookOpen,
  RefreshCw,
  Download,
  ArrowRight,
  Lightbulb,
  AlertCircle,
  TrendingUp,
  X
} from 'lucide-react'

interface AutogradingResult {
  submissionId: string
  assignmentTitle: string
  course: string
  submittedAt: string
  totalScore: number
  maxScore: number
  processingTime: number
  breakdown: {
    correctness: {
      score: number
      maxScore: number
      passedTests: number
      totalTests: number
      details: TestResult[]
    }
    codeQuality: {
      score: number
      maxScore: number
      issues: CodeQualityIssue[]
    }
    efficiency: {
      score: number
      maxScore: number
      timeComplexity: string
      spaceComplexity: string
      executionTime: number
    }
    documentation: {
      score: number
      maxScore: number
      coverage: number
      quality: string
    }
  }
  feedback: string[]
  suggestions: string[]
  allowResubmission: boolean
  attemptsUsed: number
  maxAttempts: number
}

interface TestResult {
  testId: string
  name: string
  passed: boolean
  input: string
  expectedOutput: string
  actualOutput: string
  executionTime: number
  error?: string
  points: number
  maxPoints: number
}

interface CodeQualityIssue {
  type: 'style' | 'complexity' | 'naming' | 'structure'
  severity: 'low' | 'medium' | 'high'
  line: number
  message: string
  suggestion: string
}

// Mock autograding result
const mockResult: AutogradingResult = {
  submissionId: 'sub-12345',
  assignmentTitle: 'Binary Search Algorithm Implementation',
  course: 'Data Structures (CS-380)',
  submittedAt: '2025-01-25T14:30:00Z',
  totalScore: 87,
  maxScore: 100,
  processingTime: 1.8,
  breakdown: {
    correctness: {
      score: 55,
      maxScore: 60,
      passedTests: 11,
      totalTests: 12,
      details: [
        {
          testId: 'test-1',
          name: 'Basic Search - Element Found',
          passed: true,
          input: '[1, 2, 3, 4, 5], target=3',
          expectedOutput: '2',
          actualOutput: '2',
          executionTime: 0.001,
          points: 5,
          maxPoints: 5
        },
        {
          testId: 'test-2',
          name: 'Element Not Found',
          passed: true,
          input: '[1, 2, 3, 4, 5], target=6',
          expectedOutput: '-1',
          actualOutput: '-1',
          executionTime: 0.002,
          points: 5,
          maxPoints: 5
        },
        {
          testId: 'test-3',
          name: 'Empty Array Edge Case',
          passed: false,
          input: '[], target=1',
          expectedOutput: '-1',
          actualOutput: 'IndexError: list index out of range',
          executionTime: 0.001,
          error: 'Index out of bounds when accessing empty array',
          points: 0,
          maxPoints: 10
        },
        {
          testId: 'test-4',
          name: 'Single Element Array',
          passed: true,
          input: '[5], target=5',
          expectedOutput: '0',
          actualOutput: '0',
          executionTime: 0.001,
          points: 5,
          maxPoints: 5
        }
      ]
    },
    codeQuality: {
      score: 18,
      maxScore: 20,
      issues: [
        {
          type: 'naming',
          severity: 'medium',
          line: 15,
          message: 'Variable name "arr" is not descriptive',
          suggestion: 'Use more descriptive names like "numbers" or "sorted_array"'
        },
        {
          type: 'style',
          severity: 'low',
          line: 8,
          message: 'Missing space after comma in function parameters',
          suggestion: 'Add space after comma: binary_search(arr, target)'
        }
      ]
    },
    efficiency: {
      score: 12,
      maxScore: 15,
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      executionTime: 0.0025
    },
    documentation: {
      score: 2,
      maxScore: 5,
      coverage: 40,
      quality: 'Needs improvement'
    }
  },
  feedback: [
    '✅ Excellent! 11 out of 12 test cases passed.',
    '⚠️ Handle edge case for empty arrays to prevent IndexError.',
    '✅ Code quality is very good with minimal style issues.',
    '✅ Great time complexity - optimal O(log n) algorithm!',
    '⚠️ Add more comments and documentation to improve readability.'
  ],
  suggestions: [
    'Add input validation at the beginning of your function to handle empty arrays.',
    'Consider adding a docstring explaining the algorithm approach.',
    'Use more descriptive variable names to improve code readability.',
    'Add comments explaining the binary search logic, especially the midpoint calculation.'
  ],
  allowResubmission: true,
  attemptsUsed: 1,
  maxAttempts: 3
}

export default function SubmissionFeedback() {
  const [activeTab, setActiveTab] = useState('overview')
  
  const getScoreColor = (score: number, max: number) => {
    const percentage = (score / max) * 100
    if (percentage >= 90) return 'text-green-600'
    if (percentage >= 70) return 'text-blue-600'
    if (percentage >= 50) return 'text-orange-600'
    return 'text-red-600'
  }

  const getScoreClass = (score: number, max: number) => {
    const percentage = (score / max) * 100
    if (percentage >= 90) return 'bg-green-100 border-green-200'
    if (percentage >= 70) return 'bg-blue-100 border-blue-200'
    if (percentage >= 50) return 'bg-orange-100 border-orange-200'
    return 'bg-red-100 border-red-200'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assignment Feedback</h1>
          <p className="text-muted-foreground">
            Automated grading results and personalized feedback
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
          {mockResult.allowResubmission && (
            <Button>
              <RefreshCw className="mr-2 h-4 w-4" />
              Resubmit ({mockResult.attemptsUsed}/{mockResult.maxAttempts})
            </Button>
          )}
        </div>
      </div>

      {/* Score Overview */}
      <Card className={`${getScoreClass(mockResult.totalScore, mockResult.maxScore)} border-2`}>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">{mockResult.assignmentTitle}</h2>
              <p className="text-muted-foreground">{mockResult.course}</p>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-bold ${getScoreColor(mockResult.totalScore, mockResult.maxScore)}`}>
                {mockResult.totalScore}/{mockResult.maxScore}
              </div>
              <p className="text-sm text-muted-foreground">
                {Math.round((mockResult.totalScore / mockResult.maxScore) * 100)}% Score
              </p>
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-blue-500" />
              <span className="text-sm">Processed in {mockResult.processingTime}s</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Submitted {new Date(mockResult.submittedAt).toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Score Breakdown */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Correctness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getScoreColor(mockResult.breakdown.correctness.score, mockResult.breakdown.correctness.maxScore)}`}>
              {mockResult.breakdown.correctness.score}/{mockResult.breakdown.correctness.maxScore}
            </div>
            <Progress 
              value={(mockResult.breakdown.correctness.score / mockResult.breakdown.correctness.maxScore) * 100} 
              className="mt-2 mb-1" 
            />
            <p className="text-xs text-muted-foreground">
              {mockResult.breakdown.correctness.passedTests}/{mockResult.breakdown.correctness.totalTests} tests passed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Code className="h-4 w-4 text-blue-500" />
              Code Quality
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getScoreColor(mockResult.breakdown.codeQuality.score, mockResult.breakdown.codeQuality.maxScore)}`}>
              {mockResult.breakdown.codeQuality.score}/{mockResult.breakdown.codeQuality.maxScore}
            </div>
            <Progress 
              value={(mockResult.breakdown.codeQuality.score / mockResult.breakdown.codeQuality.maxScore) * 100} 
              className="mt-2 mb-1" 
            />
            <p className="text-xs text-muted-foreground">
              {mockResult.breakdown.codeQuality.issues.length} issues found
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              Efficiency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getScoreColor(mockResult.breakdown.efficiency.score, mockResult.breakdown.efficiency.maxScore)}`}>
              {mockResult.breakdown.efficiency.score}/{mockResult.breakdown.efficiency.maxScore}
            </div>
            <Progress 
              value={(mockResult.breakdown.efficiency.score / mockResult.breakdown.efficiency.maxScore) * 100} 
              className="mt-2 mb-1" 
            />
            <p className="text-xs text-muted-foreground">
              {mockResult.breakdown.efficiency.timeComplexity}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-purple-500" />
              Documentation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getScoreColor(mockResult.breakdown.documentation.score, mockResult.breakdown.documentation.maxScore)}`}>
              {mockResult.breakdown.documentation.score}/{mockResult.breakdown.documentation.maxScore}
            </div>
            <Progress 
              value={(mockResult.breakdown.documentation.score / mockResult.breakdown.documentation.maxScore) * 100} 
              className="mt-2 mb-1" 
            />
            <p className="text-xs text-muted-foreground">
              {mockResult.breakdown.documentation.coverage}% coverage
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Feedback Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tests">Test Results</TabsTrigger>
          <TabsTrigger value="quality">Code Quality</TabsTrigger>
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <FeedbackOverview result={mockResult} />
        </TabsContent>

        <TabsContent value="tests" className="space-y-4">
          <TestResultsDetail tests={mockResult.breakdown.correctness.details} />
        </TabsContent>

        <TabsContent value="quality" className="space-y-4">
          <CodeQualityDetail issues={mockResult.breakdown.codeQuality.issues} />
        </TabsContent>

        <TabsContent value="suggestions" className="space-y-4">
          <ImprovementSuggestions suggestions={mockResult.suggestions} />
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <PerformanceAnalysis efficiency={mockResult.breakdown.efficiency} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function FeedbackOverview({ result }: { result: AutogradingResult }) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-500" />
            Automated Feedback
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {result.feedback.map((feedback, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                {feedback.startsWith('✅') ? (
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                )}
                <p className="text-sm">{feedback.replace(/^[✅⚠️]\s*/, '')}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-sm">Review the failed test case and add proper input validation</p>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <p className="text-sm">Improve code documentation with comments and docstrings</p>
            </div>
            {result.allowResubmission && (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50">
                <ArrowRight className="h-4 w-4 text-green-600" />
                <p className="text-sm font-medium">Ready to resubmit? You have {result.maxAttempts - result.attemptsUsed} attempts remaining</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function TestResultsDetail({ tests }: { tests: TestResult[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Test Case Results
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tests.map((test) => (
            <div key={test.testId} className={`border rounded-lg p-4 ${test.passed ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {test.passed ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  <h4 className="font-semibold">{test.name}</h4>
                </div>
                <Badge variant={test.passed ? 'default' : 'destructive'}>
                  {test.points}/{test.maxPoints} pts
                </Badge>
              </div>
              
              <div className="grid gap-2 text-sm">
                <div>
                  <p className="font-medium text-gray-600">Input:</p>
                  <code className="text-xs bg-gray-100 p-2 rounded block">{test.input}</code>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Expected:</p>
                  <code className="text-xs bg-gray-100 p-2 rounded block">{test.expectedOutput}</code>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Your Output:</p>
                  <code className={`text-xs p-2 rounded block ${test.passed ? 'bg-green-100' : 'bg-red-100'}`}>
                    {test.actualOutput}
                  </code>
                </div>
                {test.error && (
                  <div>
                    <p className="font-medium text-red-600">Error:</p>
                    <p className="text-xs text-red-700 bg-red-100 p-2 rounded">{test.error}</p>
                  </div>
                )}
                <p className="text-xs text-gray-500">Execution time: {test.executionTime}s</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function CodeQualityDetail({ issues }: { issues: CodeQualityIssue[] }) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-orange-600 bg-orange-100'
      case 'low': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5" />
          Code Quality Issues
        </CardTitle>
      </CardHeader>
      <CardContent>
        {issues.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <p className="text-lg font-medium text-green-600">Excellent Code Quality!</p>
            <p className="text-sm text-muted-foreground">No issues found in your submission.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {issues.map((issue, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getSeverityColor(issue.severity)}>
                      {issue.severity.toUpperCase()}
                    </Badge>
                    <span className="text-sm font-medium capitalize">{issue.type}</span>
                  </div>
                  <span className="text-xs text-gray-500">Line {issue.line}</span>
                </div>
                <p className="text-sm mb-2">{issue.message}</p>
                <div className="bg-blue-50 p-3 rounded">
                  <p className="text-sm text-blue-800">
                    <Lightbulb className="h-4 w-4 inline mr-1" />
                    Suggestion: {issue.suggestion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function ImprovementSuggestions({ suggestions }: { suggestions: string[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          Improvement Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                {index + 1}
              </div>
              <p className="text-sm text-yellow-800">{suggestion}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function PerformanceAnalysis({ efficiency }: { efficiency: { timeComplexity: string, spaceComplexity: string, executionTime: number } }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-500" />
          Performance Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Time Complexity</h4>
            <p className="text-2xl font-bold text-blue-600">{efficiency.timeComplexity}</p>
            <p className="text-sm text-blue-700">Optimal for binary search</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">Space Complexity</h4>
            <p className="text-2xl font-bold text-green-600">{efficiency.spaceComplexity}</p>
            <p className="text-sm text-green-700">Excellent memory usage</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-2">Execution Time</h4>
            <p className="text-2xl font-bold text-purple-600">{efficiency.executionTime}s</p>
            <p className="text-sm text-purple-700">Very fast execution</p>
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">Performance Summary</h4>
          <p className="text-sm text-gray-700">
            Your algorithm demonstrates excellent time complexity of O(log n), which is optimal for binary search. 
            The space complexity of O(1) shows efficient memory usage. Consider the edge cases to make your 
            solution more robust.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}