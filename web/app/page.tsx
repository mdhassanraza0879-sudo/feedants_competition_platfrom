'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Trophy,
  Users,
  Clock,
  Calendar,
  Upload,
  CheckCircle,
  Play,
  Search,
  Music,
  X,
  Share2,
  ChevronRight,
  ShieldCheck,
  Award
} from 'lucide-react';

const GENERATED_SONGS = Array.from({ length: 1000 }, (_, i) => {
  const raags = ['Yaman', 'Bhairav', 'Bhairavi', 'Darbaari', 'Malkauns', 'Bhimpalasi', 'Desh', 'Kafi', 'Bageshri', 'Todi'];
  const taals = ['Teentaal (16 Beats)', 'Ektaal (12 Beats)', 'Jhaptaal (10 Beats)', 'Rupak (7 Beats)', 'Keherwa (8 Beats)'];
  const artists = ['Pt. Birju Maharaj', 'Ustad Zakir Hussain', 'Vidushi Kaushiki', 'Pt. Ravi Shankar', 'Ustad Bismillah Khan'];

  const raag = raags[i % raags.length];
  const taal = taals[i % taals.length];
  const artist = artists[i % artists.length];

  return {
    id: i + 1,
    title: 'Kathak Thaat & Tukra #' + (i + 1) + ' - Raag ' + raag,
    raag: raag,
    taal: taal,
    duration: String(Math.floor(2 + (i % 3))) + ':' + String(10 + ((i * 7) % 50)).padStart(2, '0'),
    artist: artist
  };
});

