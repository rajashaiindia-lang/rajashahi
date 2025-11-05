'use client';

import AdminHistoryEditor from '@/components/AdminHistoryEditor';
import { useEffect, useMemo, useState } from 'react';

type LineStatus = 'READY' | 'OPEN_PUBLISHED' | 'CLOSED';

type Round = {
  roundId: string;
  sessionDate: string;
  dayTime: string;
  nightTime: string;
  status: 'READY' | 'DAY_PUBLISHED' | 'CLOSED';
  dayOpenPanna?: string | null;
  dayOpenDigit?: number | null;
  dayClosePanna?: string | null;
  dayCloseDigit?: number | null;
  dayJodi?: string | null;
  dayLineStatus?: LineStatus;
  nightOpenPanna?: string | null;
  nightOpenDigit?: number | null;
  nightClosePanna?: string | null;
  nightCloseDigit?: number | null;
  nightJodi?: string | null;
  nightLineStatus?: LineStatus;
  dayPanna?: string;
  dayDigit?: number;
  nightPanna?: string;
  nightDigit?: number;
  jodi?: string;
};

const pad3 = (v: string) => v.replace(/\D/g, '').slice(0, 3).padStart(3, '0');
const randPanna = () => String(Math.floor(Math.random() * 1000)).padStart(3, '0');
const todayStr = () => new Date().toISOString().slice(0, 10);

