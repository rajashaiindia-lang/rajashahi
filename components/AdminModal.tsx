'use client';

import { useEffect, useMemo, useState } from 'react';

type Round = {
  roundId: string;
  market: 'KALYAN' | 'DEMO';
  sessionDate: string;
  openingTime: string;
  closingTime: string;
  status: 'READY' | 'OPENING_PUBLISHED' | 'CLOSED';
  openingPanna?: string;
  openingDigit?: number;
  closingPanna?: string;
  closingDigit?: number;
  jodi?: string;
};

const pad = (n: number, len = 3) => String(n).padStart(len, '0');

const randomPannaLocal = () => pad(Math.floor(Math.random() * 1000), 3);

export default function AdminModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [password, setPassword] = useState('');
  const [isAuthed, setIsAuthed] = useState(false);
  const [current, setCurrent] = useState<Round | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Inputs for starting round & publishing results
  const [sessionDate, setSessionDate] = useState<string>('');
  const [openingTime, setOpeningTime] = useState<string>('16:15');
  const [closingTime, setClosingTime] = useState<string>('18:15');
  const [openingPanna, setOpeningPanna] = useState<string>('');
  const [closingPanna, setClosingPanna] = useState<string>('');

  useEffect(() => {
    if (!open) return;
    fetch('/api/round/current', { cache: 'no-store' })
      .then((r) => r.json())
      .then((d) => setCurrent(d.round ?? null))
      .catch(() => {});
  }, [open]);

  const login = async () => {
    setBusy(true);
    setError(null);
    try {
      const r = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (r.ok) {
        setIsAuthed(true);
        const res = await fetch('/api/round/current', { cache: 'no-store' }).then((x) => x.json());
        setCurrent(res.round ?? null);
      } else setError('Invalid admin password');
    } catch {
      setError('Network error');
    } finally {
      setBusy(false);
    }
  };

  const startRound = async () => {
    if (!isAuthed) return setError('Please login first.');
    if (!sessionDate) {
      // default today (local)
      const now = new Date();
      const y = now.getFullYear();
      const m = String(now.getMonth() + 1).padStart(2, '0');
      const d = String(now.getDate()).padStart(2, '0');
      setSessionDate(`${y}-${m}-${d}`);
    }
    setBusy(true);
    setError(null);
    try {
      const r = await fetch('/api/round/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionDate: sessionDate ||
            new Date().toISOString().slice(0, 10),
          market: 'DEMO',
          openingTime,
          closingTime,
        }),
      });
      const data = await r.json();
      if (r.ok) setCurrent(data.round || null);
      else setError(data.error || 'Failed to start round');
    } catch {
      setError('Network error');
    } finally {
      setBusy(false);
    }
  };

  const publishOpening = async () => {
    if (!isAuthed) return setError('Please login first.');
    setBusy(true);
    setError(null);
    try {
      const panna = openingPanna || randomPannaLocal();
      const r = await fetch('/api/result/opening', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ openingPanna: panna }),
      });
      const data = await r.json();
      if (r.ok) {
        setCurrent(data.round || null);
        setOpeningPanna('');
      } else setError(data.error || 'Failed to publish opening');
    } catch {
      setError('Network error');
    } finally {
      setBusy(false);
    }
  };

  const publishClosing = async () => {
    if (!isAuthed) return setError('Please login first.');
    setBusy(true);
    setError(null);
    try {
      const panna = closingPanna || randomPannaLocal();
      const r = await fetch('/api/result/closing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ closingPanna: panna }),
      });
      const data = await r.json();
      if (r.ok) {
        setCurrent(data.round || null);
        setClosingPanna('');
      } else setError(data.error || 'Failed to publish closing');
    } catch {
      setError('Network error');
    } finally {
      setBusy(false);
    }
  };

  const resultLine = useMemo(() => {
    if (!current) return '—';
    const op = current.openingPanna ?? '—';
    const od = current.openingDigit ?? '—';
    const cd = current.closingDigit ?? '—';
    const cp = current.closingPanna ?? '—';
    return `(${op}) ${od} | ${cd} (${cp})`;
  }, [current]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-[36rem] max-w-full rounded-lg shadow-xl">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Admin</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">✕</button>
        </div>

        <div className="p-4 space-y-5">
          {!isAuthed ? (
            <div className="space-y-3">
              <label className="block">
                <span className="text-sm">Admin Password</span>
                <input
                  type="password"
                  className="mt-1 w-full border rounded px-3 py-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                onClick={login}
                disabled={busy || !password}
                className="px-4 py-2 rounded bg-black text-white disabled:opacity-50"
              >
                {busy ? '…' : 'Login'}
              </button>
            </div>
          ) : (
            <>
              <div className="p-3 bg-gray-50 rounded border">
                <p className="text-sm font-medium">Current Round</p>
                {current ? (
                  <div className="text-sm mt-1 space-y-1">
                    <p>ID: <span className="font-mono">{current.roundId}</span></p>
                    <p>Status: <span className="font-semibold">{current.status}</span></p>
                    <p>Market/Date: {current.market} · {current.sessionDate}</p>
                    <p>Times: Open {current.openingTime} · Close {current.closingTime}</p>
                    <p>Result: <span className="font-mono">{resultLine}</span></p>
                    {current.jodi && <p>Jodi: <span className="font-semibold">{current.jodi}</span></p>}
                  </div>
                ) : <p className="text-sm text-gray-600">No active round.</p>}
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={sessionDate}
                    onChange={(e) => setSessionDate(e.target.value)}
                    className="border rounded px-2 py-1"
                  />
                  <input
                    type="time"
                    value={openingTime}
                    onChange={(e) => setOpeningTime(e.target.value)}
                    className="border rounded px-2 py-1"
                  />
                  <input
                    type="time"
                    value={closingTime}
                    onChange={(e) => setClosingTime(e.target.value)}
                    className="border rounded px-2 py-1"
                  />
                  <button onClick={startRound} className="px-3 py-2 bg-gray-900 text-white rounded">
                    Start Round
                  </button>
                </div>

                <div className="flex items-end gap-2">
                  <label className="flex-1">
                    <span className="text-sm">Opening panna (000–999)</span>
                    <input
                      value={openingPanna}
                      onChange={(e) => setOpeningPanna(e.target.value)}
                      placeholder="e.g., 160"
                      className="mt-1 w-full border rounded px-3 py-2"
                    />
                  </label>
                  <button onClick={publishOpening} className="px-3 py-2 bg-blue-600 text-white rounded">
                    Publish Opening
                  </button>
                </div>

                <div className="flex items-end gap-2">
                  <label className="flex-1">
                    <span className="text-sm">Closing panna (000–999)</span>
                    <input
                      value={closingPanna}
                      onChange={(e) => setClosingPanna(e.target.value)}
                      placeholder="e.g., 135"
                      className="mt-1 w-full border rounded px-3 py-2"
                    />
                  </label>
                  <button onClick={publishClosing} className="px-3 py-2 bg-green-600 text-white rounded">
                    Publish Closing
                  </button>
                </div>

                <p className="text-xs text-gray-500">
                  Demo only — pannas can be typed or auto-generated. Digits & Jodi are derived server-side.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
