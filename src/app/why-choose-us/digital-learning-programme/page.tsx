'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LandingHeader } from '@/components/landing-header'
import { HeroVideoBackground } from '@/components/hero-video-background'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Cpu,
  Laptop,
  Bot,
  Code,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Sparkles,
  Zap,
  Globe,
  Star,
  Quote,
  Layers,
  Terminal,
  X,
  Play,
  Languages
} from 'lucide-react'

export default function DigitalLearningProgrammePage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const techFeatures = [
    {
      title: '1:1 Smart Device Ecosystem',
      icon: Laptop,
      badge: 'Individual Hardware',
      description: 'Every student from Primary to Nexus Sixth Form is equipped with managed 1:1 iPads and laptops loaded with secure educational software and interactive digital textbooks.'
    },
    {
      title: 'AI Autograding & Diagnostic Feedback',
      icon: Bot,
      badge: 'Instant Analytics',
      description: 'Our proprietary AI homework platform assesses assignments, detects conceptual weaknesses, provides step-by-step guidance in English, Urdu, and Sindhi, and tracks progress.'
    },
    {
      title: 'Robotics, IoT & Makerspaces',
      icon: Cpu,
      badge: 'Hands-on Engineering',
      description: 'Equipped with Arduino, Raspberry Pi, 3D printers, and robotic kits. Students build real-world prototypes addressing agricultural and environmental challenges across Sindh.'
    },
    {
      title: 'Trilingual Coding Curriculum',
      icon: Code,
      badge: 'K-12 Computing',
      description: 'Structured programming progression from visual block coding (Scratch) in Primary to Python, JavaScript, SQL, and AI Machine Learning in Secondary & Sixth Form.'
    },
    {
      title: 'Digital Citizenship & Cyber-Safety',
      icon: ShieldCheck,
      badge: 'Ethical Tech',
      description: 'Comprehensive digital safety curriculum teaching ethical AI use, data privacy, critical media literacy, and positive online collaboration.'
    },
    {
      title: 'Interactive Smart Classrooms',
      icon: Layers,
      badge: 'Modern Pedagogy',
      description: 'High-definition interactive touch panels, wireless casting, and cloud-synced digital whiteboards allowing seamless hybrid and multimedia learning.'
    }
  ]

  const faqs = [
    {
      q: 'How are devices managed and kept safe for young children?',
      a: 'All student devices are centrally managed via enterprise MDM (Mobile Device Management) with strict content filtering, app whitelisting, and automated screen-time shutdowns during evening hours.'
    },
    {
      q: 'How does AI help teachers instead of replacing them?',
      a: 'Our AI tools automate administrative grading routines, enabling teachers to dedicate significantly more 1-on-1 time to mentoring, critical discussion, and personalized student encouragement.'
    },
    {
      q: 'Do students learn programming in provincial languages?',
      a: 'Yes, our introductory coding logic lessons feature bilingual and trilingual explanations in English, Urdu, and Sindhi so that language is never a barrier to computational thinking.'
    },
    {
      q: 'What certifications do students earn in digital technology?',
      a: 'Students can earn industry-recognized credentials including Microsoft Office Specialist, Python Institute Certified Associate, and Cambridge IGCSE Computer Science distinctions.'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <LandingHeader session={null} />

      {/* Hero Banner */}
            {/* HERO BANNER */}
      <section className="relative overflow-hidden bg-[#002E40] text-white py-16 sm:py-24 lg:py-28">
        <HeroVideoBackground
          imageUrl="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=85&w=2400&auto=format&fit=crop"
          posterUrl="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=85&w=2400&auto=format&fit=crop"
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
                  Pioneering Educational Tech
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
                Digital Learning & <span className="text-cyan-300">AI Innovation</span>
                <span className="block text-2xl sm:text-3xl font-semibold text-slate-300 mt-2">
                  جديد ڊجيٽل تعليم ۽ مصنوعي ذهانت جو نظام
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
                Pioneering the future of educational technology in Sindh: 1:1 iPad and laptop ecosystems, AI-driven code autograding, interactive Socratic learning assistants, VR science simulations, and cloud classrooms connecting students across Pakistan.
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
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">1:1</div>
                  <div className="text-[11px] text-slate-300 font-medium">Device Integration</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">100%</div>
                  <div className="text-[11px] text-slate-300 font-medium">Cloud Classrooms</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">AI</div>
                  <div className="text-[11px] text-slate-300 font-medium">Autograding Feedback</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">10 Gbps</div>
                  <div className="text-[11px] text-slate-300 font-medium">Campus Backbone</div>
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
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Live AI & Cloud Computing Stream</span>
                  </div>
                  <Badge className="bg-[#8D1B2D] text-white text-[11px] font-semibold border-none">
                    EdTech Hub
                  </Badge>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    AI Autograding & Cloud Supercomputing Labs
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Students develop Python scripts, train machine learning prototypes, and receive real-time autograding diagnostics in our high-tech labs.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-cyan-300 font-semibold">Cloud Labs</div>
                    <div className="text-lg font-black text-white">24/7 Access</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-emerald-300 font-semibold">Code Feedback</div>
                    <div className="text-lg font-black text-white">Instant Socratic</div>
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

      {/* Tech Features Grid */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <Badge className="bg-[#002E40] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md">
              Future-Ready Pedagogy
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002E40]">
              Technology Integrated at Every Step
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              From kindergarten interactive storytelling to pre-university deep neural network simulations, technology empowers our students to solve real-world problems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techFeatures.map((feat, idx) => {
              const Icon = feat.icon
              return (
                <div
                  key={idx}
                  className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="h-10 w-10 rounded-xl bg-[#002E40] text-white flex items-center justify-center">
                        <Icon className="h-5 w-5 text-cyan-300" />
                      </div>
                      <Badge variant="outline" className="text-[10px] font-bold text-slate-600">
                        {feat.badge}
                      </Badge>
                    </div>
                    <h3 className="text-base font-bold text-[#002E40]">{feat.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{feat.description}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-200 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Active in 2025-2026 Academic Term</span>
                  </div>
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
                "We don't teach technology for the sake of screens. We teach technology so the sons and daughters of Sindh can build the agricultural, medical, and industrial solutions of tomorrow."
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
      <section className="py-16 bg-slate-100 border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2">
            <Badge className="bg-[#002E40] text-white text-xs font-bold uppercase tracking-wider">
              Technology FAQs
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#002E40]">
              Digital Learning Questions Answered
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
            Equip Your Child for the AI Era
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto">
            Book a tour of our robotics maker labs and explore how our 1:1 smart device learning transforms educational outcomes.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button size="lg" className="bg-white text-[#002E40] hover:bg-slate-100 font-bold px-7 shadow-lg" asChild>
              <Link href="/home#enquiry-form">Schedule a Tech Lab Tour</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-slate-300 bg-white text-slate-800 hover:bg-slate-100 hover:text-slate-900 font-semibold shadow-xs" asChild>
              <Link href="/why-choose-us/university-career-guidance-programme">University Guidance</Link>
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