'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LandingHeader } from '@/components/landing-header'
import { HeroVideoBackground } from '@/components/hero-video-background'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  BookMarked,
  User,
  Clock,
  Sparkles,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Languages,
  Cpu,
  Heart,
  GraduationCap,
  X,
  Play
} from 'lucide-react'

export default function SchoolBlogPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  const [activeCategory, setActiveCategory] = useState<'all' | 'pedagogy' | 'tech' | 'wellbeing'>('all')

  const blogPosts = [
    {
      id: 1,
      title: 'Why Trilingual Literacy in English, Urdu, and Sindhi Boosts Cognitive Intelligence',
      author: 'Muhammad Usman (Academic Dean)',
      role: 'Head of School & Academic Dean',
      readTime: '6 min read',
      date: 'May 10, 2025',
      category: 'pedagogy',
      badge: 'Trilingual Pedagogy',
      summary: 'Research shows that multilingual children exhibit superior executive brain function, cognitive flexibility, and cultural empathy. How our three-language framework prepares students for global leadership.',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 2,
      title: 'The Role of AI Autograding in Modernizing School Homework & Teacher Mentorship',
      author: 'EdTech Research Group',
      role: 'SST Digital Innovation Faculty',
      readTime: '5 min read',
      date: 'April 28, 2025',
      category: 'tech',
      badge: 'Educational AI',
      summary: 'Automating administrative grading through intelligent machine learning allows educators to spend 40% more 1-on-1 time mentoring students and addressing conceptual stumbling blocks.',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 3,
      title: 'Nurturing Adolescent Emotional Resilience in High-Stakes Exam Environments',
      author: 'Dr. Ayesha Memon',
      role: 'Lead Child Psychologist & Pastoral Care',
      readTime: '7 min read',
      date: 'April 15, 2025',
      category: 'wellbeing',
      badge: 'Student Wellbeing',
      summary: 'Exam season does not have to cause burnout. Exploring how mindfulness pauses, sleep hygiene, and pastoral mentorship build emotional endurance for Cambridge and Board examinations.',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 4,
      title: 'From Mohenjo-daro Urban Planning to Modern Robotics: Inspiring STEM in Sindh',
      author: 'Engr. Tariq Baloch',
      role: 'Head of STEM & Robotics Makerspace',
      readTime: '8 min read',
      date: 'March 22, 2025',
      category: 'tech',
      badge: 'Indus Heritage & STEM',
      summary: 'Connecting the 5,000-year urban engineering marvels of the Indus Valley with modern IoT agriculture and renewable energy prototypes developed by our high school scholars.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 5,
      title: 'The British Cambridge Advantage: Why CAIE Qualifications Open Global Doors',
      author: 'Muhammad Usman (Academic Dean)',
      role: 'Head of School & Academic Dean',
      readTime: '5 min read',
      date: 'March 05, 2025',
      category: 'pedagogy',
      badge: 'Higher Education',
      summary: 'An analytical deep-dive into how Cambridge IGCSE and A-Levels train students in critical argumentation, scientific inquiry, and independent research demanded by Oxford, AKU, and Harvard.',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 6,
      title: 'How Early Years Play-Based Inquiry Sets Children Up for Lifelong Academic Success',
      author: 'Naila Soomro',
      role: 'Head of Early Years Foundation Stage',
      readTime: '4 min read',
      date: 'February 18, 2025',
      category: 'pedagogy',
      badge: 'Early Childhood',
      summary: 'Why structured sensory play, phonics games, and nature exploration in the early years create more confident readers and mathematical thinkers by Year 1.',
      image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=800&auto=format&fit=crop'
    }
  ]

  const filteredPosts = activeCategory === 'all'
    ? blogPosts
    : blogPosts.filter(p => p.category === activeCategory)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <LandingHeader session={null} />

      {/* Hero Banner */}
            {/* HERO BANNER */}
      <section className="relative overflow-hidden bg-[#002E40] text-white py-16 sm:py-24 lg:py-28">
        <HeroVideoBackground
          imageUrl="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=85&w=2400&auto=format&fit=crop"
          posterUrl="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=85&w=2400&auto=format&fit=crop"
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
                  Thought Leadership
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
                Educational Insights & <span className="text-cyan-300">Academic Blog</span>
                <span className="block text-2xl sm:text-3xl font-semibold text-slate-300 mt-2">
                  تعليمي مضمون، فڪري بصيرت ۽ ماهرن جا رايا
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
                Expert articles, pedagogical insights, and parenting advice written by our academic dean, master teachers, and educational psychologists on AI in education, trilingual development, and future careers.
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
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">50+</div>
                  <div className="text-[11px] text-slate-300 font-medium">Published Articles</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">3</div>
                  <div className="text-[11px] text-slate-300 font-medium">Languages (EN/UR/SD)</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">15,000+</div>
                  <div className="text-[11px] text-slate-300 font-medium">Monthly Readers</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">100%</div>
                  <div className="text-[11px] text-slate-300 font-medium">Peer-Reviewed</div>
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
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Live Educational Blog Stream</span>
                  </div>
                  <Badge className="bg-[#8D1B2D] text-white text-[11px] font-semibold border-none">
                    SST Blog
                  </Badge>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    AI Trends & Trilingual Cognitive Science
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Deep dive into how early bilingualism and computational thinking enhance cognitive performance, logic synthesis, and university success.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-cyan-300 font-semibold">Featured Article</div>
                    <div className="text-lg font-black text-white">AI in High School</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-emerald-300 font-semibold">Research Dean</div>
                    <div className="text-lg font-black text-white">Muhammad Usman</div>
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

      {/* Filter Tabs & Blog Grid */}
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
              All Articles ({blogPosts.length})
            </button>
            <button
              onClick={() => setActiveCategory('pedagogy')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeCategory === 'pedagogy'
                  ? 'bg-[#8D1B2D] text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Pedagogy & Trilingualism
            </button>
            <button
              onClick={() => setActiveCategory('tech')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeCategory === 'tech'
                  ? 'bg-[#8D1B2D] text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              EdTech & AI Innovation
            </button>
            <button
              onClick={() => setActiveCategory('wellbeing')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeCategory === 'wellbeing'
                  ? 'bg-[#8D1B2D] text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Wellbeing & Mental Health
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div key={post.id} className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
                <div className="h-48 w-full relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                  <Badge className="absolute top-3 left-3 bg-[#002E40] text-white text-[10px]">{post.badge}</Badge>
                </div>
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                      <span>{post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                    </div>
                    <h3 className="text-base font-bold text-[#002E40] hover:text-[#8D1B2D] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                    <div className="text-[11px] font-bold text-slate-700">
                      {post.author}
                    </div>
                    <span className="text-xs font-bold text-[#8D1B2D] flex items-center gap-1">
                      Read essay <ArrowRight className="h-3.5 w-3.5" />
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
            Experience Future-Ready Education in Sindh
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto">
            Explore our academic programmes and enroll for the upcoming term.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button size="lg" className="bg-white text-[#002E40] hover:bg-slate-100 font-bold px-7 shadow-lg" asChild>
              <Link href="/home#enquiry-form">Submit Admission Enquiry</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-slate-300 bg-white text-slate-800 hover:bg-slate-100 hover:text-slate-900 font-semibold shadow-xs" asChild>
              <Link href="/our-school/your-childs-journey">Your Child's Journey</Link>
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
              <Link href="/our-school/school-news" className="hover:text-white">News</Link>
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