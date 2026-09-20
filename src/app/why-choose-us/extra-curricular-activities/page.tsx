'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LandingHeader } from '@/components/landing-header'
import { HeroVideoBackground } from '@/components/hero-video-background'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Trophy,
  Activity,
  Code,
  Globe,
  Palette,
  Compass,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Sparkles,
  Shield,
  Star,
  Quote,
  Target,
  X,
  Play,
  Languages
} from 'lucide-react'

export default function ExtraCurricularActivitiesPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  const [activeCategory, setActiveCategory] = useState<'all' | 'sports' | 'academic' | 'arts' | 'leadership'>('all')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const activities = [
    // Sports
    {
      name: 'Championship Cricket Academy',
      category: 'sports',
      badge: 'Competitive Sports',
      description: 'Professional grass pitches, automated bowling nets, and coaching by PCB-certified trainers competing in inter-school tournaments.',
      icon: Activity
    },
    {
      name: 'FIFA-Standard Football & Futsal',
      category: 'sports',
      badge: 'Competitive Sports',
      description: 'All-weather floodlit astroturf pitches hosting boys and girls teams in regional Karachi & Sindh school leagues.',
      icon: Trophy
    },
    {
      name: 'Semi-Olympic Heated Swimming',
      category: 'sports',
      badge: 'Aquatics',
      description: '25-meter 6-lane heated indoor swimming pool with certified lifeguards and swimming technique training.',
      icon: Activity
    },
    {
      name: 'Martial Arts & Taekwondo',
      category: 'sports',
      badge: 'Discipline',
      description: 'Black-belt instruction cultivating physical agility, mental self-discipline, and self-defense skills.',
      icon: Target
    },

    // Academic & Tech
    {
      name: 'Trilingual Debating Society',
      category: 'academic',
      badge: 'Oratory & Logic',
      description: 'Parliamentary debates and declamations in English, Urdu, and Sindhi competing at national championships.',
      icon: Globe
    },
    {
      name: 'Model United Nations (SST-MUN)',
      category: 'academic',
      badge: 'Diplomacy',
      description: 'Simulating global diplomacy, international security, and geopolitical policy negotiations.',
      icon: Globe
    },
    {
      name: 'AI & Competitive Coding Club',
      category: 'academic',
      badge: 'EdTech',
      description: 'Hackathons, algorithm design, Python machine learning, and national robotics olympiad preparation.',
      icon: Code
    },
    {
      name: 'Sindhi Adabi Sangat (Junior)',
      category: 'academic',
      badge: 'Literature',
      description: 'Exploring Sindhi prose, poetry recitals (Bait-bazi), storytelling, and publishing the school trilingual journal.',
      icon: Compass
    },

    // Creative Arts
    {
      name: 'Dramatic Society & Shakespeare Guild',
      category: 'arts',
      badge: 'Theatre',
      description: 'Full-scale theatrical productions, classical drama, musical theater, and stagecraft lighting design.',
      icon: Palette
    },
    {
      name: 'Islamic Calligraphy & Ajrak Block-Printing',
      category: 'arts',
      badge: 'Visual Arts',
      description: 'Preserving heritage arts: classical Thuluth calligraphy, geometric tessellations, and indigenous Sindhi textile crafts.',
      icon: Palette
    },
    {
      name: 'Digital Photography & Cinema Society',
      category: 'arts',
      badge: 'Media Arts',
      description: 'DSLR cinematography, documentary filmmaking, drone photography, and professional photo editing.',
      icon: Sparkles
    },

    // Leadership
    {
      name: 'Duke of Edinburgh International Award',
      category: 'leadership',
      badge: 'Global Award',
      description: 'Bronze, Silver, and Gold award expeditions across the scenic landscape of Sindh and Northern Pakistan.',
      icon: Shield
    },
    {
      name: 'Eco-Warriors & Climate Youth Council',
      category: 'leadership',
      badge: 'Sustainability',
      description: 'Student-driven environmental campaigns: campus composting, mangrove reforestation, and plastic-free zones.',
      icon: Globe
    }
  ]

  const filtered = activeCategory === 'all'
    ? activities
    : activities.filter(a => a.category === activeCategory)

  const faqs = [
    {
      q: 'How many extra-curricular activities can a student join?',
      a: 'Students are encouraged to select at least two activities per term — typically one physical/sports activity and one academic/creative society.'
    },
    {
      q: 'Are extra-curricular clubs included in the regular tuition fee?',
      a: 'Over 80% of our clubs are completely free of charge and integrated into the extended school day schedule (3:00 PM – 4:30 PM).'
    },
    {
      q: 'Do teams travel for national competitions?',
      a: 'Yes, SST sports teams, debate delegations, and robotics teams regularly travel across Pakistan for tournaments in Karachi, Lahore, Islamabad, and Hyderabad.'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <LandingHeader session={null} />

      {/* Hero Banner */}
            {/* HERO BANNER */}
      <section className="relative overflow-hidden bg-[#002E40] text-white py-16 sm:py-24 lg:py-28">
        <HeroVideoBackground
          imageUrl="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=85&w=2400&auto=format&fit=crop"
          posterUrl="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=85&w=2400&auto=format&fit=crop"
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
                  45+ Clubs & Sports
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
                Extra-Curricular & <span className="text-cyan-300">Robotics Olympiads</span>
                <span className="block text-2xl sm:text-3xl font-semibold text-slate-300 mt-2">
                  رانديون، روبوٽڪس مقابلا ۽ غير نصابي سرگرميون
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
                Over 45 co-curricular clubs spanning Autonomous Robotics, Drone Racing, Competitive Coding, All-Pakistan Debating, Model UN, Futsal, Cricket, Swimming, and Cultural Heritage Preservation across our campuses in Sindh.
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
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">45+</div>
                  <div className="text-[11px] text-slate-300 font-medium">Clubs & Societies</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">15+</div>
                  <div className="text-[11px] text-slate-300 font-medium">Sports Disciplines</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">#1</div>
                  <div className="text-[11px] text-slate-300 font-medium">Robotics Champions</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">100%</div>
                  <div className="text-[11px] text-slate-300 font-medium">Student Participation</div>
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
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Live Robotics & Athletics Stream</span>
                  </div>
                  <Badge className="bg-[#8D1B2D] text-white text-[11px] font-semibold border-none">
                    Student Life
                  </Badge>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Autonomous Drone Arena & Sports Complexes
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Live view of student engineering teams testing robotics hardware, preparing for national olympiads, and competing on athletic fields.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-cyan-300 font-semibold">Robotics Squad</div>
                    <div className="text-lg font-black text-white">National Gold</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-emerald-300 font-semibold">Sports Arena</div>
                    <div className="text-lg font-black text-white">FIFA-Standard Turf</div>
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

      {/* Clubs & Activities Explorer */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <Badge className="bg-[#002E40] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md">
              Discover Your Passion
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002E40]">
              Extra-Curricular Clubs Directory
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Filter by category to explore our diverse range of athletics, academic societies, creative arts, and leadership programs.
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeCategory === 'all'
                    ? 'bg-[#8D1B2D] text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Clubs ({activities.length})
              </button>
              <button
                onClick={() => setActiveCategory('sports')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeCategory === 'sports'
                    ? 'bg-[#8D1B2D] text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Sports & Athletics
              </button>
              <button
                onClick={() => setActiveCategory('academic')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeCategory === 'academic'
                    ? 'bg-[#8D1B2D] text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Debates, STEM & Model UN
              </button>
              <button
                onClick={() => setActiveCategory('arts')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeCategory === 'arts'
                    ? 'bg-[#8D1B2D] text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Theatre, Art & Media
              </button>
              <button
                onClick={() => setActiveCategory('leadership')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeCategory === 'leadership'
                    ? 'bg-[#8D1B2D] text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Leadership & Sustainability
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="h-10 w-10 rounded-xl bg-[#002E40] text-white flex items-center justify-center">
                        <Icon className="h-5 w-5 text-emerald-300" />
                      </div>
                      <Badge variant="outline" className="text-[10px] font-bold text-slate-600">
                        {item.badge}
                      </Badge>
                    </div>
                    <h3 className="text-base font-bold text-[#002E40]">{item.name}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-200 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Open to Boys & Girls</span>
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
              <Quote className="h-6 w-6 text-emerald-300 opacity-80" />
              <p className="text-sm sm:text-base font-medium italic leading-relaxed text-white">
                "Leadership is not forged on test papers alone; it is forged on the sports pitch, at the debate podium, and during community expeditions across the length and breadth of Sindh."
              </p>
              <div>
                <div className="text-xs font-bold text-emerald-300">Muhammad Usman</div>
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
              ECA FAQs
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#002E40]">
              Frequently Asked Questions About Clubs & Sports
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
            Ignite Your Child's Passions at SST
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto">
            Book a campus visit to inspect our cricket pavilions, indoor swimming facilities, and makerspaces.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button size="lg" className="bg-white text-[#002E40] hover:bg-slate-100 font-bold px-7 shadow-lg" asChild>
              <Link href="/home#enquiry-form">Book Sports & Arts Tour</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-slate-300 bg-white text-slate-800 hover:bg-slate-100 hover:text-slate-900 font-semibold shadow-xs" asChild>
              <Link href="/why-choose-us/summer-school">Explore Summer School</Link>
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