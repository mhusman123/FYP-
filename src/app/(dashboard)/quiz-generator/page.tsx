'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Zap,
  Sparkles,
  Trophy,
  Brain,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Clock,
  Award,
  BookOpen,
  ChevronRight,
  Flame,
  AlertCircle
} from 'lucide-react'
import { GeneratedQuiz, QuizQuestion } from '@/lib/ai-engine'

const quickTopics = [
  { name: 'Calculus Derivatives', subject: 'Mathematics' },
  { name: 'Python Data Structures', subject: 'Computer Science' },
  { name: 'Newton\'s Mechanics', subject: 'Physics' },
  { name: 'Sindh & Mohenjo-daro Heritage', subject: 'Sindh Studies' },
  { name: 'Cellular Biology & ATP', subject: 'Biology' },
  { name: 'Periodic Table & Bonding', subject: 'Chemistry' }
]

export default function QuizGeneratorPage() {
  // Config state
  const [subject, setSubject] = useState('Computer Science')
  const [topic, setTopic] = useState('Python Data Structures')
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate')
  const [numQuestions, setNumQuestions] = useState(20)

  // Arena state
  const [quizState, setQuizState] = useState<'config' | 'loading' | 'active' | 'completed'>('config')
  const [activeQuiz, setActiveQuiz] = useState<GeneratedQuiz | null>(null)
  const [currentQIndex, setCurrentQIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [showHint, setShowHint] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(600)
  const [pointsClaimed, setPointsClaimed] = useState(false)
  const [claimedPointsValue, setClaimedPointsValue] = useState(0)

  // Timer countdown during active quiz
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (quizState === 'active' && !submitted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSubmitQuiz()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [quizState, submitted, timeLeft])

  const handleGenerateQuiz = async () => {
    setQuizState('loading')
    setSelectedAnswers({})
    setShowHint(false)
    setSubmitted(false)
    setPointsClaimed(false)
    setCurrentQIndex(0)
    const getDuration = (cnt: number) => {
      if (cnt <= 20) return 600; // 10 mins
      if (cnt <= 35) return 1020; // 17 mins
      return 1500; // 25 mins
    };
    setTimeLeft(getDuration(numQuestions));

    try {
      const res = await fetch('/api/ai/quiz-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topic.trim() || 'General STEM',
          subject,
          difficulty,
          numQuestions
        })
      })

      const data = await res.json()
      if (data.quiz && data.quiz.questions?.length > 0) {
        setActiveQuiz(data.quiz)
        setQuizState('active')
      } else {
        throw new Error('No questions returned')
      }
    } catch (error) {
      console.error('Quiz generation error:', error)
      setQuizState('config')
    }
  }

  const handleSelectOption = (qIdx: number, optionIdx: number) => {
    if (submitted) return
    setSelectedAnswers(prev => ({
      ...prev,
      [qIdx]: optionIdx
    }))
  }

  const handleSubmitQuiz = () => {
    setSubmitted(true)
    setQuizState('completed')
  }

  const calculateScore = () => {
    if (!activeQuiz) return { score: 0, total: 0, percentage: 0, pointsEarned: 0 }
    let correctCount = 0
    activeQuiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++
      }
    })
    const total = activeQuiz.questions.length
    const percentage = Math.round((correctCount / total) * 100)
    const pointsEarned = correctCount * 25
    return { score: correctCount, total, percentage, pointsEarned }
  }

  const handleClaimPoints = async () => {
    const { pointsEarned } = calculateScore()
    if (pointsEarned <= 0 || pointsClaimed) return

    try {
      await fetch('/api/ai/award-points', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          points: pointsEarned,
          reason: `AI Quiz Arena - ${activeQuiz?.title || 'Mastery Quiz'}`
        })
      })
      setClaimedPointsValue(pointsEarned)
      setPointsClaimed(true)
    } catch (e) {
      setPointsClaimed(true)
    }
  }

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60)
    const remainingSecs = secs % 60
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 p-6 rounded-2xl border border-cyan-500/30 shadow-xl text-white">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-cyan-600/80 hover:bg-cyan-600 text-white border-0 text-xs px-2.5 py-0.5">
              <Sparkles className="h-3 w-3 mr-1 text-cyan-200" />
              Dynamic AI Question Generator
            </Badge>
            <Badge variant="outline" className="text-amber-300 border-amber-500/40 text-xs">
              Instant Feedback & Explanations
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            <Zap className="h-7 w-7 text-amber-400" />
            AI Quiz Arena & Exam Simulator
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Test your knowledge with adaptive AI-generated practice tests, instant scoring, and earn leaderboard points.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button asChild variant="outline" className="bg-white/10 hover:bg-white/20 border-white/20 text-white text-xs h-10 rounded-xl">
            <Link href="/ai-tutor">
              <Brain className="h-4 w-4 mr-1.5 text-cyan-300" />
              Socratic AI Mentor
            </Link>
          </Button>
        </div>
      </div>

      {/* VIEW 1: CONFIGURATION */}
      {quizState === 'config' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-card border-border shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl font-bold tracking-tight flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Configure Your Practice Challenge
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Select your subject, custom topic, and difficulty to generate an interactive exam test.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Subject */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Subject Area</label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger className="h-11 rounded-xl text-xs sm:text-sm">
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Computer Science">Computer Science & Programming</SelectItem>
                    <SelectItem value="Mathematics">Mathematics & Calculus</SelectItem>
                    <SelectItem value="Physics">Physics & Mechanics</SelectItem>
                    <SelectItem value="Chemistry">Chemistry & Materials</SelectItem>
                    <SelectItem value="Biology">Biology & Pre-Med</SelectItem>
                    <SelectItem value="Sindh Studies">Sindh Studies & History</SelectItem>
                    <SelectItem value="General Academic">General Academic Prep</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Topic Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Specific Topic or Chapter</label>
                <Input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Binary Search Trees, Chain Rule, Newton's 2nd Law, Mohenjo-daro..."
                  className="h-11 rounded-xl text-xs sm:text-sm"
                />
              </div>

              {/* Quick Topic Chips */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Or Pick a Popular Topic</label>
                <div className="flex flex-wrap gap-2">
                  {quickTopics.map((qt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setTopic(qt.name)
                        setSubject(qt.subject)
                      }}
                      className="text-xs font-medium bg-muted/60 hover:bg-primary/10 border border-border hover:border-primary/40 text-foreground px-3 py-1.5 rounded-xl transition-all cursor-pointer"
                    >
                      {qt.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty & Count */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Difficulty Level</label>
                  <Select value={difficulty} onValueChange={(val: any) => setDifficulty(val)}>
                    <SelectTrigger className="h-11 rounded-xl text-xs sm:text-sm">
                      <SelectValue placeholder="Select Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner (Foundations)</SelectItem>
                      <SelectItem value="intermediate">Intermediate (O/A Levels & FSc)</SelectItem>
                      <SelectItem value="advanced">Advanced (MDCAT / ECAT / University)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Number of Questions</label>
                  <Select value={String(numQuestions)} onValueChange={(val) => setNumQuestions(Number(val))}>
                    <SelectTrigger className="h-11 rounded-xl text-xs sm:text-sm">
                      <SelectValue placeholder="Number of Questions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="20">20 Questions - Quick Sprint (10 Mins)</SelectItem>
                      <SelectItem value="35">35 Questions - Standard Assessment (17 Mins)</SelectItem>
                      <SelectItem value="50">50 Questions - Comprehensive Exam (25 Mins)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button
                onClick={handleGenerateQuiz}
                className="w-full h-12 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm rounded-xl shadow-lg transition-all cursor-pointer"
              >
                <Zap className="h-4 w-4 mr-2 text-amber-300" />
                Generate AI Quiz & Start Challenge
              </Button>
            </CardFooter>
          </Card>

          {/* Side Info / Rules */}
          <div className="space-y-4">
            <Card className="bg-card border-border shadow-sm rounded-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-bold tracking-tight flex items-center gap-1.5 text-foreground">
                  <Trophy className="h-4 w-4 text-amber-500" />
                  Arena Rewards System
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs text-muted-foreground">
                <div className="flex items-center justify-between p-2.5 bg-muted/40 rounded-xl border border-border">
                  <span>Per Correct Answer</span>
                  <Badge className="bg-emerald-600/90 text-white text-[11px] font-bold">+25 pts</Badge>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-muted/40 rounded-xl border border-border">
                  <span>100% Mastery Bonus</span>
                  <Badge className="bg-amber-600/90 text-white text-[11px] font-bold">+50 pts</Badge>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-muted/40 rounded-xl border border-border">
                  <span>Leaderboard Boost</span>
                  <span className="text-xs font-semibold text-foreground">Instant Rank Up</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-sm rounded-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-bold tracking-tight flex items-center gap-1.5 text-foreground">
                  <Flame className="h-4 w-4 text-orange-500" />
                  Pedagogical Hints
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground space-y-2">
                <p>During the quiz, you can click the <strong>Socratic Hint</strong> button on any question to get conceptual guidance without giving away the solution.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* VIEW 2: LOADING */}
      {quizState === 'loading' && (
        <Card className="bg-card border-border shadow-lg p-12 text-center rounded-2xl space-y-4">
          <div className="h-16 w-16 mx-auto rounded-full bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white animate-bounce shadow-xl">
            <Brain className="h-8 w-8 animate-pulse" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Assembling AI Practice Arena...</h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
            Generating curriculum-aligned questions for <strong>{topic}</strong> with pedagogical hints and automated scoring rubrics.
          </p>
          <Progress value={75} className="w-64 mx-auto h-2" />
        </Card>
      )}

      {/* VIEW 3: ACTIVE QUIZ */}
      {quizState === 'active' && activeQuiz && (
        <div className="space-y-4">
          {/* Top Status Bar */}
          <div className="flex items-center justify-between p-4 bg-card border border-border rounded-2xl shadow-sm">
            <div className="flex items-center gap-3">
              <Badge className="bg-primary text-primary-foreground font-semibold text-xs px-3 py-1 rounded-lg">
                Question {currentQIndex + 1} of {activeQuiz.questions.length}
              </Badge>
              <span className="text-xs font-semibold text-muted-foreground hidden sm:inline">
                {activeQuiz.title}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border ${
                timeLeft < 30 ? 'bg-red-500/10 text-red-500 border-red-500/30 animate-pulse' : 'bg-muted text-foreground border-border'
              }`}>
                <Clock className="h-3.5 w-3.5" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            </div>
          </div>

          {/* Active Question Card */}
          {(() => {
            const currentQ = activeQuiz.questions[currentQIndex]
            const isAnswered = selectedAnswers[currentQIndex] !== undefined

            return (
              <Card className="bg-card border-border shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-muted/30 border-b border-border p-6">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>Topic: <strong>{currentQ.topic}</strong></span>
                    <Badge variant="outline" className="text-[11px] font-semibold capitalize">
                      {activeQuiz.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-base sm:text-lg font-bold text-foreground leading-snug pt-1">
                    {currentQ.question}
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-6 space-y-3">
                  {currentQ.options.map((opt, optIdx) => {
                    const isSelected = selectedAnswers[currentQIndex] === optIdx
                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectOption(currentQIndex, optIdx)}
                        className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between gap-3 text-xs sm:text-sm font-medium cursor-pointer ${
                          isSelected
                            ? 'bg-primary/10 border-primary text-foreground shadow-sm ring-1 ring-primary/40'
                            : 'bg-card hover:bg-muted/50 border-border text-foreground'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                          }`}>
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {isSelected && <CheckCircle2 className="h-4 w-4 text-primary" />}
                      </button>
                    )
                  })}

                  {/* Socratic Hint Area */}
                  <div className="pt-2">
                    {!showHint ? (
                      <button
                        type="button"
                        onClick={() => setShowHint(true)}
                        className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <HelpCircle className="h-3.5 w-3.5" />
                        Need a Socratic Hint?
                      </button>
                    ) : (
                      <div className="p-3 bg-cyan-950/20 border border-cyan-500/30 rounded-xl text-xs text-cyan-200 flex items-start gap-2">
                        <HelpCircle className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="block font-semibold mb-0.5">Socratic Hint:</strong>
                          <span>{currentQ.hint}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="bg-muted/20 border-t border-border p-4 flex items-center justify-between gap-3">
                  <Button
                    variant="outline"
                    disabled={currentQIndex === 0}
                    onClick={() => {
                      setShowHint(false)
                      setCurrentQIndex(prev => Math.max(0, prev - 1))
                    }}
                    className="text-xs font-semibold h-10 rounded-xl cursor-pointer"
                  >
                    Previous
                  </Button>

                  <div className="flex items-center gap-2">
                    {currentQIndex < activeQuiz.questions.length - 1 ? (
                      <Button
                        onClick={() => {
                          setShowHint(false)
                          setCurrentQIndex(prev => prev + 1)
                        }}
                        disabled={!isAnswered}
                        className="bg-primary text-primary-foreground font-semibold text-xs h-10 px-5 rounded-xl shadow-sm cursor-pointer"
                      >
                        <span>Next Question</span>
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmitQuiz}
                        disabled={!isAnswered}
                        className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs h-10 px-6 rounded-xl shadow-md cursor-pointer"
                      >
                        <span>Submit Quiz & Finish</span>
                        <Trophy className="h-4 w-4 ml-1.5 text-amber-300" />
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            )
          })()}
        </div>
      )}

      {/* VIEW 4: COMPLETED SCORECARD */}
      {quizState === 'completed' && activeQuiz && (
        <div className="space-y-6">
          {/* Scorecard Hero */}
          {(() => {
            const { score, total, percentage, pointsEarned } = calculateScore()
            const isPassing = percentage >= 60

            return (
              <Card className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 text-white shadow-xl rounded-2xl p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
                  <div className="space-y-2">
                    <Badge className={`${isPassing ? 'bg-emerald-600' : 'bg-amber-600'} text-white border-0 text-xs px-3 py-1`}>
                      {isPassing ? 'Assessment Completed 🎉' : 'Needs Practice 💪'}
                    </Badge>
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                      {isPassing ? 'Outstanding Performance!' : 'Good Effort! Keep Reviewing'}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300">
                      You scored <strong>{score}</strong> out of <strong>{total}</strong> questions correctly ({percentage}%).
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-3 bg-black/40 border border-white/10 p-5 rounded-2xl backdrop-blur-sm">
                    <div className="text-4xl sm:text-5xl font-extrabold text-amber-300">
                      {percentage}%
                    </div>
                    <div className="text-xs text-slate-400 font-medium">
                      +{pointsEarned} Points Earned
                    </div>

                    <Button
                      onClick={handleClaimPoints}
                      disabled={pointsClaimed || pointsEarned === 0}
                      className={`h-9 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        pointsClaimed
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white shadow-lg'
                      }`}
                    >
                      {pointsClaimed ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                          Points Claimed!
                        </>
                      ) : (
                        <>
                          <Award className="h-3.5 w-3.5 mr-1 text-white" />
                          Claim +{pointsEarned} pts
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            )
          })()}

          {/* Question by Question Review */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-foreground flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              Detailed Academic Review & Explanations
            </h3>

            {activeQuiz.questions.map((q, idx) => {
              const userChoice = selectedAnswers[idx]
              const isCorrect = userChoice === q.correctIndex

              return (
                <Card key={q.id} className="bg-card border-border shadow-sm rounded-2xl overflow-hidden">
                  <CardHeader className="pb-3 flex flex-row items-start justify-between gap-4">
                    <div>
                      <span className="text-[11px] font-semibold text-muted-foreground">Question {idx + 1}</span>
                      <CardTitle className="text-sm sm:text-base font-bold text-foreground mt-0.5">
                        {q.question}
                      </CardTitle>
                    </div>
                    {isCorrect ? (
                      <Badge className="bg-emerald-600/90 text-white text-xs flex items-center gap-1 flex-shrink-0">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Correct
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="text-xs flex items-center gap-1 flex-shrink-0">
                        <XCircle className="h-3.5 w-3.5" /> Incorrect
                      </Badge>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-3 pt-0 text-xs sm:text-sm">
                    <div className="space-y-1.5">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = userChoice === optIdx
                        const isRightAnswer = q.correctIndex === optIdx

                        let optClasses = 'p-3 rounded-xl border text-xs font-medium flex items-center justify-between '
                        if (isRightAnswer) {
                          optClasses += 'bg-emerald-500/10 border-emerald-500/50 text-emerald-700 dark:text-emerald-300 font-semibold'
                        } else if (isChosen && !isRightAnswer) {
                          optClasses += 'bg-red-500/10 border-red-500/50 text-red-600 dark:text-red-400 line-through'
                        } else {
                          optClasses += 'bg-muted/30 border-border text-muted-foreground'
                        }

                        return (
                          <div key={optIdx} className={optClasses}>
                            <span>{String.fromCharCode(65 + optIdx)}. {opt}</span>
                            {isRightAnswer && <span className="text-[11px] font-bold text-emerald-600 uppercase">Correct Answer</span>}
                            {isChosen && !isRightAnswer && <span className="text-[11px] font-bold text-red-500 uppercase">Your Answer</span>}
                          </div>
                        )
                      })}
                    </div>

                    {/* Explanation */}
                    <div className="p-3 bg-muted/50 border border-border rounded-xl text-xs text-foreground space-y-1">
                      <strong className="text-primary flex items-center gap-1">
                        <Brain className="h-3.5 w-3.5" /> Pedagogical Explanation:
                      </strong>
                      <p className="text-muted-foreground leading-relaxed">{q.explanation}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border">
            <Button
              onClick={() => setQuizState('config')}
              variant="outline"
              className="h-11 px-5 rounded-xl text-xs font-semibold cursor-pointer"
            >
              <RotateCcw className="h-4 w-4 mr-1.5" />
              Generate Another Quiz
            </Button>

            <div className="flex items-center gap-3">
              <Button asChild className="h-11 px-5 rounded-xl text-xs font-semibold bg-primary text-primary-foreground cursor-pointer">
                <Link href="/ai-tutor">
                  <Brain className="h-4 w-4 mr-1.5" />
                  Ask Socratic Mentor About My Mistakes
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
