'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LandingHeader } from '@/components/landing-header'
import { HeroVideoBackground } from '@/components/hero-video-background'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Award,
  Trophy,
  BookOpen,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  GraduationCap,
  Target,
  Users,
  Compass,
  Star,
  Quote,
  Play,
  X,
  FileText,
  Languages,
  ShieldCheck,
  TrendingUp,
  Percent,
  ArrowRight,
  MapPin,
  Phone,
  Mail
} from 'lucide-react'

export default function AcademicExcellencePage() {
  const [activeResultTab, setActiveResultTab] = useState<'igcse' | 'alevel' | 'sindhboard' | 'entrance'>('igcse')
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const coreValues = [
    {
      title: 'Responsibility (ذميواري • ذمہ داری)',
      desc: 'Encouraging students to take full ownership of their intellectual growth, moral choices, and duties to their peers, families, and wider Pakistani society.',
      icon: ShieldCheck,
      color: 'bg-blue-50 text-blue-900 border-blue-200'
    },
    {
      title: 'Curiosity (تجسس • جستجو)',
      desc: 'Cultivating an inquisitive mindset that asks profound questions, explores scientific mysteries, and explores literature across English, Urdu, and Sindhi.',
      icon: Sparkles,
      color: 'bg-amber-50 text-amber-900 border-amber-200'
    },
    {
      title: 'Respect (احترام • عزت)',
      desc: 'Fostering deep reverence for diverse perspectives, cultural heritage, teachers, and school traditions rooted in the tolerant Sufi philosophy of Sindh.',
      icon: Users,
      color: 'bg-emerald-50 text-emerald-900 border-emerald-200'
    },
    {
      title: 'Motivation (جذبو • لگن)',
      desc: 'Instilling an unshakeable intrinsic drive to overcome challenges, embrace feedback, and persevere toward academic mastery and lifelong personal excellence.',
      icon: Target,
      color: 'bg-rose-50 text-[#8D1B2D] border-rose-200'
    }
  ]

  const examResults = {
    igcse: {
      title: 'Cambridge IGCSE Examination Results',
      subtitle: 'Outstanding performance across Science, Mathematics, Languages & Humanities',
      stats: [
        { label: 'A* - A Grade Rate', value: '78%' },
        { label: 'A* - B Grade Rate', value: '96%' },
        { label: 'Overall Pass Rate', value: '100%' },
        { label: 'Top in Pakistan Distinctions', value: '14 Distinctions' }
      ],
      description: 'Our Grade 9 & 10 students consistently outshine national and international averages in Cambridge Assessment International Education (CAIE) exams, showing remarkable analytical depth and scientific comprehension.'
    },
    alevel: {
      title: 'Cambridge AS & A-Level Results (SST Nexus Sixth Form)',
      subtitle: 'Golden gateway to the world’s most selective universities',
      stats: [
        { label: 'A* - A Grade Rate', value: '82%' },
        { label: 'A* - B Grade Rate', value: '98%' },
        { label: '3+ A-Level Passes', value: '100%' },
        { label: 'Top in World Awards', value: '6 Awards' }
      ],
      description: 'A-Level graduates at SST Nexus achieve stellar distinction profiles, unlocking unconditional offers and high-value scholarships at elite universities in Pakistan, the UK, the United States, and Canada.'
    },
    sindhboard: {
      title: 'Sindh BISE Board & Provincial High Achievers',
      subtitle: 'Provincial distinction in Intermediate Pre-Medical & Pre-Engineering',
      stats: [
        { label: 'A-1 Grade Achievement', value: '89%' },
        { label: 'Board Top 10 Positions', value: '8 Positions' },
        { label: 'First Division Rate', value: '100%' },
        { label: 'Sindh Talent Scholarships', value: 'PKR 18M+' }
      ],
      description: 'Our dual-track curriculum equips students aiming for provincial board examinations with comprehensive conceptual mastery in Physics, Chemistry, Biology, Mathematics, Urdu, and Sindhi.'
    },
    entrance: {
      title: 'National & Global University Entrance (MDCAT / ECAT / SAT / IBA)',
      subtitle: 'Proven admissions success across Pakistan’s top professional colleges',
      stats: [
        { label: 'AKU & Dow Medical Entry', value: '94% Success' },
        { label: 'LUMS & IBA Admissions', value: '96% Placement' },
        { label: 'NUST & GIKI Engineering', value: '92% Acceptance' },
        { label: 'Average SAT Score', value: '1480 / 1600' }
      ],
      description: 'Tailored preparatory clinics empower students to dominate competitive medical, engineering, business, and SAT reasoning examinations without needing external tuition academies.'
    }
  }

  const cambridgeAwards = [
    {
      type: 'Top in the World',
      subject: 'Mathematics & Computer Science',
      student: 'SST Senior Cohort',
      session: 'June 2024 / Nov 2024',
      detail: 'Secured the highest standard score worldwide in CAIE A-Level Further Mathematics and Computer Science.'
    },
    {
      type: 'Top in Pakistan',
      subject: 'Physics, Chemistry & English Literature',
      student: 'SST Scholar Fellows',
      session: 'June 2024 Series',
      detail: 'Ranked #1 across all Cambridge schools in Pakistan for exceptional analytical problem-solving and literary critique.'
    },
    {
      type: 'Top in Sindh',
      subject: 'Biology, Economics & Urdu Language',
      student: 'SST High Achievers',
      session: 'Nov 2024 Series',
      detail: 'Highest aggregate marks in Sindh province, demonstrating our robust trilingual mastery and academic depth.'
    },
    {
      type: 'High Achievement Award',
      subject: 'Environmental Management & Robotics',
      student: 'SST STEM Pioneers',
      session: 'June 2024 Series',
      detail: 'Recognized for pioneering experimental design and environmental innovation across South Asia.'
    }
  ]

  const faqs = [
    {
      q: 'How does SST balance British academic rigor with Sindh cultural heritage?',
      a: 'We deliver the complete Cambridge International curriculum in English while seamlessly embedding high-level Urdu and Sindhi language, regional literature, and provincial board examination options, giving students both global competitiveness and rooted local identity.'
    },
    {
      q: 'Who is eligible for the SST Awards for Academic Excellence (50% Scholarship)?',
      a: 'Students entering Year 11 (Grade 10) and Year 12 (A-Levels / Intermediate) who demonstrate outstanding academic performance in internal mocks or Cambridge IGCSE examinations are awarded a 50% tuition reduction scholarship for the academic year.'
    },
    {
      q: 'What academic support is provided to students who need extra help?',
      a: 'We provide structured peer tutoring, 1-on-1 faculty clinics, daily pastoral reviews, and AI-powered diagnostic homework tracking to identify learning gaps early and provide immediate personalized support.'
    },
    {
      q: 'Are students prepared for both local and foreign university admissions?',
      a: 'Yes. Our specialized university guidance department prepares students concurrently for local university entrance tests (MDCAT, ECAT, IBA, LUMS) and international platforms (SAT, ACT, UCAS, Common App).'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* 1. Header Navigation */}
      <LandingHeader session={null} />

      {/* 2. Hero Section */}
            {/* HERO BANNER */}
      <section className="relative overflow-hidden bg-[#002E40] text-white pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 lg:pb-20">
        <HeroVideoBackground
          imageUrl="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=85&w=2400&auto=format&fit=crop"
          posterUrl="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=85&w=2400&auto=format&fit=crop"
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Trilingual Pill Header */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-cyan-200 text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
                  Sindh School of Technology
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8D1B2D]/80 border border-[#8D1B2D] text-white text-xs font-bold tracking-wide">
                  <Languages className="h-3.5 w-3.5" />
                  Trilingual: English • اردو • سنڌي
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-200 text-xs font-medium">
                  Academic Distinction & Honors
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
                Academic Excellence & <span className="text-cyan-300">Character</span>
                <span className="block text-2xl sm:text-3xl font-semibold text-slate-300 mt-2">
                  علمي ڪمال، اعليٰ نتيجا ۽ فڪري بصيرت
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
                Educating great minds and compassionate human beings. Our dual-curriculum model empowers students with Cambridge CAIE O/A Levels and Sindh Board Matric/Intermediate diplomas, achieving 100% distinction pass rates and regional top positions.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Button 
                  size="lg"
                  className="bg-[#8D1B2D] hover:bg-[#741322] text-white font-semibold text-sm px-6 h-12 shadow-lg transition-transform hover:scale-[1.02]"
                  asChild
                >
                  <a href="/home#enquiry-form">Enquire for Admissions</a>
                </Button>

                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => setIsVideoOpen(true)}
                  className="border-white/30 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm px-6 h-12 backdrop-blur-sm gap-2"
                >
                  <Play className="h-4 w-4 fill-white text-white" />
                  Watch Campus Video (2 min)
                </Button>
              </div>

              {/* Distinction Quick Stats */}
              <div className="grid grid-cols-4 gap-3 pt-6 border-t border-white/15">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">100%</div>
                  <div className="text-[11px] text-slate-300 font-medium">Pass Rate (CAIE)</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">92%</div>
                  <div className="text-[11px] text-slate-300 font-medium">A* & A Grades</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">50%</div>
                  <div className="text-[11px] text-slate-300 font-medium">Merit Scholarships</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">#1</div>
                  <div className="text-[11px] text-slate-300 font-medium">In Sindh STEM</div>
                </div>
              </div>
            </div>

            {/* Right Campus Tech Stream Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl p-6 sm:p-8 bg-[#001724]/60 backdrop-blur-xl border border-cyan-500/30 shadow-2xl space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Live Academic Rigor Stream</span>
                  </div>
                  <Badge className="bg-[#8D1B2D] text-white text-[11px] font-semibold border-none">
                    Academic Dean
                  </Badge>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Supercomputing STEM & Examination Distinctions
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Real-time masterclasses in Mathematics, Chemistry, Physics, and Advanced Computer Science led by senior academic faculty.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-cyan-300 font-semibold">Cambridge Distinctions</div>
                    <div className="text-lg font-black text-white">Top in Pakistan</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-emerald-300 font-semibold">Sindh Board Top Ranks</div>
                    <div className="text-lg font-black text-white">1st Positions</div>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    onClick={() => setIsVideoOpen(true)}
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold text-xs h-11 rounded-xl shadow-lg flex items-center justify-center gap-2"
                  >
                    <Play className="h-4 w-4 fill-white" />
                    Open Full HD Interactive Video Tour
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Section: Educational Project */}
      <section id="educational-project" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <Badge className="bg-[#002E40] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md">
                Pedagogical Framework
              </Badge>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002E40]">
                Our Educational Project: British Rigour, Pakistani Pride
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Our educational approach is determined by the British curriculum which allows students to discover, build, and develop their learning and life skills. Sindh School of Technology is recognised by both Cambridge Assessment International Education (CAIE) and the Sindh education authorities, where students obtain official dual certificates: <strong className="font-semibold text-slate-800">Cambridge IGCSE / A-Level</strong> and <strong className="font-semibold text-slate-800">Sindh Board Intermediate</strong> qualifications.
              </p>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Special emphasis is placed on the student’s self-organisation by encouraging <strong className="font-semibold text-[#8D1B2D]">critical thinking, personal effort, teamwork, and strong study habits</strong> as a means of all-round personal development.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-xs text-[#002E40]">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Inquiry-Based Learning</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">Students engage in experimental science, live debates, computational thinking, and research.</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-xs text-[#002E40]">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Trilingual Competence</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">Full academic mastery of English, Urdu, and Sindhi across all educational stages.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop"
                  alt="Academic Excellence at SST"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-[#002E40] text-white p-5 rounded-2xl shadow-xl max-w-xs border border-white/20 hidden sm:block">
                <div className="text-xl font-black text-amber-300">Dual Certification</div>
                <div className="text-[11px] font-medium text-slate-200">Cambridge IGCSE / A-Levels + Sindh BISE Inter</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Section: Core Character Values */}
      <section id="core-values" className="py-16 sm:py-20 bg-slate-100 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <Badge className="bg-[#8D1B2D] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md">
              Character Development Programme
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002E40]">
              Our Core Institutional Values
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Following our character development programme, we believe it is vital to transmit core values that guide our students throughout their academic and personal lives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, idx) => {
              const Icon = val.icon
              return (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="h-12 w-12 rounded-xl bg-[#002E40] text-white flex items-center justify-center shadow-xs">
                      <Icon className="h-6 w-6 text-cyan-300" />
                    </div>
                    <h3 className="text-base font-bold text-[#002E40]">{val.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">{val.desc}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-1 text-[11px] font-semibold text-[#8D1B2D]">
                    <Star className="h-3.5 w-3.5 fill-[#8D1B2D]" />
                    <span>Lived Daily in the Classroom</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 5. Section: Academic Results */}
      <section id="academic-results" className="py-16 sm:py-20 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <Badge className="bg-[#002E40] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md">
              Official Examination Performance
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002E40]">
              Exceptional Academic Results
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Through a combination of hard work from the students as well as the guidance and support of their teachers, our pupils managed to reach their goals in the IGCSE and AS/A-Level official examinations as well as provincial Sindh Board and University Entrance assessments.
            </p>

            {/* Results Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              <button
                onClick={() => setActiveResultTab('igcse')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeResultTab === 'igcse'
                    ? 'bg-[#8D1B2D] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Cambridge IGCSE
              </button>
              <button
                onClick={() => setActiveResultTab('alevel')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeResultTab === 'alevel'
                    ? 'bg-[#8D1B2D] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Cambridge AS & A-Level
              </button>
              <button
                onClick={() => setActiveResultTab('sindhboard')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeResultTab === 'sindhboard'
                    ? 'bg-[#8D1B2D] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Sindh Board (BISE)
              </button>
              <button
                onClick={() => setActiveResultTab('entrance')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeResultTab === 'entrance'
                    ? 'bg-[#8D1B2D] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                University Entrance (MDCAT/ECAT/SAT)
              </button>
            </div>
          </div>

          {/* Active Result Card Display */}
          <div className="bg-slate-50 rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-8 animate-in fade-in duration-300">
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#002E40]">
                {examResults[activeResultTab].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                {examResults[activeResultTab].subtitle}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {examResults[activeResultTab].stats.map((st, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1 text-center">
                  <div className="text-2xl sm:text-3xl font-black text-[#8D1B2D]">{st.value}</div>
                  <div className="text-[11px] text-slate-600 font-semibold">{st.label}</div>
                </div>
              ))}
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal bg-white p-5 rounded-2xl border border-slate-200">
              {examResults[activeResultTab].description}
            </p>
          </div>

          {/* Quote Card from Dean Usman */}
          <div className="bg-[#002E40] text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-center gap-8">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-4 border-white/20 flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/usman.jpg" alt="Muhammad Usman" className="w-full h-full object-cover object-top" />
            </div>
            <div className="space-y-2 text-slate-200">
              <Quote className="h-6 w-6 text-amber-300 opacity-80" />
              <p className="text-sm sm:text-base font-medium italic leading-relaxed text-white">
                "We are very proud to see our students grow and become more and more mature every year. Thinking that our work has contributed to their personal growth fills us with satisfaction and a sense of responsibility."
              </p>
              <div>
                <div className="text-xs font-bold text-amber-300">Muhammad Usman</div>
                <div className="text-[11px] text-slate-300">Head of School & Academic Dean | Sindh School of Technology</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Section: SST Awards for Academic Excellence */}
      <section id="academic-awards" className="py-16 sm:py-20 bg-slate-100 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <Badge className="bg-[#8D1B2D] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md">
                Merit Scholarships & Honors
              </Badge>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002E40]">
                SST Awards for Academic Excellence
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                From the beginning, we have prided ourselves in offering our students the best academic education. To achieve this, it’s essential we continue with the commitment and willingness of our pupils, acknowledging their effort and hard work by rewarding them with the <strong className="font-semibold text-slate-800">SST Awards for Academic Excellence</strong>.
              </p>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                These awards are aimed at Year 11 and Year 12 students, recognising their academic merits with a <strong className="font-semibold text-[#8D1B2D]">scholarship grant equivalent to a 50% reduction of the annual academic school fee</strong> for the next school year.
              </p>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#002E40]">
                  <Percent className="h-4 w-4 text-[#8D1B2D]" />
                  <span>50% Annual Tuition Fee Reduction</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Awarded annually to top-performing Year 11 & Year 12 scholars demonstrating exceptional Cambridge IGCSE, AS/A-Level, and provincial board distinctions.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md space-y-6">
                <h3 className="text-lg font-bold text-[#002E40] border-b border-slate-100 pb-3 flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-500" />
                  <span>Scholarship Award Criteria</span>
                </h3>

                <ul className="space-y-3 text-xs text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Minimum of 6 A* grades in Cambridge IGCSE internal mocks or official CAIE series.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Straight A grades across all chosen A-Level subjects in Year 11/12.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Exemplary character, pastoral record, and active contribution to school community life.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>Annual review maintaining distinction benchmarks throughout the scholarship period.</span>
                  </li>
                </ul>

                <div className="pt-2">
                  <Button className="w-full bg-[#002E40] hover:bg-[#002331] text-white text-xs font-bold" asChild>
                    <Link href="/home#enquiry-form">Apply for Academic Scholarship</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Section: Outstanding Cambridge Learner Awards */}
      <section id="cambridge-awards" className="py-16 sm:py-20 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <Badge className="bg-[#002E40] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md">
              Global Recognition
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002E40]">
              Outstanding Cambridge Learner Awards
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              SST is a school of academic excellence and every year our students are identified as the best performing learners, being granted with the <strong className="font-semibold text-slate-800">Outstanding Cambridge Learner Awards</strong> issued by Cambridge Assessment International Education.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              These awards recognise exceptional learner achievement in Cambridge examinations from all around the world and celebrate the success of high-performing students. SST students have gained the highest marks in different IGCSE and AS/A-Level subjects including <strong className="font-semibold text-[#8D1B2D]">Top in the World Award, High Achievement Award, Top in Pakistan Award, and Top in Sindh Award</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cambridgeAwards.map((awd, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <Badge className="bg-[#8D1B2D] text-white text-[10px] font-bold">{awd.type}</Badge>
                  <h3 className="text-base font-bold text-[#002E40]">{awd.subject}</h3>
                  <p className="text-[11px] font-semibold text-slate-500">{awd.session}</p>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{awd.detail}</p>
                </div>
                <div className="pt-2 border-t border-slate-200 text-[11px] font-bold text-[#002E40]">
                  Issued by Cambridge International (CAIE)
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Section: Next Steps */}
      <section id="next-steps" className="py-16 sm:py-20 bg-slate-100 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <Badge className="bg-[#8D1B2D] text-white text-xs font-bold uppercase tracking-wider">
              Continue Exploring
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002E40]">
              Next Steps
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Discover more about our institutional ethos, dual curriculum model, and how to begin your child's journey with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between group hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-xl bg-[#002E40] text-white flex items-center justify-center">
                  <Compass className="h-5 w-5 text-cyan-300" />
                </div>
                <h3 className="text-base font-bold text-[#002E40] group-hover:text-[#8D1B2D] transition-colors">
                  Mission & Values
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Learn about our "Learn to be Yourself" philosophy, trilingual fluency framework, and cultural heritage of Sindh.
                </p>
              </div>
              <Link href="/why-choose-us/mission-and-values" className="text-xs font-bold text-[#8D1B2D] flex items-center gap-1">
                <span>Read Mission & Values</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between group hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-xl bg-[#002E40] text-white flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-amber-300" />
                </div>
                <h3 className="text-base font-bold text-[#002E40] group-hover:text-[#8D1B2D] transition-colors">
                  British & Sindh Education
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Explore our dual-track academic stages: Early Years, Primary, Secondary, and SST Nexus Sixth Form.
                </p>
              </div>
              <Link href="/why-choose-us" className="text-xs font-bold text-[#8D1B2D] flex items-center gap-1">
                <span>Explore All Programmes</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between group hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-xl bg-[#002E40] text-white flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-emerald-300" />
                </div>
                <h3 className="text-base font-bold text-[#002E40] group-hover:text-[#8D1B2D] transition-colors">
                  Admissions Process
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Simple 3-step online enquiry, entrance assessments, campus tours, and registration guidelines for 2025–2026.
                </p>
              </div>
              <Link href="/home#enquiry-form" className="text-xs font-bold text-[#8D1B2D] flex items-center gap-1">
                <span>Start Admission Process</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQs */}
      <section className="py-16 bg-white border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2">
            <Badge className="bg-[#002E40] text-white text-xs font-bold uppercase tracking-wider">
              Excellence FAQs
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#002E40]">
              Academic Questions Answered
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between font-bold text-xs sm:text-sm text-[#002E40] hover:bg-slate-100 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="p-4 bg-white text-xs sm:text-sm text-slate-600 border-t border-slate-200 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Call to Action Banner */}
      <section className="bg-gradient-to-r from-[#002E40] to-[#8D1B2D] text-white py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <Badge className="bg-white/20 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md">
            Admissions Open for 2025–2026
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-black">
            Come and Discover Sindh School of Technology
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 max-w-2xl mx-auto font-light leading-relaxed">
            Experience our vibrant classrooms, modern science laboratories, and trilingual curriculum in Karachi and Hyderabad.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button size="lg" className="bg-white text-[#002E40] hover:bg-slate-100 font-bold px-8 shadow-xl" asChild>
              <Link href="/home#enquiry-form">Submit Admission Enquiry</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-slate-300 bg-white text-slate-800 hover:bg-slate-100 hover:text-slate-900 font-semibold shadow-xs" onClick={() => setIsVideoOpen(true)}>
              <Play className="h-4 w-4 mr-2 text-cyan-300 fill-cyan-300" />
              Watch Campus Tour
            </Button>
          </div>
        </div>
      </section>

      {/* 11. Footer */}
      <footer className="bg-[#1f242b] text-slate-300 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Sindh School of Technology" className="h-9 w-auto brightness-200" />
              <p className="text-xs text-slate-400 leading-relaxed">
                Sindh School of Technology — Providing premier trilingual education in English, Urdu, and Sindhi, fostering intellectual brilliance, digital technology leadership, and moral character.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">Our Campuses in Sindh</h4>
              <div className="space-y-2 text-xs text-slate-400">
                <p className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-[#8D1B2D] flex-shrink-0 mt-0.5" />
                  <span>Karachi Main Campus: Early Years, Primary & Secondary</span>
                </p>
                <p className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>SST Nexus Sixth Form: Clifton / Gulshan, Karachi</span>
                </p>
                <p className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Hyderabad Campus: Qasimabad / Auto Bhan, Sindh</span>
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">Quick Navigation</h4>
              <ul className="space-y-1.5 text-xs text-slate-400 font-medium">
                <li><Link href="/home" className="hover:text-white">Home</Link></li>
                <li><Link href="/academic-excellence" className="hover:text-white">Academic Excellence</Link></li>
                <li><Link href="/why-choose-us/mission-and-values" className="hover:text-white">Mission & Values</Link></li>
                <li><Link href="/why-choose-us/digital-learning-programme" className="hover:text-white">Digital Learning</Link></li>
                <li><Link href="/auth/signin" className="hover:text-white">Student Portal</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">Admissions Contact</h4>
              <div className="space-y-2 text-xs text-slate-400">
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-emerald-400" />
                  <span>+92 (021) 3588-9000</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-emerald-400" />
                  <span>WhatsApp: +92 300 1234567</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <span>admissions@sst.edu.pk</span>
                </p>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-700/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© 2026 Sindh School of Technology (SST). All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-slate-400">Privacy Policy</Link>
              <Link href="#" className="hover:text-slate-400">Terms of Service</Link>
              <Link href="#" className="hover:text-slate-400">Academic Regulations</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/20">
            <div className="flex items-center justify-between p-4 bg-slate-900 text-white">
              <div className="flex items-center gap-2">
                <Play className="h-4 w-4 text-cyan-300 fill-cyan-300" />
                <span className="text-xs sm:text-sm font-bold">Academic Excellence Tour — Sindh School of Technology</span>
              </div>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="h-8 w-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800"
                aria-label="Close video"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="relative w-full aspect-video">
              <iframe
                src="https://www.youtube.com/embed/V1H-D4bevEw?autoplay=1"
                title="Academic Excellence at Sindh School of Technology"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
