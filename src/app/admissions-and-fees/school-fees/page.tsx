'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LandingHeader } from '@/components/landing-header'
import { HeroVideoBackground } from '@/components/hero-video-background'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  CreditCard,
  Percent,
  CheckCircle2,
  Sparkles,
  Award,
  ChevronRight,
  ChevronDown,
  Calculator,
  ShieldCheck,
  Building,
  HelpCircle,
  X,
  Play,
  Languages
} from 'lucide-react'

export default function SchoolFeesPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  const [billingCycle, setBillingCycle] = useState<'termly' | 'annual' | 'monthly'>('termly')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const feeTiers = [
    {
      stage: 'Early Years Foundation Stage (EYFS)',
      age: 'Ages 2 – 5 • Pre-Nursery, Nursery & Reception',
      monthly: 'PKR 32,000',
      termly: 'PKR 96,000',
      annual: 'PKR 270,000',
      badge: 'Early Childhood',
      features: [
        'Low teacher ratio (1:8 to 1:12)',
        'Trilingual phonics (English, Urdu, Sindhi)',
        'Sensory play & discovery gardens',
        'Morning healthy snack included',
        'Specialist music & physical movement'
      ]
    },
    {
      stage: 'Primary Education (Years 1 to 6)',
      age: 'Ages 5 – 11 • Key Stage 1 & Key Stage 2',
      monthly: 'PKR 42,000',
      termly: 'PKR 126,000',
      annual: 'PKR 355,000',
      badge: 'Cambridge Primary',
      features: [
        'Cambridge Primary curriculum & materials',
        '1:1 Managed iPad hardware access',
        'Second foreign language (French / Arabic)',
        'STEM robotics makerspace access',
        'Weekly swimming & sports leagues'
      ]
    },
    {
      stage: 'Secondary Education (Years 7 to 11 / IGCSE)',
      age: 'Ages 11 – 16 • Key Stage 3 & Key Stage 4',
      monthly: 'PKR 54,000',
      termly: 'PKR 162,000',
      annual: 'PKR 455,000',
      badge: 'Cambridge IGCSE & Matric',
      features: [
        'Specialized Physics, Chem, Bio suites',
        'Cambridge IGCSE past-paper masterclasses',
        'AI diagnostic homework platform',
        '45+ Extra-Curricular societies & Model UN',
        'Eligible for 50% SST Merit Scholarship'
      ]
    },
    {
      stage: 'SST Nexus – Sixth Form (Years 12 & 13)',
      age: 'Ages 16 – 18 • Key Stage 5 (A-Levels & Inter)',
      monthly: 'PKR 65,000',
      termly: 'PKR 195,000',
      annual: 'PKR 550,000',
      badge: 'Pre-University Distinction',
      features: [
        'Cambridge A-Levels & Sindh Board Inter',
        '1-on-1 University Counseling (AKU/LUMS/Oxford)',
        'SAT, MDCAT, ECAT prep masterclasses',
        'Exclusive Sixth Form Common Room & Study Pods',
        'Eligible for 50% SST Merit Scholarship'
      ]
    }
  ]

  const faqs = [
    {
      q: 'What is included in the tuition fee?',
      a: 'Tuition fees cover all core academic instruction, 1:1 digital hardware access, lab consumables, standard library resources, career counseling, pastoral support, and participation in over 80% of our extra-curricular clubs.'
    },
    {
      q: 'Are there sibling discounts available?',
      a: 'Yes. We offer a 10% tuition discount for the second child and a 15% discount for the third and subsequent children enrolled concurrently at SST.'
    },
    {
      q: 'How does the 50% SST Academic Excellence Scholarship work?',
      a: 'High-performing students entering Year 11 (Grade 10) and Year 12 (A-Levels / Inter) with outstanding mock or CAIE IGCSE grades receive a 50% tuition reduction scholarship grant.'
    },
    {
      q: 'What payment methods are accepted?',
      a: 'We accept fee payments via 1Link, KuickPay, Online Mobile Banking, Credit/Debit Cards, and direct bank deposit at designated partner bank branches across Pakistan.'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <LandingHeader session={null} />

      {/* Hero Banner */}
            {/* HERO BANNER */}
      <section className="relative overflow-hidden bg-[#002E40] text-white py-16 sm:py-24 lg:py-28">
        <HeroVideoBackground
          imageUrl="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=85&w=2400&auto=format&fit=crop"
          posterUrl="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=85&w=2400&auto=format&fit=crop"
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
                  Transparent Pricing & Aid
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
                Transparent Tuition & <span className="text-cyan-300">School Fees</span>
                <span className="block text-2xl sm:text-3xl font-semibold text-slate-300 mt-2">
                  مناسب ۽ شفاف ٽيوشن فيس، اسڪالرشپ ۽ رعايتون
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
                Clear, transparent tuition schedules with all-inclusive academic facilities, laboratory access, and digital platforms in Pakistani Rupees (PKR). 50% SST Academic Merit Scholarships for high achievers and 10–15% sibling concessions.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Button 
                  size="lg"
                  className="bg-[#8D1B2D] hover:bg-[#741322] text-white font-semibold text-sm px-6 h-12 shadow-lg transition-transform hover:scale-[1.02]"
                  asChild
                >
                  <a href="#fee-calculator">Calculate Tuition & Aid</a>
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
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">50%</div>
                  <div className="text-[11px] text-slate-300 font-medium">Merit Scholarship</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">10 – 15%</div>
                  <div className="text-[11px] text-slate-300 font-medium">Sibling Discount</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">3</div>
                  <div className="text-[11px] text-slate-300 font-medium">Payment Options</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight">0</div>
                  <div className="text-[11px] text-slate-300 font-medium">Hidden Surcharges</div>
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
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Live Fee Portal & Fintech Stream</span>
                  </div>
                  <Badge className="bg-[#8D1B2D] text-white text-[11px] font-semibold border-none">
                    Tuition Schedule
                  </Badge>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Digital Online Banking & Fee Calculator
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    View termly and monthly tuition breakdowns, calculate sibling discounts, and apply for academic and STEM merit scholarships online.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-cyan-300 font-semibold">Fee Transparency</div>
                    <div className="text-lg font-black text-white">100% Guaranteed</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-xs text-emerald-300 font-semibold">Online Payment</div>
                    <div className="text-lg font-black text-white">1Link & Digital Cards</div>
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

      {/* Tuition Fee Matrix */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <Badge className="bg-[#002E40] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md">
              Academic Year 2025–2026
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002E40]">
              Tuition Fees by Academic Stage
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Select your preferred payment schedule below to view termly, monthly, or discounted annual fee options.
            </p>

            {/* Cycle Selector */}
            <div className="flex justify-center gap-2 pt-4">
              <button
                onClick={() => setBillingCycle('termly')}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                  billingCycle === 'termly'
                    ? 'bg-[#8D1B2D] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Termly (3 Terms / Year)
              </button>
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-[#8D1B2D] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Monthly Plan (10 Installments)
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                  billingCycle === 'annual'
                    ? 'bg-[#8D1B2D] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Annual Payment (5% Discount)
              </button>
            </div>
          </div>

          {/* Fee Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {feeTiers.map((tier, idx) => (
              <div key={idx} className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-lg transition-all">
                <div className="space-y-4">
                  <Badge className="bg-[#002E40] text-white text-[10px]">{tier.badge}</Badge>
                  <h3 className="text-base font-bold text-[#002E40]">{tier.stage}</h3>
                  <p className="text-[11px] text-slate-500 font-medium">{tier.age}</p>
                  
                  <div className="pt-2 border-t border-slate-200">
                    <div className="text-2xl sm:text-3xl font-black text-[#8D1B2D]">
                      {billingCycle === 'termly' ? tier.termly : billingCycle === 'monthly' ? tier.monthly : tier.annual}
                    </div>
                    <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                      {billingCycle === 'termly' ? 'Per Term (3x/year)' : billingCycle === 'monthly' ? 'Per Month' : 'Per Academic Year'}
                    </div>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-600 pt-2">
                    {tier.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <Button className="w-full bg-[#002E40] hover:bg-[#002331] text-white text-xs font-bold" asChild>
                    <Link href="/admissions-and-fees/admissions-process">Apply for this Stage</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discounts & Scholarships */}
      <section className="py-16 bg-slate-100 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <Badge className="bg-[#8D1B2D] text-white text-xs font-bold uppercase tracking-wider">
              Financial Grants & Sibling Concessions
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002E40]">
              Discounts & Scholarships
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Percent className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-[#002E40]">Sibling Concession</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Families with multiple children enrolled concurrently benefit from a <strong className="text-slate-800">10% reduction for the 2nd child</strong> and a <strong className="text-slate-800">15% reduction for the 3rd and subsequent children</strong>.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-xl bg-rose-100 text-[#8D1B2D] flex items-center justify-center">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-[#002E40]">50% Academic Excellence Scholarship</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Awarded to Year 11 and Year 12 scholars achieving top distinction marks in Cambridge IGCSE, AS-Levels, or provincial board matriculation examinations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2">
            <Badge className="bg-[#002E40] text-white text-xs font-bold uppercase tracking-wider">
              Fee FAQs
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#002E40]">
              Frequently Asked Questions About Tuition
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between font-bold text-xs sm:text-sm text-[#002E40] hover:bg-slate-100 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="p-4 bg-white text-xs sm:text-sm text-slate-600 border-t border-slate-200 leading-relaxed">
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