'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LandingHeader } from '@/components/landing-header'
import { HeroVideoBackground } from '@/components/hero-video-background'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  FileCheck,
  CheckCircle2,
  Calendar,
  Users,
  Compass,
  ChevronRight,
  ChevronDown,
  Phone,
  Mail,
  FileText,
  Clock,
  Star,
  Quote,
  Languages,
  Award,
  AlertCircle,
  X,
  Play,
  Sparkles
} from 'lucide-react'

export default function AdmissionsProcessPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [formStep, setFormStep] = useState<1 | 2 | 3>(1)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    childName: '',
    childDob: '',
    stage: 'Primary (Years 1 to 6)',
    campus: 'Karachi Main Campus',
    message: ''
  })

  const admissionSteps = [
    {
      step: '01',
      title: 'Initial Enquiry & Prospectus',
      badge: 'Step 1',
      desc: 'Submit our brief online enquiry form or contact our admissions team by phone or WhatsApp. We will provide our comprehensive trilingual prospectus and discuss suitable entry points.'
    },
    {
      step: '02',
      title: 'Private Campus Tour & Taster Visit',
      badge: 'Step 2',
      desc: 'Book an in-person or virtual walkthrough of our state-of-the-art facilities in Karachi or Hyderabad. Meet our Academic Dean, stage coordinators, and experience live classroom environments.'
    },
    {
      step: '03',
      title: 'Age-Appropriate Student Assessment',
      badge: 'Step 3',
      desc: 'Early Years pupils enjoy informal play-based observation. Primary and Secondary candidates complete age-appropriate Cambridge English, Mathematics, and cognitive logic assessments.'
    },
    {
      step: '04',
      title: 'Formal Offer & Registration',
      badge: 'Step 4',
      desc: 'Successful candidates receive an official Letter of Acceptance alongside tuition schedule options, transport enrollment forms, and enrollment agreement details.'
    },
    {
      step: '05',
      title: 'Pastoral Induction & Language Placement',
      badge: 'Step 5',
      desc: 'New pupils are welcomed with an induction session, paired with a student buddy, fitted for uniforms, and placed in customized language modules (English, Urdu, Sindhi).'
    }
  ]

  const requiredDocuments = [
    'Completed & signed Student Admission Application Form',
    'Official Birth Certificate or NADRA B-Form copy',
    'Previous two years of academic report cards & leaving certificate',
    '4 passport-size recent photographs of the applicant (white background)',
    'Copies of Parent / Guardian National Identity Cards (CNIC) or Passports',
    'Vaccination and medical health history record'
  ]

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  const faqs = [
    {
      q: 'When is the best time to apply for admission?',
      a: 'We accept applications throughout the year, with main intake periods in August (Autumn Term) and January (Spring Term). Early registration is recommended to secure preferred campus cohorts.'
    },
    {
      q: 'What does the student assessment test evaluate?',
      a: 'Assessments evaluate reading comprehension, mathematical reasoning, and critical thinking. They are designed to identify individual learning styles rather than pass/fail barriers.'
    },
    {
      q: 'Do students needing English or Sindhi language support receive assistance?',
      a: 'Yes! Our dedicated Language Immersion Department provides targeted 1-on-1 language coaching to help students from diverse schooling backgrounds achieve rapid fluency.'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <LandingHeader session={null} />

      {/* Hero Banner */}
            {/* HERO BANNER */}
      <section className="relative overflow-hidden bg-[#002E40] text-white py-16 sm:py-24 lg:py-28">
        <HeroVideoBackground
          imageUrl="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=85&w=2400&auto=format&fit=crop"
          posterUrl="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=85&w=2400&auto=format&fit=crop"
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
                  Step-by-Step Enrollment
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
                5-Step Simple <span className="text-cyan-300">Admissions Process</span>
                <span className="block text-2xl sm:text-3xl font-semibold text-slate-300 mt-2">
                  داخلا جا 5 سادا مرحلا ۽ رجسٽريشن جو عمل
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
                A clear, transparent enrollment journey: 1. Online Enquiry; 2. Guided Campus Tour; 3. Diagnostic Assessment & Student Interview; 4. Official Offer of Place; 5. Induction & Welcome to the SST Family.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Button 
                  size="lg"
                  className="bg-[#8D1B2D] hover:bg-[#741322] text-white font-semibold text-sm px-6 h-12 shadow-lg transition-transform hover:scale-[1.02]"
                  asChild
                >
                  <a href="#apply-online">Start Online Application</a>
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
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">5</div>
                  <div className="text-[11px] text-slate-300 font-medium">Simple Steps</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">48h</div>
                  <div className="text-[11px] text-slate-300 font-medium">Response Time</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">100%</div>
                  <div className="text-[11px] text-slate-300 font-medium">Transparent</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">Online</div>
                  <div className="text-[11px] text-slate-300 font-medium">Paperless Portal</div>
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
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Live Admissions Process Stream</span>
                  </div>
                  <Badge className="bg-[#8D1B2D] text-white text-[11px] font-semibold border-none">
                    Step-by-Step
                  </Badge>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Interactive Online Application Wizard
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Complete student details, upload previous academic transcripts, and select preferred interview dates directly from our portal.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-cyan-300 font-semibold">Online Assessment</div>
                    <div className="text-lg font-black text-white">English / Math / Logic</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-emerald-300 font-semibold">Induction Pack</div>
                    <div className="text-lg font-black text-white">Instant Delivery</div>
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

      {/* 5-Step Admissions Journey */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <Badge className="bg-[#002E40] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md">
              Five Simple Steps
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002E40]">
              The 5-Step Enrollment Journey
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Designed to ensure the best academic fit, pastoral support, and trilingual language placement for your child.
            </p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {admissionSteps.map((st, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-6 items-start">
                <div className="h-14 w-14 rounded-2xl bg-[#002E40] text-white flex items-center justify-center font-black text-xl flex-shrink-0 shadow-md">
                  {st.step}
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-[#8D1B2D] text-white text-[10px]">{st.badge}</Badge>
                    <h3 className="text-lg font-bold text-[#002E40]">{st.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Required Documents Checklist */}
      <section className="py-16 bg-slate-100 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <Badge className="bg-[#8D1B2D] text-white text-xs font-bold uppercase tracking-wider">
              Document Checklist
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002E40]">
              Required Documentation
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Please prepare the following documents to finalize formal registration.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              {requiredDocuments.map((doc, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="font-medium">{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive Online Application Wizard Form */}
      <section id="application-form" className="py-16 sm:py-20 bg-white border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center space-y-3">
            <Badge className="bg-[#002E40] text-white text-xs font-bold uppercase tracking-wider">
              Online Registration
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002E40]">
              Submit Your Online Admission Enquiry
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Complete the form below to receive your admissions packet and schedule an assessment.
            </p>
          </div>

          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-md">
            {formSubmitted ? (
              <div className="text-center py-10 space-y-4 animate-in fade-in">
                <div className="h-16 w-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#002E40]">Application Received Successfully!</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, <strong className="text-slate-800">{formData.parentName}</strong>. Our Admissions Director will contact you within 24 hours via phone/WhatsApp to schedule your campus visit.
                </p>
                <Button className="bg-[#002E40] text-white text-xs font-bold mt-4" onClick={() => setFormSubmitted(false)}>
                  Submit Another Enquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#002E40]">Parent / Guardian Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aslam Khan"
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#002E40]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#002E40]">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. parent@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#002E40]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#002E40]">WhatsApp / Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+92 300 1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#002E40]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#002E40]">Child's Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ayan Khan"
                      value={formData.childName}
                      onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#002E40]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#002E40]">Academic Stage of Entry *</label>
                    <select
                      value={formData.stage}
                      onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#002E40]"
                    >
                      <option>Early Years (Ages 2–5)</option>
                      <option>Primary (Years 1 to 6)</option>
                      <option>Secondary (Years 7 to 11 / IGCSE)</option>
                      <option>SST Nexus Sixth Form (Years 12 & 13 / A-Levels)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#002E40]">Preferred Campus *</label>
                    <select
                      value={formData.campus}
                      onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#002E40]"
                    >
                      <option>Karachi Main Campus</option>
                      <option>SST Nexus Sixth Form (Clifton/Gulshan)</option>
                      <option>Hyderabad Campus (Qasimabad)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#002E40]">Additional Notes or Special Requirements</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your child's interests, previous school, or any language support needed..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#002E40]"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-[#8D1B2D] hover:bg-[#741322] text-white font-bold py-3 text-xs shadow-lg">
                  Submit Online Application Enquiry
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-slate-100 border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2">
            <Badge className="bg-[#002E40] text-white text-xs font-bold uppercase tracking-wider">
              Admissions FAQs
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#002E40]">
              Frequently Asked Questions
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
              <Link href="/admissions-and-fees/school-fees" className="hover:text-white">School Fees</Link>
              <Link href="/admissions-and-fees/open-days-and-visits" className="hover:text-white">Open Days</Link>
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