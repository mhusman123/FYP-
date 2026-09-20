'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LandingHeader } from '@/components/landing-header'
import { HeroVideoBackground } from '@/components/hero-video-background'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  BookOpen,
  GraduationCap,
  Sparkles,
  Award,
  Layers,
  Languages,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Globe,
  Compass,
  Users,
  Star,
  Quote,
  Play,
  X,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  FlaskConical,
  Laptop
} from 'lucide-react'

export default function SindhEducationPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [activeStageFilter, setActiveStageFilter] = useState<'all' | 'eyfs' | 'primary' | 'secondary' | 'sixth-form'>('all')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const curriculumComparison = [
    {
      cycle: 'Early Years Foundation Stage (EYFS)',
      age: '2 – 3',
      british: 'Pre-Nursery',
      sindh: 'Playgroup (ابتدائي سکيا)',
      stage: 'eyfs',
      focus: 'Sensory play, early phonics, trilingual nursery songs (English, Urdu, Sindhi), motor coordination.'
    },
    {
      cycle: 'Early Years Foundation Stage (EYFS)',
      age: '3 – 4',
      british: 'Nursery',
      sindh: 'Nursery / KG-1 (ڪي جي - 1)',
      stage: 'eyfs',
      focus: 'Foundational numeracy, bilingual literacy, social interaction, outdoor exploration.'
    },
    {
      cycle: 'Early Years Foundation Stage (EYFS)',
      age: '4 – 5',
      british: 'Reception',
      sindh: 'Prep / KG-2 (ڪي جي - 2)',
      stage: 'eyfs',
      focus: 'Structured reading, introductory STEM play, writing skills in English, Urdu, and Sindhi scripts.'
    },
    {
      cycle: 'Primary Education Key Stage 1',
      age: '5 – 6',
      british: 'Year 1',
      sindh: 'Class 1 / Primary 1 (پهريون درجو)',
      stage: 'primary',
      focus: 'Cambridge Primary English & Math, Sindhi literature foundations, interactive science experiments.'
    },
    {
      cycle: 'Primary Education Key Stage 1',
      age: '6 – 7',
      british: 'Year 2',
      sindh: 'Class 2 / Primary 2 (ٻيون درجو)',
      stage: 'primary',
      focus: 'Independent reading, computational thinking, social sciences, cultural heritage of Sindh.'
    },
    {
      cycle: 'Primary Education Key Stage 2',
      age: '7 – 8',
      british: 'Year 3',
      sindh: 'Class 3 / Primary 3 (ٽيون درجو)',
      stage: 'primary',
      focus: 'Junior STEM robotics, trilingual declamation skills, environmental studies, geometry.'
    },
    {
      cycle: 'Primary Education Key Stage 2',
      age: '8 – 9',
      british: 'Year 4',
      sindh: 'Class 4 / Primary 4 (چوٿون درجو)',
      stage: 'primary',
      focus: 'Historical inquiry, scientific investigation, advanced grammar (English/Urdu/Sindhi), sports leagues.'
    },
    {
      cycle: 'Primary Education Key Stage 2',
      age: '9 – 10',
      british: 'Year 5',
      sindh: 'Class 5 / Primary 5 (پنجون درجو)',
      stage: 'primary',
      focus: 'Introduction of Second Foreign Language (French / Arabic / German), advanced STEM makerspace labs.'
    },
    {
      cycle: 'Primary Education Key Stage 2',
      age: '10 – 11',
      british: 'Year 6',
      sindh: 'Class 6 / Primary 6 (ڇهون درجو)',
      stage: 'primary',
      focus: 'Cambridge Primary Checkpoint examinations, scientific hypothesis testing, leadership duties.'
    },
    {
      cycle: 'Secondary Education Key Stage 3',
      age: '11 – 12',
      british: 'Year 7',
      sindh: 'Class 7 / Middle 1 (ستون درجو)',
      stage: 'secondary',
      focus: 'Specialized subject laboratories (Physics, Chem, Bio), Python coding, Optional Chinese/German electives.'
    },
    {
      cycle: 'Secondary Education Key Stage 3',
      age: '12 – 13',
      british: 'Year 8',
      sindh: 'Class 8 / Middle 2 (اٺون درجو)',
      stage: 'secondary',
      focus: 'Cambridge Lower Secondary Checkpoint, trilingual debating tournaments, Model UN preparation.'
    },
    {
      cycle: 'Secondary Education Key Stage 3',
      age: '13 – 14',
      british: 'Year 9',
      sindh: 'Class 9 / Pre-O Levels (نائون درجو)',
      stage: 'secondary',
      focus: 'IGCSE subject selection diagnostics, career profiling, psychometric aptitude mapping.'
    },
    {
      cycle: 'Secondary Education Key Stage 4',
      age: '14 – 15',
      british: 'Year 10',
      sindh: 'Class 10 / O1 / Matric Part 1',
      stage: 'secondary',
      focus: 'Intensive Cambridge IGCSE & Sindh Board curriculum, experimental sciences, computer science.'
    },
    {
      cycle: 'Secondary Education Key Stage 4',
      age: '15 – 16',
      british: 'Year 11',
      sindh: 'Class 11 / O2 / Matric Part 2',
      stage: 'secondary',
      focus: 'Official CAIE IGCSE Examinations & Sindh Board Matriculation, SST Excellence Award scholarship qualification.'
    },
    {
      cycle: 'Sixth Form Key Stage 5 (SST Nexus)',
      age: '16 – 17',
      british: 'Year 12',
      sindh: 'A1 / Inter Part 1 / FSc Pre-Med/Pre-Eng',
      stage: 'sixth-form',
      focus: 'Advanced Cambridge AS-Levels, SAT/MDCAT/ECAT masterclasses, university personal statements, leadership.'
    },
    {
      cycle: 'Sixth Form Key Stage 5 (SST Nexus)',
      age: '17 – 18',
      british: 'Year 13',
      sindh: 'A2 / Inter Part 2 / HSSC Final',
      stage: 'sixth-form',
      focus: 'Official Cambridge A-Level Examinations, Sindh Board Intermediate Diplomas, global university matriculation.'
    }
  ]

  const filteredComparison = activeStageFilter === 'all'
    ? curriculumComparison
    : curriculumComparison.filter(c => c.stage === activeStageFilter)

  const faqs = [
    {
      q: 'How does the British curriculum adapt to the education system in Sindh, Pakistan?',
      a: 'We adopt the internationally renowned British National Curriculum (Cambridge CAIE) for core sciences, mathematics, and computing, while integrating mandatory and advanced Sindh Provincial Board curricula in Sindhi, Urdu, Pakistan Studies, and Islamic Studies.'
    },
    {
      q: 'Can students transition smoothly between Sindh Board and Cambridge O/A-Levels?',
      a: 'Yes. Our dual-pathway academic structure allows seamless transitions. We conduct equivalency bridging courses so students entering from local matriculation boards adapt quickly to Cambridge inquiry methods.'
    },
    {
      q: 'What foreign language options are available beyond English, Urdu, and Sindhi?',
      a: 'In addition to our core trilingual framework (English, Urdu, Sindhi), students can study French, Arabic, German, or Mandarin Chinese starting in Key Stage 2 & 3, with optional certification at IGCSE and A-Levels.'
    },
    {
      q: 'Are SST qualifications recognized by the Higher Education Commission (HEC) and IBCC of Pakistan?',
      a: 'Yes. All Cambridge IGCSE and A-Level qualifications earned at SST are fully accredited by the Inter Board Coordination Commission (IBCC) and recognized by HEC and top medical/engineering universities across Pakistan.'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* 1. Universal Header */}
      <LandingHeader session={null} />

      {/* 2. Hero Section */}
            {/* HERO BANNER */}
      <section className="relative overflow-hidden bg-[#002E40] text-white py-16 sm:py-24 lg:py-28">
        <HeroVideoBackground
          imageUrl="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=85&w=2400&auto=format&fit=crop"
          posterUrl="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=85&w=2400&auto=format&fit=crop"
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
                  Academic System & Key Stages
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
                Sindh Education & <span className="text-cyan-300">British Model</span>
                <span className="block text-2xl sm:text-3xl font-semibold text-slate-300 mt-2">
                  سنڌ جي ثقافت ۽ برطانوي تعليمي معيار جو سنگم
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
                Harmonizing the analytical rigor of the British National Curriculum with the cultural depth and linguistic richness of Sindh, Pakistan. A seamless progression from Early Years to Sixth Form, certified for both national and international examinations.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Button 
                  size="lg"
                  className="bg-[#8D1B2D] hover:bg-[#741322] text-white font-semibold text-sm px-6 h-12 shadow-lg transition-transform hover:scale-[1.02]"
                  asChild
                >
                  <a href="/home#enquiry-form">Make an Enquiry</a>
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
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">14</div>
                  <div className="text-[11px] text-slate-300 font-medium">Key Stage Years</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">3</div>
                  <div className="text-[11px] text-slate-300 font-medium">Languages (EN/UR/SD)</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">2</div>
                  <div className="text-[11px] text-slate-300 font-medium">Official Diplomas</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">100%</div>
                  <div className="text-[11px] text-slate-300 font-medium">Accreditation</div>
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
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Live Dual Curriculum Stream</span>
                  </div>
                  <Badge className="bg-[#8D1B2D] text-white text-[11px] font-semibold border-none">
                    Academic Model
                  </Badge>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Interactive Science Laboratories & Trilingual Classes
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Explore our detailed equivalencies between British Key Stages and the Sindh School Education framework, ensuring seamless local & foreign university transition.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-cyan-300 font-semibold">Curriculum Dual Track</div>
                    <div className="text-lg font-black text-white">Cambridge & Sindh</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-emerald-300 font-semibold">STEM Integration</div>
                    <div className="text-lg font-black text-white">AI & Robotics</div>
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

      {/* 3. Section: Structure and Key Stages */}
      <section id="structure-key-stages" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <Badge className="bg-[#002E40] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md">
              Educational Progression
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002E40]">
              Structure and Key Stages
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              The table below shows the equivalencies between the British and Sindh/Pakistani education systems. It will help you understand the organisation and terminology used regarding the British education system compared to the local Pakistani curriculum.
            </p>
          </div>

          {/* Stage Filter Buttons */}
          <div id="equivalencies-table" className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setActiveStageFilter('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeStageFilter === 'all'
                  ? 'bg-[#8D1B2D] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Key Stages (Ages 2 to 18)
            </button>
            <button
              onClick={() => setActiveStageFilter('eyfs')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeStageFilter === 'eyfs'
                  ? 'bg-[#8D1B2D] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Early Years (EYFS)
            </button>
            <button
              onClick={() => setActiveStageFilter('primary')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeStageFilter === 'primary'
                  ? 'bg-[#8D1B2D] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Primary (KS1 & KS2)
            </button>
            <button
              onClick={() => setActiveStageFilter('secondary')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeStageFilter === 'secondary'
                  ? 'bg-[#8D1B2D] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Secondary (KS3 & KS4 / IGCSE)
            </button>
            <button
              onClick={() => setActiveStageFilter('sixth-form')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeStageFilter === 'sixth-form'
                  ? 'bg-[#8D1B2D] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Sixth Form (KS5 / A-Levels & Inter)
            </button>
          </div>

          {/* Equivalency Comparison Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#002E40] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4 sm:px-6">Academic Cycles (British Curriculum)</th>
                    <th className="py-3.5 px-3 sm:px-4 text-center">Age Group</th>
                    <th className="py-3.5 px-4 sm:px-6">British Curriculum Year</th>
                    <th className="py-3.5 px-4 sm:px-6">Sindh & Pakistani Equivalent</th>
                    <th className="py-3.5 px-4 sm:px-6 hidden md:table-cell">Key Focus & Pedagogical Outcomes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredComparison.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 sm:px-6 font-bold text-[#002E40]">
                        {row.cycle}
                      </td>
                      <td className="py-3 px-3 sm:px-4 text-center font-bold text-[#8D1B2D] whitespace-nowrap bg-slate-50/50">
                        {row.age} yrs
                      </td>
                      <td className="py-3 px-4 sm:px-6 font-semibold text-slate-800">
                        {row.british}
                      </td>
                      <td className="py-3 px-4 sm:px-6 font-medium text-emerald-800">
                        {row.sindh}
                      </td>
                      <td className="py-3 px-4 sm:px-6 text-xs text-slate-500 hidden md:table-cell leading-relaxed font-normal">
                        {row.focus}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Section: Hands-on Learning Approach and Specialisation */}
      <section id="hands-on-learning" className="py-16 sm:py-20 bg-slate-100 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <Badge className="bg-[#8D1B2D] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md">
                Active Discovery Pedagogy
              </Badge>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002E40]">
                Hands-on Learning Approach & Specialisation
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Practical work helps students engage in their learning experience as they actively participate in projects, experiments, group research, workshops, and other activities, allowing them to explore through first-hand observation.
              </p>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Pupils have the chance to deepen their understanding by practically applying the theory they’ve learnt. This sparks their curiosity and interest for learning, at the same time it promotes teamwork encouraging students to share ideas, collaborate with their classmates, and communicate their findings.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1.5 shadow-xs">
                  <div className="flex items-center gap-2 font-bold text-xs text-[#002E40]">
                    <FlaskConical className="h-4 w-4 text-[#8D1B2D]" />
                    <span>Scientific Labs</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">Dedicated Physics, Chemistry & Biology suites with digital sensors and microscopes.</p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1.5 shadow-xs">
                  <div className="flex items-center gap-2 font-bold text-xs text-[#002E40]">
                    <Laptop className="h-4 w-4 text-cyan-600" />
                    <span>STEM & Robotics Labs</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">Arduino, 3D printing, AI computer vision, and IoT agricultural prototypes.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop"
                  alt="Hands-on learning at SST"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Section: Foreign Language Studies (Trilingual Core + Electives) */}
      <section id="foreign-languages" className="py-16 sm:py-20 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <Badge className="bg-[#002E40] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md">
              Multilingual Linguistic Mastery
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002E40]">
              Trilingual Core & Foreign Language Studies
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              English is a core subject in the British curriculum, but our educational vision also places immense value on national, regional, and international foreign language proficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Core Trilingual Foundation */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-xl bg-[#002E40] text-white flex items-center justify-center">
                <Languages className="h-5 w-5 text-cyan-300" />
              </div>
              <h3 className="text-base font-bold text-[#002E40]">
                Core Trilingual Literacy
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every child achieves fluent reading, writing, and oratory skills in <strong className="text-slate-800">English, Urdu, and Sindhi</strong> from Early Years through graduation, celebrating both global commerce and local identity.
              </p>
            </div>

            {/* 2. Second Foreign Language in KS2 */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-xl bg-[#8D1B2D] text-white flex items-center justify-center">
                <Globe className="h-5 w-5 text-amber-300" />
              </div>
              <h3 className="text-base font-bold text-[#002E40]">
                Second Foreign Language (Year 5 & 6)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                In addition to English, Urdu, and Sindhi, our students start learning <strong className="text-slate-800">French or Arabic</strong> in the final stage of Primary Education (Year 5 and Year 6), continuing as a mandatory subject up to Year 11.
              </p>
            </div>

            {/* 3. German & Mandarin Chinese Electives */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-emerald-300" />
              </div>
              <h3 className="text-base font-bold text-[#002E40]">
                German & Mandarin Chinese Electives
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Students can also study <strong className="text-slate-800">German or Chinese</strong> if they wish to once they reach Year 7 (Key Stage 3). They can continue learning all these foreign languages as optional subjects once they reach Sixth Form.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Section: Assessment and Official Examinations */}
      <section id="examinations" className="py-16 sm:py-20 bg-slate-100 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <Badge className="bg-[#8D1B2D] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md">
                Formal Qualifications
              </Badge>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002E40]">
                Assessment and Official Examinations
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Students demonstrate the knowledge acquired over time by taking the <strong className="font-semibold text-slate-800">International General Certificate of Secondary Education (IGCSE)</strong> at the end of Key Stage 4 (Year 11).
              </p>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                They may also pursue the <strong className="font-semibold text-[#8D1B2D]">Cambridge AS/A-Level and Sindh Board (BISE) Intermediate examinations</strong> for university admission across Pakistan, the UK, the United States, and worldwide.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-slate-200 shadow-xs">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#002E40]">Cambridge IGCSE (Key Stage 4)</h4>
                    <p className="text-[11px] text-slate-600">Internationally benchmarked secondary certificates administered by Cambridge International.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-slate-200 shadow-xs">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#002E40]">Cambridge A-Levels & Sindh Board Inter (Sixth Form)</h4>
                    <p className="text-[11px] text-slate-600">Dual recognition ensuring unrestricted entry to medical, engineering, and global degree programs.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dean Quote Card */}
            <div className="lg:col-span-6 bg-[#002E40] text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col items-center text-center space-y-4">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-4 border-white/20 shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/usman.jpg" alt="Muhammad Usman" className="w-full h-full object-cover object-top" />
              </div>
              <Quote className="h-6 w-6 text-cyan-300 opacity-80" />
              <p className="text-xs sm:text-sm font-medium italic leading-relaxed text-slate-200">
                "Our British-Sindh academic model provides Pakistani students with the absolute best of both worlds: the analytical rigor of Cambridge, and the profound moral and cultural grounding of our province."
              </p>
              <div>
                <div className="text-xs font-bold text-cyan-300">Muhammad Usman</div>
                <div className="text-[10px] text-slate-300">Head of School & Academic Dean | Sindh School of Technology</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Section: Next Steps */}
      <section id="next-steps" className="py-16 sm:py-20 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <Badge className="bg-[#8D1B2D] text-white text-xs font-bold uppercase tracking-wider">
              Continue Exploring
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002E40]">
              Next Steps
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Discover our institutional mission, examine our official examination results, or register for admissions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between group hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-xl bg-[#002E40] text-white flex items-center justify-center">
                  <Compass className="h-5 w-5 text-cyan-300" />
                </div>
                <h3 className="text-base font-bold text-[#002E40] group-hover:text-[#8D1B2D] transition-colors">
                  Mission & Values
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Learn about our "Learn to be Yourself" philosophy, trilingual values, and cultural heritage.
                </p>
              </div>
              <Link href="/why-choose-us/mission-and-values" className="text-xs font-bold text-[#8D1B2D] flex items-center gap-1">
                <span>Read Mission & Values</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between group hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-xl bg-[#002E40] text-white flex items-center justify-center">
                  <Award className="h-5 w-5 text-amber-300" />
                </div>
                <h3 className="text-base font-bold text-[#002E40] group-hover:text-[#8D1B2D] transition-colors">
                  Academic Excellence
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Explore examination results, 50% merit scholarships, and Cambridge Learner Awards.
                </p>
              </div>
              <Link href="/academic-excellence" className="text-xs font-bold text-[#8D1B2D] flex items-center gap-1">
                <span>View Academic Results</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between group hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-xl bg-[#002E40] text-white flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-emerald-300" />
                </div>
                <h3 className="text-base font-bold text-[#002E40] group-hover:text-[#8D1B2D] transition-colors">
                  Admissions Process
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Start the 3-step online registration and book your personalized campus assessment.
                </p>
              </div>
              <Link href="/home#enquiry-form" className="text-xs font-bold text-[#8D1B2D] flex items-center gap-1">
                <span>Start Admissions</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQs */}
      <section className="py-16 bg-slate-100 border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2">
            <Badge className="bg-[#002E40] text-white text-xs font-bold uppercase tracking-wider">
              Curriculum FAQs
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#002E40]">
              Frequently Asked Questions About Our Academic Stages
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between font-bold text-xs sm:text-sm text-[#002E40] hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="p-4 bg-slate-50 text-xs sm:text-sm text-slate-600 border-t border-slate-200 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Call to Action */}
      <section className="bg-gradient-to-r from-[#002E40] to-[#8D1B2D] text-white py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <Badge className="bg-white/20 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md">
            Admissions Open for 2025–2026
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-black">
            Discover the Sindh School of Technology Curriculum
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 max-w-2xl mx-auto font-light leading-relaxed">
            Our admissions counselors are available to explain stage equivalencies, subject combinations, and trilingual language tracks for your child.
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

      {/* 10. Footer */}
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
                <li><Link href="/sindh-education" className="hover:text-white">Sindh Education</Link></li>
                <li><Link href="/academic-excellence" className="hover:text-white">Academic Excellence</Link></li>
                <li><Link href="/why-choose-us/mission-and-values" className="hover:text-white">Mission & Values</Link></li>
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
                <span className="text-xs sm:text-sm font-bold">Sindh & British Education System — Campus Tour</span>
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
                title="Sindh Education & British Model at SST"
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
