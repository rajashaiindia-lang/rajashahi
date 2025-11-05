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

export default function AdminPanel() {
  // 1) default to TODAY
  const [sessionDate, setSessionDate] = useState<string>(new Date().toISOString().slice(0, 10));

  const [round, setRound] = useState<Round | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [dayOpenP, setDayOpenP] = useState('');
  const [dayCloseP, setDayCloseP] = useState('');
  const [nightOpenP, setNightOpenP] = useState('');
  const [nightCloseP, setNightCloseP] = useState('');

  // try to get "current" round, but DON'T error if not found
  useEffect(() => {
  (async () => {
    try {
      const r = await fetch('/api/round/current', { cache: 'no-store' });
      if (r.status === 401) {
        window.location.href = '/admin';
        return;
      }
      if (!r.ok) return; // keep today

      const d = await r.json();
      const roundDate = d.round?.sessionDate;
      const today = new Date().toISOString().slice(0, 10);

      // only override if the round is for today (or a future date)
      if (roundDate && roundDate >= today) {
        setSessionDate(roundDate);
      }
      // else: keep today's date
    } catch {
      // ignore, keep today's date
    }
  })();
}, []);


  // whenever sessionDate changes, try to load that day.
  // if it doesn't exist → just clear round, don't show red error.
  useEffect(() => {
    if (!sessionDate) return;
    (async () => {
      try {
        const r = await fetch(`/api/admin/rounds/${sessionDate}`, { cache: 'no-store' });
        if (r.ok) {
          const d = await r.json();
          setRound(d.round ?? d);
          setErr(null);
        } else if (r.status === 404) {
          // no round yet for this date → allow user to publish
          setRound(null);
          setErr(null); // 👈 no scary message
        } else {
          const d = await r.json().catch(() => ({}));
          setRound(null);
          setErr(d.error || `Failed to load ${sessionDate}`);
        }
      } catch {
        setErr('Network error while loading date.');
      }
    })();
  }, [sessionDate]);

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

  // publishers stay the same: PATCH will create round if your API is updated as we wrote
  const publishDayOpen = () =>
    withBusy(async () => {
      const panna = dayOpenP.trim() ? pad3(dayOpenP) : randPanna();
      if (!/^\d{3}$/.test(panna)) {
        setErr('Day opening panna must be 3 digits');
        return;
      }
      const r = await fetch(`/api/admin/rounds/${sessionDate}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dayOpenPanna: panna }),
      });
      const d = await r.json();
      if (!r.ok || !d.ok) {
        setErr(d.error || 'Failed to publish day opening');
        return;
      }
      setRound(d.round || null);
      setDayOpenP('');
      setSuccess(`Day opening published for ${sessionDate}!`);
    });

  const publishDayClose = () =>
    withBusy(async () => {
      const panna = dayCloseP.trim() ? pad3(dayCloseP) : randPanna();
      if (!/^\d{3}$/.test(panna)) {
        setErr('Day closing panna must be 3 digits');
        return;
      }
      const r = await fetch(`/api/admin/rounds/${sessionDate}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dayClosePanna: panna }),
      });
      const d = await r.json();
      if (!r.ok || !d.ok) {
        setErr(d.error || 'Failed to publish day closing');
        return;
      }
      setRound(d.round || null);
      setDayCloseP('');
      setSuccess(`Day closing published for ${sessionDate}!`);
    });

  const publishNightOpen = () =>
    withBusy(async () => {
      const panna = nightOpenP.trim() ? pad3(nightOpenP) : randPanna();
      if (!/^\d{3}$/.test(panna)) {
        setErr('Night opening panna must be 3 digits');
        return;
      }
      const r = await fetch(`/api/admin/rounds/${sessionDate}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nightOpenPanna: panna }),
      });
      const d = await r.json();
      if (!r.ok || !d.ok) {
        setErr(d.error || 'Failed to publish night opening');
        return;
      }
      setRound(d.round || null);
      setNightOpenP('');
      setSuccess(`Night opening published for ${sessionDate}!`);
    });

  const publishNightClose = () =>
    withBusy(async () => {
      const panna = nightCloseP.trim() ? pad3(nightCloseP) : randPanna();
      if (!/^\d{3}$/.test(panna)) {
        setErr('Night closing panna must be 3 digits');
        return;
      }
      const r = await fetch(`/api/admin/rounds/${sessionDate}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nightClosePanna: panna }),
      });
      const d = await r.json();
      if (!r.ok || !d.ok) {
        setErr(d.error || 'Failed to publish night closing');
        return;
      }
      setRound(d.round || null);
      setNightCloseP('');
      setSuccess(`Night closing published for ${sessionDate}!`);
    });

  // build display lines
  const dayLine = useMemo(() => {
    const op = round?.dayOpenPanna ?? round?.dayPanna ?? '—';
    const od = round?.dayOpenDigit ?? round?.dayDigit ?? '—';
    const cp = round?.dayClosePanna ?? '—';
    const cd = round?.dayCloseDigit ?? '—';
    return `(${op}) ${od} | (${cp}) ${cd}`;
  }, [round]);

  const nightLine = useMemo(() => {
    const op = round?.nightOpenPanna ?? round?.nightPanna ?? '—';
    const od = round?.nightOpenDigit ?? round?.nightDigit ?? '—';
    const cp = round?.nightClosePanna ?? '—';
    const cd = round?.nightCloseDigit ?? '—';
    return `(${op}) ${od} | (${cp}) ${cd}`;
  }, [round]);

  const dayOpenDone = !!round?.dayOpenDigit;
  const dayCloseDone = !!round?.dayCloseDigit;
  const nightOpenDone = !!round?.nightOpenDigit;
  const nightCloseDone = !!round?.nightCloseDigit;

  return (
    <>
    <main className="min-h-screen bg-white text-gray-900">
      {/* Header */}
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
              onClick={() => {
                if (sessionDate) {
                  fetch(`/api/admin/rounds/${sessionDate}`, { cache: 'no-store' })
                    .then(r => r.json())
                    .then(d => {
                      if (d.ok) setRound(d.round ?? d);
                      else setRound(null);
                    });
                }
              }}
              className="px-4 py-2 rounded-lg bg-white border-2 border-gray-300 hover:bg-gray-50 transition-all text-gray-900 font-semibold"
              disabled={busy}
            >
              🔄 Refresh
            </button>
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
        {/* Alerts */}
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

        {/* Date selector */}
        <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-300 flex items-center gap-4">
          <label className="text-sm text-gray-700 font-semibold">Result Date:</label>
          <input
            type="date"
            value={sessionDate}
            onChange={e => setSessionDate(e.target.value)}
            className="px-3 py-2 rounded-lg border-2 border-gray-300 text-gray-900 font-semibold"
          />
          <p className="text-xs text-gray-600">
            Every publish below will be stored for{' '}
            <span className="text-blue-600 font-semibold">{sessionDate}</span>
          </p>
        </div>

        {/* Current Results card */}
        <div className="bg-blue-50 text-gray-900 rounded-xl p-6 border-4 border-blue-600 shadow-lg">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-blue-900 mb-2">Current Results</h2>

              <div>
                <div className="text-sm font-semibold text-blue-800 mb-1">Day</div>
                <div className="text-3xl font-mono font-bold tracking-wider mb-1 text-gray-900">{dayLine}</div>
                <div className="text-lg font-semibold text-gray-900">
                  Day Jodi: <span className="text-blue-900 text-2xl">{round?.dayJodi ?? '—'}</span>
                </div>
              </div>

              <div className="h-px bg-blue-300" />

              <div>
                <div className="text-sm font-semibold text-blue-800 mb-1">Night</div>
                <div className="text-3xl font-mono font-bold tracking-wider mb-1 text-gray-900">{nightLine}</div>
                <div className="text-lg font-semibold text-gray-900">
                  Night Jodi: <span className="text-blue-900 text-2xl">{round?.nightJodi ?? '—'}</span>
                </div>
              </div>
            </div>
          </div>

        {/* TWO UPLOADERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Day uploader */}
          <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-400 shadow-md">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">☀️ Day (Open & Close)</h2>
            <div className="mb-4">
              <label className="block text-sm text-gray-700 font-semibold mb-2">Day Opening Panna (000-999)</label>
              <div className="flex gap-2">
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
                  className="px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-50 transition-colors"
                >
                  Publish
                </button>
              </div>
              {dayOpenDone && (
                <p className="text-xs text-green-700 font-semibold mt-1">
                  Current: {round?.dayOpenPanna} → {round?.dayOpenDigit}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-700 font-semibold mb-2">Day Closing Panna (000-999)</label>
              <div className="flex gap-2">
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
                  className="px-4 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold disabled:opacity-50 transition-colors"
                >
                  Publish
                </button>
              </div>
              {dayCloseDone && (
                <p className="text-xs text-green-700 font-semibold mt-1">
                  Current: {round?.dayClosePanna} → {round?.dayCloseDigit}
                </p>
              )}
            </div>
          </div>

          {/* Night uploader */}
          <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-400 shadow-md">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">🌙 Night (Open & Close)</h2>
            <div className="mb-4">
              <label className="block text-sm text-gray-700 font-semibold mb-2">Night Opening Panna (000-999)</label>
              <div className="flex gap-2">
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
                  className="px-4 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold disabled:opacity-50 transition-colors"
                >
                  Publish
                </button>
              </div>
              {nightOpenDone && (
                <p className="text-xs text-green-700 font-semibold mt-1">
                  Current: {round?.nightOpenPanna} → {round?.nightOpenDigit}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-700 font-semibold mb-2">Night Closing Panna (000-999)</label>
              <div className="flex gap-2">
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
                  className="px-4 py-3 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-semibold disabled:opacity-50 transition-colors"
                >
                  Publish
                </button>
              </div>
              {nightCloseDone && (
                <p className="text-xs text-green-700 font-semibold mt-1">
                  Current: {round?.nightClosePanna} → {round?.nightCloseDigit}
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
