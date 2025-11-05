// app/(admin)/AdminHistoryEditor.tsx
'use client';

import { useEffect, useState } from 'react';

// shared shape – supports old + new
type RoundLite = {
  sessionDate: string;
  status?: 'READY' | 'DAY_PUBLISHED' | 'CLOSED' | string;

  // old
  dayPanna?: string | null;
  dayDigit?: number | null;
  nightPanna?: string | null;
  nightDigit?: number | null;
  jodi?: string | null;

  // new (optional)
  dayOpenPanna?: string | null;
  dayClosePanna?: string | null;
  dayJodi?: string | null;

  nightOpenPanna?: string | null;
  nightClosePanna?: string | null;
  nightJodi?: string | null;
};

const clean3 = (v: string) => v.replace(/\D/g, '').slice(0, 3);

function DayRow({
  r,
  onSave,
  onDelete,
}: {
  r: RoundLite;
  onSave: (sessionDate: string, patch: Record<string, string | null>) => Promise<void>;
  onDelete: (sessionDate: string) => Promise<void>;
}) {
  const [dayOpen, setDayOpen] = useState('');
  const [dayClose, setDayClose] = useState('');

  const dayOpenShown = r.dayOpenPanna ?? r.dayPanna ?? null;

  return (
    <tr className="border-t border-gray-300 hover:bg-blue-50 transition-colors align-top">
      <td className="py-3 px-3 text-blue-900 font-semibold">{r.sessionDate}</td>
      <td className="py-3 px-3">
        <div className="text-xs text-gray-900 space-y-1">
          <div>
            <span className="text-gray-600 mr-2">Open:</span>
            {dayOpenShown ? (
              <span className="text-green-700 font-mono font-semibold">({dayOpenShown})</span>
            ) : (
              <span className="text-gray-400">—</span>
            )}
          </div>
          <div>
            <span className="text-gray-600 mr-2">Close:</span>
            {r.dayClosePanna ? (
              <span className="text-green-700 font-mono font-semibold">({r.dayClosePanna})</span>
            ) : (
              <span className="text-gray-400">—</span>
            )}
          </div>
          <div>
            <span className="text-gray-600 mr-2">Jodi:</span>
            {r.dayJodi ? (
              <span className="text-blue-700 font-mono text-sm font-semibold">{r.dayJodi}</span>
            ) : (
              <span className="text-gray-400">—</span>
            )}
          </div>
        </div>
      </td>
      <td className="py-3 px-3">
        <div className="flex items-center gap-2">
          <input
            placeholder="day open"
            value={dayOpen}
            onChange={e => setDayOpen(clean3(e.target.value))}
            onBlur={() => dayOpen && setDayOpen(dayOpen.padStart(3, '0'))}
            maxLength={3}
            className="w-24 px-2 py-1 border-2 border-gray-300 rounded-lg font-mono font-bold focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
          />
          <button
            onClick={() => onSave(r.sessionDate, { dayOpenPanna: dayOpen || null })}
            className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
          >
            💾
          </button>
        </div>
      </td>
      <td className="py-3 px-3">
        <div className="flex items-center gap-2">
          <input
            placeholder="day close"
            value={dayClose}
            onChange={e => setDayClose(clean3(e.target.value))}
            onBlur={() => dayClose && setDayClose(dayClose.padStart(3, '0'))}
            maxLength={3}
            className="w-24 px-2 py-1 border-2 border-gray-300 rounded-lg font-mono font-bold focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900"
          />
          <button
            onClick={() => onSave(r.sessionDate, { dayClosePanna: dayClose || null })}
            className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors"
          >
            💾
          </button>
        </div>
      </td>
      <td className="py-3 px-3">
        <button
          onClick={() => onDelete(r.sessionDate)}
          className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors"
        >
          🗑️
        </button>
      </td>
    </tr>
  );
}