export default function AdminPanel() {
  const [dayDate, setDayDate] = useState<string>(todayStr());
  const [nightDate, setNightDate] = useState<string>(todayStr());

  // the latest round in DB
  const [latestRound, setLatestRound] = useState<Round | null>(null);

  // rounds for selected dates
  const [dayRound, setDayRound] = useState<Round | null>(null);
  const [nightRound, setNightRound] = useState<Round | null>(null);

  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // inputs
  const [dayOpenP, setDayOpenP] = useState('');
  const [dayCloseP, setDayCloseP] = useState('');
  const [nightOpenP, setNightOpenP] = useState('');
  const [nightCloseP, setNightCloseP] = useState('');

  // optional time inputs
  const [dayOpenTime, setDayOpenTime] = useState('');
  const [dayCloseTime, setDayCloseTime] = useState('');
  const [nightOpenTime, setNightOpenTime] = useState('');
  const [nightCloseTime, setNightCloseTime] = useState('');

  // load latest once
  useEffect(() => {
    (async () => {
      try {
        const r = await fetch('/api/round/current', { cache: 'no-store' });
        if (r.status === 401) {
          window.location.href = '/admin';
          return;
        }
        if (!r.ok) return;
        const d = await r.json();
        if (d.round?.sessionDate) {
          const latestDate = d.round.sessionDate;
          setLatestRound(d.round);
          setDayDate(latestDate);
          setNightDate(latestDate);
        }
      } catch {
        // ignore
      }
    })();
  }, []);

  // load day round for chosen date
  useEffect(() => {
    if (!dayDate) return;
    (async () => {
      try {
        const r = await fetch(`/api/admin/rounds/${dayDate}`, { cache: 'no-store' });
        if (r.ok) {
          const d = await r.json();
          setDayRound(d.round ?? d);
        } else if (r.status === 404) {
          setDayRound(null);
        }
      } catch {}
    })();
  }, [dayDate]);

  // load night round for chosen date
  useEffect(() => {
    if (!nightDate) return;
    (async () => {
      try {
        const r = await fetch(`/api/admin/rounds/${nightDate}`, { cache: 'no-store' });
        if (r.ok) {
          const d = await r.json();
          setNightRound(d.round ?? d);
        } else if (r.status === 404) {
          setNightRound(null);
        }
      } catch {}
    })();
  }, [nightDate]);

  const withBusy = async (fn: () => Promise<void>) => {
    setBusy(true);
    setErr(null);
    setSuccess(null);
    try {
      await fn();
    } catch {
      setErr('Network error');
    } finally {
      setBusy(false);
    }
  };

  // publishers
  const publishDayOpen = () =>
    withBusy(async () => {
      const panna = dayOpenP.trim() ? pad3(dayOpenP) : randPanna();
      if (!/^\d{3}$/.test(panna)) {
        setErr('Day opening panna must be 3 digits');
        return;
      }
      const body: any = { dayOpenPanna: panna };
      if (dayOpenTime.trim()) body.dayOpenTime = dayOpenTime.trim();
      const r = await fetch(`/api/admin/rounds/${dayDate}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const d = await r.json();
      if (!r.ok || !d.ok) {
        setErr(d.error || 'Failed to publish day opening');
        return;
      }
      setDayRound(d.round || null);
      setDayOpenP('');
      setSuccess(`Day opening published for ${dayDate}!`);
    });

  const publishDayClose = () =>
    withBusy(async () => {
      const panna = dayCloseP.trim() ? pad3(dayCloseP) : randPanna();
      if (!/^\d{3}$/.test(panna)) {
        setErr('Day closing panna must be 3 digits');
        return;
      }
      const body: any = { dayClosePanna: panna };
      if (dayCloseTime.trim()) body.dayCloseTime = dayCloseTime.trim();
      const r = await fetch(`/api/admin/rounds/${dayDate}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const d = await r.json();
      if (!r.ok || !d.ok) {
        setErr(d.error || 'Failed to publish day closing');
        return;
      }
      setDayRound(d.round || null);
      setDayCloseP('');
      setSuccess(`Day closing published for ${dayDate}!`);
    });

  const publishNightOpen = () =>
    withBusy(async () => {
      const panna = nightOpenP.trim() ? pad3(nightOpenP) : randPanna();
      if (!/^\d{3}$/.test(panna)) {
        setErr('Night opening panna must be 3 digits');
        return;
      }
      const body: any = { nightOpenPanna: panna };
      if (nightOpenTime.trim()) body.nightOpenTime = nightOpenTime.trim();
      const r = await fetch(`/api/admin/rounds/${nightDate}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const d = await r.json();
      if (!r.ok || !d.ok) {
        setErr(d.error || 'Failed to publish night opening');
        return;
      }
      setNightRound(d.round || null);
      setNightOpenP('');
      setSuccess(`Night opening published for ${nightDate}!`);
    });

  const publishNightClose = () =>
    withBusy(async () => {
      const panna = nightCloseP.trim() ? pad3(nightCloseP) : randPanna();
      if (!/^\d{3}$/.test(panna)) {
        setErr('Night closing panna must be 3 digits');
        return;
      }
      const body: any = { nightClosePanna: panna };
      if (nightCloseTime.trim()) body.nightCloseTime = nightCloseTime.trim();
      const r = await fetch(`/api/admin/rounds/${nightDate}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const d = await r.json();
      if (!r.ok || !d.ok) {
        setErr(d.error || 'Failed to publish night closing');
        return;
      }
      setNightRound(d.round || null);
      setNightCloseP('');
      setSuccess(`Night closing published for ${nightDate}!`);
    });

  // DISPLAY: use selected-date round, or fallback
  const displayDay = dayRound ?? latestRound;
  const displayNight = nightRound ?? latestRound;

  const dayLine = useMemo(() => {
    if (!displayDay) return '(—) — | (—) —';
    const op = displayDay.dayOpenPanna ?? displayDay.dayPanna ?? '—';
    const od = displayDay.dayOpenDigit ?? displayDay.dayDigit ?? '—';
    const cp = displayDay.dayClosePanna ?? '—';
    const cd = displayDay.dayCloseDigit ?? '—';
    return `(${op}) ${od} | (${cp}) ${cd}`;
  }, [displayDay]);

  const nightLine = useMemo(() => {
    if (!displayNight) return '(—) — | (—) —';
    const op = displayNight.nightOpenPanna ?? displayNight.nightPanna ?? '—';
    const od = displayNight.nightOpenDigit ?? displayNight.nightDigit ?? '—';
    const cp = displayNight.nightClosePanna ?? '—';
    const cd = displayNight.nightCloseDigit ?? '—';
    return `(${op}) ${od} | (${cp}) ${cd}`;
  }, [displayNight]);

  const dayOpenDone = !!displayDay?.dayOpenDigit;
  const dayCloseDone = !!displayDay?.dayCloseDigit;
  const nightOpenDone = !!displayNight?.nightOpenDigit;
  const nightCloseDone = !!displayNight?.nightCloseDigit;

  return (
    <>
      <main className="min-h-screen bg-white text-gray-900">
        <div className="bg-gray-900 py-6 border-b-4 border-blue-600 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="px-4 py-2 rounded-lg bg-white border-2 border-gray-300 hover:bg-gray-50 transition-all text-gray-900 font-semibold flex items-center gap-2"
            >
              ← Back
            </a>
            <h1 className="text-4xl font-extrabold tracking-wider text-white">
              ADMIN PANEL
            </h1>
          </div>
          <div className="flex gap-3">
          
            <button
              onClick={async () => {
                setBusy(true);
                try {
                  await fetch('/api/logout', { method: 'POST' });
                } catch {}
                finally {
                  setBusy(false);
                  window.location.href = '/admin';
                }
              }}
              className="px-4 py-2 rounded-lg bg-red-600 border-2 border-red-700 hover:bg-red-700 transition-all text-white font-semibold"
              disabled={busy}
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>

        <div className="max-w-6xl mx-auto p-4 space-y-6 mt-6">
          {err && (
            <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4 text-red-800">
              ⚠️ {err}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 text-green-800">
              ✅ {success}
            </div>
          )}

          {/* Current Results card */}
          <div className="bg-blue-50 text-gray-900 rounded-xl p-6 border-4 border-blue-600 shadow-lg">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-blue-900 mb-2">Current Results</h2>

              {/* DAY */}
              <div>
                <div className="text-sm font-semibold text-blue-800 mb-1">
                  Day ({dayRound ? dayDate : latestRound?.sessionDate ?? dayDate})
                </div>
                <div className="text-3xl font-mono font-bold tracking-wider mb-1 text-gray-900">
                  {dayLine}
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  Day Jodi:{' '}
                  <span className="text-blue-900 text-2xl">
                    {displayDay?.dayJodi ?? '—'}
                  </span>
                </div>
              </div>

              <div className="h-px bg-blue-300" />

              {/* NIGHT */}
              <div>
                <div className="text-sm font-semibold text-blue-800 mb-1">
                  Night ({nightRound ? nightDate : latestRound?.sessionDate ?? nightDate})
                </div>
                <div className="text-3xl font-mono font-bold tracking-wider mb-1 text-gray-900">
                  {nightLine}
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  Night Jodi:{' '}
                  <span className="text-blue-900 text-2xl">
                    {displayNight?.nightJodi ?? '—'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* TWO PANELS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Day panel */}
            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-400 shadow-md space-y-4">
              <h2 className="text-2xl font-bold text-blue-900 mb-1">☀️ Day (Open & Close)</h2>

              {/* date picker */}
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-700 font-semibold">Day date:</label>
                <input
                  type="date"
                  value={dayDate}
                  onChange={e => setDayDate(e.target.value)}
                  className="px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-900 font-semibold"
                />
              </div>

              {/* day open */}
              <div>
                <label className="block text-sm text-gray-700 font-semibold mb-2">
                  Day Opening Panna (000-999)
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={dayOpenP}
                    onChange={e => setDayOpenP(e.target.value)}
                    maxLength={3}
                    placeholder={dayOpenDone ? 'Already published' : 'e.g. 123'}
                    className="flex-1 p-3 border-2 border-gray-300 rounded-lg font-mono text-lg font-bold text-gray-900"
                    disabled={busy}
                  />
                  <button
                    onClick={publishDayOpen}
                    disabled={busy}
                    className="px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                  >
                    Publish
                  </button>
                </div>
                {/* time */}
                <div className="flex items-center gap-2">
                  <label className="text-xs text-gray-600">Open time (IST):</label>
                  <input
                    type="time"
                    value={dayOpenTime}
                    onChange={e => setDayOpenTime(e.target.value)}
                    className="px-2 py-1 rounded border border-gray-300 text-sm"
                  />
                  <span className="text-[10px] text-gray-500">leave empty = no change</span>
                </div>
                {dayOpenDone && (
                  <p className="text-xs text-green-700 font-semibold mt-1">
                    Current: {displayDay?.dayOpenPanna} → {displayDay?.dayOpenDigit}
                  </p>
                )}
              </div>

              {/* day close */}
              <div>
                <label className="block text-sm text-gray-700 font-semibold mb-2">
                  Day Closing Panna (000-999)
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={dayCloseP}
                    onChange={e => setDayCloseP(e.target.value)}
                    maxLength={3}
                    placeholder={dayCloseDone ? 'Already published' : 'e.g. 456'}
                    className="flex-1 p-3 border-2 border-gray-300 rounded-lg font-mono text-lg font-bold text-gray-900"
                    disabled={busy}
                  />
                  <button
                    onClick={publishDayClose}
                    disabled={busy}
                    className="px-4 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                  >
                    Publish
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-gray-600">Close time (IST):</label>
                  <input
                    type="time"
                    value={dayCloseTime}
                    onChange={e => setDayCloseTime(e.target.value)}
                    className="px-2 py-1 rounded border border-gray-300 text-sm"
                  />
                  <span className="text-[10px] text-gray-500">leave empty = no change</span>
                </div>
                {dayCloseDone && (
                  <p className="text-xs text-green-700 font-semibold mt-1">
                    Current: {displayDay?.dayClosePanna} → {displayDay?.dayCloseDigit}
                  </p>
                )}
              </div>
            </div>

            {/* Night panel */}
            <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-400 shadow-md space-y-4">
              <h2 className="text-2xl font-bold text-purple-900 mb-1">🌙 Night (Open & Close)</h2>

              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-700 font-semibold">Night date:</label>
                <input
                  type="date"
                  value={nightDate}
                  onChange={e => setNightDate(e.target.value)}
                  className="px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-900 font-semibold"
                />
              </div>

              {/* night open */}
              <div>
                <label className="block text-sm text-gray-700 font-semibold mb-2">
                  Night Opening Panna (000-999)
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={nightOpenP}
                    onChange={e => setNightOpenP(e.target.value)}
                    maxLength={3}
                    placeholder={nightOpenDone ? 'Already published' : 'e.g. 789'}
                    className="flex-1 p-3 border-2 border-gray-300 rounded-lg font-mono text-lg font-bold text-gray-900"
                    disabled={busy}
                  />
                  <button
                    onClick={publishNightOpen}
                    disabled={busy}
                    className="px-4 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold"
                  >
                    Publish
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-gray-600">Open time (IST):</label>
                  <input
                    type="time"
                    value={nightOpenTime}
                    onChange={e => setNightOpenTime(e.target.value)}
                    className="px-2 py-1 rounded border border-gray-300 text-sm"
                  />
                  <span className="text-[10px] text-gray-500">leave empty = no change</span>
                </div>
                {nightOpenDone && (
                  <p className="text-xs text-green-700 font-semibold mt-1">
                    Current: {displayNight?.nightOpenPanna} → {displayNight?.nightOpenDigit}
                  </p>
                )}
              </div>

              {/* night close */}
              <div>
                <label className="block text-sm text-gray-700 font-semibold mb-2">
                  Night Closing Panna (000-999)
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={nightCloseP}
                    onChange={e => setNightCloseP(e.target.value)}
                    maxLength={3}
                    placeholder={nightCloseDone ? 'Already published' : 'e.g. 012'}
                    className="flex-1 p-3 border-2 border-gray-300 rounded-lg font-mono text-lg font-bold text-gray-900"
                    disabled={busy}
                  />
                  <button
                    onClick={publishNightClose}
                    disabled={busy}
                    className="px-4 py-3 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-semibold"
                  >
                    Publish
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-gray-600">Close time (IST):</label>
                  <input
                    type="time"
                    value={nightCloseTime}
                    onChange={e => setNightCloseTime(e.target.value)}
                    className="px-2 py-1 rounded border border-gray-300 text-sm"
                  />
                  <span className="text-[10px] text-gray-500">leave empty = no change</span>
                </div>
                {nightCloseDone && (
                  <p className="text-xs text-green-700 font-semibold mt-1">
                    Current: {displayNight?.nightClosePanna} → {displayNight?.nightCloseDigit}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <AdminHistoryEditor />
    </>
  );
}