export default function CompetitionDetails() {
  const router = useRouter();

  const [lang, setLang] = useState<'ENG' | 'HI'>('ENG');
  const [activeTab, setActiveTab] = useState<'about' | 'judging' | 'rules'>('about');

  const [showSongModal, setShowSongModal] = useState(false);
  const [songSearch, setSongSearch] = useState('');
  const [selectedSong, setSelectedSong] = useState<typeof GENERATED_SONGS[0] | null>(null);
  const [playingSongId, setPlayingSongId] = useState<number | null>(null);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [uploadFileName, setUploadFileName] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const [videoModal, setVideoModal] = useState<{ isOpen: boolean; title: string; url: string }>({
    isOpen: false,
    title: '',
    url: ''
  });

  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 6,
    minutes: 28,
    seconds: 11
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredSongs = useMemo(() => {
    if (!songSearch.trim()) return GENERATED_SONGS.slice(0, 50);
    const q = songSearch.toLowerCase();
    return GENERATED_SONGS.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.raag.toLowerCase().includes(q) ||
        s.taal.toLowerCase().includes(q) ||
        s.artist.toLowerCase().includes(q)
    ).slice(0, 80);
  }, [songSearch]);

  const handleCopyReferral = () => {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://feedants.com';
    navigator.clipboard.writeText(shareUrl);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  const t = {
    ENG: {
      goBack: 'Go back',
      title: 'Feedants Classical Dance',
      danceTag: 'Dance',
      multiWinTag: 'Multi-Win',
      certTag: 'Winners get certificate',
      prizePool: 'Prize Pool',
      entryFee: 'Entry Fee',
      spotsLeft: 'Only 19 spots left',
      bookedText: '1 / 20 Booked',
      judgeLabel: 'Judge',
      judgeName: 'Hassan Raza',
      judgeRole: 'Professional Kathak Dancer',
      judgeExp: '12+ Years of Experience',
      introVideo: 'Intro Video',
      regCloses: 'Registration closes in',
      hurry: 'Hurry up!',
      importantDates: 'Important Dates',
      regBefore: 'Register Before',
      subStarts: 'Submission Starts',
      subEnds: 'Submission Ends',
      resDate: 'Result Date',
      prevWinners: 'Previous Winners',
      tabAbout: 'About Competition',
      tabJudging: 'Judging Parameters',
      tabRules: 'Rules & Eligibility',
      aboutDesc: 'This is an online classical dance competition open for all age groups. Participate from anywhere and showcase your Kathak, Bharatanatyam, Odissi, or folk skills. Upload a 1 to 3-minute performance video.',
      judgingDesc: 'Evaluation parameters: 30% Rhythm & Taal accuracy, 25% Abhinaya & Facial Expressions (Bhava), 25% Hand gestures (Mudra), and 20% Costume & Choreography.',
      rulesDesc: '1. Video length: 60 to 180 seconds. 2. Must use an authorized classical piece or pick from our 1000+ classical song catalog. 3. Solo performances only.',
      catalogBtn: 'Choose from 1,000 Verified Classical Songs',
      selectedSongLabel: 'Selected Track',
      rewardsTitle: 'Rewards',
      rewardsSub: '(Top 6 Positions)',
      first: '1st Winner',
      second: '2nd Winner',
      third: '3rd Winner',
      fourth: '4th Winner',
      fifth: '5th Winner',
      sixth: '6th Winner',
      howReceive: 'How will you receive prize money?',
      howReceiveDesc: 'Direct transfer to Bank Account or UPI within 24 hours of result declaration.',
      policy: '100% Refund policy • Secured by Razorpay',
      referTitle: 'Refer & Earn discount',
      referDesc: 'Earn ₹10 credit for every dancer who registers via your link.',
      referBtn: 'Refer Now',
      copied: 'Link Copied!',
      uploadCta: 'Upload Submission',
      registeredBadge: 'Registered',
      submittedBadge: 'Submitted'
    },
    HI: {
      goBack: 'वापस जाएं',
      title: 'फीडैंट्स शास्त्रीय नृत्य प्रतियोगिता',
      danceTag: 'शास्त्रीय नृत्य',
      multiWinTag: 'मल्टी-विन',
      certTag: 'विजेताओं को प्रमाणपत्र',
      prizePool: 'कुल पुरस्कार राशि',
      entryFee: 'प्रवेश शुल्क',
      spotsLeft: 'केवल 19 स्थान शेष',
      bookedText: '1 / 20 बुक किया गया',
      judgeLabel: 'निर्णायक (जज)',
      judgeName: 'हसन रज़ा',
      judgeRole: 'पेशेवर कथक नर्तक',
      judgeExp: '12+ वर्षों का अनुभव',
      introVideo: 'परिचय वीडियो',
      regCloses: 'पंजीकरण समाप्त होने में समय',
      hurry: 'जल्दी करें!',
      importantDates: 'महत्वपूर्ण तिथियां',
      regBefore: 'पंजीकरण की अंतिम तिथि',
      subStarts: 'प्रस्तुति प्रारंभ',
      subEnds: 'प्रस्तुति समाप्ति',
      resDate: 'परिणाम तिथि',
      prevWinners: 'पिछले विजेता',
      tabAbout: 'प्रतियोगिता के बारे में',
      tabJudging: 'मूल्यांकन के नियम',
      tabRules: 'नियम और पात्रता',
      aboutDesc: 'यह सभी आयु वर्ग के लिए एक ऑनलाइन शास्त्रीय नृत्य प्रतियोगिता है। घर बैठे कथक, भरतनाट्यम या ओडिसी प्रस्तुत करें और 1 से 3 मिनट का वीडियो अपलोड करें।',
      judgingDesc: 'मूल्यांकन आधार: 30% ताल और लय, 25% भाव और चेहरे के भाव, 25% मुद्राएं, और 20% वेशभूषा और मंच सज्जा।',
      rulesDesc: '1. वीडियो 1 से 3 मिनट का होना चाहिए। 2. हमारे 1000+ शास्त्रीय गीतों की सूची से गीत चुन सकते हैं। 3. केवल एकल प्रस्तुति मान्य है।',
      catalogBtn: '1,000 प्रमाणित शास्त्रीय गीतों की सूची देखें',
      selectedSongLabel: 'चुना हुआ ट्रैक',
      rewardsTitle: 'पुरस्कार विवरण',
      rewardsSub: '(शीर्ष 6 विजेता)',
      first: 'प्रथम विजेता',
      second: 'द्वितीय विजेता',
      third: 'तृतीय विजेता',
      fourth: 'चतुर्थ विजेता',
      fifth: 'पंचम विजेता',
      sixth: 'छठा विजेता',
      howReceive: 'पुरस्कार राशि कैसे प्राप्त होगी?',
      howReceiveDesc: 'परिणाम घोषित होने के 24 घंटे के भीतर बैंक खाते या UPI में सीधी राशि भेजी जाएगी।',
      policy: '100% रिफंड गारंटी • रेज़रपे द्वारा सुरक्षित',
      referTitle: 'रेफर करें और छूट पाएं',
      referDesc: 'अपने रेफरल लिंक से जुड़ने वाले प्रत्येक प्रतिभागी पर ₹10 प्राप्त करें।',
      referBtn: 'रेफर करें',
      copied: 'लिंक कॉपी हो गया!',
      uploadCta: 'प्रस्तुति अपलोड करें',
      registeredBadge: 'पंजीकृत',
      submittedBadge: 'जमा हो गया'
    }
  }[lang];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white text-slate-800 relative pb-48 shadow-2xl font-sans antialiased">

      {/* Top Header */}
      <header className="pt-4 px-4 pb-2 flex items-center justify-between border-b border-slate-100 bg-white sticky top-0 z-30">
        <button
          onClick={() => (window.history.length > 1 ? router.back() : router.push('/'))}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 transition active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.goBack}</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 p-0.5 rounded-lg text-xs font-bold">
            <button
              onClick={() => setLang('ENG')}
              className={lang === 'ENG' ? 'px-2 py-1 rounded-md transition bg-teal-700 text-white shadow-sm' : 'px-2 py-1 rounded-md transition text-slate-600'}
            >
              ENG
            </button>
            <button
              onClick={() => setLang('HI')}
              className={lang === 'HI' ? 'px-2 py-1 rounded-md transition bg-teal-700 text-white shadow-sm' : 'px-2 py-1 rounded-md transition text-slate-600'}
            >
              हिंदी
            </button>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-1 rounded-full">
            <CheckCircle className="w-3 h-3 text-teal-600" />
            <span>{hasSubmitted ? t.submittedBadge : t.registeredBadge}</span>
          </div>
        </div>
      </header>

      {/* Main Heading */}
      <div className="px-4 mt-3">
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
          {t.title}
        </h1>

        <div className="flex flex-wrap items-center gap-2 mt-2">
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
            {t.danceTag}
          </span>
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
            {t.multiWinTag}
          </span>
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 flex items-center gap-1">
            <Trophy className="w-3 h-3 text-amber-600" />
            {t.certTag}
          </span>
        </div>
      </div>

      {/* Pricing */}
      <div className="px-4 mt-4 flex items-center justify-between">
        <div className="flex items-baseline gap-4">
          <div>
            <span className="text-[10px] text-slate-400 font-medium block uppercase tracking-wider">{t.prizePool}</span>
            <span className="text-2xl font-black text-slate-900">₹ 1,500</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-medium block uppercase tracking-wider">{t.entryFee}</span>
            <span className="text-xl font-bold text-slate-800">₹ 99</span>
          </div>
        </div>

        <div className="text-right">
          <div className="text-[11px] font-bold text-teal-800 flex items-center justify-end gap-1">
            <Users className="w-3.5 h-3.5 text-teal-600" />
            <span>{t.spotsLeft}</span>
          </div>
          <div className="w-24 h-2 bg-slate-100 rounded-full mt-1 overflow-hidden border border-slate-200">
            <div className="h-full bg-teal-600 rounded-full w-[5%] transition-all duration-500"></div>
          </div>
          <span className="text-[10px] text-slate-400 block mt-0.5">{t.bookedText}</span>
        </div>
      </div>

      {/* Judge Card */}
      <div className="mx-4 mt-4 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-teal-600 shadow-sm flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
              alt={t.judgeName}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">{t.judgeLabel}</span>
            <h4 className="text-sm font-bold text-slate-900 leading-none">{t.judgeName}</h4>
            <p className="text-[11px] text-slate-600 mt-1 font-medium">{t.judgeRole}</p>
            <p className="text-[10px] text-slate-400">{t.judgeExp}</p>
          </div>
        </div>

        <button
          onClick={() =>
            setVideoModal({
              isOpen: true,
              title: t.judgeName + ' - ' + t.introVideo,
              url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
            })
          }
          className="flex flex-col items-center gap-1 group active:scale-95 transition"
        >
          <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center shadow-sm group-hover:bg-teal-200 transition">
            <Play className="w-4 h-4 fill-teal-800 text-teal-800 ml-0.5" />
          </div>
          <span className="text-[10px] text-slate-600 font-bold">{t.introVideo}</span>
        </button>
      </div>

      {/* Live Timer */}
      <div className="mx-4 mt-3 py-2 px-3 bg-amber-50/90 border border-amber-200/80 rounded-xl flex items-center justify-between text-xs font-semibold text-slate-800 shadow-xs">
        <div className="flex items-center gap-1.5 text-amber-900">
          <Clock className="w-3.5 h-3.5 text-amber-700" />
          <span className="text-[11px]">{t.regCloses}:</span>
        </div>
        <div className="font-mono text-xs font-extrabold text-slate-900">
          {String(timeLeft.days).padStart(2, '0') + 'd : ' + String(timeLeft.hours).padStart(2, '0') + 'h : ' + String(timeLeft.minutes).padStart(2, '0') + 'm : ' + String(timeLeft.seconds).padStart(2, '0') + 's'}
        </div>
        <span className="text-[10px] font-bold text-amber-800 bg-amber-200/70 px-2 py-0.5 rounded-md">
          {t.hurry}
        </span>
      </div>

      {/* Important Dates */}
      <div className="px-4 mt-4">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">{t.importantDates}</h3>
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-slate-50 border border-slate-200/70 p-2.5 rounded-xl">
            <span className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" /> {t.regBefore}
            </span>
            <p className="text-xs font-bold text-slate-900 mt-1">10 Aug 26</p>
            <p className="text-[10px] text-slate-500">11:50 PM</p>
          </div>
          <div className="bg-slate-50 border border-slate-200/70 p-2.5 rounded-xl">
            <span className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" /> {t.subStarts}
            </span>
            <p className="text-xs font-bold text-slate-900 mt-1">6 Aug 26</p>
            <p className="text-[10px] text-slate-500">04:00 AM</p>
          </div>
          <div className="bg-slate-50 border border-slate-200/70 p-2.5 rounded-xl">
            <span className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" /> {t.subEnds}
            </span>
            <p className="text-xs font-bold text-slate-900 mt-1">30 Aug 26</p>
            <p className="text-[10px] text-slate-500">11:55 PM</p>
          </div>
          <div className="bg-slate-50 border border-slate-200/70 p-2.5 rounded-xl">
            <span className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
              <Trophy className="w-3 h-3 text-amber-500" /> {t.resDate}
            </span>
            <p className="text-xs font-bold text-slate-900 mt-1">1 Sept 26</p>
            <p className="text-[10px] text-slate-500">11:50 PM</p>
          </div>
        </div>
      </div>

      {/* Previous Winners Circular */}
      <div className="px-4 mt-5">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">{t.prevWinners}</h3>
        <div className="flex gap-4 overflow-x-auto pb-1.5 scrollbar-none">
          {[
            { name: 'Riya Shah', rank: '1st Winner', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' },
            { name: 'Aarav Mehta', rank: '1st Winner', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
            { name: 'Neha Verma', rank: '2nd Winner', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
            { name: 'Ishita Chouhan', rank: '3rd Winner', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100' },
          ].map((winner, index) => (
            <button
              key={index}
              onClick={() =>
                setVideoModal({
                  isOpen: true,
                  title: winner.name + ' - Winning Performance',
                  url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
                })
              }
              className="flex flex-col items-center flex-shrink-0 w-16 group active:scale-95 transition"
            >
              <div className="relative w-14 h-14 rounded-full border-2 border-teal-600 p-0.5 overflow-hidden shadow-sm group-hover:border-teal-800">
                <img src={winner.img} alt={winner.name} className="w-full h-full object-cover rounded-full" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition rounded-full">
                  <Play className="w-4 h-4 fill-white text-white" />
                </div>
              </div>
              <p className="text-[11px] font-bold text-slate-800 mt-1 truncate w-full text-center">{winner.name}</p>
              <p className="text-[9px] font-semibold text-teal-700 truncate w-full text-center">{winner.rank}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mt-5">
        <div className="flex border-b border-slate-200 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('about')}
            className={activeTab === 'about' ? 'pb-2 px-1 transition border-b-2 border-teal-700 text-teal-800 font-bold' : 'pb-2 px-1 transition text-slate-400'}
          >
            {t.tabAbout}
          </button>
          <button
            onClick={() => setActiveTab('judging')}
            className={activeTab === 'judging' ? 'pb-2 px-3 transition border-b-2 border-teal-700 text-teal-800 font-bold' : 'pb-2 px-3 transition text-slate-400'}
          >
            {t.tabJudging}
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={activeTab === 'rules' ? 'pb-2 px-1 transition border-b-2 border-teal-700 text-teal-800 font-bold' : 'pb-2 px-1 transition text-slate-400'}
          >
            {t.tabRules}
          </button>
        </div>

        <p className="text-xs text-slate-600 mt-2.5 leading-relaxed min-h-[44px]">
          {activeTab === 'about' && t.aboutDesc}
          {activeTab === 'judging' && t.judgingDesc}
          {activeTab === 'rules' && t.rulesDesc}
        </p>

        {/* 1000 Songs Button */}
        <button
          onClick={() => setShowSongModal(true)}
          className="mt-3 w-full py-2.5 px-3.5 bg-teal-50 hover:bg-teal-100/80 border border-teal-200 rounded-xl text-xs font-bold text-teal-800 flex items-center justify-between transition shadow-xs"
        >
          <span className="flex items-center gap-2">
            <Music className="w-4 h-4 text-teal-700" />
            <span>{selectedSong ? selectedSong.title : 'Explore 1,000 Classical Songs & Tracks'}</span>
          </span>
          <span className="text-[10px] bg-teal-700 text-white px-2 py-0.5 rounded-full font-bold">
            1,000 Songs
          </span>
        </button>
      </div>

      {/* Rewards Section */}
      <div className="px-4 mt-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">{t.rewardsTitle}</h3>
          <span className="text-[10px] text-slate-400 font-semibold">{t.rewardsSub}</span>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          {[
            { rank: '1st Winner', amount: '₹ 550', color: 'text-amber-500' },
            { rank: '2nd Winner', amount: '₹ 300', color: 'text-slate-400' },
            { rank: '3rd Winner', amount: '₹ 240', color: 'text-amber-700' },
            { rank: '4th Winner', amount: '₹ 200', color: 'text-slate-400' },
            { rank: '5th Winner', amount: '₹ 130', color: 'text-slate-400' },
            { rank: '6th Winner', amount: '₹ 80', color: 'text-slate-400' }
          ].map((r, i) => (
            <div key={i} className="flex items-center justify-between py-2.5 px-3.5 border-b border-slate-100 last:border-0 text-xs">
              <span className="font-semibold text-slate-700 flex items-center gap-2">
                <Trophy className={`w-3.5 h-3.5 ${r.color}`} />
                {r.rank}
              </span>
              <span className="font-black text-slate-900">{r.amount}</span>
            </div>
          ))}
        </div>

        <div className="mt-2.5 p-2.5 bg-blue-50/80 border border-blue-200/70 rounded-xl text-[11px] text-slate-600 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <p><span className="font-bold text-blue-900">Disclaimer:</span> Only entries from verified registered participants will be judged.</p>
        </div>
      </div>

      {/* Prize & Security Card */}
      <div className="mx-4 mt-5 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center">
              <Play className="w-3.5 h-3.5 fill-teal-800 text-teal-800 ml-0.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">{t.howReceive}</p>
              <button
                onClick={() =>
                  setVideoModal({
                    isOpen: true,
                    title: 'Prize Money Transfer Process',
                    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
                  })
                }
                className="text-[10px] text-teal-700 font-bold hover:underline"
              >
                Watch video to know more
              </button>
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500 font-medium">
          <span>{t.policy}</span>
          <span>Secured by Razorpay</span>
        </div>
      </div>

      {/* Refer & Earn Card */}
      <div className="mx-4 mt-4 p-3.5 bg-teal-50/70 border border-teal-200 rounded-2xl shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-teal-950">{t.referTitle}</span>
          <button
            onClick={handleCopyReferral}
            className="text-[10px] font-bold bg-teal-700 hover:bg-teal-800 text-white px-3 py-1 rounded-full shadow-xs transition"
          >
            {copySuccess ? t.copied : t.referBtn}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-white border border-teal-200 rounded-xl px-2.5 py-1.5 text-[10px] text-slate-500 font-mono truncate">
            https://feedants.com/c/hassan-raza
          </div>
          <button
            onClick={handleCopyReferral}
            className="text-[10px] font-bold text-teal-800 bg-white border border-teal-300 px-2.5 py-1.5 rounded-xl hover:bg-teal-50 transition"
          >
            {copySuccess ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
        <p className="text-[10px] text-teal-800 font-medium mt-1.5">{t.referDesc}</p>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-200 p-3 z-40 shadow-2xl">
        <button
          onClick={() => setShowUploadModal(true)}
          className="w-full py-3.5 bg-teal-700 hover:bg-teal-800 active:scale-[0.98] text-white rounded-2xl font-bold text-sm shadow-md shadow-teal-700/20 flex items-center justify-center gap-2 transition"
        >
          <Upload className="w-4 h-4" />
          <span>{hasSubmitted ? 'Upload Another Video' : t.uploadCta}</span>
          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-normal">
            {t.registeredBadge}
          </span>
        </button>
      </div>

      {/* ── Modal 1: 1,000 Songs Selector ── */}
      {showSongModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl p-4 max-h-[85vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h4 className="text-sm font-extrabold text-slate-900">Select Song (1,000 Tracks)</h4>
                <p className="text-[10px] text-slate-500">Pick track for your Kathak performance</p>
              </div>
              <button onClick={() => setShowSongModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-3 relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search raag, taal, artist (e.g. Yaman)..."
                value={songSearch}
                onChange={(e) => setSongSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:border-teal-600"
              />
            </div>

            <div className="overflow-y-auto flex-1 mt-3 space-y-2 pr-1">
              {filteredSongs.map((song) => (
                <div
                  key={song.id}
                  onClick={() => {
                    setSelectedSong(song);
                    setShowSongModal(false);
                  }}
                  className={`p-2.5 rounded-xl border text-xs cursor-pointer transition ${
                    selectedSong?.id === song.id
                      ? 'border-teal-700 bg-teal-50/70'
                      : 'border-slate-100 bg-slate-50/70 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span className="truncate flex-1">{song.title}</span>
                    <span className="text-[10px] text-teal-700 ml-2 font-mono">{song.duration}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-2">
                    <span>Raag: {song.raag}</span>
                    <span>•</span>
                    <span>Taal: {song.taal}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Modal 2: Upload Video Modal ── */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl p-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="text-sm font-extrabold text-slate-900">Upload Dance Submission</h4>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-3.5 space-y-3">
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center bg-slate-50 hover:bg-slate-100 cursor-pointer transition">
                <Upload className="w-6 h-6 text-teal-700 mx-auto mb-1" />
                <p className="text-xs font-bold text-slate-800">
                  {uploadFileName || 'Choose MP4 Video (Max 50MB)'}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">Recorded performance in Kathak costume</p>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
                  Selected Song
                </label>
                <div
                  onClick={() => setShowSongModal(true)}
                  className="p-2 border border-slate-200 rounded-xl text-xs bg-slate-50 cursor-pointer flex items-center justify-between"
                >
                  <span className="font-semibold text-slate-800 truncate">
                    {selectedSong ? selectedSong.title : 'Tap to select from 1,000 tracks'}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>

              <button
                onClick={() => {
                  setHasSubmitted(true);
                  setShowUploadModal(false);
                  alert('Submission uploaded successfully! Evaluator Hassan Raza will review your entry.');
                }}
                className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold text-xs shadow-md transition"
              >
                Confirm &amp; Submit Entry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal 3: Video Player Modal ── */}
      {videoModal.isOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
            <div className="p-3 bg-slate-800 flex items-center justify-between border-b border-slate-700">
              <span className="text-xs font-bold text-white truncate flex-1">{videoModal.title}</span>
              <button
                onClick={() => setVideoModal({ isOpen: false, title: '', url: '' })}
                className="text-slate-400 hover:text-white ml-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="h-44 bg-slate-950 flex flex-col items-center justify-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-teal-600/30 border border-teal-500 flex items-center justify-center mb-2">
                <Play className="w-5 h-5 fill-teal-400 text-teal-400 ml-0.5" />
              </div>
              <p className="text-xs font-bold text-white">Kathak Masterclass &amp; Evaluation Guide</p>
              <p className="text-[10px] text-slate-400 mt-1">Judge: Hassan Raza • 12+ Years Experience</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}