function NightRow({
  r,
  onSave,
  onDelete,
}: {
  r: RoundLite;
  onSave: (sessionDate: string, patch: Record<string, string | null>) => Promise<void>;
  onDelete: (sessionDate: string) => Promise<void>;
}) {
  const [nightOpen, setNightOpen] = useState('');
  const [nightClose, setNightClose] = useState('');

  const nightOpenShown = r.nightOpenPanna ?? r.nightPanna ?? null;

  return (
    <tr className="border-t border-gray-300 hover:bg-purple-50 transition-colors align-top">
      <td className="py-3 px-3 text-purple-900 font-semibold">{r.sessionDate}</td>
      <td className="py-3 px-3">
        <div className="text-xs text-gray-900 space-y-1">
          <div>
            <span className="text-gray-600 mr-2">Open:</span>
            {nightOpenShown ? (
              <span className="text-purple-700 font-mono font-semibold">({nightOpenShown})</span>
            ) : (
              <span className="text-gray-400">—</span>
            )}
          </div>
          <div>
            <span className="text-gray-600 mr-2">Close:</span>
            {r.nightClosePanna ? (
              <span className="text-purple-700 font-mono font-semibold">({r.nightClosePanna})</span>
            ) : (
              <span className="text-gray-400">—</span>
            )}
          </div>
          <div>
            <span className="text-gray-600 mr-2">Jodi:</span>
            {r.nightJodi ? (
              <span className="text-purple-700 font-mono text-sm font-semibold">{r.nightJodi}</span>
            ) : (
              <span className="text-gray-400">—</span>
            )}
          </div>
        </div>
      </td>
      <td className="py-3 px-3">
        <div className="flex items-center gap-2">
          <input
            placeholder="night open"
            value={nightOpen}
            onChange={e => setNightOpen(clean3(e.target.value))}
            onBlur={() => nightOpen && setNightOpen(nightOpen.padStart(3, '0'))}
            maxLength={3}
            className="w-24 px-2 py-1 border-2 border-gray-300 rounded-lg font-mono font-bold focus:ring-2 focus:ring-purple-500 outline-none text-gray-900"
          />
          <button
            onClick={() => onSave(r.sessionDate, { nightOpenPanna: nightOpen || null })}
            className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold transition-colors"
          >
            💾
          </button>
        </div>
      </td>
      <td className="py-3 px-3">
        <div className="flex items-center gap-2">
          <input
            placeholder="night close"
            value={nightClose}
            onChange={e => setNightClose(clean3(e.target.value))}
            onBlur={() => nightClose && setNightClose(nightClose.padStart(3, '0'))}
            maxLength={3}
            className="w-24 px-2 py-1 border-2 border-gray-300 rounded-lg font-mono font-bold focus:ring-2 focus:ring-pink-500 outline-none text-gray-900"
          />
          <button
            onClick={() => onSave(r.sessionDate, { nightClosePanna: nightClose || null })}
            className="px-3 py-1 rounded-lg bg-pink-600 hover:bg-pink-700 text-white text-sm font-semibold transition-colors"
          >
            💾
          </button>
        </div>
      </td>
      <td className="py-3 px-3">
        <button
          onClick={() => onDelete(r.sessionDate)}
          className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors"
        >
          🗑️
        </button>
      </td>
    </tr>
  );
}

