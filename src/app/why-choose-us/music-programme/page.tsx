'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LandingHeader } from '@/components/landing-header'
import { HeroVideoBackground } from '@/components/hero-video-background'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Music,
  Mic2,
  Volume2,
  Sparkles,
  Award,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Radio,
  Heart,
  Globe,
  Quote,
  Star,
  X,
  Play,
  Languages
} from 'lucide-react'

export default function MusicProgrammePage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const musicalDisciplines = [
    {
      title: 'Traditional Sindhi & Eastern Classical',
      icon: Radio,
      badge: 'Heritage Music',
      instruments: 'Alghoza (ٻٽو الڳوزو), Sitar, Harmonium, Tabla, Dholak, Tanpura & Rubab',
      desc: 'Mastering the microtonal melodies, classical ragas, and soulful folk rhythms of the Indus Valley under veteran Sindhi maestros.'
    },
    {
      title: 'Western Orchestral & Contemporary',
      icon: Volume2,
      badge: 'Classical & Modern',
      instruments: 'Grand Piano, Violin, Cello, Acoustic & Electric Guitar, Flute, Drums',
      desc: 'Reading standard staff notation, playing in symphonic ensembles, and composing contemporary pieces with digital DAWs (Logic Pro / Ableton).'
    },
    {
      title: 'Trilingual Vocal Choirs & Choral Harmony',
      icon: Mic2,
      badge: 'Vocal Arts',
      instruments: 'Soprano, Alto, Tenor & Bass Ensembles',
      desc: 'Performing choral masterpieces ranging from Mozart and Handel to the mystic verses of Shah Abdul Latif Bhittai and Faiz Ahmed Faiz in 3 languages.'
    },
    {
      title: 'Music Production & Sound Engineering',
      icon: Sparkles,
      badge: 'Audio Tech',
      instruments: 'Acoustic Recording Studio, MIDI Keyboards, Studio Mics & Mixers',
      desc: 'High school students learn audio mixing, mastering, podcast broadcasting, and sound design for student films and theater productions.'
    }
  ]

  const faqs = [
    {
      q: 'Do students need prior musical training to join the Music Programme?',
      a: 'No prior experience is necessary. Music is a compulsory, joyful part of the curriculum in Early Years and Primary, with optional specialized instrumental tracks from Grade 4 upwards.'
    },
    {
      q: 'Can students take internationally accredited music exams?',
      a: 'Yes, SST is a registered exam preparation center for the Associated Board of the Royal Schools of Music (ABRSM) and Trinity College London graded practical & theory exams.'
    },
    {
      q: 'How does the music programme celebrate Sindhi folk music?',
      a: 'Students study the 30 surs of Shah Jo Risalo, learn rare instruments like the double-flute Alghoza and Yaktaro, and perform annually at the Sindh Sufi Music & Peace Gala.'
    },
    {
      q: 'Are musical instruments provided by the school?',
      a: 'Yes, our campus boasts two fully equipped music studios with over 80 instruments available for daily student practice, band rehearsals, and 1-on-1 tutoring.'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <LandingHeader session={null} />

      {/* Hero Banner */}
            {/* HERO BANNER */}
      <section className="relative overflow-hidden bg-[#002E40] text-white py-16 sm:py-24 lg:py-28">
        <HeroVideoBackground
          imageUrl="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=85&w=2400&auto=format&fit=crop"
          posterUrl="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=85&w=2400&auto=format&fit=crop"
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
                  Performing Arts & Audio Tech
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
                Music, Digital Audio & <span className="text-cyan-300">Performing Arts</span>
                <span className="block text-2xl sm:text-3xl font-semibold text-slate-300 mt-2">
                  موسيقي، آواز جي ٽيڪنالاجي ۽ ادبي فن
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
                A rich performing arts curriculum blending the timeless classical and Sufi musical heritage of Sindh with modern digital audio workstations (DAW), sound engineering, choral performance, and orchestral instrumentation.
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
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">12+</div>
                  <div className="text-[11px] text-slate-300 font-medium">Instruments Taught</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">100%</div>
                  <div className="text-[11px] text-slate-300 font-medium">Sound Studio Access</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">3</div>
                  <div className="text-[11px] text-slate-300 font-medium">Language Repertoires</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">24+</div>
                  <div className="text-[11px] text-slate-300 font-medium">Annual Concerts</div>
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
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Live Digital Audio Studio Stream</span>
                  </div>
                  <Badge className="bg-[#8D1B2D] text-white text-[11px] font-semibold border-none">
                    Audio Arts
                  </Badge>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Music Production & Acoustic Signal Synthesis
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Students record acoustic compositions, produce multitrack digital mixes, and perform traditional Sindhi Sufi and classical melodies.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-cyan-300 font-semibold">Studio Tech</div>
                    <div className="text-lg font-black text-white">Pro Tools & Logic</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-emerald-300 font-semibold">Vocal Choir</div>
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

      {/* Musical Disciplines */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <Badge className="bg-[#002E40] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md">
              Artistic Breadth
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002E40]">
              Four Pillars of Musical Training
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              A balanced conservatory programme celebrating our regional cultural identity while preparing musicians for global stages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {musicalDisciplines.map((disc, idx) => {
              const Icon = disc.icon
              return (
                <div key={idx} className="bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-2xl bg-white shadow-xs border border-slate-200 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-[#8D1B2D]" />
                    </div>
                    <Badge variant="outline" className="text-xs font-semibold">
                      {disc.badge}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold text-[#002E40]">{disc.title}</h3>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs font-medium text-slate-700">
                    <span className="text-slate-400 font-semibold uppercase text-[10px] block mb-1">Featured Instruments</span>
                    {disc.instruments}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {disc.desc}
                  </p>
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
              <Quote className="h-6 w-6 text-purple-300 opacity-80" />
              <p className="text-sm sm:text-base font-medium italic leading-relaxed text-white">
                "Music teaches discipline, mathematical rhythm, emotional empathy, and cultural reverence. When a child learns an instrument, they learn how to listen to the soul of humanity."
              </p>
              <div>
                <div className="text-xs font-bold text-purple-300">Muhammad Usman</div>
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
              Music FAQs
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#002E40]">
              Frequently Asked Questions About Music at SST
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
            Discover Your Child's Musical Potential
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto">
            Tour our soundproof music studios and meet our faculty of accomplished instrumentalists and choral directors.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button size="lg" className="bg-white text-[#002E40] hover:bg-slate-100 font-bold px-7 shadow-lg" asChild>
              <Link href="/home#enquiry-form">Schedule Music Studio Visit</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-slate-300 bg-white text-slate-800 hover:bg-slate-100 hover:text-slate-900 font-semibold shadow-xs" asChild>
              <Link href="/why-choose-us/extra-curricular-activities">Explore Extracurriculars</Link>
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