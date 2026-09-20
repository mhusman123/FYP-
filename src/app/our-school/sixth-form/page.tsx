'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LandingHeader } from '@/components/landing-header'
import { HeroVideoBackground } from '@/components/hero-video-background'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  School,
  GraduationCap,
  Sparkles,
  Award,
  Globe,
  Compass,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Quote,
  Star,
  BookOpen,
  Coffee,
  Building,
  Laptop,
  X,
  Play,
  Languages
} from 'lucide-react'

export default function SixthFormPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const nexusPillars = [
    {
      title: 'Cambridge A-Levels & Sindh Board Inter Dual Pathway',
      icon: GraduationCap,
      badge: 'Academic Rigour',
      desc: 'Complete mastery of CAIE A-Levels alongside provincial Intermediate qualifications ensuring 100% eligibility for medical, engineering, and global degree programs.'
    },
    {
      title: 'Bespoke 1-on-1 University Counseling',
      icon: Compass,
      badge: 'Higher Education',
      desc: 'Individualized guidance for AKU, LUMS, IBA, NUST, UCAS (Oxford/Cambridge), and Common App (USA/Canada) with multi-million rupee scholarship assistance.'
    },
    {
      title: 'Adult Learning Environment & Independence',
      icon: Coffee,
      badge: 'Nexus Lifestyle',
      desc: 'Exclusive campus privileges: modern student lounge, private study pods, Starbucks-style coffee bar, and tech incubator makerspaces.'
    },
    {
      title: '50% Academic Excellence Scholarship Grant',
      icon: Award,
      badge: 'Merit Honors',
      desc: 'Substantial fee reductions for high achievers scoring top grades in Cambridge IGCSE, AS-Levels, or provincial board matriculation examinations.'
    }
  ]

  const faqs = [
    {
      q: 'What subject combinations are available in SST Nexus Sixth Form?',
      a: 'We offer specialized pathways in Pre-Medical (Biology, Chemistry, Physics/Math), Pre-Engineering & AI (Math, Further Math, Physics, Computer Science), and Business/Humanities (Economics, Accounting, Business, Law, English Literature).'
    },
    {
      q: 'Do Sixth Form students receive test preparation for MDCAT, ECAT, and SAT?',
      a: 'Yes, weekly masterclasses and mock testing clinics for MDCAT, ECAT, SAT reasoning, and university entrance exams are fully integrated into the school timetable.'
    },
    {
      q: 'Can students apply for admission directly into Sixth Form from other schools?',
      a: 'Yes, we welcome high-achieving external students from across Karachi, Hyderabad, and Sindh based on Cambridge O-Level / Matriculation results and an interview.'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <LandingHeader session={null} />

      {/* Hero Banner */}
            {/* HERO BANNER */}
      <section className="relative overflow-hidden bg-[#002E40] text-white py-16 sm:py-24 lg:py-28">
        <HeroVideoBackground
          imageUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=85&w=2400&auto=format&fit=crop"
          posterUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=85&w=2400&auto=format&fit=crop"
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
                  Ages 16 – 18+ (Key Stage 5)
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
                SST Nexus Sixth Form: <span className="text-cyan-300">Ages 16 – 18+</span>
                <span className="block text-2xl sm:text-3xl font-semibold text-slate-300 mt-2">
                  ايس ايس ٽي نيڪسس: يونيورسٽي کان اڳ اعليٰ تعليم (اي ليول ۽ انٽر)
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
                An exclusive pre-university college campus dedicated to Cambridge A-Levels and Sindh Board Intermediate (FSc Pre-Engineering / Pre-Medical / Computer Science). Nurturing academic mastery, AI research, and leadership independence.
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
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">16 – 18+</div>
                  <div className="text-[11px] text-slate-300 font-medium">Ages Welcomed</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">95%+</div>
                  <div className="text-[11px] text-slate-300 font-medium">A* & A Grades</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">100%</div>
                  <div className="text-[11px] text-slate-300 font-medium">University Placement</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">50%</div>
                  <div className="text-[11px] text-slate-300 font-medium">Scholarships</div>
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
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Live Nexus Sixth Form Stream</span>
                  </div>
                  <Badge className="bg-[#8D1B2D] text-white text-[11px] font-semibold border-none">
                    Nexus Campus
                  </Badge>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Pre-University Seminars & AI Neural Research
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Nexus scholars working in private study suites, conducting research dissertations, and engaging in Ivy League & Top Pak university prep.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-cyan-300 font-semibold">Study Suites</div>
                    <div className="text-lg font-black text-white">Silent & Collaborative</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-emerald-300 font-semibold">University Offers</div>
                    <div className="text-lg font-black text-white">AKU, LUMS, FAST, UK</div>
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

      {/* 4 Nexus Pillars */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <Badge className="bg-[#002E40] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md">
              The Nexus Advantage
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002E40]">
              Why Choose SST Nexus Sixth Form?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              A bespoke pre-university environment bridging the gap between high school and elite higher education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {nexusPillars.map((p, idx) => {
              const Icon = p.icon
              return (
                <div key={idx} className="bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-2xl bg-white shadow-xs border border-slate-200 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-[#8D1B2D]" />
                    </div>
                    <Badge variant="outline" className="text-xs font-semibold">
                      {p.badge}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold text-[#002E40]">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {p.desc}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Quote */}
          <div className="bg-[#002E40] text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-center gap-8">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-4 border-white/20 flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/usman.jpg" alt="Muhammad Usman" className="w-full h-full object-cover object-top" />
            </div>
            <div className="space-y-2 text-slate-200">
              <Quote className="h-6 w-6 text-amber-300 opacity-80" />
              <p className="text-sm sm:text-base font-medium italic leading-relaxed text-white">
                "SST Nexus Sixth Form is where high potential transforms into world-class leadership. Our graduates leave ready to excel in the lecture halls of Oxford, Aga Khan University, LUMS, and MIT."
              </p>
              <div>
                <div className="text-xs font-bold text-amber-300">Muhammad Usman</div>
                <div className="text-[11px] text-slate-300">Head of School & Academic Dean | Sindh School of Technology</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-slate-100 border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2">
            <Badge className="bg-[#002E40] text-white text-xs font-bold uppercase tracking-wider">
              Sixth Form FAQs
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#002E40]">
              Frequently Asked Questions About SST Nexus
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
                  <div className="p-4 bg-slate-50 text-xs sm:text-sm text-slate-600 border-t border-slate-100 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-gradient-to-r from-[#002E40] to-[#8D1B2D] text-white py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-black">
            Unlock Your Pre-University Future at SST Nexus
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto">
            Book an appointment with our Senior Sixth Form Dean and explore our dedicated pre-university campus.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button size="lg" className="bg-white text-[#002E40] hover:bg-slate-100 font-bold px-7 shadow-lg" asChild>
              <Link href="/home#enquiry-form">Schedule Sixth Form Consultation</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-slate-300 bg-white text-slate-800 hover:bg-slate-100 hover:text-slate-900 font-semibold shadow-xs" asChild>
              <Link href="/our-school/facilities">Explore Campus Facilities</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1f242b] text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs">
          <div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-700 pb-6 gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Sindh School of Technology" className="h-8 w-auto brightness-200" />
            <div className="flex gap-6 text-slate-400">
              <Link href="/home" className="hover:text-white">Home</Link>
              <Link href="/our-school" className="hover:text-white">Our School</Link>
              <Link href="/our-school/facilities" className="hover:text-white">Facilities</Link>
              <Link href="/home#enquiry-form" className="hover:text-white">Admissions</Link>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between text-slate-500 gap-2">
            <p>© 2026 Sindh School of Technology. All rights reserved.</p>
            <p>Trilingual Education: English • اردو • سنڌي</p>
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