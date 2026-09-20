'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LandingHeader } from '@/components/landing-header'
import { HeroVideoBackground } from '@/components/hero-video-background'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Sparkles,
  Compass,
  Users,
  Heart,
  Cpu,
  GraduationCap,
  Music,
  Trophy,
  Sun,
  Globe,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Star,
  Award,
  ShieldCheck,
  Languages,
  X,
  Play
} from 'lucide-react'

export default function WhyChooseUsPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  const [activeTab, setActiveTab] = useState<'all' | 'academic' | 'student-life' | 'global'>('all')

  const pillars = [
    {
      title: 'Mission, Vision & Values',
      tagline: 'Learn to Be Yourself • Inspiring Generations',
      description: 'Grounded in the timeless wisdom of Sindh and modern global pedagogy, we nurture critical thinking, ethical integrity, and intellectual curiosity.',
      icon: Compass,
      href: '/why-choose-us/mission-and-values',
      badge: 'Core Identity',
      category: 'academic',
      color: 'from-blue-900 to-[#002E40]',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'SST Community',
      tagline: 'A Warm, Inclusive, Trilingual Family',
      description: 'A vibrant ecosystem bringing together students, passionate educators, supportive parents, and an active alumni network across Sindh and the globe.',
      icon: Users,
      href: '/why-choose-us/community',
      badge: 'Community & Care',
      category: 'student-life',
      color: 'from-[#002E40] to-cyan-900',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Wellbeing Programme',
      tagline: 'Holistic Care: Mind, Body & Spirit',
      description: 'Comprehensive pastoral care, mindfulness, emotional resilience coaching, and physical wellness built into the daily rhythm of school life.',
      icon: Heart,
      href: '/why-choose-us/wellbeing-programme',
      badge: 'Pastoral Excellence',
      category: 'student-life',
      color: 'from-rose-900 to-[#8D1B2D]',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Digital Learning Programme',
      tagline: '1:1 Smart Devices & AI-Powered Innovation',
      description: 'Next-generation tech education featuring 1:1 iPad/laptop learning, automated assignment assessment, robotics labs, and Sindhi/Urdu AI localization.',
      icon: Cpu,
      href: '/why-choose-us/digital-learning-programme',
      badge: 'Tech Leadership',
      category: 'academic',
      color: 'from-cyan-900 to-blue-900',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'University & Career Guidance',
      tagline: 'Pathways to Top Pakistani & Global Universities',
      description: 'Dedicated 1-on-1 counseling guiding students to AKU, LUMS, IBA, NUST, Oxford, Cambridge, and Ivy League universities with remarkable scholarship records.',
      icon: GraduationCap,
      href: '/why-choose-us/university-career-guidance-programme',
      badge: 'Higher Education',
      category: 'academic',
      color: 'from-amber-900 to-[#002E40]',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Music & Arts Programme',
      tagline: 'Eastern Classical, Sindhi Melody & Western Harmony',
      description: 'Cultivating artistic expression through traditional Sindhi folk instruments, Western orchestral masterclasses, vocal choirs, and ABRSM certifications.',
      icon: Music,
      href: '/why-choose-us/music-programme',
      badge: 'Creative Arts',
      category: 'student-life',
      color: 'from-purple-900 to-indigo-900',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Extra-Curricular Activities',
      tagline: '45+ Dynamic Clubs, Sports & Leadership Schemes',
      description: 'Debating societies in three languages, Model United Nations, competitive athletics, coding hackathons, and Duke of Edinburgh international awards.',
      icon: Trophy,
      href: '/why-choose-us/extra-curricular-activities',
      badge: 'Enrichment',
      category: 'student-life',
      color: 'from-emerald-900 to-teal-900',
      image: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Summer School & Bootcamps',
      tagline: 'Inspiration, STEM Labs & Sports in Summer',
      description: 'An exhilarating summer academy featuring AI coding, trilingual creative writing, competitive swimming, and pre-university exam preparation.',
      icon: Sun,
      href: '/why-choose-us/summer-school',
      badge: 'Summer Enrichment',
      category: 'global',
      color: 'from-orange-900 to-amber-900',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Our Global Cognita Family',
      tagline: '100+ International Schools Across 16 Nations',
      description: 'Connected with over 90,000 students globally (including British School of Valencia), offering student exchange programs and international best practices.',
      icon: Globe,
      href: '/why-choose-us/cognita-family',
      badge: 'Global Network',
      category: 'global',
      color: 'from-[#002E40] to-[#8D1B2D]',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop'
    }
  ]

  const filteredPillars = activeTab === 'all' 
    ? pillars 
    : pillars.filter(p => p.category === activeTab)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* 1. Universal Top Header & Navigation Plate */}
      <LandingHeader session={null} />

      {/* 2. Hero Section */}
            {/* HERO BANNER */}
      <section className="relative overflow-hidden bg-[#002E40] text-white py-16 sm:py-24 lg:py-28">
        <HeroVideoBackground
          imageUrl="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=85&w=2400&auto=format&fit=crop"
          posterUrl="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=85&w=2400&auto=format&fit=crop"
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
                  Why Choose SST Advantage
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
                Why Choose <span className="text-cyan-300">Sindh School of Technology?</span>
                <span className="block text-2xl sm:text-3xl font-semibold text-slate-300 mt-2">
                  مستقبل جي رهنمائي، اعليٰ تعليم ۽ فڪري شعور
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
                Sindh School of Technology (SST) redefines education in Sindh and Pakistan by uniting British academic excellence with the rich cultural heritage of Sindh. Delivering an integrated trilingual curriculum in English, Urdu, and Sindhi, we equip future leaders with artificial intelligence capabilities, ethical grounding, and a globally competitive mindset.
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
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">100%</div>
                  <div className="text-[11px] text-slate-300 font-medium">University Acceptance</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">1:1</div>
                  <div className="text-[11px] text-slate-300 font-medium">Smart Device Ratio</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">3</div>
                  <div className="text-[11px] text-slate-300 font-medium">Languages (EN/UR/SD)</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">45+</div>
                  <div className="text-[11px] text-slate-300 font-medium">Tech & STEM Clubs</div>
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
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Live Innovation & Leadership Stream</span>
                  </div>
                  <Badge className="bg-[#8D1B2D] text-white text-[11px] font-semibold border-none">
                    Why Choose Us
                  </Badge>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    AI-Powered Dual Curriculum & Global Standards
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Experience how our students develop critical thinking, robotics mastery, and trilingual fluency in modern classrooms across Karachi & Hyderabad campuses.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-cyan-300 font-semibold">Cambridge & Sindh Board</div>
                    <div className="text-lg font-black text-white">Dual Diploma</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-emerald-300 font-semibold">Tech Faculty Ratio</div>
                    <div className="text-lg font-black text-white">1:8 Mentorship</div>
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

      {/* 3. Leadership Welcome Message */}
      <section className="py-14 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-md flex flex-col md:flex-row items-center gap-8">
            <div className="relative flex-shrink-0">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-4 border-white shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/usman.jpg"
                  alt="Muhammad Usman - Head of School & Academic Dean"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <Badge className="absolute -bottom-2.5 -right-2.5 bg-[#8D1B2D] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md">
                Academic Dean
              </Badge>
            </div>

            <div className="space-y-3 text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8D1B2D]">
                <Star className="h-3.5 w-3.5 fill-[#8D1B2D]" />
                Dean's Welcome Message
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#002E40]">
                "Education is the greatest catalyst for human flourishing in Sindh and Pakistan."
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                At Sindh School of Technology, we provide an environment where every child feels known, valued, and challenged. Our students thrive because we balance rigorous academic standards with emotional wellbeing, trilingual fluency, cutting-edge AI technologies, and genuine community spirit.
              </p>
              <div className="pt-1">
                <div className="text-sm font-bold text-[#002E40]">Muhammad Usman</div>
                <div className="text-xs text-slate-500 font-medium">Head of School & Academic Dean | Sindh School of Technology</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The 9 Core Programmes Explorer */}
      <section className="py-16 sm:py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <Badge className="bg-[#002E40] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md">
              Core Pillars of Excellence
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002E40]">
              Explore Our Comprehensive Programmes
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Click into any of our 9 specialized areas to learn about curriculum depth, pastoral frameworks, modern facilities, and student opportunities.
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeTab === 'all'
                    ? 'bg-[#8D1B2D] text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-200'
                }`}
              >
                All 9 Programmes
              </button>
              <button
                onClick={() => setActiveTab('academic')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeTab === 'academic'
                    ? 'bg-[#8D1B2D] text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-200'
                }`}
              >
                Academic & Technology
              </button>
              <button
                onClick={() => setActiveTab('student-life')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeTab === 'student-life'
                    ? 'bg-[#8D1B2D] text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-200'
                }`}
              >
                Student Life & Wellbeing
              </button>
              <button
                onClick={() => setActiveTab('global')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeTab === 'global'
                    ? 'bg-[#8D1B2D] text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-200'
                }`}
              >
                Global & Enrichment
              </button>
            </div>
          </div>

          {/* Grid of 9 Program Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPillars.map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <Badge className="absolute top-3 left-3 bg-[#002E40]/90 backdrop-blur-md text-white border-white/20 text-[10px] font-bold">
                      {item.badge}
                    </Badge>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                          <Icon className="h-4 w-4 text-cyan-300" />
                        </div>
                        <span className="text-xs font-semibold text-white/90 truncate">{item.tagline}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-[#002E40] group-hover:text-[#8D1B2D] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        href={item.href}
                        className="text-xs font-bold text-[#002E40] hover:text-[#8D1B2D] flex items-center gap-1 group-hover:gap-2 transition-all"
                      >
                        <span>Learn more</span>
                        <ArrowRight className="h-3.5 w-3.5 text-[#8D1B2D]" />
                      </Link>
                      <span className="text-[10px] font-semibold text-slate-400">Programme Details</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 5. Trilingual Advantage Section */}
      <section className="py-16 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <Badge className="bg-[#8D1B2D] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md">
                The Trilingual Edge
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002E40]">
                English, Urdu & Sindhi: A Truly Trilingual Horizon
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Language opens doors to cultural empathy and cognitive agility. At SST, students achieve full academic fluency in English for global competitiveness, Urdu for national unity, and Sindhi for ancestral wisdom and regional pride.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="h-7 w-7 rounded-lg bg-[#002E40] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    EN
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#002E40]">English (Global Medium)</h4>
                    <p className="text-[11px] text-slate-600">Cambridge IGCSE / A-Levels international curriculum, scientific research, and global communication.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="h-7 w-7 rounded-lg bg-[#8D1B2D] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    UR
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#002E40]">Urdu (National Language - اردو)</h4>
                    <p className="text-[11px] text-slate-600">Rich prose, poetry, declamations, national heritage, and federal board certification standards.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="h-7 w-7 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    SD
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#002E40]">Sindhi (Provincial Heritage - سنڌي)</h4>
                    <p className="text-[11px] text-slate-600">Sufi literature, classical poetry of Shah Abdul Latif Bhittai, history, and provincial examinations.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1000&auto=format&fit=crop"
                  alt="Trilingual Education at SST"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-[#002E40] text-white p-5 rounded-2xl shadow-xl max-w-xs border border-white/20 hidden sm:block">
                <div className="text-2xl font-black text-amber-300">100%</div>
                <div className="text-xs font-medium text-slate-200">Bilingual & Trilingual Diploma Completion Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Call to Action */}
      <section className="bg-gradient-to-r from-[#002E40] to-[#8D1B2D] text-white py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <Badge className="bg-white/20 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md">
            Join Our Academic Community
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-black">
            Ready to Discover the SST Experience?
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 max-w-2xl mx-auto font-light leading-relaxed">
            Our admissions team is available to assist you with campus visits, scholarship inquiries, and student assessments across Karachi, Hyderabad, and throughout Sindh.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button size="lg" className="bg-white text-[#002E40] hover:bg-slate-100 font-bold px-8 shadow-xl" asChild>
              <Link href="/home#enquiry-form">Submit Admission Enquiry</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-slate-300 bg-white text-slate-800 hover:bg-slate-100 hover:text-slate-900 font-semibold shadow-xs" asChild>
              <Link href="/why-choose-us/mission-and-values">Read Mission & Values</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
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
                <li><Link href="/home" className="hover:text-white">Home Overview</Link></li>
                <li><Link href="/why-choose-us/mission-and-values" className="hover:text-white">Mission & Values</Link></li>
                <li><Link href="/why-choose-us/digital-learning-programme" className="hover:text-white">Digital Learning</Link></li>
                <li><Link href="/why-choose-us/cognita-family" className="hover:text-white">Cognita Global Family</Link></li>
                <li><Link href="/auth/signin" className="hover:text-white">Student & Educator Portal</Link></li>
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