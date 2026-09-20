'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LandingHeader } from '@/components/landing-header'
import { HeroVideoBackground } from '@/components/hero-video-background'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Info,
  Clock,
  Calendar,
  ShieldCheck,
  Phone,
  Mail,
  Shirt,
  HeartHandshake,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  FileText,
  MapPin,
  X,
  Play,
  Languages,
  Sparkles
} from 'lucide-react'

export default function SchoolInformationPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const timings = [
    { stage: 'Early Years (EYFS: Pre-Nursery to Reception)', time: '8:30 AM – 1:00 PM', days: 'Monday to Thursday (Friday: 8:30 AM – 12:00 PM)' },
    { stage: 'Primary Education (Years 1 to 6)', time: '8:00 AM – 2:30 PM', days: 'Monday to Thursday (Friday: 8:00 AM – 12:30 PM)' },
    { stage: 'Secondary Education (Years 7 to 11 / IGCSE)', time: '7:45 AM – 3:00 PM', days: 'Monday to Thursday (Clubs: 3:00 PM – 4:30 PM)' },
    { stage: 'SST Nexus Sixth Form (Years 12 & 13)', time: '8:00 AM – 3:30 PM', days: 'Monday to Thursday (Self-study pods open till 6:00 PM)' }
  ]

  const termDates = [
    { term: 'Autumn Term 2025', dates: 'August 18, 2025 – December 19, 2025', break: 'Mid-term Break: Oct 13–17 | Winter Vacation: Dec 20–Jan 4' },
    { term: 'Spring Term 2026', dates: 'January 5, 2026 – March 27, 2026', break: 'Mid-term Break: Feb 16–20 | Spring Break: Mar 28–Apr 12' },
    { term: 'Summer Term 2026', dates: 'April 13, 2026 – June 12, 2026', break: 'Cambridge Exam Period: May–June | Summer Break: Jun 13–Aug 16' }
  ]

  const faqs = [
    {
      q: 'What is the school uniform policy?',
      a: 'Students wear the smart British navy and white uniform from Monday to Thursday. On designated Cultural Fridays and Sindh Heritage Day, students are warmly encouraged to wear traditional Pakistani attire and Ajrak / Topi.'
    },
    {
      q: 'How does SST ensure student safeguarding and campus safety?',
      a: 'We operate 24/7 security with biometric access gates, CCTV coverage in all common areas, full-time medical nurses, and strict background checks for all academic and support staff.'
    },
    {
      q: 'How can parents contact teachers during the term?',
      a: 'Parents can schedule appointments directly through our 24/7 online Parent Portal, reach Form Tutors via WhatsApp official broadcast, or attend termly Parent-Teacher Conclaves.'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <LandingHeader session={null} />

      {/* Hero Banner */}
            {/* HERO BANNER */}
      <section className="relative overflow-hidden bg-[#002E40] text-white py-16 sm:py-24 lg:py-28">
        <HeroVideoBackground
          imageUrl="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=85&w=2400&auto=format&fit=crop"
          posterUrl="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=85&w=2400&auto=format&fit=crop"
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
                  Daily Operations & Logistics
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
                School Information & <span className="text-cyan-300">Operations</span>
                <span className="block text-2xl sm:text-3xl font-semibold text-slate-300 mt-2">
                  اسڪول جا اوقات، ضابطا ۽ انتظامي معلومات
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
                Essential information for current and prospective families: campus timetables, trilingual academic calendar, school transport routes across Karachi & Hyderabad, uniform guidelines, and dining services.
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
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">7:45 AM</div>
                  <div className="text-[11px] text-slate-300 font-medium">School Start Time</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">100%</div>
                  <div className="text-[11px] text-slate-300 font-medium">Air-Conditioned Transit</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">180+</div>
                  <div className="text-[11px] text-slate-300 font-medium">Instructional Days</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">24/7</div>
                  <div className="text-[11px] text-slate-300 font-medium">Cloud Portal</div>
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
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Live Operations & Campus Stream</span>
                  </div>
                  <Badge className="bg-[#8D1B2D] text-white text-[11px] font-semibold border-none">
                    School Info
                  </Badge>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Smart Cloud Portal & Transport Logistics
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Real-time GPS tracking for campus bus fleets, digital attendance kiosks, and instant student progress notification systems.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-cyan-300 font-semibold">Fleet Safety</div>
                    <div className="text-lg font-black text-white">GPS & Cam Monitored</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-emerald-300 font-semibold">Dining Hall</div>
                    <div className="text-lg font-black text-white">Hygienic & Balanced</div>
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

      {/* School Timings */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <Badge className="bg-[#002E40] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md">
              Daily Schedule
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002E40]">
              School Timings by Stage
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {timings.map((t, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-[#8D1B2D]">
                  <Clock className="h-5 w-5" />
                  <h3 className="text-base font-bold text-[#002E40]">{t.stage}</h3>
                </div>
                <div className="text-lg font-black text-[#8D1B2D]">{t.time}</div>
                <p className="text-xs text-slate-500 font-medium">{t.days}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Term Dates */}
      <section className="py-16 sm:py-20 bg-slate-100 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <Badge className="bg-[#8D1B2D] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md">
              Academic Calendar 2025–2026
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002E40]">
              Term Dates & Holidays
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {termDates.map((td, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-[#002E40]">
                  <Calendar className="h-5 w-5 text-[#8D1B2D]" />
                  <h3 className="text-base font-bold">{td.term}</h3>
                </div>
                <p className="text-xs font-bold text-emerald-800">{td.dates}</p>
                <p className="text-[11px] text-slate-600 leading-relaxed">{td.break}</p>
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
              Information FAQs
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#002E40]">
              Policies & Regulations
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