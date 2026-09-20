'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LandingHeader } from '@/components/landing-header'
import { HeroVideoBackground } from '@/components/hero-video-background'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  CreditCard,
  FileCheck,
  Calendar,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Compass,
  Star,
  Quote,
  ArrowRight,
  Percent,
  MapPin,
  Phone,
  Mail,
  Play,
  X,
  Languages
} from 'lucide-react'

export default function AdmissionsAndFeesPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  const admissionsPillars = [
    {
      title: 'Admissions Process',
      tagline: '5 Simple Steps to Join Our Community',
      desc: 'Step-by-step guidance from initial online enquiry, campus tour, age-appropriate assessment, to formal offer and pastoral induction.',
      icon: FileCheck,
      href: '/admissions-and-fees/admissions-process',
      badge: 'Step-by-Step Guide',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'School Fees & Tuition Structure',
      tagline: 'Transparent Schedules & 50% Scholarships',
      desc: 'Clear, competitive tuition fees across Early Years, Primary, Secondary, and Sixth Form in PKR, including sibling discounts and merit scholarship grants.',
      icon: CreditCard,
      href: '/admissions-and-fees/school-fees',
      badge: 'Fee Schedules',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Open Days & Campus Visits',
      tagline: 'Private Tours & Interactive Taster Sessions',
      desc: 'Visit our world-class campuses in Karachi and Hyderabad. Meet our Academic Dean, tour science & robotics labs, and experience student life firsthand.',
      icon: Calendar,
      href: '/admissions-and-fees/open-days-and-visits',
      badge: 'Book a Visit',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop'
    }
  ]

  const steps = [
    { num: '01', title: 'Submit Online Enquiry', desc: 'Fill out our brief registration form with your child’s details and academic grade.' },
    { num: '02', title: 'Campus Tour & Discovery', desc: 'Visit our Karachi or Hyderabad campuses to meet educators and inspect facilities.' },
    { num: '03', title: 'Student Assessment', desc: 'Age-appropriate play-observation (EYFS) or academic evaluation (Primary & Secondary).' },
    { num: '04', title: 'Offer & Onboarding', desc: 'Receive formal admission offer, fee schedule, uniform pack, and tutor introduction.' }
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <LandingHeader session={null} />

      {/* Hero Banner */}
            {/* HERO BANNER */}
      <section className="relative overflow-hidden bg-[#002E40] text-white py-16 sm:py-24 lg:py-28">
        <HeroVideoBackground
          imageUrl="https://images.unsplash.com/photo-1577495508048-b635879837f1?q=85&w=2400&auto=format&fit=crop"
          posterUrl="https://images.unsplash.com/photo-1577495508048-b635879837f1?q=85&w=2400&auto=format&fit=crop"
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
                  Admissions Open 2025–26
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
                Admissions & <span className="text-cyan-300">School Fees</span>
                <span className="block text-2xl sm:text-3xl font-semibold text-slate-300 mt-2">
                  داخلا جو آسان طريقو ۽ شفاف فيس جو نظام
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
                Join our academic family. We welcome applications for Early Years, Primary, Secondary, and SST Nexus Sixth Form throughout the year. Transparent tuition schedules, 50% merit scholarships, and sibling discounts.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Button 
                  size="lg"
                  className="bg-[#8D1B2D] hover:bg-[#741322] text-white font-semibold text-sm px-6 h-12 shadow-lg transition-transform hover:scale-[1.02]"
                  asChild
                >
                  <a href="/admissions-and-fees/admissions-process">Apply for Admissions</a>
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
                  <div className="text-[11px] text-slate-300 font-medium">Ages Enrolled</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">50%</div>
                  <div className="text-[11px] text-slate-300 font-medium">Merit Scholarships</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">10 – 15%</div>
                  <div className="text-[11px] text-slate-300 font-medium">Sibling Concession</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">100%</div>
                  <div className="text-[11px] text-slate-300 font-medium">Online Application</div>
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
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Live Admissions Portal Stream</span>
                  </div>
                  <Badge className="bg-[#8D1B2D] text-white text-[11px] font-semibold border-none">
                    Admissions Hub
                  </Badge>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Instant Online Enquiry & Assessment Scheduling
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Submit your online application in under 5 minutes, book a private family campus tour, or take a diagnostic entrance test online.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-cyan-300 font-semibold">Admissions Status</div>
                    <div className="text-lg font-black text-white">Now Open 2025–26</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-emerald-300 font-semibold">Scholarship Test</div>
                    <div className="text-lg font-black text-white">Register Today</div>
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

      {/* 3 Core Admissions Sections */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <Badge className="bg-[#002E40] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md">
              Admissions Portal
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002E40]">
              Everything You Need to Know
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Click below to explore our application roadmap, tuition fees breakdown, or schedule an in-person visit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {admissionsPillars.map((p, idx) => {
              const Icon = p.icon
              return (
                <div key={idx} className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group hover:-translate-y-1">
                  <div className="h-48 w-full relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <Badge className="absolute top-3 left-3 bg-[#002E40] text-white text-[10px]">{p.badge}</Badge>
                  </div>
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Icon className="h-5 w-5 text-[#8D1B2D]" />
                        <h3 className="text-lg font-bold text-[#002E40] group-hover:text-[#8D1B2D] transition-colors">{p.title}</h3>
                      </div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{p.tagline}</p>
                      <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                    </div>
                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                      <Link href={p.href} className="text-xs font-bold text-[#8D1B2D] flex items-center gap-1 group-hover:gap-2 transition-all">
                        <span>Learn more</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                      <span className="text-[10px] text-slate-400 font-semibold">Admissions Info</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4-Step Admissions Roadmap */}
      <section className="py-16 sm:py-20 bg-slate-100 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <Badge className="bg-[#8D1B2D] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md">
              Application Roadmap
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002E40]">
              How to Apply in 4 Simple Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
                <div className="h-10 w-10 rounded-xl bg-[#002E40] text-white flex items-center justify-center font-black text-sm">
                  {s.num}
                </div>
                <h3 className="text-base font-bold text-[#002E40]">{s.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
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
                "Our admissions team is committed to making the enrollment journey transparent, warm, and supportive for every family joining us across Sindh."
              </p>
              <div>
                <div className="text-xs font-bold text-amber-300">Muhammad Usman</div>
                <div className="text-[11px] text-slate-300">Head of School & Academic Dean | Sindh School of Technology</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-gradient-to-r from-[#002E40] to-[#8D1B2D] text-white py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-black">
            Ready to Begin Your Application?
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto">
            Our admissions counselors are available Monday through Friday to guide you through registration and financial aid.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button size="lg" className="bg-white text-[#002E40] hover:bg-slate-100 font-bold px-7 shadow-lg" asChild>
              <Link href="/admissions-and-fees/admissions-process">Apply Online Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-slate-300 bg-white text-slate-800 hover:bg-slate-100 hover:text-slate-900 font-semibold shadow-xs" asChild>
              <Link href="/admissions-and-fees/school-fees">View Tuition Fees</Link>
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
              <Link href="/admissions-and-fees/admissions-process" className="hover:text-white">Admissions Process</Link>
              <Link href="/admissions-and-fees/school-fees" className="hover:text-white">School Fees</Link>
              <Link href="/admissions-and-fees/open-days-and-visits" className="hover:text-white">Open Days</Link>
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