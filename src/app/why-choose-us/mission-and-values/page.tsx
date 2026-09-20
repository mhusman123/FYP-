'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LandingHeader } from '@/components/landing-header'
import { HeroVideoBackground } from '@/components/hero-video-background'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Sparkles,
  Compass,
  Heart,
  BookOpen,
  Award,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  Languages,
  CheckCircle2,
  Globe,
  Quote,
  Star,
  MapPin,
  Phone,
  Mail,
  Lightbulb,
  Scale,
  X,
  Play
} from 'lucide-react'

export default function MissionAndValuesPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const coreValues = [
    {
      title: 'Excellence (اعلیٰ معیار • شاندار)',
      badge: 'Academic & Character',
      description: 'Striving relentlessly for the highest standards in scholarly pursuits, critical inquiry, and ethical conduct across every discipline.',
      icon: Award,
      color: 'bg-amber-50 text-amber-900 border-amber-200'
    },
    {
      title: 'Integrity (ديانت • صداقت)',
      badge: 'Moral Foundation',
      description: 'Acting with courage, honesty, empathy, and transparent responsibility towards our peers, our school, and the wider Pakistani society.',
      icon: Scale,
      color: 'bg-blue-50 text-[#002E40] border-blue-200'
    },
    {
      title: 'Trilingual Mastery (سه لساني رواني)',
      badge: 'Cultural Identity',
      description: 'Embracing English for global connectivity, Urdu for national unity, and Sindhi for ancestral wisdom, literature, and identity.',
      icon: Languages,
      color: 'bg-rose-50 text-[#8D1B2D] border-rose-200'
    },
    {
      title: 'Innovation & Tech (جدت • ٽيڪنالاجي)',
      badge: 'Future Readiness',
      description: 'Pioneering artificial intelligence, computational robotics, and digital problem-solving to address real-world challenges in Sindh.',
      icon: Lightbulb,
      color: 'bg-cyan-50 text-cyan-900 border-cyan-200'
    },
    {
      title: 'Inclusivity & Empathy (هم آهنگي • گڏپڻ)',
      badge: 'Community',
      description: 'Welcoming learners of every background, cultivating mutual respect, emotional wellbeing, and an atmosphere where all belong.',
      icon: Heart,
      color: 'bg-emerald-50 text-emerald-900 border-emerald-200'
    },
    {
      title: 'Global Citizenship (عالمي شهريت)',
      badge: 'Cognita Network',
      description: 'Empowering young minds with global awareness, cross-cultural competence, and the courage to make meaningful global impacts.',
      icon: Globe,
      color: 'bg-indigo-50 text-indigo-900 border-indigo-200'
    }
  ]

  const faqs = [
    {
      q: 'How does SST embed the heritage of Sindh into its daily curriculum?',
      a: 'We celebrate Sindh’s literary and philosophical history through Sindhi literature modules, Sufi musical traditions, cultural heritage weeks, and regional environmental conservation projects, seamlessly woven into Cambridge and national curricula.'
    },
    {
      q: 'What is the "Learn to Be Yourself" educational philosophy?',
      a: 'Inspired by British pedagogy and localized for Pakistani youth, our philosophy ensures that every student is nurtured as an individual with unique talents, passions, and moral agency, rather than forced into a rigid, one-size-fits-all mold.'
    },
    {
      q: 'How is the trilingual language policy implemented in the classroom?',
      a: 'English serves as the primary instructional medium for sciences, mathematics, and global subjects; Urdu is taught with high literary rigor for national cohesion; and Sindhi is offered with rich cultural depth and board examination tracks.'
    },
    {
      q: 'What role does ethical character development play at SST?',
      a: 'Character education is embedded in our daily pastoral tutor periods, community service initiatives across Sindh, house competitions, and student-led social impact projects.'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <LandingHeader session={null} />

      {/* Hero Banner */}
            {/* HERO BANNER */}
      <section className="relative overflow-hidden bg-[#002E40] text-white py-16 sm:py-24 lg:py-28">
        <HeroVideoBackground
          imageUrl="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=85&w=2400&auto=format&fit=crop"
          posterUrl="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=85&w=2400&auto=format&fit=crop"
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
                  Core Identity & Values
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
                Mission, Vision & <span className="text-cyan-300">Core Values</span>
                <span className="block text-2xl sm:text-3xl font-semibold text-slate-300 mt-2">
                  روشن مستقبل، اعليٰ اخلاق ۽ ڪردار سازي
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
                At Sindh School of Technology, our mission is to inspire every student to "Learn to Be Yourself"—empowering them with unshakeable moral integrity, critical inquiry, and technical innovation. Grounded in the timeless Sufi philosophy of Sindh and international pedagogy, we shape ethical leaders for Pakistan and the world.
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
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">4</div>
                  <div className="text-[11px] text-slate-300 font-medium">Core Pillars</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">100%</div>
                  <div className="text-[11px] text-slate-300 font-medium">Ethical Mentorship</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">3</div>
                  <div className="text-[11px] text-slate-300 font-medium">Languages (EN/UR/SD)</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">18+</div>
                  <div className="text-[11px] text-slate-300 font-medium">Civic Impact Projects</div>
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
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Live Values & Character Stream</span>
                  </div>
                  <Badge className="bg-[#8D1B2D] text-white text-[11px] font-semibold border-none">
                    Core Identity
                  </Badge>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Character Formation & Ethical Technology
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Our students participate in daily pastoral mentorship, ethical AI training, and community leadership initiatives rooted in Sindhi and Pakistani values.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-cyan-300 font-semibold">Pastoral Care</div>
                    <div className="text-lg font-black text-white">100% Student Focus</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-emerald-300 font-semibold">Civic Action</div>
                    <div className="text-lg font-black text-white">All-Sindh Outreach</div>
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

      {/* Mission & Vision Twin Pillars */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Our Mission */}
            <div className="bg-slate-50 rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#002E40]/5 rounded-bl-full pointer-events-none" />
              <Badge className="bg-[#002E40] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">
                Our Mission
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002E40]">
                Empowering Confident, Trilingual Innovators
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                To provide a premier educational environment that challenges each student to achieve academic excellence, cultivate moral integrity, and embrace trilingual fluency in <strong className="font-semibold text-slate-800">English, Urdu, and Sindhi</strong>. We nurture independent thinkers capable of technological innovation, community service, and responsible global citizenship.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>Dual Cambridge and Sindh Board academic curriculum paths</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>Next-generation STEM, AI coding, and robotics labs</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>Individualized pastoral care and emotional wellbeing support</span>
                </li>
              </ul>
            </div>

            {/* Our Vision */}
            <div className="bg-[#002E40] text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full pointer-events-none" />
              <Badge className="bg-[#8D1B2D] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">
                Our Vision
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Sindh's Premier Center of Educational & Tech Excellence
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                To be the leading school network in Sindh and Pakistan, recognized internationally for transformative teaching, trilingual literacy, exceptional university admissions, and graduates who lead with empathy, scientific intellect, and cultural honor.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-200 font-medium">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-cyan-300 flex-shrink-0" />
                  <span>100% placement in prestigious domestic and global universities</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-cyan-300 flex-shrink-0" />
                  <span>Active membership in the global 100+ Cognita school community</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-cyan-300 flex-shrink-0" />
                  <span>Pioneering educational software and open-source learning tools</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Dean's Quote Card */}
          <div className="bg-gradient-to-r from-slate-100 to-amber-50/60 rounded-3xl p-8 border border-slate-200 flex flex-col md:flex-row items-center gap-8 shadow-sm">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-4 border-white shadow-md flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/usman.jpg" alt="Muhammad Usman" className="w-full h-full object-cover object-top" />
            </div>
            <div className="space-y-2">
              <Quote className="h-6 w-6 text-[#8D1B2D] opacity-60" />
              <p className="text-sm sm:text-base font-semibold text-[#002E40] italic leading-relaxed">
                "Our mission is not merely to prepare students for examinations, but to equip them with the resilience, ethical compass, and digital intellect to lead Pakistan's modern transformation."
              </p>
              <div>
                <div className="text-xs font-bold text-[#002E40]">Muhammad Usman</div>
                <div className="text-[11px] text-slate-500 font-medium">Head of School & Academic Dean | Sindh School of Technology</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Core Institutional Values */}
      <section className="py-16 sm:py-20 bg-slate-100 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <Badge className="bg-[#8D1B2D] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md">
              Ethical Pillars
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002E40]">
              The 6 Core Values of SST
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Every lesson, assembly, extra-curricular match, and community service initiative is shaped by our shared moral framework.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((val, idx) => {
              const Icon = val.icon
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="h-10 w-10 rounded-xl bg-[#002E40] text-white flex items-center justify-center">
                        <Icon className="h-5 w-5 text-cyan-300" />
                      </div>
                      <Badge variant="outline" className="text-[10px] font-bold text-slate-600">
                        {val.badge}
                      </Badge>
                    </div>

                    <h3 className="text-base font-bold text-[#002E40]">
                      {val.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {val.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-[#8D1B2D]">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Lived daily across all campuses</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Cultural Heritage of Sindh Section */}
      <section className="py-16 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <Badge className="bg-[#002E40] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md">
                Indus Civilisation Heritage
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002E40]">
                Rooted in Sindh, Open to the Universe
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Sindh is the cradle of peace, poetry, and commerce. We infuse the profound values of Shah Abdul Latif Bhittai, Sachal Sarmast, and the 5,000-year urban engineering genius of Mohenjo-daro into our student projects.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="text-lg font-bold text-[#002E40]">Sufi Wisdom</div>
                  <p className="text-[11px] text-slate-600 mt-1">Peace, universal harmony, tolerance, and respect for all cultures.</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="text-lg font-bold text-[#002E40]">Modern Tech</div>
                  <p className="text-[11px] text-slate-600 mt-1">Harnessing AI, clean green energy, and software to develop Sindh.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop"
                  alt="Sindh School of Technology Campus Life"
                  className="w-full h-auto object-cover"
                />
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
              Frequently Asked Questions
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#002E40]">
              Understanding Our Ethos & Values
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

      {/* CTA Footer Banner */}
      <section className="bg-gradient-to-r from-[#002E40] to-[#8D1B2D] text-white py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-black">
            Experience Our Mission in Action
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto">
            Book a campus tour in Karachi or Hyderabad to meet our educators and see how our values inspire our students every day.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button size="lg" className="bg-white text-[#002E40] hover:bg-slate-100 font-bold px-7 shadow-lg" asChild>
              <Link href="/home#enquiry-form">Book a Campus Tour</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-slate-300 bg-white text-slate-800 hover:bg-slate-100 hover:text-slate-900 font-semibold shadow-xs" asChild>
              <Link href="/why-choose-us/community">Discover SST Community</Link>
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
              <Link href="/why-choose-us/community" className="hover:text-white">Community</Link>
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