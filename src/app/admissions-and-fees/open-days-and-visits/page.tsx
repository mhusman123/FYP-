'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LandingHeader } from '@/components/landing-header'
import { HeroVideoBackground } from '@/components/hero-video-background'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Calendar,
  Users,
  MapPin,
  Clock,
  Phone,
  Mail,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Video,
  Building2,
  Star,
  Quote,
  X,
  Play,
  Languages
} from 'lucide-react'

export default function OpenDaysAndVisitsPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [bookingSubmitted, setBookingSubmitted] = useState(false)
  const [bookingData, setBookingData] = useState({
    parentName: '',
    email: '',
    phone: '',
    visitType: 'Private Family Campus Tour (In-Person)',
    preferredCampus: 'Karachi Main Campus',
    preferredDate: '',
    stageInterest: 'Primary (Years 1 to 6)'
  })

  const visitTypes = [
    {
      title: 'Private Family Campus Tour',
      icon: Users,
      badge: 'Most Popular',
      desc: 'An individual, tailored walkthrough with a senior admissions officer. Inspect smart classrooms, science labs, sports pavilions, and meet our teachers.',
      schedule: 'Every Tuesday & Thursday (9:30 AM & 11:30 AM)'
    },
    {
      title: 'Annual Open Morning & STEM Gala',
      icon: Sparkles,
      badge: 'Full Community Event',
      desc: 'Experience live robotics demonstrations, trilingual debating showcases, choir performances, and hear keynote addresses from Academic Dean Muhammad Usman.',
      schedule: 'Saturday, November 15, 2025 & Saturday, February 21, 2026'
    },
    {
      title: 'Virtual 1-on-1 Discovery Session',
      icon: Video,
      badge: 'Overseas & Diaspora',
      desc: 'A live Zoom video consultation designed for overseas Pakistani families and families relocating to Sindh from other provinces or abroad.',
      schedule: 'Available Daily by Appointment'
    },
    {
      title: 'Pupil Taster Day Experience',
      icon: Calendar,
      badge: 'Immersive Day',
      desc: 'Prospective students spend a full or half day participating in live classes, coding in the makerspace, and joining extra-curricular sports with a buddy.',
      schedule: 'Wednesdays throughout the academic term'
    }
  ]

  const campuses = [
    {
      name: 'Karachi Main Campus (Early Years, Primary & Secondary)',
      address: 'Plot 12-A, Education City / Clifton Block 4, Karachi, Sindh',
      phone: '+92 (021) 3588-9000',
      timing: 'Visiting Hours: 8:30 AM – 3:30 PM'
    },
    {
      name: 'SST Nexus – Sixth Form (Pre-University Campus)',
      address: 'Nexus Campus, Main Clifton / Gulshan Avenue, Karachi, Sindh',
      phone: '+92 (021) 3588-9001',
      timing: 'Visiting Hours: 9:00 AM – 4:00 PM'
    },
    {
      name: 'Hyderabad Campus (Early Years to Secondary)',
      address: 'Auto Bhan Road / Qasimabad, Hyderabad, Sindh',
      phone: '+92 (022) 278-4500',
      timing: 'Visiting Hours: 8:30 AM – 3:30 PM'
    }
  ]

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setBookingSubmitted(true)
  }

  const faqs = [
    {
      q: 'How long does a private campus tour take?',
      a: 'A private family tour typically lasts between 45 to 60 minutes, followed by an informal discussion with an admissions counselor over tea or coffee.'
    },
    {
      q: 'Can both parents and children attend the visit?',
      a: 'Yes! We strongly encourage prospective students to attend with their parents so they can experience the friendly atmosphere and meet potential teachers.'
    },
    {
      q: 'Is parking available on campus for visitors?',
      a: 'Yes, secure on-campus visitor parking is available at all three campus locations in Karachi and Hyderabad with full security assistance.'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <LandingHeader session={null} />

      {/* Hero Banner */}
            {/* HERO BANNER */}
      <section className="relative overflow-hidden bg-[#002E40] text-white py-16 sm:py-24 lg:py-28">
        <HeroVideoBackground
          imageUrl="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=85&w=2400&auto=format&fit=crop"
          posterUrl="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=85&w=2400&auto=format&fit=crop"
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
                  Book a Campus Visit
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
                Open Days & <span className="text-cyan-300">Campus Visits</span>
                <span className="block text-2xl sm:text-3xl font-semibold text-slate-300 mt-2">
                  ڪيمپس جو دورو ڪريو ۽ پنهنجي اکين سان ڏسو
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
                Experience our warm atmosphere, meet Dean Muhammad Usman and our master teachers, tour our AI supercomputing labs and sports arena, and see our trilingual students in action across Karachi & Hyderabad campuses.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Button 
                  size="lg"
                  className="bg-[#8D1B2D] hover:bg-[#741322] text-white font-semibold text-sm px-6 h-12 shadow-lg transition-transform hover:scale-[1.02]"
                  asChild
                >
                  <a href="#book-visit">Book a Guided Visit</a>
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
                  <div className="text-[11px] text-slate-300 font-medium">Visit Formats</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">Mon – Sat</div>
                  <div className="text-[11px] text-slate-300 font-medium">Daily Guided Tours</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">1:1</div>
                  <div className="text-[11px] text-slate-300 font-medium">Dean Consultation</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">100%</div>
                  <div className="text-[11px] text-slate-300 font-medium">Free Registration</div>
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
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Live Campus Visit Stream</span>
                  </div>
                  <Badge className="bg-[#8D1B2D] text-white text-[11px] font-semibold border-none">
                    Book a Tour
                  </Badge>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Personalized Guided Family Walkthrough
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Choose between private morning tours, virtual interactive video meetings, open day taster mornings, or student shadow days.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-cyan-300 font-semibold">Tour Booking</div>
                    <div className="text-lg font-black text-white">Instant Confirmation</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-emerald-300 font-semibold">Campus Meeting</div>
                    <div className="text-lg font-black text-white">Senior Leadership</div>
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

      {/* 4 Visit Formats */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <Badge className="bg-[#002E40] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md">
              Choose Your Visit Experience
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002E40]">
              Four Ways to Experience SST
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Whether visiting in person or connecting online from abroad, we offer flexible visit formats tailored to your family's schedule.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {visitTypes.map((vt, idx) => {
              const Icon = vt.icon
              return (
                <div key={idx} className="bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-2xl bg-white shadow-xs border border-slate-200 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-[#8D1B2D]" />
                    </div>
                    <Badge variant="outline" className="text-xs font-semibold">
                      {vt.badge}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold text-[#002E40]">{vt.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {vt.desc}
                  </p>
                  <div className="pt-2 border-t border-slate-200 flex items-center gap-2 text-xs font-semibold text-emerald-800">
                    <Clock className="h-4 w-4" />
                    <span>{vt.schedule}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Interactive Visit Booking Form */}
      <section id="book-visit-form" className="py-16 sm:py-20 bg-slate-100 border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center space-y-3">
            <Badge className="bg-[#8D1B2D] text-white text-xs font-bold uppercase tracking-wider">
              Online Booking
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002E40]">
              Book Your Visit to Sindh School of Technology
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Select your preferred tour format and campus below. Our admissions team will confirm your reservation.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md">
            {bookingSubmitted ? (
              <div className="text-center py-10 space-y-4 animate-in fade-in">
                <div className="h-16 w-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#002E40]">Visit Reserved Successfully!</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, <strong className="text-slate-800">{bookingData.parentName}</strong>. We look forward to welcoming you to our <strong className="text-slate-800">{bookingData.preferredCampus}</strong> on <strong className="text-slate-800">{bookingData.preferredDate || 'your selected date'}</strong>. A calendar invite has been sent to your email.
                </p>
                <Button className="bg-[#002E40] text-white text-xs font-bold mt-4" onClick={() => setBookingSubmitted(false)}>
                  Book Another Visit
                </Button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#002E40]">Parent / Guardian Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Fahad Siddiqui"
                      value={bookingData.parentName}
                      onChange={(e) => setBookingData({ ...bookingData, parentName: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#002E40]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#002E40]">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. parent@example.com"
                      value={bookingData.email}
                      onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#002E40]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#002E40]">Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+92 300 1234567"
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#002E40]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#002E40]">Visit Format *</label>
                    <select
                      value={bookingData.visitType}
                      onChange={(e) => setBookingData({ ...bookingData, visitType: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#002E40]"
                    >
                      <option>Private Family Campus Tour (In-Person)</option>
                      <option>Virtual 1-on-1 Discovery Session (Zoom)</option>
                      <option>Pupil Taster Day Experience</option>
                      <option>Annual Open Morning & STEM Gala</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#002E40]">Preferred Campus *</label>
                    <select
                      value={bookingData.preferredCampus}
                      onChange={(e) => setBookingData({ ...bookingData, preferredCampus: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#002E40]"
                    >
                      <option>Karachi Main Campus (Clifton)</option>
                      <option>SST Nexus Sixth Form (Clifton/Gulshan)</option>
                      <option>Hyderabad Campus (Qasimabad)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#002E40]">Preferred Visit Date *</label>
                    <input
                      type="date"
                      required
                      value={bookingData.preferredDate}
                      onChange={(e) => setBookingData({ ...bookingData, preferredDate: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#002E40]"
                    />
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full bg-[#8D1B2D] hover:bg-[#741322] text-white font-bold py-3 text-xs shadow-lg">
                  Confirm Visit Reservation
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Campus Locations */}
      <section className="py-16 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <Badge className="bg-[#002E40] text-white text-xs font-bold uppercase tracking-wider">
              Locations in Sindh
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002E40]">
              Our Campuses
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {campuses.map((c, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-[#8D1B2D]">
                  <MapPin className="h-5 w-5 flex-shrink-0" />
                  <h3 className="text-sm font-bold text-[#002E40]">{c.name}</h3>
                </div>
                <p className="text-xs text-slate-600">{c.address}</p>
                <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 space-y-1">
                  <p><strong>Phone:</strong> {c.phone}</p>
                  <p><strong>Hours:</strong> {c.timing}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-slate-100 border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2">
            <Badge className="bg-[#002E40] text-white text-xs font-bold uppercase tracking-wider">
              Visit FAQs
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#002E40]">
              Frequently Asked Questions About Visiting SST
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

      {/* Footer */}
      <footer className="bg-[#1f242b] text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-xs">
          <div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-700 pb-6 gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Sindh School of Technology" className="h-8 w-auto brightness-200" />
            <div className="flex gap-6 text-slate-400">
              <Link href="/home" className="hover:text-white">Home</Link>
              <Link href="/admissions-and-fees" className="hover:text-white">Admissions Hub</Link>
              <Link href="/admissions-and-fees/admissions-process" className="hover:text-white">Process</Link>
              <Link href="/admissions-and-fees/school-fees" className="hover:text-white">School Fees</Link>
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