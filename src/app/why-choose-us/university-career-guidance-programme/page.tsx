'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LandingHeader } from '@/components/landing-header'
import { HeroVideoBackground } from '@/components/hero-video-background'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  GraduationCap,
  Compass,
  Award,
  Globe,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Sparkles,
  TrendingUp,
  MapPin,
  Building,
  Star,
  Quote,
  X,
  Play,
  Languages
} from 'lucide-react'

export default function UniversityCareerGuidancePage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const guidanceRoadmap = [
    {
      grade: 'Grade 9 (Year 10)',
      focus: 'Self-Discovery & Subject Selection',
      desc: 'Psychometric career profiling, introductory aptitude assessments, and guidance on selecting Cambridge IGCSE / Matric subjects tailored to future university goals.'
    },
    {
      grade: 'Grade 10 (Year 11)',
      focus: 'Profile Building & Leadership',
      desc: 'Extracurricular leadership roles, community impact projects across Sindh, summer internships, and introductory SAT / test familiarity.'
    },
    {
      grade: 'Grade 11 (A1 / Inter Part 1)',
      focus: 'Standardized Tests & University Shortlisting',
      desc: 'Intensive SAT/MDCAT/ECAT workshops, personal statement draft reviews, university campus visits, and 1-on-1 counselor meetings.'
    },
    {
      grade: 'Grade 12 (A2 / Inter Part 2)',
      focus: 'Applications, Interviews & Scholarships',
      desc: 'UCAS, Common App, and Pakistani university portal submissions (AKU, LUMS, IBA, NUST), interview mock sessions, and financial aid optimization.'
    }
  ]

  const topDestinations = [
    { category: 'Top Pakistani Universities', list: 'Aga Khan University (AKU), LUMS, IBA Karachi, NUST Islamabad, GIKI, NED Karachi, Dow University of Health Sciences' },
    { category: 'United Kingdom & Europe', list: 'University of Oxford, Cambridge, Imperial College London, UCL, King’s College, University of Edinburgh' },
    { category: 'United States & Canada', list: 'Harvard, MIT, Columbia, UC Berkeley, University of Toronto, McGill, UBC' },
    { category: 'Middle East & Asia', list: 'NYU Abu Dhabi, NUS Singapore, HKU, KAIST South Korea, Texas A&M Qatar' }
  ]

  const faqs = [
    {
      q: 'When does personalized university counseling start for students?',
      a: 'Formal group guidance begins in Grade 8/9 with subject choice workshops, and individualized 1-on-1 counseling is guaranteed from Grade 10 through graduation.'
    },
    {
      q: 'Do you prepare students for both Pakistani entrance exams (MDCAT/ECAT) and international tests (SAT/IELTS)?',
      a: 'Yes, our Nexus Sixth Form faculty conduct specialized preparatory clinics for MDCAT (Medical), ECAT (Engineering), IBA/LUMS aptitude tests, and international SAT / ACT / IELTS examinations.'
    },
    {
      q: 'How much scholarship funding do SST students receive?',
      a: 'In the 2024-2025 academic cycle, our graduating seniors secured over PKR 120 Million in merit-based scholarships and tuition grants worldwide.'
    },
    {
      q: 'Can parents meet directly with university guidance counselors?',
      a: 'Absolutely. Parents can schedule dedicated consultations at any time via the parent portal to discuss career paths, budget planning, and application milestones.'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <LandingHeader session={null} />

      {/* Hero Banner */}
            {/* HERO BANNER */}
      <section className="relative overflow-hidden bg-[#002E40] text-white py-16 sm:py-24 lg:py-28">
        <HeroVideoBackground
          imageUrl="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=85&w=2400&auto=format&fit=crop"
          posterUrl="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=85&w=2400&auto=format&fit=crop"
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
                  Pre-University Counseling
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
                University & <span className="text-cyan-300">Career Guidance</span>
                <span className="block text-2xl sm:text-3xl font-semibold text-slate-300 mt-2">
                  يونيورسٽي ۽ ڪيريئر لاءِ جامع رهنمائي
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
                Comprehensive pre-university counseling from Year 9 through Sixth Form. Concurrent preparation for premier universities in Pakistan (AKU, IBA, FAST, LUMS, NED, NUST) and prestigious international institutions across the UK, US, and Europe.
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
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">PKR 150M+</div>
                  <div className="text-[11px] text-slate-300 font-medium">Scholarships Won</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">50+</div>
                  <div className="text-[11px] text-slate-300 font-medium">University Fairs</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">1:1</div>
                  <div className="text-[11px] text-slate-300 font-medium">Admissions Mentor</div>
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
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Live University Prep Stream</span>
                  </div>
                  <Badge className="bg-[#8D1B2D] text-white text-[11px] font-semibold border-none">
                    Career Pathway
                  </Badge>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Silicon Valley & Premier University Placement
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    1-on-1 personal statement workshops, SAT/MDCAT masterclasses, and mock admissions interviews with global university deans.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-cyan-300 font-semibold">Top Tier Entry</div>
                    <div className="text-lg font-black text-white">96% First Choice</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-emerald-300 font-semibold">Global Network</div>
                    <div className="text-lg font-black text-white">US / UK / Pak</div>
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

      {/* 4-Year Guidance Roadmap */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <Badge className="bg-[#002E40] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md">
              Structured Trajectory
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002E40]">
              The 4-Year University Roadmap
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              A comprehensive step-by-step pathway starting early to remove anxiety and maximize success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guidanceRoadmap.map((step, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <Badge className="bg-[#8D1B2D] text-white text-[10px] font-bold">{step.grade}</Badge>
                  <h3 className="text-base font-bold text-[#002E40]">{step.focus}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{step.desc}</p>
                </div>
                <div className="pt-3 border-t border-slate-200 text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Personal Counselor Assigned</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quote Card */}
          <div className="bg-[#002E40] text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-center gap-8">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-4 border-white/20 flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/usman.jpg" alt="Muhammad Usman" className="w-full h-full object-cover object-top" />
            </div>
            <div className="space-y-2 text-slate-200">
              <Quote className="h-6 w-6 text-amber-300 opacity-80" />
              <p className="text-sm sm:text-base font-medium italic leading-relaxed text-white">
                "Our students don't just apply to top universities; they arrive with the eloquence, research acumen, and trilingual fluency to lead seminars from day one."
              </p>
              <div>
                <div className="text-xs font-bold text-amber-300">Muhammad Usman</div>
                <div className="text-[11px] text-slate-300">Head of School & Academic Dean | Sindh School of Technology</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top University Destinations */}
      <section className="py-16 bg-slate-100 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <Badge className="bg-[#8D1B2D] text-white text-xs font-bold uppercase tracking-wider">
              Graduate Placements
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002E40]">
              Where Our Graduates Go
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topDestinations.map((dest, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-[#002E40]">
                  <Building className="h-5 w-5 text-[#8D1B2D]" />
                  <h3 className="text-base font-bold">{dest.category}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {dest.list}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2">
            <Badge className="bg-[#002E40] text-white text-xs font-bold uppercase tracking-wider">
              Guidance FAQs
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#002E40]">
              Common Questions About University Admissions
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

      {/* CTA Footer */}
      <section className="bg-gradient-to-r from-[#002E40] to-[#8D1B2D] text-white py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-black">
            Chart Your Path to Global Higher Education
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto">
            Book an appointment with our senior university counselor to map your academic roadmap today.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button size="lg" className="bg-white text-[#002E40] hover:bg-slate-100 font-bold px-7 shadow-lg" asChild>
              <Link href="/home#enquiry-form">Schedule Counseling Session</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-slate-300 bg-white text-slate-800 hover:bg-slate-100 hover:text-slate-900 font-semibold shadow-xs" asChild>
              <Link href="/why-choose-us/music-programme">Explore Music & Arts</Link>
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
              <Link href="/why-choose-us" className="hover:text-white">Why Choose Us</Link>
              <Link href="/why-choose-us/mission-and-values" className="hover:text-white">Mission & Values</Link>
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