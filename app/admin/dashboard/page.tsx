'use client';

import AdminHistoryEditor from '@/components/AdminHistoryEditor';
import { useEffect, useMemo, useState } from 'react';

type Round = {
  roundId: string;
  sessionDate: string;
  dayTime: string;
  nightTime: string;
  status: 'READY' | 'DAY_PUBLISHED' | 'CLOSED';
  dayPanna?: string;
  dayDigit?: number;
  nightPanna?: string;
  nightDigit?: number;
  jodi?: string;
};

const pad3 = (v: string) => v.replace(/\D/g, '').slice(0, 3).padStart(3, '0');
const randPanna = () => String(Math.floor(Math.random() * 1000)).padStart(3, '0');

export default function AdminPanel() {
  const [round, setRound] = useState<Round | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [sessionDate, setSessionDate] = useState<string>(new Date().toISOString().slice(0,10));
  const [dayTime, setDayTime] = useState<string>('16:15');
  const [nightTime, setNightTime] = useState<string>('18:15');
  const [dayP, setDayP] = useState('');
  const [nightP, setNightP] = useState('');

  const load = async () => {
    const r = await fetch('/api/round/current', { cache: 'no-store' });
    if (r.status === 401) { window.location.href = '/admin'; return; }
    const d = await r.json();
    setRound(d.round ?? null);
  };
  useEffect(() => { load().catch(() => {}); }, []);

  const withBusy = async (fn: () => Promise<void>) => {
    setBusy(true); setErr(null); setSuccess(null);
    try { await fn(); } catch { setErr('Network error'); }
    finally { setBusy(false); }
  };

  const startRound = () =>
    withBusy(async () => {
      const r = await fetch('/api/round/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionDate, dayTime, nightTime }),
      });
      const d = await r.json();
      if (!r.ok) { setErr(d.error || 'Failed to start round'); return; }
      setRound(d.round || null);
      setSuccess('Round started successfully!');
    });

  const publishDay = () =>
    withBusy(async () => {
      const panna = dayP.trim() ? pad3(dayP) : randPanna();
      if (!/^\d{3}$/.test(panna)) { setErr('Day panna must be 3 digits'); return; }
      const r = await fetch('/api/result/day', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dayPanna: panna }),
      });
      const d = await r.json();
      if (!r.ok) { setErr(d.error || 'Failed to publish day'); return; }
      setRound(d.round || null); setDayP('');
      setSuccess('Day published successfully!');
    });

  const publishNight = () =>
    withBusy(async () => {
      const panna = nightP.trim() ? pad3(nightP) : randPanna();
      if (!/^\d{3}$/.test(panna)) { setErr('Night panna must be 3 digits'); return; }
      const r = await fetch('/api/result/night', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nightPanna: panna }),
      });
      const d = await r.json();
      if (!r.ok) { setErr(d.error || 'Failed to publish night'); return; }
      setRound(d.round || null); setNightP('');
      setSuccess('Night published successfully!');
    });

  const resultLine = useMemo(() => {
    const dp = round?.dayPanna ?? '—';
    const dd = round?.dayDigit ?? '—';
    const nd = round?.nightDigit ?? '—';
    const np = round?.nightPanna ?? '—';
    return `(${dp}) ${dd} | ${nd} (${np})`;
  }, [round]);

  const getStatusBadge = (status?: string) => {
    switch(status) {
      case 'READY': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'DAY_PUBLISHED': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'CLOSED': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <>
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#7b0c2b] via-[#a01638] to-[#7b0c2b] py-6 border-b-4 border-yellow-600 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="px-4 py-2 rounded-lg bg-yellow-500/20 border border-yellow-500/40 hover:bg-yellow-500/30 transition-all text-yellow-200 font-semibold flex items-center gap-2"
            >
              ← Back
            </a>
            <h1 className="text-4xl font-extrabold tracking-wider bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              ADMIN PANEL
            </h1>
          </div>
          <button
            onClick={() => load()}
            className="px-4 py-2 rounded-lg bg-yellow-500/20 border border-yellow-500/40 hover:bg-yellow-500/30 transition-all text-yellow-200 font-semibold"
            disabled={busy}
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 space-y-6 mt-6">
        {/* Alerts */}
        {err && (
          <div className="bg-red-500/10 border-2 border-red-500 rounded-lg p-4 text-red-200 animate-pulse">
            ⚠️ {err}
          </div>
        )}
        {success && (
          <div className="bg-green-500/10 border-2 border-green-500 rounded-lg p-4 text-green-200">
            ✅ {success}
          </div>
        )}

        {/* Current Result Card */}
        <div className="bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-300 text-black rounded-xl p-6 border-4 border-red-800 shadow-[0_8px_16px_rgba(0,0,0,0.3),inset_0_2px_8px_rgba(255,255,255,0.3)]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-800 mb-4">Current Result</h2>
            <div className="text-4xl font-mono font-bold tracking-wider mb-3">
              {resultLine}
            </div>
            <div className="text-xl font-semibold">
              Jodi: <span className="text-red-800 text-2xl">{round?.jodi ?? '—'}</span>
            </div>
          </div>
        </div>

        {/* Round Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Round Details */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg">
            <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
              📋 Round Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Round ID:</span>
                <span className="font-mono text-yellow-300">{round?.roundId?.slice(0, 8) ?? '—'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Date:</span>
                <span className="font-semibold text-green-300">{round?.sessionDate ?? '—'}</span>
              </div>
            </div>
          </div>

          {/* Timing & Status */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg">
            <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
              ⏰ Timing & Status
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Day Time:</span>
                <span className="font-semibold text-purple-300">{round?.dayTime ?? '—'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Night Time:</span>
                <span className="font-semibold text-purple-300">{round?.nightTime ?? '—'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Status:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-bold border ${getStatusBadge(round?.status)}`}>
                  {round?.status ?? '—'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        {(!round || round.status === 'CLOSED') && (
          <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 rounded-xl p-6 border-2 border-green-600/40 shadow-lg">
            <h2 className="text-2xl font-bold text-green-400 mb-4 flex items-center gap-2">
              🚀 Start New Round
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Session Date</label>
                <input 
                  type="date" 
                  value={sessionDate} 
                  onChange={e => setSessionDate(e.target.value)} 
                  className="w-full p-3 text-black rounded-lg font-semibold focus:ring-2 focus:ring-green-500 outline-none" 
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Day Time</label>
                <input 
                  type="time" 
                  value={dayTime} 
                  onChange={e => setDayTime(e.target.value)} 
                  className="w-full p-3 text-black rounded-lg font-semibold focus:ring-2 focus:ring-green-500 outline-none" 
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Night Time</label>
                <input 
                  type="time" 
                  value={nightTime} 
                  onChange={e => setNightTime(e.target.value)} 
                  className="w-full p-3 text-black rounded-lg font-semibold focus:ring-2 focus:ring-green-500 outline-none" 
                />
              </div>
            </div>
            <button 
              onClick={startRound} 
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-6 rounded-lg shadow-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed" 
              disabled={busy}
            >
              {busy ? '⏳ Starting…' : '✨ Start Round'}
            </button>
          </div>
        )}

        {round && round.status === 'READY' && (
          <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-xl p-6 border-2 border-blue-600/40 shadow-lg">
            <h2 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-2">
              📤 Publish Day
            </h2>
            <div className="mb-4">
              <label className="block text-sm text-gray-300 mb-2">Day Panna (000-999)</label>
              <input
                type="text" 
                value={dayP} 
                onChange={e => setDayP(e.target.value)}
                placeholder="Leave empty for random" 
                className="w-full p-3 text-black rounded-lg font-mono text-lg font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                maxLength={3}
              />
              <p className="text-xs text-gray-400 mt-1">💡 Leave empty to generate random panna</p>
            </div>
            <button 
              onClick={publishDay} 
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-lg shadow-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed" 
              disabled={busy}
            >
              {busy ? '⏳ Publishing…' : '📢 Publish Day'}
            </button>
          </div>
        )}

        {round && round.status === 'DAY_PUBLISHED' && (
          <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 rounded-xl p-6 border-2 border-purple-600/40 shadow-lg">
            <h2 className="text-2xl font-bold text-purple-400 mb-4 flex items-center gap-2">
              📥 Publish Night
            </h2>
            <div className="mb-4">
              <label className="block text-sm text-gray-300 mb-2">Night Panna (000-999)</label>
              <input
                type="text" 
                value={nightP} 
                onChange={e => setNightP(e.target.value)}
                placeholder="Leave empty for random" 
                className="w-full p-3 text-black rounded-lg font-mono text-lg font-bold focus:ring-2 focus:ring-purple-500 outline-none"
                maxLength={3}
              />
              <p className="text-xs text-gray-400 mt-1">💡 Leave empty to generate random panna</p>
            </div>
            <button 
              onClick={publishNight} 
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-4 px-6 rounded-lg shadow-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed" 
              disabled={busy}
            >
              {busy ? '⏳ Publishing…' : '🏁 Publish Night'}
            </button>
          </div>
        )}
      </div>
    
    </main>
    <AdminHistoryEditor />
    </>
  );
}
