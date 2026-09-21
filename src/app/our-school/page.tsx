'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LandingHeader } from '@/components/landing-header'
import { HeroVideoBackground } from '@/components/hero-video-background'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  School,
  Sparkles,
  Compass,
  Baby,
  BookOpen,
  GraduationCap,
  Building2,
  Newspaper,
  BookMarked,
  Info,
  ChevronRight,
  ShieldCheck,
  Star,
  Quote,
  Play,
  X,
  Languages,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Phone,
  Mail
} from 'lucide-react'

export default function OurSchoolPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  const schoolSections = [
    {
      title: 'Your Child’s Journey',
      tagline: 'From Age 2 to 18: A Seamless Progression',
      desc: 'Discover how we nurture curiosity in Early Years, build strong trilingual literacy in Primary, develop critical mastery in Secondary, and achieve global admission in Sixth Form.',
      icon: Compass,
      href: '/our-school/your-childs-journey',
      badge: 'Holistic Pathway',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Early Years Foundation Stage (EYFS)',
      tagline: 'Ages 2–5 • Pre-Nursery, Nursery & Reception',
      desc: 'Play-based inquiry, safe sensory discovery gardens, and phonics in English, Urdu, and Sindhi, cultivating confidence and joy in learning from the earliest years.',
      icon: Baby,
      href: '/our-school/early-years-foundation-stage',
      badge: 'Ages 2–5',
      image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Primary Education',
      tagline: 'Ages 5–11 • Key Stage 1 & Key Stage 2',
      desc: 'Cambridge Primary curriculum, 1:1 iPad learning, robotics makerspaces, and introduction of French/Arabic foreign languages alongside deep Urdu and Sindhi roots.',
      icon: BookOpen,
      href: '/our-school/primary-education',
      badge: 'Ages 5–11',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Secondary Education',
      tagline: 'Ages 11–16 • Key Stage 3 & IGCSE',
      desc: 'Advanced experimental sciences, computer science, trilingual debate societies, and official Cambridge IGCSE and Sindh Board Matriculation certifications.',
      icon: GraduationCap,
      href: '/our-school/secondary-education',
      badge: 'Ages 11–16',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'SST Nexus – Sixth Form',
      tagline: 'Ages 16–18 • Cambridge A-Levels & Inter',
      desc: 'An exclusive pre-university campus offering tailored 1-on-1 career counseling, SAT/MDCAT/ECAT clinics, and direct pathways to top global and Pakistani universities.',
      icon: School,
      href: '/our-school/sixth-form',
      badge: 'Ages 16–18',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop'
    },
    {
      title: 'School Information & Regulations',
      tagline: 'Timings, Term Dates & Guidelines',
      desc: 'Essential practical information for families: daily schedules, term calendars, uniform guidelines (including Sindhi cultural attire), and health protocols.',
      icon: Info,
      href: '/our-school/school-information',
      badge: 'Essential Guide',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Campus Facilities',
      tagline: 'World-Class STEM Labs, Studios & Sports',
      desc: 'Explore our state-of-the-art infrastructure: heated semi-Olympic 25m swimming pool, FIFA astroturf, soundproof recording suites, and AI robotics makerspaces.',
      icon: Building2,
      href: '/our-school/facilities',
      badge: 'Infrastructure',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'School News & Events',
      tagline: 'Stories & Celebrations Across Sindh',
      desc: 'Stay informed with our latest student achievements, academic rankings, cultural days, robotics olympiads, and community service projects.',
      icon: Newspaper,
      href: '/our-school/school-news',
      badge: 'Latest Updates',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'School Blog & Thought Leadership',
      tagline: 'Insights from Educators & Dean Usman',
      desc: 'Thought leadership articles on modern pedagogy, AI in classroom learning, adolescent emotional wellness, and trilingual language acquisition.',
      icon: BookMarked,
      href: '/our-school/blog',
      badge: 'Academic Blog',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <LandingHeader session={null} />

      {/* Hero Banner */}
            {/* HERO BANNER */}
      <section className="relative overflow-hidden bg-[#002E40] text-white pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 lg:pb-20">
        <HeroVideoBackground
          imageUrl="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=85&w=2400&auto=format&fit=crop"
          posterUrl="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=85&w=2400&auto=format&fit=crop"
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
                  State-of-the-Art Campuses
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
                Our School: <span className="text-cyan-300">Campuses & Community</span>
                <span className="block text-2xl sm:text-3xl font-semibold text-slate-300 mt-2">
                  اسان جو اسڪول: جديد ڪيمپس، ڪلاس روم ۽ تدريسي مرڪز
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
                Welcome to Sindh School of Technology: featuring two purpose-built campuses equipped with state-of-the-art AI laboratories, robotics arenas, sports complexes, libraries, and performing arts auditoriums across Karachi and Hyderabad.
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
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">2</div>
                  <div className="text-[11px] text-slate-300 font-medium">Campuses in Sindh</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">50+</div>
                  <div className="text-[11px] text-slate-300 font-medium">Modern Classrooms</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">100%</div>
                  <div className="text-[11px] text-slate-300 font-medium">Wi-Fi 6 Campus</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">2 – 18</div>
                  <div className="text-[11px] text-slate-300 font-medium">Ages Educated</div>
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
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Live Campus Facility Stream</span>
                  </div>
                  <Badge className="bg-[#8D1B2D] text-white text-[11px] font-semibold border-none">
                    Campus Overview
                  </Badge>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Smart IoT Classrooms & High-Tech Facilities
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Experience our vibrant learning spaces designed for safety, innovation, and holistic development for all age groups in Sindh.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-cyan-300 font-semibold">Campus Security</div>
                    <div className="text-lg font-black text-white">24/7 AI-Monitored</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-emerald-300 font-semibold">Science Labs</div>
                    <div className="text-lg font-black text-white">Advanced CAIE Spec</div>
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

      {/* Leadership Message */}
      <section className="py-14 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-md flex flex-col md:flex-row items-center gap-8">
            <div className="relative flex-shrink-0">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-4 border-white shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/usman.jpg"
                  alt="Muhammad Usman - Head of School & Academic Dean"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <Badge className="absolute -bottom-2.5 -right-2.5 bg-[#8D1B2D] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md">
                Academic Dean
              </Badge>
            </div>

            <div className="space-y-3 text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8D1B2D]">
                <Star className="h-3.5 w-3.5 fill-[#8D1B2D]" />
                Head of School Welcome
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#002E40]">
                "A school where academic ambition meets character, technology, and cultural identity."
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Sindh School of Technology offers a continuous, joyful educational journey from our nurturing Early Years through to our pre-university Nexus Sixth Form. We equip students with British academic rigor, moral courage, and trilingual fluency to lead Pakistan into a bright, innovative future.
              </p>
              <div className="pt-1">
                <div className="text-sm font-bold text-[#002E40]">Muhammad Usman</div>
                <div className="text-xs text-slate-500 font-medium">Head of School & Academic Dean | Sindh School of Technology</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9 Core School Sections Grid */}
      <section className="py-16 sm:py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <Badge className="bg-[#002E40] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md">
              Explore Our Institution
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002E40]">
              Discover Our School Departments & Life
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Click into any of the areas below to explore our academic stages, facilities, student news, and school guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {schoolSections.map((sec, idx) => {
              const Icon = sec.icon
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={sec.image}
                      alt={sec.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <Badge className="absolute top-3 left-3 bg-[#002E40]/90 backdrop-blur-md text-white border-white/20 text-[10px] font-bold">
                      {sec.badge}
                    </Badge>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                          <Icon className="h-4 w-4 text-cyan-300" />
                        </div>
                        <span className="text-xs font-semibold text-white/90 truncate">{sec.tagline}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-[#002E40] group-hover:text-[#8D1B2D] transition-colors">
                        {sec.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        {sec.desc}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        href={sec.href}
                        className="text-xs font-bold text-[#002E40] hover:text-[#8D1B2D] flex items-center gap-1 group-hover:gap-2 transition-all"
                      >
                        <span>Explore section</span>
                        <ArrowRight className="h-3.5 w-3.5 text-[#8D1B2D]" />
                      </Link>
                      <span className="text-[10px] font-semibold text-slate-400">Department Info</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-gradient-to-r from-[#002E40] to-[#8D1B2D] text-white py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <Badge className="bg-white/20 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md">
            Admissions Open
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-black">
            Join the Sindh School of Technology Family
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 max-w-2xl mx-auto font-light leading-relaxed">
            Experience our vibrant campuses in Karachi and Hyderabad. Book a private tour to meet our educators and explore our state-of-the-art facilities.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button size="lg" className="bg-white text-[#002E40] hover:bg-slate-100 font-bold px-8 shadow-xl" asChild>
              <Link href="/home#enquiry-form">Submit Admission Enquiry</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-slate-300 bg-white text-slate-800 hover:bg-slate-100 hover:text-slate-900 font-semibold shadow-xs" onClick={() => setIsVideoOpen(true)}>
              <Play className="h-4 w-4 mr-2 text-cyan-300 fill-cyan-300" />
              Watch Video Tour
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1f242b] text-slate-300 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Sindh School of Technology" className="h-9 w-auto brightness-200" />
              <p className="text-xs text-slate-400 leading-relaxed">
                Sindh School of Technology — Providing premier trilingual education in English, Urdu, and Sindhi, fostering intellectual brilliance, digital technology leadership, and moral character.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">Our Campuses in Sindh</h4>
              <div className="space-y-2 text-xs text-slate-400">
                <p className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-[#8D1B2D] flex-shrink-0 mt-0.5" />
                  <span>Karachi Main Campus: Early Years, Primary & Secondary</span>
                </p>
                <p className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>SST Nexus Sixth Form: Clifton / Gulshan, Karachi</span>
                </p>
                <p className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Hyderabad Campus: Qasimabad / Auto Bhan, Sindh</span>
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">Our School Links</h4>
              <ul className="space-y-1.5 text-xs text-slate-400 font-medium">
                <li><Link href="/our-school/your-childs-journey" className="hover:text-white">Your Child’s Journey</Link></li>
                <li><Link href="/our-school/early-years-foundation-stage" className="hover:text-white">Early Years (EYFS)</Link></li>
                <li><Link href="/our-school/primary-education" className="hover:text-white">Primary Education</Link></li>
                <li><Link href="/our-school/secondary-education" className="hover:text-white">Secondary Education</Link></li>
                <li><Link href="/our-school/sixth-form" className="hover:text-white">SST Nexus Sixth Form</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">Admissions Contact</h4>
              <div className="space-y-2 text-xs text-slate-400">
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-emerald-400" />
                  <span>+92 (021) 3588-9000</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-emerald-400" />
                  <span>WhatsApp: +92 300 1234567</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <span>admissions@sst.edu.pk</span>
                </p>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-700/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© 2026 Sindh School of Technology (SST). All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-slate-400">Privacy Policy</Link>
              <Link href="#" className="hover:text-slate-400">Terms of Service</Link>
              <Link href="#" className="hover:text-slate-400">Academic Regulations</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/20">
            <div className="flex items-center justify-between p-4 bg-slate-900 text-white">
              <div className="flex items-center gap-2">
                <Play className="h-4 w-4 text-cyan-300 fill-cyan-300" />
                <span className="text-xs sm:text-sm font-bold">Discover Sindh School of Technology</span>
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
                src="https://www.youtube.com/embed/V1H-D4bevEw?autoplay=1"
                title="Discover Sindh School of Technology"
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
