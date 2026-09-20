'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LandingHeader } from '@/components/landing-header'
import { HeroVideoBackground } from '@/components/hero-video-background'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Newspaper,
  Calendar,
  Sparkles,
  Award,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Star,
  Quote,
  Languages,
  CheckCircle2,
  X,
  Play
} from 'lucide-react'

export default function SchoolNewsPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  const [activeCategory, setActiveCategory] = useState<'all' | 'academic' | 'school-life' | 'sindh'>('all')

  const newsItems = [
    {
      id: 1,
      date: 'April 26, 2025',
      category: 'school-life',
      title: 'Annual Trilingual Declamation Contest: Celebrating English, Urdu, and Sindhi Oratory',
      summary: 'Students across all academic stages demonstrated remarkable eloquence and literary mastery in our annual Trilingual Speech Championship, celebrating our rich cultural heritage and global vision.',
      badge: 'Oratory & Culture',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 2,
      date: 'April 14, 2025',
      category: 'academic',
      title: 'Sindh Education Excellence Award: SST Ranked #1 in Educational Technology & Innovation',
      summary: 'Sindh School of Technology has been officially honored with the prestigious Provincial Gold Standard for AI-assisted STEM pedagogy and comprehensive dual-curriculum outcomes.',
      badge: 'Provincial Ranking',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 3,
      date: 'March 18, 2025',
      category: 'academic',
      title: 'Cambridge CAIE High Achievers & Sindh Board Top Positions',
      summary: 'Our graduating cohort achieved a 100% pass rate with distinction stars in Cambridge O/A Levels and Sindh Board Intermediate examinations, securing admissions to top tier universities.',
      badge: 'Examination Distinction',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 4,
      date: 'February 12, 2025',
      category: 'sindh',
      title: 'Sindh Cultural Heritage & Science Exhibition at SST Nexus Campus',
      summary: 'Bridging cultural pride with modern science: Students presented traditional Sindhi crafts alongside AI robotics, renewable solar prototypes, and IoT agricultural systems.',
      badge: 'Indus Heritage',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 5,
      date: 'January 20, 2025',
      category: 'school-life',
      title: 'Comprehensive Pastoral Care & Seamless Academic Transition for New Students',
      summary: 'Welcoming families from Karachi, Hyderabad, Sukkur, and across Pakistan with our dedicated language immersion advisors and student mentorship programs.',
      badge: 'Pastoral Care',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 6,
      date: 'November 05, 2024',
      category: 'academic',
      title: 'National Robotics & Coding Olympiad Champions',
      summary: 'SST Junior & Senior engineering teams claimed top podium honors at the All-Pakistan Inter-School Coding & Robotics Championship held at Expo Centre.',
      badge: 'STEM Championship',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop'
    }
  ]

  const filteredNews = activeCategory === 'all'
    ? newsItems
    : newsItems.filter(n => n.category === activeCategory)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <LandingHeader session={null} />

      {/* Hero Banner */}
            {/* HERO BANNER */}
      <section className="relative overflow-hidden bg-[#002E40] text-white py-16 sm:py-24 lg:py-28">
        <HeroVideoBackground
          imageUrl="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=85&w=2400&auto=format&fit=crop"
          posterUrl="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=85&w=2400&auto=format&fit=crop"
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
                  Latest Updates & Stories
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
                SST School News & <span className="text-cyan-300">Press Releases</span>
                <span className="block text-2xl sm:text-3xl font-semibold text-slate-300 mt-2">
                  اسڪول جون تازيون خبرون، ڪاميابيون ۽ تعليمي واقعا
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
                Stay up to date with the latest achievements, academic distinctions, science exhibitions, cultural galas, and community milestones at Sindh School of Technology across Karachi and Hyderabad.
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
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">100+</div>
                  <div className="text-[11px] text-slate-300 font-medium">Annual News Stories</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">#1</div>
                  <div className="text-[11px] text-slate-300 font-medium">Provincial Honors</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">100%</div>
                  <div className="text-[11px] text-slate-300 font-medium">Event Coverage</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">Weekly</div>
                  <div className="text-[11px] text-slate-300 font-medium">Newsletter Digest</div>
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
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Live Newsroom & Press Stream</span>
                  </div>
                  <Badge className="bg-[#8D1B2D] text-white text-[11px] font-semibold border-none">
                    SST News
                  </Badge>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    National Hackathons & Science Awards
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Live coverage of our students winning the All-Pakistan Robotics Olympiad, Trilingual Declamation Championship, and STEM honors.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-cyan-300 font-semibold">Robotics Award</div>
                    <div className="text-lg font-black text-white">Gold Medal 2025</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-emerald-300 font-semibold">Speech Trophy</div>
                    <div className="text-lg font-black text-white">Provincial Champions</div>
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

      {/* Filter Tabs & News Cards Grid */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeCategory === 'all'
                  ? 'bg-[#8D1B2D] text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Articles ({newsItems.length})
            </button>
            <button
              onClick={() => setActiveCategory('academic')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeCategory === 'academic'
                  ? 'bg-[#8D1B2D] text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Academic & Rankings
            </button>
            <button
              onClick={() => setActiveCategory('school-life')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeCategory === 'school-life'
                  ? 'bg-[#8D1B2D] text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              School Life & Oratory
            </button>
            <button
              onClick={() => setActiveCategory('sindh')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeCategory === 'sindh'
                  ? 'bg-[#8D1B2D] text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Sindh Culture & Community
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((n) => (
              <div key={n.id} className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
                <div className="h-48 w-full relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={n.image} alt={n.title} className="w-full h-full object-cover" />
                  <Badge className="absolute top-3 left-3 bg-[#002E40] text-white text-[10px]">{n.badge}</Badge>
                </div>
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                      <Calendar className="h-3.5 w-3.5 text-[#8D1B2D]" />
                      <span>{n.date}</span>
                    </div>
                    <h3 className="text-base font-bold text-[#002E40] hover:text-[#8D1B2D] transition-colors line-clamp-2">
                      {n.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {n.summary}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#8D1B2D] flex items-center gap-1">
                      Read full dispatch <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-gradient-to-r from-[#002E40] to-[#8D1B2D] text-white py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-black">
            Be Part of Our Next Success Story
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto">
            Admissions are open for the 2025–2026 academic term across Karachi and Hyderabad.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button size="lg" className="bg-white text-[#002E40] hover:bg-slate-100 font-bold px-7 shadow-lg" asChild>
              <Link href="/home#enquiry-form">Submit Admission Enquiry</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-slate-300 bg-white text-slate-800 hover:bg-slate-100 hover:text-slate-900 font-semibold shadow-xs" asChild>
              <Link href="/our-school/blog">Explore Educational Blog</Link>
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
              <Link href="/our-school/blog" className="hover:text-white">Blog</Link>
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