export default function AdminHistoryEditor() {
  const [month, setMonth] = useState<string>(new Date().toISOString().slice(0, 7));
  const [rows, setRows] = useState<RoundLite[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [msgType, setMsgType] = useState<'success' | 'error'>('success');

  const load = async () => {
    setLoading(true);
    setMsg(null);
    try {
      const r = await fetch(`/api/admin/rounds?month=${month}`, { cache: 'no-store' });
      const d = await r.json();
      setRows(d.items || []);
    } catch {
      setMsg('Failed to load rounds');
      setMsgType('error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [month]);

  const save = async (sessionDate: string, patch: Record<string, string | null>) => {
    setMsg(null);
    const body: any = {};
    for (const [k, v] of Object.entries(patch)) {
      if (v === undefined) continue;
      body[k] = v;
    }

    const r = await fetch(`/api/admin/rounds/${encodeURIComponent(sessionDate.trim())}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) {
      setMsg(d.error || 'Update failed');
      setMsgType('error');
      return;
    }
    setMsg('✅ Saved successfully!');
    setMsgType('success');
    await load();
  };

  const del = async (sessionDate: string) => {
    if (!confirm(`Delete round ${sessionDate}?`)) return;
    const r = await fetch(`/api/admin/rounds/${encodeURIComponent(sessionDate.trim())}`, {
      method: 'DELETE',
    });
    if (!r.ok) {
      setMsg('Delete failed');
      setMsgType('error');
      return;
    }
    setMsg('✅ Deleted successfully!');
    setMsgType('success');
    await load();
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4">
      {/* Controls */}
      <div className="bg-gray-50 border-2 border-gray-300 rounded-xl p-6 space-y-4 shadow-md">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900">📝 History Editor (Day & Night)</h3>
        </div>
        <div className="bg-white rounded-lg p-4 border-2 border-gray-300 flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700 font-semibold">📅 Month:</label>
            <input
              type="month"
              value={month}
              onChange={e => setMonth(e.target.value)}
              className="px-3 py-2 border-2 border-gray-300 rounded-lg font-semibold focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
            />
          </div>
          <button
            onClick={load}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all transform hover:scale-105"
            disabled={loading}
          >
            {loading ? '⏳ Loading...' : '🔄 Reload'}
          </button>
          {msg && (
            <div
              className={`px-4 py-2 rounded-lg border-2 ${
                msgType === 'success'
                  ? 'bg-green-50 border-green-500 text-green-800'
                  : 'bg-red-50 border-red-500 text-red-800'
              }`}
            >
              {msg}
            </div>
          )}
        </div>
      </div>

      {/* DAY EDITOR */}
      <div className="bg-blue-50 border-2 border-blue-400 rounded-xl p-6 space-y-4 shadow-md">
        <h4 className="text-lg font-bold text-blue-900 flex items-center gap-2">
          ☀️ Day Opening / Closing
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm bg-white rounded-lg overflow-hidden border-2 border-gray-300">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-300">
                <th className="py-3 px-3 text-left text-gray-700 text-xs uppercase tracking-wide font-bold">Date</th>
                <th className="py-3 px-3 text-left text-gray-700 text-xs uppercase tracking-wide font-bold">Current</th>
                <th className="py-3 px-3 text-left text-gray-700 text-xs uppercase tracking-wide font-bold">Set Open</th>
                <th className="py-3 px-3 text-left text-gray-700 text-xs uppercase tracking-wide font-bold">Set Close</th>
                <th className="py-3 px-3 text-left text-gray-700 text-xs uppercase tracking-wide font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && !loading && (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-gray-500">
                    No rounds for this month.
                  </td>
                </tr>
              )}
              {rows.map(r => (
                <DayRow key={`day-${r.sessionDate}`} r={r} onSave={save} onDelete={del} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* NIGHT EDITOR */}
      <div className="bg-purple-50 border-2 border-purple-400 rounded-xl p-6 space-y-4 shadow-md mb-10">
        <h4 className="text-lg font-bold text-purple-900 flex items-center gap-2">
          🌙 Night Opening / Closing
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm bg-white rounded-lg overflow-hidden border-2 border-gray-300">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-300">
                <th className="py-3 px-3 text-left text-gray-700 text-xs uppercase tracking-wide font-bold">Date</th>
                <th className="py-3 px-3 text-left text-gray-700 text-xs uppercase tracking-wide font-bold">Current</th>
                <th className="py-3 px-3 text-left text-gray-700 text-xs uppercase tracking-wide font-bold">Set Open</th>
                <th className="py-3 px-3 text-left text-gray-700 text-xs uppercase tracking-wide font-bold">Set Close</th>
                <th className="py-3 px-3 text-left text-gray-700 text-xs uppercase tracking-wide font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && !loading && (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-gray-500">
                    No rounds for this month.
                  </td>
                </tr>
              )}
              {rows.map(r => (
                <NightRow key={`night-${r.sessionDate}`} r={r} onSave={save} onDelete={del} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}