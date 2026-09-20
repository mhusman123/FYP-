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
  Heart,
  MessageCircle,
  Calendar,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Globe,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  Sparkles,
  School,
  Languages,
  X,
  Compass,
  Cpu
} from 'lucide-react'

export default function HomePage() {
  // Video Modal State
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  
  // News Filter Tab State
  const [activeNewsCategory, setActiveNewsCategory] = useState<'all' | 'school-life'>('all')

  // Multi-step Enquiry Form State
  const [formStep, setFormStep] = useState<1 | 2 | 3>(1)
  const [formData, setFormData] = useState({
    prefix: 'Mr.',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    childName: '',
    childDob: '',
    entryYear: '2025-2026',
    stage: 'Primary',
    campus: 'Karachi Main Campus',
    languagePref: 'Trilingual (English, Urdu, Sindhi)',
    contactPref: 'WhatsApp',
    message: ''
  })
  const [formSubmitted, setFormSubmitted] = useState(false)

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const newsItems = [
    {
      id: 1,
      date: '26/04/2025',
      category: 'school-life',
      title: 'Annual Trilingual Declamation Contest: Celebrating English, Urdu, and Sindhi Oratory',
      summary: 'Students across all academic stages demonstrated remarkable eloquence and literary mastery in our annual Trilingual Speech Championship, celebrating our rich cultural heritage and global vision.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 2,
      date: '26/04/2025',
      category: 'all',
      title: 'Sindh Education Excellence Award: SST Ranked #1 in Educational Technology & Innovation',
      summary: 'Sindh School of Technology has been officially honored with the prestigious Provincial Gold Standard for AI-assisted STEM pedagogy and comprehensive dual-curriculum outcomes.',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 3,
      date: '18/03/2025',
      category: 'all',
      title: 'Cambridge CAIE High Achievers & Sindh Board Top Positions',
      summary: 'Our graduating cohort achieved a 100% pass rate with distinction stars in Cambridge O/A Levels and Sindh Board Intermediate examinations, securing admissions to top tier universities.',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 4,
      date: '12/02/2025',
      category: 'school-life',
      title: 'Sindh Cultural Heritage & Science Exhibition at SST Nexus Campus',
      summary: 'Bridging cultural pride with modern science: Students presented traditional Sindhi crafts alongside AI robotics, renewable solar prototypes, and IoT agricultural systems.',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 5,
      date: '20/01/2025',
      category: 'school-life',
      title: 'Comprehensive Pastoral Care & Seamless Academic Transition for New Students',
      summary: 'Welcoming families from Karachi, Hyderabad, Sukkur, and across Pakistan with our dedicated language immersion advisors and student mentorship programs.',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 6,
      date: '05/11/2024',
      category: 'all',
      title: 'National Robotics & Coding Olympiad Champions',
      summary: 'SST Junior & Senior engineering teams claimed top podium honors at the All-Pakistan Inter-School Coding & Robotics Championship held at Expo Centre.',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop'
    }
  ]

  const filteredNews = activeNewsCategory === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === activeNewsCategory)

  const socialPosts = [
    {
      id: 1,
      caption: 'Sindhi Cultural Day celebrations with our Secondary pupils in traditional Ajrak & Topi! 🇵🇰',
      likes: 342,
      comments: 24,
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 2,
      caption: 'Our AI & Robotics lab in full action building smart tech for Sindh agriculture! 🤖✨',
      likes: 418,
      comments: 31,
      image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 3,
      caption: 'Trilingual Declamation finals: Inspiring speeches in English, Urdu, and Sindhi! 🎙️📚',
      likes: 289,
      comments: 18,
      image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 4,
      caption: 'First week of the new academic term completed with smiles, energy and learning! 🎒🌟',
      likes: 512,
      comments: 42,
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 5,
      caption: 'Science lab experiments with our young Primary innovators exploring chemistry! 🧪🔬',
      likes: 310,
      comments: 15,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 6,
      caption: 'SST Nexus Sixth Form scholars preparing for international university applications! 🏛️🎓',
      likes: 620,
      comments: 55,
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 7,
      caption: 'Sports gala matches and cricket tournament champions lifting the trophy! 🏆🏏',
      likes: 467,
      comments: 39,
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: 8,
      caption: 'Early Years storytelling session exploring rich Sindhi folklore and English phonics! 📖✨',
      likes: 375,
      comments: 21,
      image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=600&auto=format&fit=crop'
    }
  ]

  const faqs = [
    {
      question: 'What educational programmes does Sindh School of Technology offer in Sindh & Pakistan?',
      answer: 'Sindh School of Technology (SST) provides an integrated, world-class dual-track educational model from Early Years (ages 2–5), Primary (ages 5–11), and Secondary (ages 11–16) through to SST Nexus Sixth Form (ages 16–18+). Students can pursue Cambridge CAIE International qualifications (IGCSE & A-Levels) or Sindh BISE / Federal Board (FBISE) Matriculation and Intermediate (FSC Pre-Medical / Pre-Engineering / Computer Science), ensuring seamless admission to premier universities across Pakistan (AKU, IBA, FAST, LUMS, NED, NUST) and top universities worldwide.'
    },
    {
      question: 'How does the Trilingual Language System (English, Urdu, Sindhi) work?',
      answer: 'Our curriculum is built on a structured Trilingual Framework: (1) English is the primary medium of instruction for STEM, global literature, coding, and international examinations; (2) Urdu is nurtured as our national language for cohesive communication, national literature, and cultural unity; and (3) Sindhi is taught systematically to celebrate regional heritage, historical literature, civic leadership, and regional communication in Sindh.'
    },
    {
      question: 'What are the advantages of studying at Sindh School of Technology?',
      answer: 'Students benefit from a unique blend of international academic rigor, advanced AI-assisted learning tools (automated feedback, code autograding, Socratic defense), modern science and robotics laboratories, comprehensive sports facilities, and strong character development rooted in Pakistani and Sindhi ethical values.'
    },
    {
      question: 'How does SST support students transferring from different school systems across Sindh and Pakistan?',
      answer: 'We provide specialized bridge programs, diagnostic language leveling in English, Urdu, and Sindhi, peer-buddy integration, and individualized academic counseling to ensure every student quickly adapts, excels, and feels deeply at home in our family atmosphere.'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Header */}
      <LandingHeader session={null} />

      {/* 1. HERO BANNER: "Learn to Lead with Knowledge & Integrity" */}
      <section className="relative overflow-hidden bg-[#002E40] text-white pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 lg:pb-20">
        <HeroVideoBackground
          imageUrl="https://images.unsplash.com/photo-1562774053-701939374585?q=85&w=2400&auto=format&fit=crop"
          posterUrl="https://images.unsplash.com/photo-1562774053-701939374585?q=85&w=2400&auto=format&fit=crop"
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
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
                Learn to be <span className="text-cyan-300">Yourself</span>
                <span className="block text-2xl sm:text-3xl font-semibold text-slate-300 mt-2">
                  علم، اخلاق ۽ جدت جو مرڪز
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
                Sindh School of Technology (SST) is a prestigious private educational institution located in the heart of Sindh, Pakistan. 
                It features two state-of-the-art campuses designed to provide an outstanding education: one dedicated to Early Years, Primary and Secondary education, 
                and the other, known as <span className="font-semibold text-white">SST Nexus</span>, exclusively for Sixth Form (A-Level & Intermediate) students. 
                Welcoming students from across Sindh and all of Pakistan, from the ages of 2 to 18, we offer a comprehensive <strong className="text-white">trilingual education in English, Urdu, and Sindhi</strong>, delivering a modern, globally competitive, and culturally rooted learning experience.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Button 
                  size="lg"
                  className="bg-[#8D1B2D] hover:bg-[#741322] text-white font-semibold text-sm px-6 h-12 shadow-lg transition-transform hover:scale-[1.02]"
                  asChild
                >
                  <a href="#enquiry-form">Make an Enquiry</a>
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
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">2 – 18</div>
                  <div className="text-[11px] text-slate-300 font-medium">Ages Welcomed</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">3</div>
                  <div className="text-[11px] text-slate-300 font-medium">Languages (EN/UR/SD)</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">2</div>
                  <div className="text-[11px] text-slate-300 font-medium">Campuses in Sindh</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">100%</div>
                  <div className="text-[11px] text-slate-300 font-medium">Dual Board Passes</div>
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
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Live Campus & AI Lab Stream</span>
                  </div>
                  <Badge className="bg-[#8D1B2D] text-white text-[11px] font-semibold border-none">
                    SST Nexus
                  </Badge>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Smart AI Classrooms & Robotics Centers
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Watch our computer science students collaborate on autonomous robotics, AI autograding models, and full-stack software development in real time.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-cyan-300 font-semibold">1:1 Coding Device</div>
                    <div className="text-lg font-black text-white">Apple / Linux</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-emerald-300 font-semibold">STEM Placement</div>
                    <div className="text-lg font-black text-white">100% Rate</div>
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

      {/* 2. RECOGNISED BY LEADING EDUCATION RANKINGS IN SINDH & PAKISTAN */}
      <section className="py-16 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <Badge variant="outline" className="text-xs font-bold uppercase tracking-wider text-[#002E40] border-[#002E40]/30">
              Academic Accreditations & Honours
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Recognised by the Leading Education Rankings in Sindh & Pakistan
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              We believe that educational excellence is built day by day in the classroom and science laboratory. Sindh School of Technology has been featured in premier Pakistani and international education rankings, recognizing our trilingual approach, academic performance, technology integration, student support, and world-class campus facilities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center text-[#002E40] mb-4">
                <Trophy className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">#1 in Sindh EdTech</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ranked Top Technology & Dual-Curriculum School at the Sindh Education Excellence Awards.
              </p>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 mb-4">
                <Languages className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Trilingual Fluency Award</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Benchmark model for seamless fluency and literature mastery across English, Urdu, and Sindhi.
              </p>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Dual Board Certification</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                100% accredited for Cambridge CAIE (O/A Levels) and Sindh BISE / FBISE Matric and Intermediate diplomas.
              </p>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center text-purple-700 mb-4">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Top University Placements</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct pathway to AKU, IBA, FAST, LUMS, NED, NUST, and leading global universities worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LEARNING ENVIRONMENT & 2-MINUTE DISCOVERY VIDEO */}
      <section id="about" className="py-16 sm:py-20 bg-slate-100 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <Badge className="bg-[#002E40] text-white text-xs font-semibold px-3 py-1">
                Our Campus Environment
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-snug">
                We are very proud of the learning environment we provide our students
              </h2>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                A warm family atmosphere where modern technology, collaborative learning, and rich Sindhi hospitality make every student feel unique, understood, appreciated, and loved.
              </p>
              
              <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-amber-500">
                  <Star className="h-4 w-4 fill-amber-400" />
                  <Star className="h-4 w-4 fill-amber-400" />
                  <Star className="h-4 w-4 fill-amber-400" />
                  <Star className="h-4 w-4 fill-amber-400" />
                  <Star className="h-4 w-4 fill-amber-400" />
                  <span className="text-xs font-bold text-slate-800 ml-1">Parent Satisfaction Score (4.9 / 5.0)</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 italic">
                  &ldquo;A dynamic educational environment where children master modern technology and international languages while staying deeply proud of their Sindhi and Pakistani identity.&rdquo;
                </p>
              </div>
            </div>

            {/* Right Video Callout Card */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
                <div className="relative w-full aspect-video sm:h-96">
                  <iframe
                    src="https://www.youtube.com/embed/RST4OPVl3Gs"
                    title="Come and discover Sindh School of Technology"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
                
                {/* Duration & Campus Badge */}
                <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-t border-slate-800">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-[#8D1B2D] text-white font-semibold text-xs px-2.5 py-0.5 border-none">
                      Campus Life
                    </Badge>
                    <span className="text-xs text-slate-300 font-medium">SST Nexus & Karachi Campus</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsVideoOpen(true)}
                    className="text-xs border-white/20 text-white bg-white/10 hover:bg-white/20 h-8 gap-1.5"
                  >
                    <Play className="h-3.5 w-3.5 fill-cyan-300 text-cyan-300" />
                    Fullscreen Modal
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. EDUCATIONAL PILLARS: Trilingual System, Academic Excellence, Sindh Community */}
      <section id="features" className="py-16 sm:py-24 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <Badge variant="outline" className="text-xs font-bold uppercase tracking-wider text-[#002E40] border-[#002E40]/30">
              Our Core Educational Pillars
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              A Comprehensive Educational Model for Sindh & Pakistan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Trilingual Education System */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-7 flex flex-col justify-between hover:shadow-lg transition-all">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-[#002E40] text-white flex items-center justify-center shadow-sm">
                  <Languages className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  Trilingual Education System
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Based on a comprehensive trilingual model, our teaching provides complete mastery in <strong className="text-slate-800">English, Urdu, and Sindhi</strong>. 
                  English empowers students for international science and digital technology; Urdu strengthens national unity and classical literature; and Sindhi anchors our pupils in the rich heritage and civic leadership of Sindh. 
                  Students obtain official Cambridge and Sindh Board certificates, nurturing well-rounded global thinkers.
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-slate-200">
                <span className="text-xs font-semibold text-[#8D1B2D] inline-flex items-center gap-1">
                  English • اردو • سنڌي <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>

            {/* Card 2: Academic & Technological Excellence */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-7 flex flex-col justify-between hover:shadow-lg transition-all">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-[#8D1B2D] text-white flex items-center justify-center shadow-sm">
                  <Cpu className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  Academic & Tech Excellence
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  SST strives to offer an exceptional educational model combining rigorous Cambridge CAIE academics with state-of-the-art computer science and Socratic inquiry. 
                  Through dedicated teacher mentorship, students achieve outstanding marks in official examinations, securing admissions to top engineering, medical, and business universities across Pakistan and abroad.
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-slate-200">
                <span className="text-xs font-semibold text-[#8D1B2D] inline-flex items-center gap-1">
                  Premier University Placements <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>

            {/* Card 3: Sindh & Pakistani Community */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-7 flex flex-col justify-between hover:shadow-lg transition-all">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-[#002E40] text-white flex items-center justify-center shadow-sm">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  Vibrant SST Community
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Founded to transform education across Sindh, SST continues to innovate to meet the needs of a rapidly evolving digital world. 
                  Throughout this journey, our community ensures the family feeling, mutual respect, and cultural celebration of Sindh remain at the heart of our school life.
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-slate-200">
                <span className="text-xs font-semibold text-[#8D1B2D] inline-flex items-center gap-1">
                  Karachi & Hyderabad Campuses <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ACADEMIC LEADERSHIP SPOTLIGHT */}
      <section className="py-16 sm:py-20 bg-slate-900 text-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Leadership Photo */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-700 max-w-sm w-full bg-slate-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/usman.jpg"
                  alt="Muhammad Usman — Head of School & Academic Dean"
                  className="w-full h-96 object-cover object-top"
                />
                <div className="p-4 bg-slate-800 text-center">
                  <h3 className="text-lg font-bold text-white">Muhammad Usman</h3>
                  <p className="text-xs text-cyan-300 uppercase tracking-wider font-semibold">Head of School & Academic Dean</p>
                </div>
              </div>
            </div>

            {/* Leadership Biography & Quotes */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <Badge className="bg-[#8D1B2D] text-white text-xs font-semibold px-3 py-1">
                Academic Leadership
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Meet our Head of School
              </h2>
              <p className="text-base text-slate-300 leading-relaxed font-normal">
                Mr. Muhammad Usman is an experienced educational leader and technology innovator with deep expertise across Cambridge international curricula, national education boards, and educational technology reforms in Sindh. Having directed premier secondary colleges and innovation hubs in Sindh, he brings visionary leadership in fostering intellectual curiosity, technical mastery, and moral character.
              </p>

              {/* Leadership Quote Callout */}
              <div className="p-5 bg-white/5 rounded-xl border-l-4 border-cyan-400 space-y-2">
                <p className="text-sm sm:text-base text-cyan-100 italic leading-relaxed">
                  &ldquo;I strongly believe that for students to achieve their true potential they must be happy, engaged and secure in their learning environment. Our trilingual education in English, Urdu, and Sindhi ensures our youth lead both nationally and globally with knowledge, empathy, and integrity.&rdquo;
                </p>
                <p className="text-xs text-slate-400 font-semibold">— Muhammad Usman, Head of School & Academic Dean</p>
              </div>

              {/* Parent Survey Quote */}
              <div className="p-5 bg-white/5 rounded-xl border-l-4 border-[#8D1B2D] space-y-2">
                <p className="text-sm sm:text-base text-slate-200 italic leading-relaxed">
                  &ldquo;We love the family atmosphere at the school as well as the excellent academic standard, the trilingual fluency, and the individual care given to every student.&rdquo;
                </p>
                <p className="text-xs text-slate-400 font-semibold">– Year 1 parents, Voice of Parent Survey</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. OUR TEACHERS */}
      <section className="py-16 sm:py-20 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6 text-left">
              <Badge variant="outline" className="text-xs font-bold uppercase tracking-wider text-[#002E40] border-[#002E40]/30">
                Faculty & Mentors
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Our Teachers & Language Specialists
              </h2>
              <p className="text-base text-slate-600 leading-relaxed font-normal">
                SST relies on the essential contribution of highly qualified, passionate educators to make our educational vision a reality. Composed of certified subject experts and distinguished language scholars in English, Urdu, and Sindhi, our faculty invest their time and dedication to support student well-being, fostering analytical thinking and moral values throughout their journey.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-slate-50 border rounded-xl">
                  <div className="text-2xl font-bold text-[#002E40]">100%</div>
                  <div className="text-xs text-slate-600 font-medium">Certified Subject Specialists</div>
                </div>
                <div className="p-4 bg-slate-50 border rounded-xl">
                  <div className="text-2xl font-bold text-[#8D1B2D]">3 Languages</div>
                  <div className="text-xs text-slate-600 font-medium">English, Urdu & Sindhi Experts</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&auto=format&fit=crop"
                  alt="Teacher guiding students in class"
                  className="rounded-xl shadow-md h-52 w-full object-cover"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop"
                  alt="Science and robotics faculty"
                  className="rounded-xl shadow-md h-52 w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. REVIEWS: 4.9 / 5.0 Rating */}
      <section className="py-16 bg-slate-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <Badge variant="outline" className="text-xs font-bold uppercase tracking-wider text-[#002E40] border-[#002E40]/30">
              Community Reviews
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Parent & Student Reviews
            </h2>
            <div className="flex items-center justify-center gap-3 pt-2">
              <div className="text-4xl font-extrabold text-slate-900 tracking-tight">4.9<span className="text-xl text-slate-400 font-semibold">/5</span></div>
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-400" />
                ))}
              </div>
            </div>
            <p className="text-sm text-slate-600">
              We are proud of our school and delighted that families across Sindh and Pakistan share our vision! Please read some of our reviews below:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-3">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                &ldquo;The trilingual education in English, Urdu, and Sindhi is unmatched. My children speak and write fluently in all three languages while excelling in Cambridge mathematics.&rdquo;
              </p>
              <div className="pt-2 text-xs font-bold text-slate-900">— Karachi Campus Primary Parent</div>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-3">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                &ldquo;SST Nexus Sixth Form gave our son the exact preparation needed for admission into IBA and AKU. The faculty guidance is truly extraordinary.&rdquo;
              </p>
              <div className="pt-2 text-xs font-bold text-slate-900">— A-Level Graduate Parent, Hyderabad</div>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-xs space-y-3">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                &ldquo;Modern digital facilities combined with rich cultural values. The teachers are approachable and the coding curriculum gives children a real competitive edge.&rdquo;
              </p>
              <div className="pt-2 text-xs font-bold text-slate-900">— Secondary Parent, Sukkur/Karachi</div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FOLLOW SST ON SOCIAL MEDIA */}
      <section className="py-16 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div>
              <Badge variant="outline" className="text-xs font-bold uppercase tracking-wider text-[#8D1B2D] border-[#8D1B2D]/30 mb-2">
                Campus Highlights
              </Badge>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                Follow SST on Social Media
              </h2>
            </div>
            <Button
              className="bg-[#8D1B2D] hover:bg-[#741322] text-white font-semibold text-xs h-10 px-5 gap-2"
              asChild
            >
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <Globe className="h-4 w-4" />
                Follow on Social Media
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {socialPosts.map((post) => (
              <div key={post.id} className="group relative rounded-xl overflow-hidden border border-slate-200 shadow-xs bg-slate-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.image}
                  alt={post.caption}
                  className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-3 text-white">
                  <p className="text-xs font-medium line-clamp-2 mb-2 leading-snug">
                    {post.caption}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-slate-300">
                    <span className="flex items-center gap-1">
                      <Heart className="h-3.5 w-3.5 text-rose-400 fill-rose-400" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-3.5 w-3.5" />
                      {post.comments}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. SCHOOL NEWS */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div>
              <Badge variant="outline" className="text-xs font-bold uppercase tracking-wider text-[#002E40] border-[#002E40]/30 mb-2">
                Latest Announcements
              </Badge>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                School News & Updates
              </h2>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 bg-slate-200/70 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setActiveNewsCategory('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${activeNewsCategory === 'all' ? 'bg-[#002E40] text-white shadow-xs' : 'text-slate-700 hover:text-slate-900'}`}
              >
                All Categories
              </button>
              <button
                type="button"
                onClick={() => setActiveNewsCategory('school-life')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${activeNewsCategory === 'school-life' ? 'bg-[#002E40] text-white shadow-xs' : 'text-slate-700 hover:text-slate-900'}`}
              >
                School Life
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item) => (
              <Card key={item.id} className="overflow-hidden border-slate-200 hover:shadow-lg transition-all flex flex-col justify-between">
                <div>
                  <div className="relative h-48 w-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-[#002E40] text-white text-[10px] font-semibold flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {item.date}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-5 space-y-2">
                    <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 font-normal">
                      {item.summary}
                    </p>
                  </CardContent>
                </div>
                <div className="p-5 pt-0">
                  <span className="text-xs font-semibold text-[#8D1B2D] inline-flex items-center gap-1 hover:underline cursor-pointer">
                    Read Full News <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 10. CREATING A UNIQUE LEARNING EXPERIENCE (EDUCATIONAL STAGES) */}
      <section className="py-16 sm:py-24 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <Badge variant="outline" className="text-xs font-bold uppercase tracking-wider text-[#002E40] border-[#002E40]/30">
              Academic Stages
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Creating a unique learning experience
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Guiding students step-by-step with Trilingual mastery (English, Urdu, Sindhi) from foundational years through to university entrance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Stage 1: Early Years Foundation Stage */}
            <div className="group rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 hover:shadow-xl transition-all flex flex-col">
              <div className="relative h-44 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop"
                  alt="Early Years Foundation Stage"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-amber-600 text-white text-xs font-bold">
                    2 - 5 years old
                  </Badge>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">
                    Early Years Foundation Stage
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Play-based discovery, emotional security, and natural trilingual immersion in English, Urdu phonics, and Sindhi storytelling.
                  </p>
                </div>
                <span className="text-xs font-bold text-[#8D1B2D] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore Early Years <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>

            {/* Stage 2: Primary Education */}
            <div className="group rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 hover:shadow-xl transition-all flex flex-col">
              <div className="relative h-44 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&auto=format&fit=crop"
                  alt="Primary Education"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-blue-600 text-white text-xs font-bold">
                    5 - 11 years old
                  </Badge>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">
                    Primary Education
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Foundational STEM, creative writing in English, Urdu, and Sindhi, computational logic, and ethical character building.
                  </p>
                </div>
                <span className="text-xs font-bold text-[#8D1B2D] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore Primary <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>

            {/* Stage 3: Secondary Education */}
            <div className="group rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 hover:shadow-xl transition-all flex flex-col">
              <div className="relative h-44 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop"
                  alt="Secondary Education"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-emerald-600 text-white text-xs font-bold">
                    11 - 16 years old
                  </Badge>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">
                    Secondary Education
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Dual preparation for Cambridge IGCSE / O-Levels and Sindh Matriculation with science laboratory masterclasses.
                  </p>
                </div>
                <span className="text-xs font-bold text-[#8D1B2D] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore Secondary <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>

            {/* Stage 4: SST Nexus Sixth Form & College */}
            <div className="group rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 hover:shadow-xl transition-all flex flex-col">
              <div className="relative h-44 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop"
                  alt="SST Nexus Sixth Form"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-purple-600 text-white text-xs font-bold">
                    16 - 18+ years old
                  </Badge>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">
                    SST Nexus Sixth Form & College
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Pre-university campus offering Cambridge A-Levels & Intermediate FSC (Pre-Med/Pre-Engg) with bespoke university coaching.
                  </p>
                </div>
                <span className="text-xs font-bold text-[#8D1B2D] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore Sixth Form <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. INTERACTIVE MULTI-STEP ENQUIRY FORM: "How can we help you?" */}
      <section id="enquiry-form" className="py-16 sm:py-24 bg-gradient-to-br from-slate-900 via-[#002E40] to-slate-900 text-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-10">
            <Badge className="bg-[#8D1B2D] text-white text-xs font-semibold px-3 py-1">
              Admissions Desk — Sindh & Pakistan
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              How can we help you?
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Please complete the form below to enquire about admissions for the 2025–2026 academic year.
            </p>
          </div>

          {/* Form Progress Bar */}
          <div className="grid grid-cols-3 gap-2 mb-8 text-center text-xs font-bold">
            <div className={`p-2.5 rounded-lg border transition-all ${formStep >= 1 ? 'bg-white text-[#002E40] border-white shadow-md' : 'bg-white/10 text-slate-400 border-white/10'}`}>
              1. About you
            </div>
            <div className={`p-2.5 rounded-lg border transition-all ${formStep >= 2 ? 'bg-white text-[#002E40] border-white shadow-md' : 'bg-white/10 text-slate-400 border-white/10'}`}>
              2. About your child
            </div>
            <div className={`p-2.5 rounded-lg border transition-all ${formStep >= 3 ? 'bg-white text-[#002E40] border-white shadow-md' : 'bg-white/10 text-slate-400 border-white/10'}`}>
              3. Contact preferences
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-10 shadow-2xl">
            {formSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Admissions Enquiry Received!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you for contacting Sindh School of Technology. Our admissions counselor will reach out to you via WhatsApp / Phone call within 24 hours.
                </p>
                <Button
                  onClick={() => {
                    setFormSubmitted(false)
                    setFormStep(1)
                  }}
                  className="bg-[#002E40] hover:bg-[#002331] text-white font-semibold text-xs px-6 h-10"
                >
                  Submit Another Enquiry
                </Button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (formStep < 3) {
                    setFormStep((prev) => (prev + 1) as 2 | 3)
                  } else {
                    setFormSubmitted(true)
                  }
                }}
                className="space-y-6"
              >
                {/* STEP 1: About you */}
                {formStep === 1 && (
                  <div className="space-y-4">
                    <h4 className="text-base font-bold text-slate-900 border-b pb-2">Parent / Guardian Information</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Prefix*</label>
                        <select
                          value={formData.prefix}
                          onChange={(e) => setFormData({ ...formData, prefix: e.target.value })}
                          className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-[#002E40] bg-white"
                        >
                          <option>Mr.</option>
                          <option>Mrs.</option>
                          <option>Miss</option>
                          <option>Ms.</option>
                          <option>Dr.</option>
                          <option>Prof.</option>
                          <option>Engr.</option>
                        </select>
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Parent Full Name*</label>
                        <input
                          type="text"
                          required
                          placeholder="Parent / Guardian Name"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-[#002E40]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address*</label>
                        <input
                          type="email"
                          required
                          placeholder="name@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-[#002E40]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number (Pakistan +92)*</label>
                        <input
                          type="tel"
                          required
                          placeholder="+92 300 1234567"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-[#002E40]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: About your child */}
                {formStep === 2 && (
                  <div className="space-y-4">
                    <h4 className="text-base font-bold text-slate-900 border-b pb-2">Student Information & Campus Preference</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Child&apos;s Full Name*</label>
                        <input
                          type="text"
                          required
                          placeholder="Student Name"
                          value={formData.childName}
                          onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                          className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-[#002E40]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Campus in Sindh*</label>
                        <select
                          value={formData.campus}
                          onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
                          className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-[#002E40] bg-white"
                        >
                          <option>Karachi Main Campus</option>
                          <option>Hyderabad Campus</option>
                          <option>SST Nexus Sixth Form (Karachi)</option>
                          <option>Sukkur Regional Hub</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Date of Birth*</label>
                        <input
                          type="date"
                          required
                          value={formData.childDob}
                          onChange={(e) => setFormData({ ...formData, childDob: e.target.value })}
                          className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-[#002E40]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Year of Entry*</label>
                        <select
                          value={formData.entryYear}
                          onChange={(e) => setFormData({ ...formData, entryYear: e.target.value })}
                          className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-[#002E40] bg-white"
                        >
                          <option>Academic Session 2025–2026</option>
                          <option>Academic Session 2026–2027</option>
                          <option>Immediate Mid-Term Transfer</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Academic Stage*</label>
                        <select
                          value={formData.stage}
                          onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                          className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-[#002E40] bg-white"
                        >
                          <option>Early Years (2–5 yrs)</option>
                          <option>Primary (5–11 yrs)</option>
                          <option>Secondary (11–16 yrs)</option>
                          <option>Sixth Form / Intermediate (16–18 yrs)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: Contact preferences */}
                {formStep === 3 && (
                  <div className="space-y-4">
                    <h4 className="text-base font-bold text-slate-900 border-b pb-2">Language Preferences & Messages</h4>
                    
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Language System Track</label>
                      <div className="p-3 bg-slate-50 border rounded-lg text-xs text-slate-700 font-medium">
                        <span className="font-bold text-[#002E40]">Trilingual System:</span> English (Primary/STEM) + Urdu (National Language) + Sindhi (Regional Heritage)
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Contact Method*</label>
                      <div className="flex gap-4">
                        {['WhatsApp', 'Phone Call', 'Email'].map((method) => (
                          <label key={method} className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                            <input
                              type="radio"
                              name="contactPref"
                              checked={formData.contactPref === method}
                              onChange={() => setFormData({ ...formData, contactPref: method })}
                              className="text-[#002E40] focus:ring-[#002E40]"
                            />
                            {method}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Questions / Campus Tour Request</label>
                      <textarea
                        rows={3}
                        placeholder="Request a campus visit in Karachi / Hyderabad or ask any questions regarding admissions..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full p-3 border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-[#002E40]"
                      />
                    </div>
                  </div>
                )}

                {/* Form Buttons */}
                <div className="flex items-center justify-between pt-4 border-t">
                  {formStep > 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setFormStep((prev) => (prev - 1) as 1 | 2)}
                      className="text-xs font-semibold"
                    >
                      Back
                    </Button>
                  ) : (
                    <div />
                  )}

                  <Button
                    type="submit"
                    className="bg-[#8D1B2D] hover:bg-[#741322] text-white font-semibold text-xs px-6 h-10 shadow-sm"
                  >
                    {formStep === 3 ? 'Submit Admissions Enquiry' : 'Continue to Next Step'}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Next Steps Quick Links */}
          <div className="mt-8 text-center space-y-3">
            <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">Next Steps</p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold">
              <Link href="/home" className="text-cyan-300 hover:text-white underline">
                Mission & Values
              </Link>
              <span className="text-slate-500">•</span>
              <Link href="/home" className="text-cyan-300 hover:text-white underline">
                Trilingual Curriculum
              </Link>
              <span className="text-slate-500">•</span>
              <Link href="#enquiry-form" className="text-cyan-300 hover:text-white underline">
                Admissions Process
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 12. EXPLORE OUR FAQS ACCORDION */}
      <section className="py-16 sm:py-24 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <Badge variant="outline" className="text-xs font-bold uppercase tracking-wider text-[#002E40] border-[#002E40]/30">
              Frequently Asked Questions
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Explore our FAQs
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-500 transition-transform duration-200 ${openFaq === idx ? 'rotate-180 text-[#8D1B2D]' : ''}`}
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
        </div>
      </section>

      {/* 13. FULL FOOTER */}
      <footer className="bg-[#1f242b] text-slate-300 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1: School Identity */}
            <div className="space-y-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Sindh School of Technology"
                className="h-9 w-auto brightness-200"
              />
              <p className="text-xs text-slate-400 leading-relaxed">
                Sindh School of Technology — Providing premier trilingual education in English, Urdu, and Sindhi, fostering intellectual brilliance, digital technology leadership, and moral character.
              </p>
            </div>

            {/* Column 2: Campuses & Locations in Sindh */}
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

            {/* Column 3: Fast Navigation */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">Quick Links</h4>
              <ul className="space-y-1.5 text-xs text-slate-400 font-medium">
                <li><Link href="/" className="hover:text-white">Platform Portal</Link></li>
                <li><Link href="/our-school" className="hover:text-white">About SST Overview</Link></li>
                <li><Link href="/our-school/facilities" className="hover:text-white">Campus Facilities & Features</Link></li>
                <li><Link href="#enquiry-form" className="hover:text-white">Admissions & Fees</Link></li>
                <li><Link href="/auth/signin" className="hover:text-white">Student & Educator Portal</Link></li>
              </ul>
            </div>

            {/* Column 4: Contact & Admissions */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">Admissions Hotline (Pakistan)</h4>
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
                <div className="pt-2">
                  <Badge className="bg-white/10 text-slate-200 border-none text-[10px]">
                    Accredited by Cambridge CAIE & Sindh BISE
                  </Badge>
                </div>
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

      {/* Interactive Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/20">
            <div className="flex items-center justify-between p-4 bg-slate-900 text-white">
              <div className="flex items-center gap-2">
                <Play className="h-4 w-4 text-cyan-300 fill-cyan-300" />
                <span className="text-xs sm:text-sm font-bold">Sindh School of Technology — Campus Tour</span>
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
                src="https://www.youtube.com/embed/RST4OPVl3Gs?autoplay=1&rel=0"
                title="Come and discover Sindh School of Technology"
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
