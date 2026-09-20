'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LandingHeader } from '@/components/landing-header'
import { HeroVideoBackground } from '@/components/hero-video-background'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Building2,
  Cpu,
  FlaskConical,
  Activity,
  Music,
  BookOpen,
  Coffee,
  Sparkles,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Play,
  X,
  MapPin,
  Star,
  Quote,
  Languages,
  Maximize2,
  Eye
} from 'lucide-react'

export default function FacilitiesPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [activeImagePreview, setActiveImagePreview] = useState<{ url: string; title: string; desc: string } | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const facilities = [
    {
      title: 'Smart STEM & AI Robotics Makerspaces',
      icon: Cpu,
      badge: 'EdTech & AI',
      desc: 'Equipped with 3D printers, laser cutters, Arduino microcontrollers, Raspberry Pi clusters, and AI vision hardware for student engineering innovations.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Advanced Science Laboratory Suites',
      icon: FlaskConical,
      badge: 'Experimental Science',
      desc: 'Purpose-built Physics, Chemistry, Biology, and Environmental Science suites featuring digital data-loggers and precision microscopes.',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Semi-Olympic Heated Swimming Pool',
      icon: Activity,
      badge: 'Aquatics',
      desc: '25-meter 6-lane heated indoor swimming facility with automated filtration, spectator seating, and certified lifeguards for year-round training.',
      image: 'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'FIFA Astroturf & Cricket Pavilion',
      icon: Activity,
      badge: 'Athletics & Sports Complex',
      desc: 'All-weather floodlit football pitch, grass cricket nets, basketball courts, and covered multi-sport arenas for athletics and martial arts.',
      image: '/sports-astroturf-pavilion.jpg'
    },
    {
      title: 'Soundproof Music & Recording Studios',
      icon: Music,
      badge: 'Creative Arts',
      desc: 'Acoustically treated live recording suites, digital audio workstations (DAWs), grand pianos, and a full range of Eastern Sindhi & Western instruments.',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Central Trilingual Digital Library',
      icon: BookOpen,
      badge: 'Knowledge Hub',
      desc: 'Over 25,000 physical titles in English, Urdu, and Sindhi, digital e-book terminals, private study carrels, and collaborative presentation spaces.',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop'
    }
  ]

  const faqs = [
    {
      q: 'Are facilities accessible across all campuses in Karachi and Hyderabad?',
      a: 'Yes, both our Karachi Main Campus and Hyderabad Campus feature full science labs, robotics makerspaces, sports grounds, and digital libraries.'
    },
    {
      q: 'Can parents visit and tour the facilities before enrolling?',
      a: 'Yes! We host guided campus tours every Tuesday and Thursday where parents can inspect classrooms, sports complexes, and meet heads of departments.'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <LandingHeader session={null} />

      {/* Hero Banner */}
            {/* HERO BANNER */}
      <section className="relative overflow-hidden bg-[#002E40] text-white pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 lg:pb-20">
        <HeroVideoBackground
          imageUrl="https://images.unsplash.com/photo-1518770660439-4636190af475?q=85&w=2400&auto=format&fit=crop"
          posterUrl="https://images.unsplash.com/photo-1518770660439-4636190af475?q=85&w=2400&auto=format&fit=crop"
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
                  Modern Infrastructure
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
                World-Class <span className="text-cyan-300">Campus Facilities</span>
                <span className="block text-2xl sm:text-3xl font-semibold text-slate-300 mt-2">
                  جديد ليبارٽريون، اسپورٽس ڪامپليڪس ۽ ٽيڪ سينٽر
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
                Designed for 21st-century educational excellence: Supercomputing AI & Robotics Laboratories, Multi-Disciplinary Science Suites, Semi-Olympic Swimming Pool, FIFA-standard Futsal Field, Modern Libraries, and 500-seat Auditoriums.
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
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">10+</div>
                  <div className="text-[11px] text-slate-300 font-medium">Specialized Labs</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">500-Seat</div>
                  <div className="text-[11px] text-slate-300 font-medium">Arts Auditorium</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">25m</div>
                  <div className="text-[11px] text-slate-300 font-medium">Indoor Pool</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">2</div>
                  <div className="text-[11px] text-slate-300 font-medium">Library Centers</div>
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
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Live Facilities & Tech Labs Stream</span>
                  </div>
                  <Badge className="bg-[#8D1B2D] text-white text-[11px] font-semibold border-none">
                    Campus Tour
                  </Badge>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Supercomputing Cluster & Maker Studios
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Interactive virtual view of our 3D prototyping labs, robotics arenas, sports pavilions, and high-speed fiber-optic network core.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-cyan-300 font-semibold">Supercomputing</div>
                    <div className="text-lg font-black text-white">NVIDIA GPU Powered</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-emerald-300 font-semibold">Sports Arena</div>
                    <div className="text-lg font-black text-white">Floodlit Multi-Sport</div>
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

      {/* Facilities Grid */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <Badge className="bg-[#002E40] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md">
              Purpose-Built Spaces
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002E40]">
              Explore Our Specialist Spaces
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((fac, idx) => {
              const Icon = fac.icon
              return (
                <div key={idx} className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
                  <div 
                    onClick={() => setActiveImagePreview({
                      url: fac.image,
                      title: fac.title,
                      desc: fac.desc
                    })}
                    className="h-48 w-full relative overflow-hidden cursor-pointer group"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={fac.image} alt={fac.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <Badge className="absolute top-3 left-3 bg-[#002E40] text-white text-[10px]">{fac.badge}</Badge>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="bg-black/70 text-white text-[11px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-xs">
                        <Eye className="h-3.5 w-3.5" /> Enlarge Photo
                      </span>
                    </div>
                  </div>
                  <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Icon className="h-5 w-5 text-[#8D1B2D]" />
                        <h3 className="text-base font-bold text-[#002E40]">{fac.title}</h3>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{fac.desc}</p>
                    </div>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setActiveImagePreview({
                          url: fac.image,
                          title: fac.title,
                          desc: fac.desc
                        })}
                        className="text-xs font-semibold text-[#8D1B2D] hover:text-[#741322] flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Space Photo</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-slate-100 border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2">
            <Badge className="bg-[#002E40] text-white text-xs font-bold uppercase tracking-wider">
              Facility FAQs
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#002E40]">
              Frequently Asked Questions About Campus Amenities
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
            Experience Our Campus in Person
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto">
            Book a physical or virtual tour of our Karachi or Hyderabad campuses today.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button size="lg" className="bg-white text-[#002E40] hover:bg-slate-100 font-bold px-7 shadow-lg" asChild>
              <Link href="/home#enquiry-form">Schedule Campus Tour</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-slate-300 bg-white text-slate-800 hover:bg-slate-100 hover:text-slate-900 font-semibold shadow-xs" asChild>
              <Link href="/our-school/school-news">Read School News</Link>
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

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/20">
            <div className="flex items-center justify-between p-4 bg-slate-900 text-white">
              <div className="flex items-center gap-2">
                <Play className="h-4 w-4 text-cyan-300 fill-cyan-300" />
                <span className="text-xs sm:text-sm font-bold">Campus Facilities — Sindh School of Technology</span>
              </div>
              <button onClick={() => setIsVideoOpen(false)} className="h-8 w-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="relative w-full aspect-video">
              <iframe
                src="https://www.youtube.com/embed/V1H-D4bevEw?autoplay=1"
                title="SST Facilities"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}

      {/* Image Lightbox Modal */}
      {activeImagePreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-5xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-white/20">
            <div className="flex items-center justify-between p-4 bg-[#001724] border-b border-white/10 text-white">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-cyan-300" />
                <span className="text-xs sm:text-sm font-bold">{activeImagePreview.title}</span>
              </div>
              <button
                onClick={() => setActiveImagePreview(null)}
                className="h-8 w-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close photo preview"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="relative w-full max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeImagePreview.url}
                alt={activeImagePreview.title}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
            </div>
            <div className="p-4 bg-[#001724] border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-white">
              <p className="text-xs text-slate-300 font-normal">
                {activeImagePreview.desc}
              </p>
              <Button
                size="sm"
                onClick={() => setActiveImagePreview(null)}
                className="bg-[#8D1B2D] hover:bg-[#741322] text-white text-xs h-8 px-4"
              >
                Close Preview
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
