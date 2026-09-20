'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LandingHeader } from '@/components/landing-header'
import { HeroVideoBackground } from '@/components/hero-video-background'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Baby,
  Sparkles,
  Heart,
  Sun,
  Smile,
  BookOpen,
  Music,
  Activity,
  Palette,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Star,
  Quote,
  Languages,
  X,
  Play
} from 'lucide-react'

export default function EarlyYearsFoundationStagePage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const eyfsPillars = [
    {
      title: 'Communication & Language (Trilingual Phonics)',
      icon: Languages,
      desc: 'Developing spoken vocabulary, active listening, and conversational confidence across English, Urdu, and Sindhi through stories, rhymes, and puppet roleplay.'
    },
    {
      title: 'Personal, Social & Emotional Development (PSED)',
      icon: Heart,
      desc: 'Building self-confidence, emotional regulation, empathy, sharing, and making lifelong friendships in a warm, secure, loving atmosphere.'
    },
    {
      title: 'Physical Development & Motor Agility',
      icon: Activity,
      desc: 'Fine motor coordination (pencil grip, scissor control, building blocks) and gross motor agility (running, climbing, balancing in soft-play zones).'
    },
    {
      title: 'Literacy & Pre-Reading Foundations',
      icon: BookOpen,
      desc: 'Synthetic phonics, letter recognition, interactive picture books, and emergent writing in English, Urdu, and Sindhi script.'
    },
    {
      title: 'Mathematics & Number Exploration',
      icon: Sparkles,
      desc: 'Hands-on counting with natural objects, pattern making, shape sorting, measuring, and joyful mathematical problem-solving.'
    },
    {
      title: 'Understanding the World & Sensory Discovery',
      icon: Sun,
      desc: 'Exploring plants, weather, water play, simple tech tools, and the rich cultural traditions and festivals of Sindh and Pakistan.'
    },
    {
      title: 'Expressive Arts & Design',
      icon: Palette,
      desc: 'Finger painting, clay sculpting, musical rhythm, dance, and imaginative dramatic role-play in our dedicated creative atelier.'
    }
  ]

  const ageCohorts = [
    {
      name: 'Pre-Nursery (Playgroup)',
      age: 'Ages 2 – 3',
      badge: 'Gentle Transition',
      desc: 'Gentle introduction to social routines, separation confidence, sensory exploration, and language immersion with high teacher-to-child ratios.'
    },
    {
      name: 'Nursery (KG-1)',
      age: 'Ages 3 – 4',
      badge: 'Curiosity & Play',
      desc: 'Building phonemic awareness, cooperative play, foundational numeracy, and gross motor skills through structured guided inquiry.'
    },
    {
      name: 'Reception (KG-2 / Prep)',
      age: 'Ages 4 – 5',
      badge: 'School Readiness',
      desc: 'Mastering independent reading, writing, mathematical addition/subtraction, and smooth academic preparation for Year 1 Primary.'
    }
  ]

  const faqs = [
    {
      q: 'What is the teacher-to-student ratio in Early Years?',
      a: 'We maintain low teacher-to-child ratios (1:8 in Pre-Nursery, 1:12 in Nursery & Reception), with a certified lead teacher and a dedicated classroom assistant in every room.'
    },
    {
      q: 'Are children taught in English, Urdu, and Sindhi from Age 2?',
      a: 'Yes, our immersive trilingual phonics model uses songs, stories, and daily conversational play in English, Urdu, and Sindhi, enabling rapid natural language acquisition.'
    },
    {
      q: 'What safety and hygiene measures are in place for toddlers?',
      a: 'All Early Years areas feature child-sized sanitary facilities, sanitized soft-play zones, rounded furniture corners, 24/7 CCTV, and full-time paediatric nurses on campus.'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <LandingHeader session={null} />

      {/* Hero Banner */}
            {/* HERO BANNER */}
      <section className="relative overflow-hidden bg-[#002E40] text-white py-16 sm:py-24 lg:py-28">
        <HeroVideoBackground
          imageUrl="https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=85&w=2400&auto=format&fit=crop"
          posterUrl="https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=85&w=2400&auto=format&fit=crop"
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
                  Ages 2 – 5 Foundation
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
                Early Years <span className="text-cyan-300">Foundation Stage (EYFS)</span>
                <span className="block text-2xl sm:text-3xl font-semibold text-slate-300 mt-2">
                  شروعاتي تعليم: راند، تخليق ۽ بنيادي سکيا (عمر 2 کان 5 سال)
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
                A magical, nurturing learning environment for ages 2 to 5. Inspiring curiosity, language acquisition in English, Urdu, and Sindhi, foundational numeracy, sensory discovery, and emotional security in dedicated child-friendly facilities.
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
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">2 – 5</div>
                  <div className="text-[11px] text-slate-300 font-medium">Ages Welcomed</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">1:6</div>
                  <div className="text-[11px] text-slate-300 font-medium">Teacher-Pupil Ratio</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">3</div>
                  <div className="text-[11px] text-slate-300 font-medium">Language Phonics</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">100%</div>
                  <div className="text-[11px] text-slate-300 font-medium">Play-Based STEM</div>
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
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Live Early Years Classroom Stream</span>
                  </div>
                  <Badge className="bg-[#8D1B2D] text-white text-[11px] font-semibold border-none">
                    EYFS Campus
                  </Badge>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Creative Play & Sensory Development Spaces
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Little learners developing speech, fine motor skills, social empathy, and early logic puzzles under caring specialist educators.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-cyan-300 font-semibold">Outdoor Play Arena</div>
                    <div className="text-lg font-black text-white">Safe Rubberized</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-emerald-300 font-semibold">Phonics Program</div>
                    <div className="text-lg font-black text-white">Trilingual Mastery</div>
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

      {/* 3 Age Cohorts */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <Badge className="bg-[#002E40] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md">
              Age Cohorts
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002E40]">
              Tailored Early Years Stages
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Designed around the developmental stages of children from age 2 to 5 years.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ageCohorts.map((coh, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-[#8D1B2D] text-white text-[10px]">{coh.badge}</Badge>
                    <span className="text-xs font-bold text-[#002E40]">{coh.age}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#002E40]">{coh.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{coh.desc}</p>
                </div>
                <div className="pt-2 border-t border-slate-200 text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Warm, caring pastoral supervision</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 Core Areas of Learning */}
      <section className="py-16 sm:py-20 bg-slate-100 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <Badge className="bg-[#8D1B2D] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md">
              Holistic Pedagogy
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002E40]">
              The 7 Core Areas of Learning (EYFS)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Our curriculum blends British EYFS best practices with the rich multilingual cultural context of Sindh.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eyfsPillars.map((p, idx) => {
              const Icon = p.icon
              return (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
                  <div className="h-10 w-10 rounded-xl bg-[#002E40] text-white flex items-center justify-center">
                    <Icon className="h-5 w-5 text-cyan-300" />
                  </div>
                  <h3 className="text-base font-bold text-[#002E40]">{p.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
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
              <Quote className="h-6 w-6 text-cyan-300 opacity-80" />
              <p className="text-sm sm:text-base font-medium italic leading-relaxed text-white">
                "In Early Years, every child is a natural scientist and artist. When we nurture their curiosity with warmth and love, they develop a lifelong passion for knowledge."
              </p>
              <div>
                <div className="text-xs font-bold text-cyan-300">Muhammad Usman</div>
                <div className="text-[11px] text-slate-300">Head of School & Academic Dean | Sindh School of Technology</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2">
            <Badge className="bg-[#002E40] text-white text-xs font-bold uppercase tracking-wider">
              Early Years FAQs
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#002E40]">
              Frequently Asked Questions About EYFS
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
            Book an Early Years Campus Visit
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto">
            Experience our joyful classrooms, sensory play gardens, and meet our Early Years team.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button size="lg" className="bg-white text-[#002E40] hover:bg-slate-100 font-bold px-7 shadow-lg" asChild>
              <Link href="/home#enquiry-form">Schedule EYFS Tour</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-slate-300 bg-white text-slate-800 hover:bg-slate-100 hover:text-slate-900 font-semibold shadow-xs" asChild>
              <Link href="/our-school/primary-education">Discover Primary School</Link>
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
              <Link href="/our-school/primary-education" className="hover:text-white">Primary</Link>
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