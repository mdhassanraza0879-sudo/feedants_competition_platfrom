'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import Image from 'next/image'
import {
  ArrowLeft,
  Trophy,
  Users,
  Clock,
  Calendar,
  Upload,
  CheckCircle,
  Play,
  Copy,
  ChevronDown,
  ChevronRight,
  Star,
  Shield,
  Megaphone,
  MessageCircle,
  Home,
  Search,
  Plus,
  Award,
  User,
  Info,
  RefreshCw,
} from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────

interface CountdownValues {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface Winner {
  name: string
  position: string
  color: string
  bg: string
}

interface Reward {
  position: string
  label: string
  amount: string
  icon: React.ReactNode
  color: string
}

// ─── Countdown Hook ────────────────────────────────────────────────────────

function useCountdown(targetMs: number): CountdownValues {
  // Start with zeros to avoid hydration mismatch
  const [values, setValues] = useState<CountdownValues>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculate = (): CountdownValues => {
      const diff = targetMs - Date.now()
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      return {
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      }
    }
    setValues(calculate())
    const id = setInterval(() => setValues(calculate()), 1000)
    return () => clearInterval(id)
  }, [targetMs])

  return values
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function CountdownBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-lg font-bold text-slate-800 tabular-nums">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-xs text-slate-500 font-medium">{label}</span>
    </div>
  )
}

