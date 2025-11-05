// app/night/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ResultRibbon from '@/components/ResultRibbon';
import Hamburger from '@/components/Hamburger';
import MonthlyResultsTable from '@/components/MonthlyResultsTable';
import NightResultsTable from '@/components/NightResultTable';

type Latest = {
  jodi: string | null;
  formatted: string; // e.g. "(160) 7 | 9 (135)"
  status: 'READY' | 'DAY_PUBLISHED' | 'CLOSED';
  sessionDate: string;
  // If your API also returns explicit fields, ResultRibbon will use them:
  dayPanna?: string | null;
  dayDigit?: number | null;
  nightPanna?: string | null;
  nightDigit?: number | null;
};

export default function NightPage() {
  const [latest, setLatest] = useState<Latest | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const load = async () => {
    const r = await fetch('/api/result/latest?side=night', { cache: 'no-store' });
    const d = await r.json();
    setLatest(d);
  };

  useEffect(() => { load().catch(() => {}); }, []);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <div className="absolute top-4 right-4 z-50">
        <Hamburger />
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-[#7b0c2b] via-[#a01638] to-[#7b0c2b] py-6 text-center border-b-4 border-yellow-600 shadow-lg">
        <h1 className="text-5xl font-extrabold tracking-wider bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          RAJASHAHI CHART
        </h1>
      </div>

      {/* Day/Night Switch */}
      <div className="bg-[#5c0f24] py-3 border-b border-yellow-700/30 shadow-inner">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-center gap-3">
          <span className="text-yellow-300 text-sm">View:</span>
          <div className="flex rounded-lg overflow-hidden border border-yellow-600/40">
            <Link
              href="/"
              className="px-4 py-2 text-yellow-200 hover:text-black hover:bg-yellow-300 transition"
              aria-label="Go to Rajashahi Day"
            >
              Day
            </Link>
            <button
              className="px-4 py-2 text-black font-semibold bg-yellow-400"
              aria-current="page"
              aria-label="Rajashahi Night selected"
              disabled
            >
              Night
            </button>
          </div>
        </div>
      </div>

      {/* Tagline */}
      <div className="bg-[#9a1839] py-3 text-center text-sm italic border-b-2 border-yellow-700/50 shadow-inner">
        <span className="text-yellow-200">Rajashahi Night Result</span>
      </div>

      {/* Contact */}
      <div className="bg-[#5c0f24] py-3 text-center text-sm border-b border-yellow-700/30 shadow-inner">
        <p className="text-yellow-300 font-medium">
          📱 Mobile Number: <span className="text-white font-semibold">8777787777</span> &nbsp; | &nbsp;
          📧 Gmail Support: <span className="text-white font-semibold">rajashahi.india@gmail.com</span>
        </p>
      </div>

      <div className="max-w-5xl mx-auto p-4">
        {/* Current Result */}
        <div className="bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-300 text-black rounded-lg p-6 border-4 border-red-800 shadow-[0_8px_16px_rgba(0,0,0,0.3),inset_0_2px_8px_rgba(255,255,255,0.3)]">
          <div
            className="text-center font-extrabold text-5xl mb-3 text-red-800 drop-shadow-[0_2px_4px_rgba(218,165,32,0.8)]"
            style={{ textShadow: '2px 2px 0px #DAA520, -1px -1px 0px #B8860B' }}
          >
            RAJASHAHI NIGHT
          </div>

          {latest ? (
            <ResultRibbon
              side="night"
              status={latest.status}
              sessionDate={latest.sessionDate}
              // If your API provides explicit values, Ribbon will prefer these:
              dayPanna={latest.dayPanna}
              dayDigit={latest.dayDigit}
              nightPanna={latest.nightPanna}
              nightDigit={latest.nightDigit}
              // Fallbacks (keeps working with old API shape):
            
              jodi={latest.jodi}
              onRefresh={load}
            />
          ) : (
            <div className="text-center py-8 text-black font-semibold text-lg">Loading…</div>
          )}
        </div>

        <div className="my-6" />

        {/* Monthly table (shared) */}
        <NightResultsTable />

        <div id="bottom" className="h-12" />
      </div>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black shadow-2xl transition-all duration-300 transform border-2 border-yellow-700 ${
          showScrollTop 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-10 scale-0 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </main>
  );
}
