'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LandingHeader } from '@/components/landing-header'
import { HeroVideoBackground } from '@/components/hero-video-background'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Users,
  Heart,
  Globe,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MessageSquare,
  Award,
  BookOpen,
  MapPin,
  Star,
  Quote,
  X,
  Play,
  Languages
} from 'lucide-react'

export default function CommunityPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  const [activeTab, setActiveTab] = useState<'houses' | 'parents' | 'alumni' | 'service'>('houses')

  const houses = [
    {
      name: 'Indus House (درياءِ سنڌ)',
      color: 'bg-blue-600',
      textColor: 'text-blue-700',
      motto: 'Flowing with Wisdom & Relentless Strength',
      symbol: 'Indus Dolphin',
      points: '2,840 pts',
      description: 'Named after the mighty Indus River, representing vitality, wisdom, and lifelong learning.'
    },
    {
      name: 'Karoonjhar House (ڪارونجهر)',
      color: 'bg-[#8D1B2D]',
      textColor: 'text-[#8D1B2D]',
      motto: 'Unyielding Granite of Character & Honor',
      symbol: 'Peacock & Granite Mountain',
      points: '2,790 pts',
      description: 'Named after the sacred Karoonjhar mountains in Tharparkar, symbolizing steadfast resilience.'
    },
    {
      name: 'Mehran House (مهراڻ)',
      color: 'bg-emerald-600',
      textColor: 'text-emerald-700',
      motto: 'Fertile Minds, Abundant Compassion',
      symbol: 'Lotus & Wheat Sheaf',
      points: '2,910 pts',
      description: 'Named after the historic land of Mehran, honoring hospitality, innovation, and unity.'
    },
    {
      name: 'Keenjhar House (ڪينجهر)',
      color: 'bg-cyan-600',
      textColor: 'text-cyan-700',
      motto: 'Pure Harmony, Serenity & Artistry',
      symbol: 'White Waterlily',
      points: '2,730 pts',
      description: 'Named after the historic Keenjhar Lake of Thatta, celebrating folklore, poetry, and arts.'
    }
  ]

  const communityEvents = [
    {
      title: 'Sindhi Cultural & Heritage Day',
      date: 'First Sunday of December',
      lang: 'سنڌي • Urdu • English',
      description: 'A vibrant festival where students, parents, and staff wear traditional Sindhi Ajrak & Topi, present regional folk songs, and share indigenous cuisine.'
    },
    {
      title: 'Annual Parent-Teacher Conclave (PTA)',
      date: 'Termly Academic Reviews',
      lang: 'Trilingual Formats',
      description: 'Constructive 1-on-1 progress reviews utilizing our real-time portal diagnostics to support each child’s personalized academic trajectory.'
    },
    {
      title: 'Sindh Literacy & Tech Outreach Drive',
      date: 'Bi-Annual Service Project',
      lang: 'Community Action',
      description: 'SST Senior students mentor young learners in rural Tando Allahyar, Thatta, and Sukkur, donating refurbished laptops and setting up reading corners.'
    },
    {
      title: 'International Cognita Culture Fair',
      date: 'Spring Term',
      lang: 'Global Exchange',
      description: 'Celebrating 16+ countries within the global Cognita schools network, fostering global understanding alongside Spanish and British counterparts.'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <LandingHeader session={null} />

      {/* Hero Banner */}
            {/* HERO BANNER */}
      <section className="relative overflow-hidden bg-[#002E40] text-white py-16 sm:py-24 lg:py-28">
        <HeroVideoBackground
          imageUrl="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=85&w=2400&auto=format&fit=crop"
          posterUrl="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=85&w=2400&auto=format&fit=crop"
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
                  Vibrant School Family
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
                A Warm, Inclusive <span className="text-cyan-300">SST Community</span>
                <span className="block text-2xl sm:text-3xl font-semibold text-slate-300 mt-2">
                  هڪ گڏيل، پرخلوص ۽ علم دوست خاندان
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
                SST is more than a school; it is a close-knit, welcoming family bringing together enthusiastic students, dedicated educators, supportive parents, and an active alumni network across Sindh, Pakistan, and our global Cognita sister schools.
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
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">1,200+</div>
                  <div className="text-[11px] text-slate-300 font-medium">Active Families</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">98%</div>
                  <div className="text-[11px] text-slate-300 font-medium">Parent Satisfaction</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">3</div>
                  <div className="text-[11px] text-slate-300 font-medium">Languages Celebrated</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">24/7</div>
                  <div className="text-[11px] text-slate-300 font-medium">Parent Portal Access</div>
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
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Live Community & Family Stream</span>
                  </div>
                  <Badge className="bg-[#8D1B2D] text-white text-[11px] font-semibold border-none">
                    SST Family
                  </Badge>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Collaborative Parent-Teacher & Student Network
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Connecting parents, alumni, and tech industry mentors through weekly seminars, cultural heritage days, and interactive robotics hackathons.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-cyan-300 font-semibold">Parent Engagement</div>
                    <div className="text-lg font-black text-white">4.9 / 5.0 Rating</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-emerald-300 font-semibold">Alumni Network</div>
                    <div className="text-lg font-black text-white">Global Reach</div>
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

      {/* Interactive Tabs Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-200 pb-4">
            <button
              onClick={() => setActiveTab('houses')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'houses'
                  ? 'bg-[#002E40] text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              The 4 School Houses of Sindh
            </button>
            <button
              onClick={() => setActiveTab('parents')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'parents'
                  ? 'bg-[#002E40] text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Parent-Teacher Partnership
            </button>
            <button
              onClick={() => setActiveTab('alumni')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'alumni'
                  ? 'bg-[#002E40] text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Global Alumni Network
            </button>
            <button
              onClick={() => setActiveTab('service')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'service'
                  ? 'bg-[#002E40] text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Community Outreach in Sindh
            </button>
          </div>

          {/* TAB 1: HOUSES */}
          {activeTab === 'houses' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <Badge className="bg-[#8D1B2D] text-white text-[10px] font-bold uppercase tracking-wider">
                  House System Tradition
                </Badge>
                <h3 className="text-2xl font-bold text-[#002E40]">Four Houses, One United School</h3>
                <p className="text-xs text-slate-600">
                  Every pupil joins a House upon enrollment, building cross-year friendships, peer mentorship, healthy sports competition, and leadership pride named after iconic landmarks of Sindh.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {houses.map((house, idx) => (
                  <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`h-3.5 w-3.5 rounded-full ${house.color}`} />
                        <span className="text-[11px] font-bold text-slate-500">{house.points}</span>
                      </div>
                      <h4 className="text-base font-bold text-[#002E40]">{house.name}</h4>
                      <p className="text-xs font-semibold text-slate-500 italic">"{house.motto}"</p>
                      <p className="text-xs text-slate-600 leading-relaxed">{house.description}</p>
                    </div>
                    <div className="pt-2 border-t border-slate-200 text-[11px] font-medium text-slate-500">
                      Symbol: <strong className="text-slate-800">{house.symbol}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: PARENT PARTNERSHIP */}
          {activeTab === 'parents' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
              <div className="lg:col-span-6 space-y-4">
                <Badge className="bg-[#002E40] text-white text-[10px] font-bold uppercase tracking-wider">
                  Open Door Policy
                </Badge>
                <h3 className="text-2xl font-bold text-[#002E40]">Parents as Co-Educators</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  We believe that children thrive when home and school share the same vision. Our parents enjoy continuous real-time access to assignment progress, AI learning insights, attendance records, and direct messaging with tutors via our dedicated portal.
                </p>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Weekly trilingual newsletters & WhatsApp updates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Parent Coffee Mornings with Academic Dean Muhammad Usman</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Parent workshops on digital wellbeing, adolescent psychology & AI literacy</span>
                  </li>
                </ul>
              </div>
              <div className="lg:col-span-6">
                <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop"
                    alt="Parent Teacher Association"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ALUMNI */}
          {activeTab === 'alumni' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
              <div className="lg:col-span-6 space-y-4">
                <Badge className="bg-[#8D1B2D] text-white text-[10px] font-bold uppercase tracking-wider">
                  Lifelong Connection
                </Badge>
                <h3 className="text-2xl font-bold text-[#002E40]">Alumni Leading Across the World</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Graduates of Sindh School of Technology are shaping medicine at Aga Khan University, pioneering tech startups in Silicon Valley, leading public service in Sindh, and driving finance in London and Dubai.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <div className="text-xl font-bold text-[#002E40]">3,200+</div>
                    <div className="text-[11px] text-slate-600">Alumni in 28 countries</div>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <div className="text-xl font-bold text-[#8D1B2D]">PKR 45M+</div>
                    <div className="text-[11px] text-slate-600">Annual Alumni Scholarships</div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-6">
                <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop"
                    alt="SST Alumni"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SERVICE IN SINDH */}
          {activeTab === 'service' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <Badge className="bg-emerald-800 text-white text-[10px] font-bold uppercase tracking-wider">
                  Social Responsibility
                </Badge>
                <h3 className="text-2xl font-bold text-[#002E40]">Empowering Communities Across Sindh</h3>
                <p className="text-xs text-slate-600">
                  Every SST secondary and Nexus Sixth Form student participates in mandatory community service, translating classroom intellect into tangible social upliftment across our province.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
                  <div className="h-9 w-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-sm">
                    01
                  </div>
                  <h4 className="text-sm font-bold text-[#002E40]">Rural Solar & Clean Water Projects</h4>
                  <p className="text-xs text-slate-600">STEM students assemble low-cost solar filters for flood-affected areas in Dadu and Badin.</p>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
                  <div className="h-9 w-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                    02
                  </div>
                  <h4 className="text-sm font-bold text-[#002E40]">Trilingual Digital Literacy</h4>
                  <p className="text-xs text-slate-600">Conducting Saturday programming and reading clinics in Sindhi and Urdu for local government school pupils.</p>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
                  <div className="h-9 w-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
                    03
                  </div>
                  <h4 className="text-sm font-bold text-[#002E40]">Indus Delta Mangrove Conservation</h4>
                  <p className="text-xs text-slate-600">Annual planting of over 5,000 mangrove saplings along the Arabian Sea coastline in Keti Bandar.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Community Events Calendar Grid */}
      <section className="py-16 bg-slate-100 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <Badge className="bg-[#002E40] text-white text-xs font-bold uppercase tracking-wider">
              Traditions & Celebrations
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002E40]">
              Signature Community Gatherings
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {communityEvents.map((evt, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <Badge className="bg-[#8D1B2D] text-white text-[10px]">{evt.lang}</Badge>
                  <span className="text-xs font-semibold text-slate-500">{evt.date}</span>
                </div>
                <h3 className="text-base font-bold text-[#002E40]">{evt.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{evt.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-gradient-to-r from-[#002E40] to-[#8D1B2D] text-white py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-black">
            Become a Part of Our Growing Family
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto">
            Experience the camaraderie, cultural warmth, and academic enthusiasm that defines the Sindh School of Technology community.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button size="lg" className="bg-white text-[#002E40] hover:bg-slate-100 font-bold px-7 shadow-lg" asChild>
              <Link href="/home#enquiry-form">Schedule a School Visit</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-slate-300 bg-white text-slate-800 hover:bg-slate-100 hover:text-slate-900 font-semibold shadow-xs" asChild>
              <Link href="/why-choose-us/wellbeing-programme">Explore Wellbeing Programme</Link>
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