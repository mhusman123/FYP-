'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LandingHeader } from '@/components/landing-header'
import { HeroVideoBackground } from '@/components/hero-video-background'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Compass,
  Baby,
  BookOpen,
  GraduationCap,
  School,
  Sparkles,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Heart,
  Quote,
  Star,
  ArrowRight,
  Languages,
  Award,
  X,
  Play
} from 'lucide-react'

export default function YourChildsJourneyPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const journeyStages = [
    {
      stage: 'Stage 1: Early Years Foundation Stage',
      age: 'Ages 2 – 5 • Pre-Nursery, Nursery & Reception',
      icon: Baby,
      badge: 'Curiosity & Sensory Wonder',
      color: 'border-cyan-300',
      tagline: 'Learning Through Joyful Exploration & Sensory Play',
      description: 'Our youngest learners develop self-confidence, motor agility, and social empathy in a warm, loving environment. Guided by the British EYFS framework and trilingual phonics (English, Urdu, Sindhi), children discover the joy of words, numbers, music, and nature.',
      highlights: [
        'Safe sensory discovery gardens and soft-play spaces',
        'Early phonics and storytelling in English, Urdu, and Sindhi',
        'Emotional security and personal social development',
        'Specialist music, physical education, and creative art sessions'
      ],
      link: '/our-school/early-years-foundation-stage',
      image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=800&auto=format&fit=crop'
    },
    {
      stage: 'Stage 2: Primary Education',
      age: 'Ages 5 – 11 • Key Stage 1 & Key Stage 2 (Years 1 to 6)',
      icon: BookOpen,
      badge: 'Foundations & Inquiry',
      color: 'border-emerald-300',
      tagline: 'Building Strong Foundations, Digital Fluency & Curiosity',
      description: 'In Primary, students master core academic competencies through the Cambridge Primary curriculum. They engage in 1:1 iPad learning, robotics makerspaces, scientific inquiry, and trilingual literacy, while learning French or Arabic as a second foreign language.',
      highlights: [
        'Cambridge Primary English, Mathematics, and Science',
        '1:1 iPad technology integrated into daily learning',
        'Second Foreign Language (French / Arabic) introduced in Year 5',
        'Extensive sports, swimming, and performing arts curriculum'
      ],
      link: '/our-school/primary-education',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop'
    },
    {
      stage: 'Stage 3: Secondary Education',
      age: 'Ages 11 – 16 • Key Stage 3 & Key Stage 4 (Years 7 to 11)',
      icon: GraduationCap,
      badge: 'Critical Mastery & Leadership',
      color: 'border-[#8D1B2D]',
      tagline: 'Critical Thinking, IGCSE Qualifications & Character',
      description: 'Secondary students navigate specialized subjects in advanced sciences, computing, and humanities. They develop oratory eloquence in our trilingual debating society, participate in Model UN, and prepare for Cambridge IGCSE and Sindh Board Matriculation.',
      highlights: [
        'Cambridge IGCSE & Sindh Board dual examination pathways',
        'State-of-the-art physics, chemistry, biology, and robotics labs',
        'Leadership roles in House system & Duke of Edinburgh Award',
        'Comprehensive 1-on-1 pastoral mentoring and career profiling'
      ],
      link: '/our-school/secondary-education',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop'
    },
    {
      stage: 'Stage 4: SST Nexus – Sixth Form',
      age: 'Ages 16 – 18 • Key Stage 5 (Years 12 & 13)',
      icon: School,
      badge: 'Pre-University Distinction',
      color: 'border-amber-400',
      tagline: 'Pre-University Specialisation & Global University Placement',
      description: 'Located at our exclusive pre-university Nexus campus, Sixth Formers enjoy adult-style independence, intensive Cambridge A-Levels / Intermediate studies, bespoke university counseling, and multi-million rupee scholarship mentorship for top global universities.',
      highlights: [
        'Cambridge AS/A-Levels & Sindh Board Intermediate diplomas',
        '100% acceptance to AKU, LUMS, IBA, NUST, Oxford, and Harvard',
        'Dedicated Sixth Form common room, research pods, and coffee bar',
        'SAT, MDCAT, ECAT, and IELTS preparatory masterclasses'
      ],
      link: '/our-school/sixth-form',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop'
    }
  ]

  const faqs = [
    {
      q: 'How does SST support smooth transitions between educational stages?',
      a: 'We have structured transition protocols including Year 6 to 7 bridging weeks, secondary taster days, Sixth Form masterclasses, and dedicated Year Leaders who ensure children feel confident and supported at every milestone.'
    },
    {
      q: 'Can a student join SST at any stage of their educational journey?',
      a: 'Yes, we accept admissions across Early Years, Primary, Secondary, and Sixth Form subject to age-appropriate assessment and space availability.'
    },
    {
      q: 'How are pastoral care and student wellbeing maintained across all years?',
      a: 'Form tutors, certified child counselors, and house leaders track emotional and social development daily, ensuring no student gets lost in the crowd.'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <LandingHeader session={null} />

      {/* Hero Banner */}
            {/* HERO BANNER */}
      <section className="relative overflow-hidden bg-[#002E40] text-white py-16 sm:py-24 lg:py-28">
        <HeroVideoBackground
          imageUrl="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=85&w=2400&auto=format&fit=crop"
          posterUrl="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=85&w=2400&auto=format&fit=crop"
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
                  K-12 Educational Roadmap
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
                Your Child’s <span className="text-cyan-300">Educational Journey</span>
                <span className="block text-2xl sm:text-3xl font-semibold text-slate-300 mt-2">
                  ٻار جي تعليمي ۽ ترقياتي سفر جا سنگ ميل
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
                From their first steps in Early Years Foundation Stage (age 2) to graduating as confident pre-university scholars at SST Nexus Sixth Form (age 18), we provide dedicated personalized mentorship, diagnostic progress tracking, and trilingual mastery.
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
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">16</div>
                  <div className="text-[11px] text-slate-300 font-medium">Years of Growth</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">100%</div>
                  <div className="text-[11px] text-slate-300 font-medium">Individual Care</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">4</div>
                  <div className="text-[11px] text-slate-300 font-medium">Academic Stages</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">1:1</div>
                  <div className="text-[11px] text-slate-300 font-medium">Portfolio Tracking</div>
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
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Live Student Journey Stream</span>
                  </div>
                  <Badge className="bg-[#8D1B2D] text-white text-[11px] font-semibold border-none">
                    Lifelong Pathway
                  </Badge>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Diagnostic Learning & Continuous Growth Tracking
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Watch students transition seamlessly between Primary, Secondary, and Sixth Form with individualized academic roadmaps in Sindh.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-cyan-300 font-semibold">Pathway Milestones</div>
                    <div className="text-lg font-black text-white">EYFS to A-Level</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-emerald-300 font-semibold">University Readiness</div>
                    <div className="text-lg font-black text-white">100% Placement</div>
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

      {/* 4 Stages Detailed Journey */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <Badge className="bg-[#002E40] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md">
              Continuous Educational Growth
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002E40]">
              Four Transformative Stages of Learning
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Every stage is thoughtfully designed to meet the cognitive, emotional, and social needs of each age group.
            </p>
          </div>

          <div className="space-y-12">
            {journeyStages.map((stg, idx) => {
              const Icon = stg.icon
              const isEven = idx % 2 === 1
              return (
                <div
                  key={idx}
                  className={`bg-slate-50 rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm flex flex-col ${
                    isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'
                  } gap-8 lg:gap-12 items-center`}
                >
                  {/* Left Column (Content) */}
                  <div className="lg:col-span-7 flex-1 space-y-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className="bg-[#002E40] text-white text-xs font-bold">{stg.badge}</Badge>
                      <span className="text-xs font-bold text-[#8D1B2D]">{stg.age}</span>
                    </div>

                    <h3 className="text-2xl font-extrabold text-[#002E40] flex items-center gap-2.5">
                      <Icon className="h-6 w-6 text-[#8D1B2D]" />
                      <span>{stg.stage}</span>
                    </h3>

                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {stg.tagline}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {stg.description}
                    </p>

                    <ul className="space-y-2 text-xs text-slate-700">
                      {stg.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-2">
                      <Button className="bg-[#8D1B2D] hover:bg-[#741322] text-white text-xs font-bold" asChild>
                        <Link href={stg.link}>Explore {stg.stage}</Link>
                      </Button>
                    </div>
                  </div>

                  {/* Right Column (Image) */}
                  <div className="w-full lg:w-96 flex-shrink-0">
                    <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={stg.image}
                        alt={stg.stage}
                        className="w-full h-64 sm:h-72 object-cover"
                      />
                    </div>
                  </div>
                </div>
              )
            })}
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
                "We don't simply teach children for a school term; we accompany them on a lifelong journey of character, intellectual excellence, and trilingual wisdom."
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
              Journey FAQs
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#002E40]">
              Frequently Asked Questions About Student Progression
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
            Start Your Child's Journey Today
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto">
            Book a personalized school tour and diagnostic assessment at our Karachi or Hyderabad campuses.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button size="lg" className="bg-white text-[#002E40] hover:bg-slate-100 font-bold px-7 shadow-lg" asChild>
              <Link href="/home#enquiry-form">Schedule Campus Tour</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-slate-300 bg-white text-slate-800 hover:bg-slate-100 hover:text-slate-900 font-semibold shadow-xs" asChild>
              <Link href="/our-school/early-years-foundation-stage">Explore Early Years</Link>
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