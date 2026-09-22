'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LandingHeader } from '@/components/landing-header'
import { HeroVideoBackground } from '@/components/hero-video-background'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Trophy,
  Award,
  BookOpen,
  Users,
  GraduationCap,
  Play,
  Star,
  Calendar,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Globe,
  Mail,
  Phone,
  ArrowRight,
  Sparkles,
  School,
  Languages,
  X,
  Cpu,
  Brain,
  Zap,
  Bot,
  FileCheck,
  ShieldCheck,
  Flame,
  Layers,
  Send,
  ExternalLink,
  MessageSquare,
  HelpCircle,
  Clock,
  Compass,
  Search,
  Code,
  Terminal,
  Sliders,
  BarChart3,
  Check,
  Lock,
  Database,
  FileText,
  AlertCircle,
  Filter
} from 'lucide-react'

export default function HomePage() {
  // Pilot Request Form State
  const [formData, setFormData] = useState({
    schoolName: '',
    contactName: '',
    role: 'Principal / Head of School',
    email: '',
    phone: '',
    studentCount: '500 - 1,500 students',
    country: '',
    message: ''
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Interactive Product Tour State
  const [activeTourTab, setActiveTourTab] = useState<number>(0)

  // Changelog Filter State
  const [changelogFilter, setChangelogFilter] = useState<string>('all')

  // FAQ State & Category Filter
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [faqCategory, setFaqCategory] = useState<string>('all')

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  // Product Tour Modules Data
  const tourModules = [
    {
      id: 'tutor',
      name: 'Socratic AI Tutor',
      tagline: 'Step-by-step conceptual mastery with zero spoilers',
      icon: Brain,
      color: 'indigo',
      link: '/ai-tutor',
      description: 'An intelligent conversational tutor that evaluates student responses, breaks down complex problems into manageable checkpoints, and guides students to find the answer themselves.',
      highlights: [
        'LaTeX mathematical formula and scientific diagram rendering',
        'Support for Mathematics, Physics, Chemistry, Biology & CS',
        'Interchangeable reasoning models (GPT-4o, Gemini 1.5, DeepSeek-R1)',
        'Zero-spoil pedagogical guardrails to protect academic integrity'
      ],
      specs: [
        { label: 'Response Latency', val: '< 800ms' },
        { label: 'Model Support', val: 'GPT-4o / Gemini / DeepSeek' },
        { label: 'Formula Rendering', val: 'Full KaTeX / LaTeX' }
      ],
      previewType: 'tutor'
    },
    {
      id: 'quiz',
      name: 'Adaptive Quiz Arena',
      tagline: 'Dynamic exam simulator with zero-collision randomization',
      icon: Zap,
      color: 'cyan',
      link: '/quiz-generator',
      description: 'Generates syllabus-aligned timed exams with Fisher-Yates question shuffling, progressive difficulty scaling, real-time in-quiz Socratic hints, and instant diagnostic scorecards.',
      highlights: [
        'Preset formats for 20 questions (10m), 35 questions (17m), and 50 questions (25m)',
        'Fisher-Yates zero repetition algorithm across test sessions',
        'In-quiz Socratic conceptual hints without losing exam score',
        'Instant performance breakdown by topic, speed, and accuracy'
      ],
      specs: [
        { label: 'Exam Tiers', val: '20 / 35 / 50 Questions' },
        { label: 'Randomization', val: 'Fisher-Yates Shuffling' },
        { label: 'Hint Engine', val: 'Live Socratic Guidance' }
      ],
      previewType: 'quiz'
    },
    {
      id: 'autograder',
      name: 'Formative Rubric Autograder',
      tagline: 'Instant 4-tier rubric evaluation with personalized growth plans',
      icon: FileCheck,
      color: 'emerald',
      link: '/autograding',
      description: 'Automates grading for student essays, coding solutions, and short-answer assignments across 4 objective criteria, providing constructive feedback and 1-click teacher overrides.',
      highlights: [
        '4-Tier Rubric: Understanding, Technical Depth, Critical Thinking, Presentation',
        'Actionable student revision suggestions and improvement roadmaps',
        'Educator verification queue with instant 1-click mark adjustment',
        'Supports both natural language essays and code submissions'
      ],
      specs: [
        { label: 'Rubric Criteria', val: '4-Tier Weighted Standard' },
        { label: 'Educator Override', val: '1-Click Verification' },
        { label: 'Feedback Speed', val: '< 2 Seconds' }
      ],
      previewType: 'autograder'
    },
    {
      id: 'plagiarism',
      name: 'Originality & Plagiarism Engine',
      tagline: 'Deep semantic similarity scanning and citation verification',
      icon: ShieldCheck,
      color: 'rose',
      link: '/plagiarism',
      description: 'Analyzes student submissions against class cohorts, online databases, and AI synthesis patterns, generating clear originality percentage reports with highlighted matched passages.',
      highlights: [
        'Syntactic and semantic similarity indexing across submitted coursework',
        'Distinguishes between correctly cited quotations and uncredited text',
        'Zero-data-retention policy — student work is never leaked or stored in public LLMs',
        'Exportable PDF integrity certificates for school accreditation records'
      ],
      specs: [
        { label: 'Scanning Method', val: 'Semantic + Syntactic Index' },
        { label: 'Data Retention', val: 'Zero Public LLM Storage' },
        { label: 'Reporting', val: 'Sentence-Level Highlighting' }
      ],
      previewType: 'plagiarism'
    },
    {
      id: 'leaderboard',
      name: 'Gamified Merit Leaderboard',
      tagline: 'Daily study streaks, merit XP, and verified skill badges',
      icon: Trophy,
      color: 'amber',
      link: '/leaderboard',
      description: 'Transforms study habits with an intrinsic gamification system. Students earn XP for completed problem sets, build study streaks, and unlock departmental achievement badges.',
      highlights: [
        'Class, grade, and campus-level real-time competitive leaderboards',
        'Daily streak multiplier that rewards consistent study habits over cramming',
        'Digital skill badges verified by quiz performance and assignment milestones',
        'Anti-cheat streak validation to maintain positive academic competition'
      ],
      specs: [
        { label: 'Leaderboards', val: 'Class, Grade & Campus' },
        { label: 'Streak Engine', val: 'Daily Active Multiplier' },
        { label: 'Reward Type', val: 'Verifiable Digital Badges' }
      ],
      previewType: 'leaderboard'
    },
    {
      id: 'analytics',
      name: 'Teacher & Admin Telemetry',
      tagline: 'Real-time cohort insights and early academic interventions',
      icon: BarChart3,
      color: 'purple',
      link: '/dashboard',
      description: 'Gives school administrators and department heads deep visibility into learning trends, pinpointing difficult concepts, curriculum gaps, and at-risk students before exam time.',
      highlights: [
        'Real-time class completion, average mastery curve, and time-on-task telemetry',
        'Automated early warning flags for students struggling with core prerequisites',
        'One-click roster and gradebook export to CSV, Excel, or SIS webhooks',
        'Departmental analytics across STEM and Humanities faculties'
      ],
      specs: [
        { label: 'Data Export', val: 'CSV / Excel / SIS API' },
        { label: 'Early Warnings', val: 'Automated At-Risk Flags' },
        { label: 'Telemetry', val: 'Real-time Cohort Tracking' }
      ],
      previewType: 'analytics'
    }
  ]

  // Product Changelog / Updates Data
  const changelogItems = [
    {
      id: 1,
      date: 'September 2026',
      version: 'v2.4 Release',
      category: 'exam',
      badgeCategory: 'Examination Engine',
      title: 'AI Quiz Arena: 3-Tier Timed Exam Simulator (20/35/50 Questions)',
      summary: 'Deployed dynamic exam simulator with Fisher-Yates zero-repetition randomization, live Socratic hints, and precise time limits (10m, 17m, 25m).',
      points: [
        'Fisher-Yates zero repetition algorithm across test sessions',
        '10m (20 Qs), 17m (35 Qs), and 25m (50 Qs) timed exam presets',
        'In-quiz Socratic hints that guide without spoiling test score',
        'Instant diagnostic scorecard with topic-level mastery telemetry'
      ],
      badge: 'Major Release',
      badgeColor: 'bg-[#8D1B2D] text-white'
    },
    {
      id: 2,
      date: 'August 2026',
      version: 'v2.3 Release',
      category: 'ai',
      badgeCategory: 'AI Reasoning Core',
      title: 'Multi-Model AI Gateway: GPT-4o, Gemini 1.5 Flash, & DeepSeek-R1',
      summary: 'Introduced interchangeable AI engines with LaTeX mathematical rendering, biochemical pathway breakdown, and step-by-step Socratic inquiry.',
      points: [
        '60% latency reduction with Gemini 1.5 Flash streaming pipeline',
        'DeepSeek-R1 integrated for step-by-step mathematical proofs and STEM reasoning',
        'Full KaTeX / LaTeX mathematical typesetting support',
        'Multilingual prompt adaptability for English, Urdu, and Sindhi'
      ],
      badge: 'AI Core',
      badgeColor: 'bg-indigo-600 text-white'
    },
    {
      id: 3,
      date: 'August 2026',
      version: 'v2.2 Release',
      category: 'grading',
      badgeCategory: 'Teacher Copilot',
      title: 'Formative Rubric Autograder & Growth Feedback Engine',
      summary: 'Automated 4-tier rubric evaluation (Understanding, Technical Depth, Critical Thinking, Presentation) with actionable revision plans.',
      points: [
        'Configurable 4-tier weighted evaluation standard per department',
        'Instant constructive feedback and student improvement roadmaps',
        '1-click teacher override with custom educator note attachments',
        'Support for code syntax checking and long-form essay submissions'
      ],
      badge: 'Autograding',
      badgeColor: 'bg-emerald-600 text-white'
    },
    {
      id: 4,
      date: 'July 2026',
      version: 'v2.1 Release',
      category: 'security',
      badgeCategory: 'Security & Compliance',
      title: 'Originality & Semantic Plagiarism Scanner with Zero LLM Retention',
      summary: 'Deep syntactic and semantic similarity indexing across submitted coursework with zero public model storage policy.',
      points: [
        'Sentence-level highlight breakdown with direct citation verification',
        'Zero-retention architecture: student work is never used to train public models',
        'Cross-class and multi-cohort duplicate submission detection',
        'Exportable PDF academic integrity certificates for school records'
      ],
      badge: 'Integrity',
      badgeColor: 'bg-rose-600 text-white'
    },
    {
      id: 5,
      date: 'July 2026',
      version: 'v2.0 Release',
      category: 'platform',
      badgeCategory: 'Platform Infrastructure',
      title: 'Centralized AI Innovation Hub & Multi-Role Navigation Architecture',
      summary: 'Unified single-pane navigation across 72+ modules, gamified leaderboards, merit badges, and transparent grade adjustment workflows.',
      points: [
        'Single-pane navigation connecting Student, Teacher, and Admin portals',
        'White-label institutional theme engine with custom school logos and colors',
        'Ultra-fast Next.js Turbopack client-side state caching',
        'Dedicated pilot sandbox environments with 24-hour rapid provisioning'
      ],
      badge: 'Infrastructure',
      badgeColor: 'bg-cyan-700 text-white'
    },
    {
      id: 6,
      date: 'June 2026',
      version: 'v1.9 Release',
      category: 'platform',
      badgeCategory: 'Student Motivation',
      title: 'Gamified Merit Economy, Study Streaks & Cohort Leaderboards',
      summary: 'Introduced student XP progression, daily study streak rewards, and verified digital skill badges to boost active daily engagement.',
      points: [
        'Dynamic XP calculation based on quiz difficulty and assignment thoroughness',
        'Daily study streak multipliers with anti-cheat validation',
        'Campus and grade-level competitive leaderboards',
        'Digital achievement showcase with STEM and Humanities badges'
      ],
      badge: 'Gamification',
      badgeColor: 'bg-amber-600 text-white'
    }
  ]

  // Filtered changelog items
  const filteredChangelog = changelogFilter === 'all'
    ? changelogItems
    : changelogItems.filter(item => item.category === changelogFilter || changelogFilter === 'all')

  // Product Screenshots / Visual Highlights
  const productScreenshots = [
    {
      id: 1,
      caption: 'AI Tutor guiding a student through a multi-step calculus problem with LaTeX formulas',
      tag: 'Socratic AI Tutor',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 2,
      caption: 'Timed exam simulation mode with active countdown timer and adaptive difficulty',
      tag: 'AI Quiz Arena',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 3,
      caption: "Teacher autograding dashboard with 4-tier rubric evaluation and revision roadmaps",
      tag: 'Formative Autograder',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 4,
      caption: 'Cohort leaderboards, active study streaks, and verified digital merit badges',
      tag: 'Gamified Economics',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop'
    }
  ]

  // Comprehensive Product FAQs
  const faqs = [
    {
      category: 'curriculum',
      question: 'What curricula and academic syllabi does the platform support?',
      answer: "The platform is 100% curriculum-agnostic. It is built to support Cambridge CAIE (O & A Levels), International Baccalaureate (IB), Edexcel, American AP, and national/provincial education board syllabi (such as Federal and Sindh Boards). During your free pilot onboarding, we configure the knowledge base with your school's exact textbooks, subject outlines, and exam formats."
    },
    {
      category: 'ai',
      question: 'Which AI models power the platform, and can schools choose which engines to enable?',
      answer: 'Our platform features a multi-model reasoning gateway that supports OpenAI GPT-4o, Google Gemini 1.5 Flash/Pro, and DeepSeek-R1. School administrators can configure default engines per department (e.g., Gemini 1.5 Flash for high-speed general study, DeepSeek-R1 for complex STEM proofs, and GPT-4o for essay autograding).'
    },
    {
      category: 'pedagogy',
      question: 'How does the Socratic AI Tutor prevent students from simply copying homework answers?',
      answer: "The AI Tutor is built with strict pedagogical guardrails. Instead of spitting out finished answers, it acts as a Socratic mentor: asking probing checkpoint questions, validating the student's thought process, and giving conceptual hints. It never writes complete assignment solutions for students."
    },
    {
      category: 'customization',
      question: 'Can the platform be custom-branded with our institution’s name, logo, and domain?',
      answer: 'Yes! Every institutional deployment can be fully white-labeled. We configure your custom domain (e.g., learn.yourschool.edu), school crest, institutional color scheme, and welcome notices so the platform functions as an organic part of your digital campus.'
    },
    {
      category: 'grading',
      question: 'How does the Formative Autograder assist teachers without replacing human oversight?',
      answer: 'The Autograder is designed as an educator co-pilot. When a student submits work, the AI provides an initial score across 4 objective rubric criteria (Understanding, Technical Depth, Critical Thinking, and Presentation) along with detailed feedback. Teachers can review, edit, or adjust marks with 1 click before scores are published to students.'
    },
    {
      category: 'security',
      question: 'How is student data privacy and academic security protected?',
      answer: 'We enforce strict zero-data-retention AI protocols. Student submissions and chat logs are never used to train public AI models. All data is encrypted in transit (TLS 1.3) and at rest (AES-256), with role-based access control compliant with international education data protection standards.'
    },
    {
      category: 'pilot',
      question: 'How does the 30-day free school pilot work?',
      answer: 'Our 30-day pilot is completely free with zero financial commitment. Within 24 hours of receiving your request, Muhammad Usman sets up a private sandbox environment for your school, preloaded with sample student and teacher accounts and your subject materials.'
    },
    {
      category: 'integration',
      question: 'Can the platform integrate with Google Classroom, Microsoft Teams, or our SIS?',
      answer: 'Yes. The platform supports Google Single Sign-On (SSO), one-click grade roster export to CSV/Excel, and webhook integration for popular Learning Management Systems (LMS) and Student Information Systems (SIS).'
    },
    {
      category: 'pricing',
      question: 'What are the pricing and licensing models after the pilot concludes?',
      answer: 'After a successful pilot, we offer affordable, predictable per-student annual licensing specifically tailored for emerging markets and private institutions. Pricing is customized based on enrollment size with zero setup fees and ongoing developer support.'
    }
  ]

  // Filtered FAQs
  const filteredFaqs = faqCategory === 'all'
    ? faqs
    : faqs.filter(f => f.category === faqCategory || faqCategory === 'all')

  const handlePilotSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setFormSubmitted(true)
    }, 600)
  }

  const currentTourModule = tourModules[activeTourTab]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-cyan-500 selection:text-white">
      {/* Universal Header */}
      <LandingHeader session={null} />

      {/* 1. HERO SECTION */}
      <section id="overview" className="relative overflow-hidden bg-[#002E40] text-white pt-28 sm:pt-32 lg:pt-36 pb-14 sm:pb-20 lg:pb-24 border-b border-slate-800">
        <HeroVideoBackground
          imageUrl="https://images.unsplash.com/photo-1562774053-701939374585?q=85&w=2400&auto=format&fit=crop"
          posterUrl="https://images.unsplash.com/photo-1562774053-701939374585?q=85&w=2400&auto=format&fit=crop"
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Eyebrow Badge */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold uppercase tracking-wider shadow-sm">
                  <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                  AI-Powered Education Platform
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8D1B2D]/90 border border-[#8D1B2D] text-white text-xs font-bold tracking-wide shadow-sm">
                  <Cpu className="h-3.5 w-3.5 text-amber-300" />
                  Licensable School AI Infrastructure
                </div>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Bring <span className="text-cyan-300">Enterprise-Grade AI Learning</span> to Your School
              </h1>

              {/* Body Paragraph */}
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
                An all-in-one platform combining an AI Socratic tutor, automated grading, adaptive exam generation, and plagiarism detection — built to give any school modern AI-driven education tools without the enterprise price tag.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button 
                  size="lg"
                  className="bg-[#8D1B2D] hover:bg-[#741322] text-white font-bold text-sm px-7 h-12 shadow-xl transition-transform hover:scale-[1.02] cursor-pointer rounded-xl"
                  asChild
                >
                  <a href="#pilot-request">
                    <Send className="h-4 w-4 mr-2 text-cyan-200" />
                    Request a Pilot
                  </a>
                </Button>

                <Button 
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-white/30 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-6 h-12 backdrop-blur-sm gap-2 rounded-xl transition-all"
                >
                  <a href="#product-tour">
                    <Brain className="h-4 w-4 text-cyan-300" />
                    Explore Product Tour
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </a>
                </Button>
              </div>

              {/* 4 Core Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/15">
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-xs">
                  <div className="text-lg sm:text-xl font-extrabold text-cyan-300 tracking-tight">3 AI Engines</div>
                  <div className="text-[11px] text-slate-300 font-medium leading-snug mt-0.5">GPT-4o, Gemini, DeepSeek</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-xs">
                  <div className="text-lg sm:text-xl font-extrabold text-white tracking-tight">72+ Pages</div>
                  <div className="text-[11px] text-slate-300 font-medium leading-snug mt-0.5">Modules & Workspaces</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-xs">
                  <div className="text-lg sm:text-xl font-extrabold text-amber-300 tracking-tight">20 / 35 / 50</div>
                  <div className="text-[11px] text-slate-300 font-medium leading-snug mt-0.5">Adaptive Exam Formats</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-xs">
                  <div className="text-lg sm:text-xl font-extrabold text-emerald-300 tracking-tight">Any Syllabus</div>
                  <div className="text-[11px] text-slate-300 font-medium leading-snug mt-0.5">Cambridge, IB, National</div>
                </div>
              </div>
            </div>

            {/* Right Product Spotlight Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl p-6 sm:p-8 bg-[#001724]/80 backdrop-blur-2xl border border-cyan-500/30 shadow-2xl space-y-5 text-white">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Live AI Learning Demo</span>
                  </div>
                  <Badge className="bg-emerald-600 text-white text-[11px] font-bold border-none px-2.5 py-0.5">
                    Ready to Deploy
                  </Badge>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Interactive Socratic Mentorship & Exam Simulation
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Test our live reasoning engine across Mathematics, Physics, Chemistry, Biology, and Computer Science. Asks probing questions, verifies logic, and generates zero-repetition exams with instant feedback.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-[11px] text-cyan-300 font-semibold uppercase tracking-wider">AI Tutor Latency</div>
                    <div className="text-lg font-black text-white">&lt; 800ms</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-[11px] text-emerald-300 font-semibold uppercase tracking-wider">Autograding Rubric</div>
                    <div className="text-lg font-black text-white">100% Automated</div>
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs h-11 rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Link href="/ai-hub">
                      <Sparkles className="h-4 w-4 text-amber-300" />
                      Launch Live Interactive Demo
                    </Link>
                  </Button>
                  <p className="text-[11px] text-center text-slate-400">
                    Sample student and educator accounts available inside.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BUILT FOR THE WAY MODERN SCHOOLS TEACH */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <Badge variant="outline" className="text-xs font-bold uppercase tracking-wider text-[#002E40] border-[#002E40]/30">
              Institutional Flexibility
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Built for the Way Modern Schools Teach
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Engineered from first principles to adapt to your school's curriculum, language requirements, and pedagogical philosophy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl hover:shadow-lg transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="h-12 w-12 rounded-xl bg-blue-100 text-[#002E40] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Curriculum-Agnostic</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Configurable for Cambridge CAIE, International Baccalaureate (IB), American AP, or national education board syllabi.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl hover:shadow-lg transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="h-12 w-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Languages className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Multi-Language Ready</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Deployable in English, Urdu, Sindhi, Arabic, or any regional language of instruction with seamless vernacular support.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl hover:shadow-lg transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="h-12 w-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Cpu className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">AI-First Architecture</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Three interchangeable AI reasoning engines (GPT-4o, Gemini 1.5, DeepSeek-R1) for optimal cost, latency, and quality flexibility.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl hover:shadow-lg transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="h-12 w-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Full Academic Range</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Supports Grade 1 primary foundations, O/A Levels, MDCAT/ECAT, through to undergraduate and postgraduate coursework.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ONE PLATFORM, EVERY CORE ACADEMIC WORKFLOW */}
      <section id="features" className="py-16 sm:py-24 bg-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <Badge className="bg-[#002E40] text-white text-xs font-semibold px-3 py-1">
              Core Platform Capabilities
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              One Platform, Every Core Academic Workflow
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Replace scattered third-party tools with an integrated intelligence platform designed specifically for schools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1: Socratic AI Tutor */}
            <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Brain className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  AI Socratic Tutor
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Guides students through Mathematics, Physics, Chemistry, Biology, and Computer Science with LaTeX and code rendering. Asks probing checkpoint questions instead of spoiling final answers.
                </p>
              </div>
              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                <span>LaTeX & Code Rendering</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>

            {/* Feature 2: AI Quiz Arena */}
            <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  AI Quiz Arena & Exam Simulator
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Auto-generates timed exams (20, 35, or 50 questions) with zero repetition, Fisher-Yates randomization, adjustable difficulty tiers, in-quiz Socratic hints, and instant scorecards.
                </p>
              </div>
              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-cyan-600">
                <span>10m / 17m / 25m Timers</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>

            {/* Feature 3: Automated Grading & Feedback */}
            <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileCheck className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Automated Grading & Feedback
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Multi-dimensional rubric grading (Understanding, Technical Depth, Critical Thinking, Presentation) for student essays and coding submissions with personalized growth plans.
                </p>
              </div>
              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
                <span>4-Tier Rubric Analytics</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>

            {/* Feature 4: Originality & Plagiarism Detector */}
            <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Originality & Plagiarism Engine
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Deep semantic similarity indexing across submitted coursework to flag uncredited text and AI synthesis patterns, generating clear similarity breakdown percentages.
                </p>
              </div>
              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-rose-600">
                <span>Sentence-Level Indexing</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>

            {/* Feature 5: Gamified Economics & Streaks */}
            <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Flame className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Gamified Economics & Streaks
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Real-time leaderboards, daily study streak counters, XP rewards, and merit badges that incentivize consistent daily learning and healthy classroom competition.
                </p>
              </div>
              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600">
                <span>XP & Merit Economy</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>

            {/* Feature 6: Extension Requests & Interventions */}
            <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Layers className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Teacher Workflow & Interventions
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Structured, transparent protocol allowing students facing illness or emergencies to submit formal requests with verification for teacher review and approval.
                </p>
              </div>
              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-600">
                <span>Transparent Educator Queue</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BUILT BY MUHAMMAD USMAN */}
      <section id="about" className="py-16 sm:py-24 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Developer Photo / Avatar */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-700 max-w-sm w-full bg-slate-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/usman.jpg"
                  alt="Muhammad Usman — Developer & AI Engineer"
                  className="w-full h-96 object-cover object-top"
                />
                <div className="p-4 bg-slate-800/90 text-center border-t border-slate-700">
                  <h3 className="text-lg font-bold text-white">Muhammad Usman</h3>
                  <p className="text-xs text-cyan-300 uppercase tracking-wider font-semibold">Creator & Lead AI Engineer</p>
                </div>
              </div>
            </div>

            {/* Developer Story & Contact Links */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <Badge className="bg-[#8D1B2D] text-white text-xs font-semibold px-3 py-1">
                Engineering & Vision
              </Badge>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Built by Muhammad Usman
              </h2>

              <p className="text-base text-slate-300 leading-relaxed font-normal">
                I am an AI/ML and full-stack engineer from Pakistan. I built this platform to bring the kind of AI tutoring and automated grading tools normally reserved for expensive enterprise EdTech products to any school, at a fraction of the cost. I personally support every pilot deployment.
              </p>

              {/* Developer Quote Callout */}
              <div className="p-5 bg-white/5 rounded-2xl border-l-4 border-cyan-400 space-y-2">
                <p className="text-sm sm:text-base text-cyan-100 italic leading-relaxed">
                  &ldquo;Every school should be able to give its students an AI tutor that guides rather than gives away answers — regardless of budget.&rdquo;
                </p>
                <p className="text-xs text-slate-400 font-semibold">— Muhammad Usman, Developer</p>
              </div>

              {/* Developer Connect Links Row */}
              <div className="pt-2 space-y-2">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Direct Developer Contact</p>
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
                  <a 
                    href="mailto:musmanmahar5312@gmail.com" 
                    className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-3.5 py-2 rounded-xl transition-all border border-white/10"
                  >
                    <Mail className="h-3.5 w-3.5 text-cyan-300" />
                    musmanmahar5312@gmail.com
                  </a>
                  
                  <a 
                    href="https://github.com/mhusman123" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-3.5 py-2 rounded-xl transition-all border border-white/10"
                  >
                    <ExternalLink className="h-3.5 w-3.5 text-amber-300" />
                    GitHub
                  </a>

                  <a 
                    href="https://www.linkedin.com/in/muhammad-usman-9464b5247/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-3.5 py-2 rounded-xl transition-all border border-white/10"
                  >
                    <ExternalLink className="h-3.5 w-3.5 text-blue-400" />
                    LinkedIn
                  </a>

                  <a 
                    href="https://x.com/md_usman73?s=21" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-3.5 py-2 rounded-xl transition-all border border-white/10"
                  >
                    <ExternalLink className="h-3.5 w-3.5 text-slate-300" />
                    X (Twitter)
                  </a>

                  <a 
                    href="https://wa.me/923058315292" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-1.5 bg-emerald-700/80 hover:bg-emerald-600 text-white px-3.5 py-2 rounded-xl transition-all border border-emerald-500/40"
                  >
                    <Phone className="h-3.5 w-3.5 text-white" />
                    +92 305 8315292
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS (3-STEP PROCESS) */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <Badge variant="outline" className="text-xs font-bold uppercase tracking-wider text-[#002E40] border-[#002E40]/30">
              Simple Deployment
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How It Works & Pilot Process
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Three straightforward steps to bring AI tutoring and automated grading to your classrooms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-7 flex flex-col justify-between hover:shadow-lg transition-all relative overflow-hidden">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-[#002E40] text-white flex items-center justify-center font-extrabold text-lg shadow-sm">
                  1
                </div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  See a Live Demo
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Walk through the AI tutor, quiz arena, and autograding dashboard with preloaded sample data to evaluate pedagogical accuracy and student user experience.
                </p>
              </div>
              <div className="pt-5 mt-4 border-t border-slate-200">
                <Link href="/ai-hub" className="text-xs font-bold text-[#8D1B2D] inline-flex items-center gap-1 hover:underline">
                  Try Interactive Demo <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-7 flex flex-col justify-between hover:shadow-lg transition-all relative overflow-hidden">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-[#8D1B2D] text-white flex items-center justify-center font-extrabold text-lg shadow-sm">
                  2
                </div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  Run a Free Pilot
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Your teachers and a class cohort of students get full access to the platform for a 30-day trial with zero upfront cost and no obligation.
                </p>
              </div>
              <div className="pt-5 mt-4 border-t border-slate-200">
                <a href="#pilot-request" className="text-xs font-bold text-[#8D1B2D] inline-flex items-center gap-1 hover:underline">
                  Request Your Free Pilot <ChevronRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-7 flex flex-col justify-between hover:shadow-lg transition-all relative overflow-hidden">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-cyan-700 text-white flex items-center justify-center font-extrabold text-lg shadow-sm">
                  3
                </div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  Go Live
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  We deploy a fully customized instance branded for your institution, on an affordable annual license with dedicated direct developer technical support.
                </p>
              </div>
              <div className="pt-5 mt-4 border-t border-slate-200">
                <span className="text-xs font-semibold text-slate-500">
                  Custom domain &amp; branding included
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PILOT REVIEWS & HONEST PLACEHOLDER */}
      <section className="py-14 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Badge variant="outline" className="text-xs font-bold uppercase tracking-wider text-[#002E40] border-[#002E40]/30">
            Pilot Feedback
          </Badge>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Early School Pilot Feedback
          </h2>
          
          <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4 max-w-2xl mx-auto">
            <div className="h-12 w-12 rounded-full bg-cyan-50 text-cyan-700 flex items-center justify-center mx-auto">
              <School className="h-6 w-6" />
            </div>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              Currently onboarding our first cohort of pilot schools — check back soon for live feedback, or request a pilot to test the platform with your classes.
            </p>
            <div>
              <Button 
                asChild
                className="bg-[#8D1B2D] hover:bg-[#741322] text-white text-xs font-bold px-5 h-10 rounded-xl cursor-pointer"
              >
                <a href="#pilot-request">
                  Request a Pilot for Your School
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. INTERACTIVE PRODUCT TOUR (ID: product-tour) */}
      <section id="product-tour" className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <Badge className="bg-[#002E40] text-cyan-300 text-xs font-semibold px-3 py-1 mb-2">
                Interactive Product Tour
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Explore the AI Learning Platform
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
                Click through our core modules below to see live interface simulations and technical specifications.
              </p>
            </div>
            <Button
              asChild
              className="bg-[#8D1B2D] hover:bg-[#741322] text-white font-bold text-xs h-10 px-5 rounded-xl gap-2 cursor-pointer shadow-sm shrink-0"
            >
              <Link href="/ai-hub">
                <Brain className="h-4 w-4 text-white" />
                Launch Full AI Hub Demo
              </Link>
            </Button>
          </div>

          {/* Interactive Tab Navigation */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none border-b border-slate-200 mb-8">
            {tourModules.map((module, idx) => {
              const IconComp = module.icon
              const isActive = activeTourTab === idx
              return (
                <button
                  key={module.id}
                  onClick={() => setActiveTourTab(idx)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#002E40] text-white shadow-md'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <IconComp className={`h-4 w-4 ${isActive ? 'text-cyan-300' : 'text-slate-500'}`} />
                  <span>{module.name}</span>
                </button>
              )
            })}
          </div>

          {/* Active Module Showcase Card */}
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-slate-800 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Details & Capabilities */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
                    <currentTourModule.icon className="h-3.5 w-3.5" />
                    {currentTourModule.tagline}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {currentTourModule.name}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed mt-2 font-normal">
                    {currentTourModule.description}
                  </p>
                </div>

                {/* Key Feature Bullet List */}
                <div className="space-y-2.5">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Key Pedagogical Highlights</p>
                  {currentTourModule.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Technical Specs Row */}
                <div className="grid grid-cols-3 gap-3 pt-2 border-t border-white/10">
                  {currentTourModule.specs.map((s, i) => (
                    <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/10">
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">{s.label}</div>
                      <div className="text-xs sm:text-sm font-bold text-cyan-300 mt-0.5">{s.val}</div>
                    </div>
                  ))}
                </div>

                {/* Interactive Launch CTA */}
                <div className="pt-2 flex items-center gap-3">
                  <Button
                    asChild
                    className="bg-[#8D1B2D] hover:bg-[#741322] text-white font-bold text-xs px-6 h-11 rounded-xl shadow-lg transition-transform hover:scale-[1.02]"
                  >
                    <Link href={currentTourModule.link}>
                      <Play className="h-3.5 w-3.5 mr-1.5 text-white" />
                      Try Live {currentTourModule.name}
                    </Link>
                  </Button>
                  <span className="text-xs text-slate-400">Direct interactive simulator</span>
                </div>
              </div>

              {/* Right Column: Live Mock Interactive UI Preview */}
              <div className="lg:col-span-6">
                <div className="bg-[#001724] border border-cyan-500/30 rounded-2xl p-5 shadow-2xl space-y-4">
                  
                  {/* Mock Window Top Bar */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-rose-500/80"></span>
                      <span className="h-3 w-3 rounded-full bg-amber-500/80"></span>
                      <span className="h-3 w-3 rounded-full bg-emerald-500/80"></span>
                      <span className="text-xs font-mono text-slate-400 ml-2">demo.{currentTourModule.id}.module</span>
                    </div>
                    <Badge className="bg-emerald-600/90 text-white text-[10px] font-mono border-none">
                      ONLINE
                    </Badge>
                  </div>

                  {/* PREVIEW: Socratic AI Tutor */}
                  {currentTourModule.previewType === 'tutor' && (
                    <div className="space-y-3 font-sans text-xs">
                      <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 text-slate-200">
                        <div className="text-[10px] font-bold text-cyan-400 uppercase mb-1">Student Question:</div>
                        <p className="italic">&ldquo;How do I find the derivative of f(x) = x³ · sin(x)? Just give me the answer.&rdquo;</p>
                      </div>

                      <div className="bg-cyan-950/40 border border-cyan-500/30 rounded-xl p-3.5 space-y-2 text-slate-200">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-cyan-300 uppercase">
                          <Bot className="h-3.5 w-3.5 text-cyan-300" />
                          <span>AI Socratic Mentor:</span>
                        </div>
                        <p className="leading-relaxed">
                          Notice that f(x) is a product of two functions: u(x) = x³ and v(x) = sin(x).
                        </p>
                        <div className="p-2 bg-black/40 rounded-lg border border-cyan-500/20 font-mono text-cyan-200 text-[11px]">
                          d/dx [u · v] = u&apos;v + uv&apos;
                        </div>
                        <p className="text-slate-300 leading-relaxed">
                          What is the derivative of x³, and what is the derivative of sin(x)? Try differentiating each term first!
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                        <span className="flex items-center gap-1"><Check className="h-3.5 w-3.5 text-emerald-400" /> Zero spoilers guardrail active</span>
                        <span className="font-mono text-cyan-400">Latency: 420ms</span>
                      </div>
                    </div>
                  )}

                  {/* PREVIEW: Adaptive Quiz Arena */}
                  {currentTourModule.previewType === 'quiz' && (
                    <div className="space-y-3 text-xs">
                      <div className="flex items-center justify-between bg-white/5 p-2.5 rounded-xl border border-white/10">
                        <span className="font-bold text-cyan-300">Question 14 of 35</span>
                        <span className="flex items-center gap-1 font-mono text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                          <Clock className="h-3.5 w-3.5" /> 14:28 remaining
                        </span>
                      </div>

                      <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-2">
                        <p className="font-semibold text-white">Which organelle is responsible for cellular ATP synthesis via oxidative phosphorylation?</p>
                        <div className="space-y-1.5 pt-1">
                          <div className="p-2 bg-emerald-950/60 border border-emerald-500/60 rounded-lg text-emerald-200 font-medium flex items-center justify-between">
                            <span>A) Mitochondria</span>
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                          </div>
                          <div className="p-2 bg-white/5 border border-white/10 rounded-lg text-slate-300 hover:bg-white/10">
                            <span>B) Endoplasmic Reticulum</span>
                          </div>
                          <div className="p-2 bg-white/5 border border-white/10 rounded-lg text-slate-300 hover:bg-white/10">
                            <span>C) Golgi Apparatus</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-2.5 bg-cyan-950/40 border border-cyan-500/30 rounded-xl flex items-center justify-between text-[11px]">
                        <span className="text-cyan-300 font-semibold">💡 Socratic Hint Available:</span>
                        <span className="text-slate-300 font-mono">Exam Tier: Advanced STEM</span>
                      </div>
                    </div>
                  )}

                  {/* PREVIEW: Formative Autograder */}
                  {currentTourModule.previewType === 'autograder' && (
                    <div className="space-y-3 text-xs">
                      <div className="flex items-center justify-between bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-500/30">
                        <span className="font-bold text-emerald-300">Formative Assessment Result</span>
                        <Badge className="bg-emerald-600 text-white font-bold text-[11px] border-none">Grade: 36 / 40 (90%)</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                          <span className="text-slate-400">Conceptual Depth:</span>
                          <span className="font-bold text-cyan-300 ml-1">9.5 / 10</span>
                        </div>
                        <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                          <span className="text-slate-400">Technical Rigor:</span>
                          <span className="font-bold text-cyan-300 ml-1">9.0 / 10</span>
                        </div>
                        <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                          <span className="text-slate-400">Critical Reasoning:</span>
                          <span className="font-bold text-cyan-300 ml-1">8.5 / 10</span>
                        </div>
                        <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                          <span className="text-slate-400">Structure:</span>
                          <span className="font-bold text-cyan-300 ml-1">9.0 / 10</span>
                        </div>
                      </div>

                      <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1 text-slate-300">
                        <div className="text-[10px] font-bold text-amber-300 uppercase">Personalized Revision Roadmap:</div>
                        <p className="text-[11px] leading-relaxed">
                          Excellent thesis defense. For subsequent submissions, expand on counter-arguments in paragraph 3 to reach full marks in Critical Reasoning.
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                        <span className="text-emerald-400">✓ Teacher verification ready</span>
                        <span className="text-slate-400">1-click mark approval</span>
                      </div>
                    </div>
                  )}

                  {/* PREVIEW: Originality & Plagiarism */}
                  {currentTourModule.previewType === 'plagiarism' && (
                    <div className="space-y-3 text-xs">
                      <div className="flex items-center justify-between bg-white/5 p-2.5 rounded-xl border border-white/10">
                        <span className="font-bold text-white">Originality Index Report</span>
                        <Badge className="bg-emerald-600 text-white font-bold text-[11px] border-none">94% Original</Badge>
                      </div>

                      <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-2">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-300">Direct Quotes (Properly Cited):</span>
                          <span className="font-mono text-cyan-300 font-bold">4.2%</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-300">Common Academic Formulae:</span>
                          <span className="font-mono text-cyan-300 font-bold">1.8%</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-300">Uncredited Similarity:</span>
                          <span className="font-mono text-emerald-400 font-bold">0.0% (Clean)</span>
                        </div>
                      </div>

                      <div className="p-2.5 bg-cyan-950/40 rounded-xl border border-cyan-500/30 text-slate-300 text-[11px] flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span>Zero Data Retention: Student coursework is never stored in public LLMs.</span>
                      </div>
                    </div>
                  )}

                  {/* PREVIEW: Gamified Leaderboard */}
                  {currentTourModule.previewType === 'leaderboard' && (
                    <div className="space-y-2.5 text-xs">
                      <div className="flex items-center justify-between bg-white/5 p-2.5 rounded-xl border border-white/10">
                        <span className="font-bold text-amber-300 flex items-center gap-1.5">
                          <Trophy className="h-4 w-4 text-amber-300" /> Grade 11 STEM Leaderboard
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">Week 4 Active</span>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between p-2 bg-amber-950/40 border border-amber-500/40 rounded-lg text-white">
                          <span className="flex items-center gap-2">
                            <span className="h-5 w-5 rounded-full bg-amber-500 text-black font-extrabold flex items-center justify-center text-[10px]">1</span>
                            <span className="font-bold">Sarah K.</span>
                            <Badge className="bg-amber-500/20 text-amber-300 text-[9px] border-none">🔥 14-Day Streak</Badge>
                          </span>
                          <span className="font-mono font-bold text-amber-300">2,450 XP</span>
                        </div>

                        <div className="flex items-center justify-between p-2 bg-white/5 border border-white/10 rounded-lg text-slate-200">
                          <span className="flex items-center gap-2">
                            <span className="h-5 w-5 rounded-full bg-slate-600 text-white font-bold flex items-center justify-center text-[10px]">2</span>
                            <span className="font-medium">Alex M.</span>
                            <Badge className="bg-cyan-500/20 text-cyan-300 text-[9px] border-none">Calculus Master</Badge>
                          </span>
                          <span className="font-mono font-bold text-slate-300">2,310 XP</span>
                        </div>

                        <div className="flex items-center justify-between p-2 bg-white/5 border border-white/10 rounded-lg text-slate-200">
                          <span className="flex items-center gap-2">
                            <span className="h-5 w-5 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center text-[10px]">3</span>
                            <span className="font-medium">Usman R.</span>
                            <Badge className="bg-emerald-500/20 text-emerald-300 text-[9px] border-none">Physics Ace</Badge>
                          </span>
                          <span className="font-mono font-bold text-slate-300">2,190 XP</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PREVIEW: Teacher Analytics */}
                  {currentTourModule.previewType === 'analytics' && (
                    <div className="space-y-3 text-xs">
                      <div className="flex items-center justify-between bg-purple-950/40 p-2.5 rounded-xl border border-purple-500/30">
                        <span className="font-bold text-purple-300">Class Performance Telemetry</span>
                        <span className="font-mono text-white text-[11px]">Cohort: 120 Students</span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-[11px] text-center">
                        <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                          <div className="text-slate-400 text-[10px]">Completion</div>
                          <div className="text-emerald-400 font-black text-sm">94.2%</div>
                        </div>
                        <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                          <div className="text-slate-400 text-[10px]">Avg Mastery</div>
                          <div className="text-cyan-300 font-black text-sm">86.4%</div>
                        </div>
                        <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                          <div className="text-slate-400 text-[10px]">Interventions</div>
                          <div className="text-amber-400 font-black text-sm">3 Flagged</div>
                        </div>
                      </div>

                      <div className="p-2.5 bg-amber-950/30 border border-amber-500/30 rounded-xl text-[11px] text-slate-200 flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
                          <AlertCircle className="h-3.5 w-3.5 text-amber-400" />
                          Calculus Integration: 3 students need review
                        </span>
                        <Button size="sm" variant="outline" className="h-6 text-[10px] border-white/20 bg-white/10 text-white px-2">
                          View
                        </Button>
                      </div>
                    </div>
                  )}

                </div>
              </div>

            </div>
          </div>

          {/* Screenshot Gallery Grid */}
          <div className="mt-14 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Platform Visual Snapshot Gallery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {productScreenshots.map((item) => (
                <div key={item.id} className="group relative rounded-2xl overflow-hidden border border-slate-200 shadow-xs bg-slate-900 flex flex-col justify-between">
                  <div className="relative h-48 w-full overflow-hidden bg-slate-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-[#002E40] text-cyan-300 text-[10px] font-bold border-none">
                        {item.tag}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-900 text-white">
                    <p className="text-xs font-medium leading-snug text-slate-200">
                      {item.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 8. PRODUCT UPDATES & CHANGELOG (ID: changelog) */}
      <section id="changelog" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <Badge className="bg-[#002E40] text-white text-xs font-semibold px-3 py-1">
              Continuous Innovation
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Product Updates &amp; Changelog
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Transparent, real-time evolution of our educational intelligence architecture and pedagogical features.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {[
              { id: 'all', label: 'All Releases' },
              { id: 'exam', label: 'Examination Engine' },
              { id: 'ai', label: 'AI Reasoning Core' },
              { id: 'grading', label: 'Teacher Copilot' },
              { id: 'security', label: 'Security & Compliance' },
              { id: 'platform', label: 'Platform & Gamification' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setChangelogFilter(f.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  changelogFilter === f.id
                    ? 'bg-[#8D1B2D] text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Changelog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChangelog.map((item) => (
              <Card key={item.id} className="overflow-hidden border-slate-200 hover:shadow-xl transition-all flex flex-col justify-between rounded-2xl bg-white group">
                <CardContent className="p-6 space-y-4">
                  
                  {/* Top Version & Date */}
                  <div className="flex items-center justify-between">
                    <Badge className="bg-[#002E40] text-white text-[11px] font-bold px-2.5 py-0.5">
                      {item.version}
                    </Badge>
                    <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {item.date}
                    </span>
                  </div>

                  {/* Title & Summary */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-700">{item.badgeCategory}</span>
                    <h3 className="text-base font-bold text-slate-900 leading-snug mt-0.5 group-hover:text-[#8D1B2D] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-2 font-normal">
                      {item.summary}
                    </p>
                  </div>

                  {/* Bullet Highlights */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    {item.points.map((pt, pidx) => (
                      <div key={pidx} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{pt}</span>
                      </div>
                    ))}
                  </div>

                </CardContent>

                {/* Footer Tag */}
                <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold">
                  <span className="text-slate-500 font-medium">Status: Live in Production</span>
                  <Badge className={item.badgeColor}>
                    {item.badge}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>

          {/* Changelog Bottom Notice */}
          <div className="mt-10 p-4 bg-white border border-slate-200 rounded-xl text-center text-xs text-slate-600 max-w-xl mx-auto flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4 text-cyan-600" />
            <span>Have a feature request for your institution? Include it in your pilot request.</span>
          </div>

        </div>
      </section>

      {/* 9. LEAD CAPTURE: REQUEST A PILOT LEAD FORM */}
      <section id="pilot-request" className="py-16 sm:py-24 bg-gradient-to-br from-slate-950 via-[#002E40] to-slate-950 text-white border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-10">
            <Badge className="bg-[#8D1B2D] text-white text-xs font-semibold px-3 py-1">
              Pilot Application
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Request a Pilot for Your School
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
              Deploy enterprise-grade AI tutoring and automated grading for your students and teachers. 100% free pilot, no commitment required.
            </p>
          </div>

          <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/20">
            {formSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900">Pilot Request Received!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you for your interest. Muhammad Usman will contact you directly within 24 hours at <strong className="text-slate-900">{formData.email}</strong> to set up your school's pilot environment.
                </p>
                <div className="pt-2">
                  <Button
                    onClick={() => {
                      setFormSubmitted(false)
                      setFormData({
                        schoolName: '',
                        contactName: '',
                        role: 'Principal / Head of School',
                        email: '',
                        phone: '',
                        studentCount: '500 - 1,500 students',
                        country: '',
                        message: ''
                      })
                    }}
                    className="bg-[#002E40] hover:bg-[#002331] text-white font-semibold text-xs px-6 h-10 rounded-xl cursor-pointer"
                  >
                    Submit Another Request
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handlePilotSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* School / Institution Name */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">School / Institution Name*</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Beaconhouse, City School, Oxford Grammar..."
                      value={formData.schoolName}
                      onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                      className="w-full h-11 px-3.5 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#002E40] outline-none"
                    />
                  </div>

                  {/* Your Name & Role */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Your Name*</label>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full h-11 px-3.5 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#002E40] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Role Selection */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Your Role / Title*</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full h-11 px-3 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#002E40] bg-white outline-none"
                    >
                      <option>Principal / Head of School</option>
                      <option>Academic Dean / Director</option>
                      <option>IT Director / EdTech Lead</option>
                      <option>Department Head (Science / STEM / CS)</option>
                      <option>Teacher / Faculty Member</option>
                      <option>University Professor / Researcher</option>
                      <option>School Trustee / Board Member</option>
                    </select>
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Work / Official Email*</label>
                    <input
                      type="email"
                      required
                      placeholder="name@school.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-11 px-3.5 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#002E40] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Phone / WhatsApp */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Phone / WhatsApp*</label>
                    <input
                      type="tel"
                      required
                      placeholder="+92 300 1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-11 px-3.5 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#002E40] outline-none"
                    />
                  </div>

                  {/* Approx Students */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Approx. Students*</label>
                    <select
                      value={formData.studentCount}
                      onChange={(e) => setFormData({ ...formData, studentCount: e.target.value })}
                      className="w-full h-11 px-3 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#002E40] bg-white outline-none"
                    >
                      <option>Under 200 students</option>
                      <option>200 - 500 students</option>
                      <option>500 - 1,500 students</option>
                      <option>1,500 - 5,000 students</option>
                      <option>5,000+ students (Multi-campus)</option>
                    </select>
                  </div>

                  {/* Country */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Country*</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pakistan, UAE, UK..."
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full h-11 px-3.5 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#002E40] outline-none"
                    />
                  </div>
                </div>

                {/* Message / Objectives */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Message (Optional — what are you hoping to solve?)</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your school's current AI initiatives, subjects of interest, or timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3.5 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#002E40] outline-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#8D1B2D] hover:bg-[#741322] text-white font-bold text-sm h-12 rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="h-4 w-4 text-cyan-200" />
                    <span>{isSubmitting ? 'Submitting Request...' : 'Request Free School Pilot'}</span>
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 10. PRODUCT FAQ SECTION (ID: faq) */}
      <section id="faq" className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center space-y-3 mb-10">
            <Badge className="bg-[#002E40] text-white text-xs font-semibold px-3 py-1">
              Common Questions
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Clear answers regarding curriculum adaptability, data protection, pilot process, and school licensing.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {[
              { id: 'all', label: 'All Questions' },
              { id: 'curriculum', label: 'Curriculum & Syllabi' },
              { id: 'ai', label: 'AI Reasoning & Safety' },
              { id: 'pedagogy', label: 'Pedagogical Model' },
              { id: 'security', label: 'Privacy & Security' },
              { id: 'pilot', label: 'Pilot & Deployment' }
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setFaqCategory(c.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  faqCategory === c.id
                    ? 'bg-[#002E40] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {filteredFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-white shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-500 transition-transform duration-200 shrink-0 ${openFaq === idx ? 'rotate-180 text-[#8D1B2D]' : ''}`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="p-5 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Direct Contact Support Card */}
          <div className="mt-12 p-6 sm:p-8 bg-slate-900 rounded-2xl text-white text-center space-y-4 border border-slate-800">
            <h3 className="text-lg font-bold">Have a specific question about your institution's requirements?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Muhammad Usman is available directly to answer technical, pedagogical, and pilot setup inquiries.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Button
                asChild
                className="bg-[#8D1B2D] hover:bg-[#741322] text-white font-bold text-xs px-5 h-10 rounded-xl"
              >
                <a href="mailto:musmanmahar5312@gmail.com">
                  <Mail className="h-3.5 w-3.5 mr-1.5" /> Email Developer
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-emerald-500/50 bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 font-bold text-xs px-5 h-10 rounded-xl"
              >
                <a href="https://wa.me/923058315292" target="_blank" rel="noopener noreferrer">
                  <Phone className="h-3.5 w-3.5 mr-1.5 text-emerald-400" /> WhatsApp (+92 305 8315292)
                </a>
              </Button>
            </div>
          </div>

        </div>
      </section>

      {/* 11. REWRITTEN PRODUCT FOOTER */}
      <footer className="bg-[#0B1528] text-slate-300 py-14 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1: Product Mission */}
            <div className="space-y-4">
              <img
                src="/logo.png?v=9"
                alt="Logo"
                className="h-8 sm:h-9 w-auto object-contain drop-shadow-md"
              />
              <p className="text-xs text-slate-400 leading-relaxed">
                AI-powered learning tools for schools worldwide — built to make quality education technology accessible to any institution, regardless of budget.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Navigation</h4>
              <ul className="space-y-2 text-xs text-slate-400 font-medium">
                <li><a href="#pilot-request" className="hover:text-white transition-colors">Request a Pilot</a></li>
                <li><a href="#product-tour" className="hover:text-white transition-colors">Product Tour</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Core AI Workflows</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">Pilot Process</a></li>
                <li><a href="#changelog" className="hover:text-white transition-colors">Changelog</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">Institutional FAQ</a></li>
              </ul>
            </div>

            {/* Column 3: AI Modules */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">AI Solutions</h4>
              <ul className="space-y-2 text-xs text-slate-400 font-medium">
                <li><Link href="/ai-tutor" className="hover:text-white transition-colors">Socratic AI Tutor</Link></li>
                <li><Link href="/quiz-generator" className="hover:text-white transition-colors">AI Quiz Arena &amp; Exam Simulator</Link></li>
                <li><Link href="/autograding" className="hover:text-white transition-colors">Formative Autograder</Link></li>
                <li><Link href="/plagiarism" className="hover:text-white transition-colors">Originality &amp; Plagiarism Engine</Link></li>
                <li><Link href="/leaderboard" className="hover:text-white transition-colors">Gamified Leaderboard</Link></li>
              </ul>
            </div>

            {/* Column 4: Contact Information */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Direct Developer Contact</h4>
              <div className="space-y-2 text-xs text-slate-400">
                <p className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-cyan-400" />
                  <a href="mailto:musmanmahar5312@gmail.com" className="hover:text-white">musmanmahar5312@gmail.com</a>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-emerald-400" />
                  <a href="https://wa.me/923058315292" target="_blank" rel="noopener noreferrer" className="hover:text-white">+92 305 8315292 (WhatsApp)</a>
                </p>
                <p className="flex items-center gap-2">
                  <ExternalLink className="h-3.5 w-3.5 text-blue-400" />
                  <a href="https://www.linkedin.com/in/muhammad-usman-9464b5247/" target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn Profile</a>
                </p>
                <p className="flex items-center gap-2">
                  <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
                  <a href="https://github.com/mhusman123" target="_blank" rel="noopener noreferrer" className="hover:text-white">GitHub Repository</a>
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© 2026 AI Education Platform. Built by Muhammad Usman.</p>
            <div className="flex gap-4">
              <a href="#pilot-request" className="hover:text-slate-400">Request Pilot</a>
              <Link href="/ai-hub" className="hover:text-slate-400">Live Demo</Link>
              <a href="mailto:musmanmahar5312@gmail.com" className="hover:text-slate-400">Contact Developer</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
