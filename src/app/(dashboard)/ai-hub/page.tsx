'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Brain,
  Zap,
  Sparkles,
  Bot,
  FileCheck,
  Search,
  Camera,
  Mic,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Lock,
  Flame,
  Award,
  BookOpen,
  Cpu,
  Layers
} from 'lucide-react'

export default function AIHubPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-8">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-[#0B1528] to-slate-950 border border-cyan-500/30 p-6 sm:p-10 shadow-2xl text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-cyan-500/10 via-blue-600/10 to-transparent blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-cyan-950/80 border border-cyan-500/40 px-3 py-1 rounded-full text-xs font-semibold text-cyan-300">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
            <span>SST Artificial Intelligence & Deep Learning Suite</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <Cpu className="h-8 w-8 text-cyan-400" />
            AI Innovation & Learning Hub
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Welcome to the centralized AI ecosystem for Sindh School of Technology. Access state-of-the-art Socratic tutors, automated practice arenas, and predictive learning intelligence—all gathered in one clean workspace.
          </p>
        </div>
      </div>

      {/* SECTION 1: ACTIVE LIVE AI ENGINES */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Flame className="h-5 w-5 text-amber-500" />
              Active AI Learning Engines
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Ready-to-use intelligent tools to accelerate student mastery and coursework.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Socratic Mentor */}
          <Card className="bg-card border-border hover:border-indigo-500/50 shadow-md hover:shadow-xl transition-all rounded-2xl flex flex-col justify-between overflow-hidden group">
            <div className="h-2 bg-gradient-to-r from-indigo-500 to-cyan-500" />
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                  <Brain className="h-5 w-5" />
                </div>
                <Badge className="bg-emerald-600/90 text-white text-[11px] font-bold">
                  <CheckCircle2 className="h-3 w-3 mr-1" /> Live & Ready
                </Badge>
              </div>
              <CardTitle className="text-lg font-bold text-foreground">
                Socratic AI Mentor
              </CardTitle>
              <CardDescription className="text-xs leading-relaxed">
                Step-by-step conceptual reasoning for Calculus, Physics, Coding, and Sindh Studies. Asks probing questions rather than spoiling answers.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center justify-between py-1 border-b border-border/50">
                <span>Core Models:</span>
                <span className="font-semibold text-foreground">GPT-4o / DeepSeek-R1</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-border/50">
                <span>Inquiry Reward:</span>
                <span className="font-semibold text-amber-500 font-mono">+10 pts / session</span>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button asChild className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-xs h-10 rounded-xl shadow cursor-pointer">
                <Link href="/ai-tutor">
                  <span>Open Socratic Mentor</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Card 2: AI Quiz Arena */}
          <Card className="bg-card border-border hover:border-cyan-500/50 shadow-md hover:shadow-xl transition-all rounded-2xl flex flex-col justify-between overflow-hidden group">
            <div className="h-2 bg-gradient-to-r from-cyan-500 to-amber-500" />
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500 group-hover:scale-110 transition-transform">
                  <Zap className="h-5 w-5" />
                </div>
                <Badge className="bg-emerald-600/90 text-white text-[11px] font-bold">
                  <CheckCircle2 className="h-3 w-3 mr-1" /> Live & Ready
                </Badge>
              </div>
              <CardTitle className="text-lg font-bold text-foreground">
                AI Quiz Arena & Simulator
              </CardTitle>
              <CardDescription className="text-xs leading-relaxed">
                Adaptive multiple-choice test generator with instant scoring, Socratic hints, in-depth explanations, and leaderboard rewards.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center justify-between py-1 border-b border-border/50">
                <span>Quiz Modes:</span>
                <span className="font-semibold text-foreground">Beginner, O/A Levels, MDCAT</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-border/50">
                <span>Max Points:</span>
                <span className="font-semibold text-amber-500 font-mono">+125 pts / quiz</span>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button asChild className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs h-10 rounded-xl shadow cursor-pointer">
                <Link href="/quiz-generator">
                  <span>Launch Quiz Arena</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Card 3: Formative Feedback & Autograding */}
          <Card className="bg-card border-border hover:border-emerald-500/50 shadow-md hover:shadow-xl transition-all rounded-2xl flex flex-col justify-between overflow-hidden group">
            <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500" />
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                  <Bot className="h-5 w-5" />
                </div>
                <Badge className="bg-emerald-600/90 text-white text-[11px] font-bold">
                  <CheckCircle2 className="h-3 w-3 mr-1" /> Live & Ready
                </Badge>
              </div>
              <CardTitle className="text-lg font-bold text-foreground">
                AI Submission Feedback
              </CardTitle>
              <CardDescription className="text-xs leading-relaxed">
                Automated rubric-aligned grading suggestions, linguistic feedback, and formative code checks for submitted coursework.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center justify-between py-1 border-b border-border/50">
                <span>Target:</span>
                <span className="font-semibold text-foreground">Assignments & Projects</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-border/50">
                <span>Output:</span>
                <span className="font-semibold text-foreground">Formative Rubric Scoring</span>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button asChild variant="outline" className="w-full font-bold text-xs h-10 rounded-xl cursor-pointer">
                <Link href="/submission-feedback">
                  <span>View AI Feedback</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* SECTION 2: FUTURE AI ROADMAP */}
      <div className="space-y-4 pt-4 border-t border-border">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Layers className="h-5 w-5 text-indigo-500" />
            Future AI Microservices & Roadmap
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Upcoming deep learning, computer vision, and speech intelligence pipelines for your Final Year Project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Future 1: Syllabus RAG */}
          <Card className="bg-muted/30 border-border/70 rounded-2xl">
            <CardHeader className="p-4 space-y-1.5">
              <div className="flex items-center justify-between">
                <Search className="h-5 w-5 text-indigo-400" />
                <Badge variant="outline" className="text-[10px] text-indigo-400 border-indigo-500/30">
                  <Lock className="h-2.5 w-2.5 mr-1" /> Planned
                </Badge>
              </div>
              <CardTitle className="text-sm font-bold text-foreground">Syllabus RAG Knowledge Base</CardTitle>
              <CardDescription className="text-xs leading-relaxed">
                Vector database embeddings for Sindh Board textbooks with zero hallucination.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Future 2: Vision & Math OCR */}
          <Card className="bg-muted/30 border-border/70 rounded-2xl">
            <CardHeader className="p-4 space-y-1.5">
              <div className="flex items-center justify-between">
                <Camera className="h-5 w-5 text-cyan-400" />
                <Badge variant="outline" className="text-[10px] text-cyan-400 border-cyan-500/30">
                  <Lock className="h-2.5 w-2.5 mr-1" /> Planned
                </Badge>
              </div>
              <CardTitle className="text-sm font-bold text-foreground">Handwritten Math OCR (CNN)</CardTitle>
              <CardDescription className="text-xs leading-relaxed">
                Camera scan of paper homework directly converted into LaTeX steps.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Future 3: Audio & Speech */}
          <Card className="bg-muted/30 border-border/70 rounded-2xl">
            <CardHeader className="p-4 space-y-1.5">
              <div className="flex items-center justify-between">
                <Mic className="h-5 w-5 text-emerald-400" />
                <Badge variant="outline" className="text-[10px] text-emerald-400 border-emerald-500/30">
                  <Lock className="h-2.5 w-2.5 mr-1" /> Planned
                </Badge>
              </div>
              <CardTitle className="text-sm font-bold text-foreground">Speech Coach (Whisper)</CardTitle>
              <CardDescription className="text-xs leading-relaxed">
                Pronunciation scoring and automatic lecture audio chapter transcription.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Future 4: Predictive ML */}
          <Card className="bg-muted/30 border-border/70 rounded-2xl">
            <CardHeader className="p-4 space-y-1.5">
              <div className="flex items-center justify-between">
                <TrendingUp className="h-5 w-5 text-amber-400" />
                <Badge variant="outline" className="text-[10px] text-amber-400 border-amber-500/30">
                  <Lock className="h-2.5 w-2.5 mr-1" /> Planned
                </Badge>
              </div>
              <CardTitle className="text-sm font-bold text-foreground">Predictive Grade Forecaster</CardTitle>
              <CardDescription className="text-xs leading-relaxed">
                ML at-risk student early warning system powered by XGBoost.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  )
}