function WinnerCard({ winner, index }: { winner: Winner; index: number }) {
  return (
    <div
      className="flex-shrink-0 w-28 rounded-xl overflow-hidden relative shadow-sm border border-slate-100"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={`h-20 ${winner.bg} relative flex items-center justify-center`}>
        <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center">
          <User size={24} className="text-white/70" />
        </div>
        <button
          className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors"
          aria-label={`Play ${winner.name}'s video`}
        >
          <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow">
            <Play size={12} className="text-slate-700 ml-0.5" fill="currentColor" />
          </div>
        </button>
      </div>
      <div className="bg-white px-2 py-1.5">
        <p className="text-xs font-semibold text-slate-800 truncate">{winner.name}</p>
        <p className={`text-[10px] font-medium ${winner.color}`}>{winner.position}</p>
      </div>
    </div>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const WINNERS: Winner[] = [
  { name: 'Riya Shah', position: '1st Winner', color: 'text-amber-500', bg: 'bg-gradient-to-br from-purple-400 to-pink-500' },
  { name: 'Aarav Mehta', position: '1st Winner', color: 'text-amber-500', bg: 'bg-gradient-to-br from-blue-400 to-teal-500' },
  { name: 'Neha Verma', position: '2nd Winner', color: 'text-slate-500', bg: 'bg-gradient-to-br from-orange-400 to-red-500' },
  { name: 'Ishita Cho', position: '3rd Winner', color: 'text-amber-700', bg: 'bg-gradient-to-br from-green-400 to-emerald-600' },
]

const REWARDS: Reward[] = [
  { position: '1st', label: '1st Winner', amount: '₹ 550', icon: <Trophy size={16} />, color: 'text-amber-500' },
  { position: '2nd', label: '2nd Winner', amount: '₹ 300', icon: <Trophy size={16} />, color: 'text-slate-400' },
  { position: '3rd', label: '3rd Winner', amount: '₹ 240', icon: <Trophy size={16} />, color: 'text-amber-700' },
  { position: '4th', label: '4th Winner', amount: '₹ 200', icon: <Star size={16} />, color: 'text-slate-400' },
  { position: '5th', label: '5th Winner', amount: '₹ 130', icon: <Star size={16} />, color: 'text-slate-400' },
  { position: '6th', label: '6th Winner', amount: '₹ 80', icon: <Star size={16} />, color: 'text-slate-400' },
]

const TABS = ['About Competition', 'Judging Parameters', 'Rules & Eligibility']

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function CompetitionDetailsPage() {
  const [lang, setLang] = useState<'ENG' | 'हिंदी'>('ENG')
  const [activeTab, setActiveTab] = useState(0)
  const [showMore, setShowMore] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeNav, setActiveNav] = useState('Competitions')

  // Countdown: registration closes in ~1 day from now (demo)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const targetMs = useMemo(() => Date.now() + 1 * 86400000 + 6 * 3600000 + 28 * 60000 + 32000, [])
  const { days, hours, minutes, seconds } = useCountdown(targetMs)

  const handleCopy = () => {
    navigator.clipboard.writeText('https://feedants.com/r/referral123')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const spotsLeft = 19
  const totalSpots = 20
  const progressPct = ((totalSpots - spotsLeft) / totalSpots) * 100

  return (
    <div className="flex justify-center bg-slate-100 min-h-screen">
      {/* Phone-frame container */}
      <div className="w-full max-w-[420px] bg-white min-h-screen relative flex flex-col shadow-2xl">

        {/* ── Header ── */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium">Go back</span>
          </button>

          <div className="flex items-center gap-1 bg-slate-100 rounded-full p-1">
            {(['ENG', 'हिंदी'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
                  lang === l
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
                aria-pressed={lang === l}
              >
                {l}
              </button>
            ))}
          </div>
        </header>

        {/* ── Scrollable Content ── */}
        <main className="flex-1 overflow-y-auto pb-32">

          {/* ── Title & Badges ── */}
          <section className="px-4 pt-4 pb-3">
            <div className="flex items-start justify-between gap-2">
              <h1 className="text-xl font-bold text-slate-900 leading-tight">
                Feedants Classical Dance
              </h1>
              <div className="flex-shrink-0 flex items-center gap-1 bg-teal-50 border border-teal-200 rounded-full px-2.5 py-1">
                <CheckCircle size={13} className="text-teal-600" />
                <span className="text-xs font-semibold text-teal-700">Registered</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2.5 flex-wrap">
              <span className="bg-teal-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Dance
              </span>
              <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full">
                Multi-Win
              </span>
              <span className="flex items-center gap-1 bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full">
                <Trophy size={11} className="text-amber-500" />
                Winners get certificate
              </span>
            </div>
          </section>

          {/* ── Pricing & Spots ── */}
          <section className="px-4 pb-4">
            <div className="flex items-start gap-6">
              <div>
                <p className="text-[11px] text-slate-400 font-medium mb-0.5">Prize Pool</p>
                <p className="text-2xl font-extrabold text-slate-900">₹ 1,500</p>
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-medium mb-0.5">Entry Fee</p>
                <p className="text-2xl font-extrabold text-slate-900">₹ 99</p>
              </div>
              <div className="ml-auto text-right">
                <div className="flex items-center gap-1 justify-end">
                  <Users size={13} className="text-teal-600" />
                  <span className="text-xs font-semibold text-slate-700">
                    Only {spotsLeft} spots left
                  </span>
                </div>
                <div className="mt-1.5 w-28">
                  <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-500 rounded-full transition-all duration-500"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    1 / {totalSpots} Booked
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── Judge Card ── */}
          <section className="mx-4 mb-4 rounded-2xl border border-slate-100 bg-slate-50 p-3 flex items-center gap-3">
            <Image
              src="/hassan-raza.jpg"
              alt="Judge Hassan Raza"
              width={64}
              height={64}
              className="w-16 h-16 rounded-full object-cover object-top border-2 border-white shadow"
            />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-slate-400 font-medium">Judge</p>
              <p className="text-base font-bold text-slate-900">Hassan Raza</p>
              <p className="text-xs text-slate-500">Professional Kathak Dancer</p>
              <p className="text-xs text-slate-400">12+ Years of Experience</p>
            </div>
            <button
              className="flex flex-col items-center gap-1 text-teal-600 hover:text-teal-700 transition-colors flex-shrink-0"
              aria-label="Watch intro video"
            >
              <div className="w-9 h-9 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center hover:bg-teal-100 transition-colors">
                <Play size={14} fill="currentColor" className="ml-0.5" />
              </div>
              <span className="text-[10px] font-medium">Intro Video</span>
            </button>
          </section>

          {/* ── Countdown Banner ── */}
          <section className="mx-4 mb-4 rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock size={15} className="text-amber-600 flex-shrink-0" />
              <span className="text-xs font-semibold text-slate-700">Registration closes in</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CountdownBlock value={days} label="d" />
              <span className="text-slate-400 font-bold text-sm">:</span>
              <CountdownBlock value={hours} label="h" />
              <span className="text-slate-400 font-bold text-sm">:</span>
              <CountdownBlock value={minutes} label="m" />
              <span className="text-slate-400 font-bold text-sm">:</span>
              <CountdownBlock value={seconds} label="s" />
            </div>
            <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
              <Clock size={12} />
              Hurry up!
            </span>
          </section>

          {/* ── Important Dates ── */}
          <section className="px-4 mb-4">
            <h2 className="text-sm font-bold text-slate-900 mb-3">Important Dates</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <Calendar size={15} />, label: 'Register Before', date: '10 Aug 26', time: '11:50 PM' },
                { icon: <Upload size={15} />, label: 'Submission Starts', date: '6 Aug 26', time: '04:00 AM' },
                { icon: <Upload size={15} />, label: 'Submission Ends', date: '30 Aug 26', time: '11:55 PM' },
                { icon: <Trophy size={15} />, label: 'Result Date', date: '1 Sept 26', time: '11:50 PM' },
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-teal-600">{item.icon}</span>
                    <span className="text-[10px] text-slate-400 font-medium">{item.label}</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900">{item.date}</p>
                  <p className="text-xs text-slate-500">{item.time}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Previous Winners ── */}
          <section className="px-4 mb-4">
            <h2 className="text-sm font-bold text-slate-900 mb-3">Previous Winners</h2>
            <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide">
              {WINNERS.map((w, i) => (
                <WinnerCard key={i} winner={w} index={i} />
              ))}
            </div>
          </section>

          {/* ── Tabs ── */}
          <section className="px-4 mb-4">
            <div className="flex border-b border-slate-200 gap-0">
              {TABS.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`flex-1 text-[11px] font-semibold pb-2.5 pt-1 border-b-2 transition-all duration-200 ${
                    activeTab === i
                      ? 'border-teal-600 text-teal-700'
                      : 'border-transparent text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="mt-3">
              {activeTab === 0 && (
                <div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    This is an online classical dance competition open for all age groups.
                    Participate from anywhere and showcase your talent.
                    Express your passion through traditional dance.
                    {showMore && (
                      <> Judges will evaluate performances on technique, expression, costume, and overall stage presence. Winners will receive digital certificates and cash prizes directly to their bank accounts.</>
                    )}
                  </p>
                  <button
                    onClick={() => setShowMore(!showMore)}
                    className="mt-2 flex items-center gap-1 text-teal-600 text-xs font-semibold"
                  >
                    {showMore ? 'View less' : 'View more'}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${showMore ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>
              )}
              {activeTab === 1 && (
                <div className="space-y-2">
                  {['Technical Accuracy (30%)', 'Expression & Emotion (25%)', 'Costume & Appearance (20%)', 'Rhythm & Timing (25%)'].map((param, i) => (
                    <div key={i} className="flex items-center gap-2 bg-slate-50 rounded-xl p-3 border border-slate-100">
                      <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 text-xs font-bold">
                        {i + 1}
                      </div>
                      <span className="text-sm text-slate-700 font-medium">{param}</span>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 2 && (
                <div className="space-y-2">
                  {[
                    'Open to all age groups and nationalities',
                    'Video submission must be in MP4 format, max 5 minutes',
                    'Original choreography only – no copied routines',
                    'One submission per participant',
                    'Entry fee must be paid before registration deadline',
                  ].map((rule, i) => (
                    <div key={i} className="flex items-start gap-2 py-2 border-b border-slate-100 last:border-0">
                      <CheckCircle size={14} className="text-teal-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-600">{rule}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* ── Rewards Table ── */}
          <section className="px-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-900">Rewards</h2>
              <span className="text-xs text-slate-400 font-medium">(All Positions)</span>
            </div>
            <div className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
              {REWARDS.map((r, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 px-4 py-3 ${
                    i !== REWARDS.length - 1 ? 'border-b border-slate-100' : ''
                  }`}
                >
                  <span className={r.color}>{r.icon}</span>
                  <span className="text-sm text-slate-700 font-medium flex-1">{r.label}</span>
                  <span className="text-sm font-bold text-slate-900">{r.amount}</span>
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <div className="mt-3 flex items-start gap-2 bg-blue-50 rounded-xl border border-blue-100 px-3 py-2.5">
              <Info size={13} className="text-blue-500 mt-0.5 flex-shrink-0" />
              <p className="text-[11px] text-slate-600 leading-relaxed">
                <span className="font-semibold text-blue-600">Disclaimer:</span> Only contributions from paid participants will be considered for judging.
              </p>
            </div>
          </section>

          {/* ── Prize & Refund Card ── */}
          <section className="mx-4 mb-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                  <Play size={16} className="text-teal-600 ml-0.5" fill="currentColor" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">How will you receive prize money?</p>
                  <button className="text-xs text-teal-600 font-medium mt-0.5">Watch video to know more</button>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield size={14} className="text-slate-500" />
                <span className="text-xs text-slate-600 font-medium">Refund policy</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={14} className="text-slate-500" />
                <span className="text-xs text-slate-500">Secure payments powered by</span>
                <span className="text-xs font-bold text-slate-700 italic">Razorpay</span>
              </div>
            </div>
          </section>

          {/* ── Refer & Earn ── */}
          <section className="mx-4 mb-4 rounded-2xl border border-slate-100 bg-teal-50 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                <Megaphone size={18} className="text-teal-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Refer &amp; Earn more discount</p>
              </div>
              <button className="ml-auto bg-teal-600 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-teal-700 transition-colors">
                Refer Now
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-white border border-teal-200 rounded-xl px-3 py-2 text-xs text-slate-500 font-mono truncate">
                https://feedants.com/r/referral123
              </div>
              <button
                onClick={handleCopy}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  copied
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : 'bg-white border border-teal-200 text-teal-700 hover:bg-teal-100'
                }`}
                aria-label="Copy referral link"
              >
                {copied ? <CheckCircle size={12} /> : <Copy size={12} />}
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
            <p className="mt-2 text-[11px] text-teal-700 font-medium">
              You earn <span className="font-bold">₹10</span> for every signup
            </p>
          </section>

          {/* ── Hear From Our Users ── */}
          <section className="mx-4 mb-4 rounded-2xl border border-slate-100 bg-white p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <MessageCircle size={18} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Hear From Our Users</p>
                <p className="text-xs text-slate-400">See what participants say about Feedants</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-slate-400" />
          </section>

          {/* ── Ad Banner ── */}
          <div className="mx-4 mb-6 rounded-2xl bg-gradient-to-r from-slate-100 to-slate-200 border border-slate-200 h-14 flex items-center justify-center">
            <div className="flex items-center gap-2 text-slate-400">
              <Megaphone size={14} />
              <span className="text-xs font-medium">Ad Here</span>
            </div>
          </div>
        </main>

        {/* ── Sticky CTA ── */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] z-40">
          <div className="bg-white border-t border-slate-100 px-4 pt-3 pb-2">
            <button className="w-full bg-teal-600 hover:bg-teal-700 active:scale-[0.98] text-white font-bold text-base py-3.5 rounded-2xl flex items-center justify-center gap-2.5 shadow-lg shadow-teal-200 transition-all duration-200">
              <Upload size={18} />
              Upload Submission
              <span className="text-xs font-normal bg-white/20 px-2 py-0.5 rounded-full ml-1">Registered</span>
            </button>
          </div>

          {/* ── Bottom Navigation ── */}
          <nav className="bg-white border-t border-slate-100 px-2 pb-safe">
            <div className="flex">
              {[
                { icon: <Home size={20} />, label: 'Home' },
                { icon: <Search size={20} />, label: 'Explore' },
                { icon: <Plus size={22} />, label: '', isCenter: true },
                { icon: <Award size={20} />, label: 'Competitions' },
                { icon: <User size={20} />, label: 'Profile' },
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={() => !item.isCenter && setActiveNav(item.label)}
                  className={`flex-1 flex flex-col items-center py-2.5 gap-0.5 transition-all duration-200 ${
                    item.isCenter
                      ? 'relative -top-4'
                      : activeNav === item.label
                      ? 'text-teal-600'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                  aria-label={item.label || 'Create'}
                >
                  {item.isCenter ? (
                    <div className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center shadow-lg shadow-teal-300 hover:bg-teal-700 active:scale-95 transition-all">
                      <Plus size={24} className="text-white" />
                    </div>
                  ) : (
                    <>
                      {item.icon}
                      <span className="text-[10px] font-medium">{item.label}</span>
                    </>
                  )}
                </button>
              ))}
            </div>
          </nav>
        </div>

      </div>
    </div>
  )
}
