// app/(admin)/AdminHistoryEditor.tsx
'use client';

import { useEffect, useState } from 'react';

type RoundLite = {
  sessionDate: string;
  status: 'READY' | 'DAY_PUBLISHED' | 'CLOSED';
  dayPanna?: string | null;
  dayDigit?: number | null;
  nightPanna?: string | null;
  nightDigit?: number | null;
  jodi?: string | null;
};

// While typing: strip non-digits and cap length to 3. Do NOT pad.
const clean3 = (v: string) => v.replace(/\D/g, '').slice(0, 3);

function RowEditor({
  r,
  onSave,
  onDelete,
}: {
  r: RoundLite;
  onSave: (sessionDate: string, dayPanna?: string | null, nightPanna?: string | null) => Promise<void>;
  onDelete: (sessionDate: string) => Promise<void>;
}) {
  const [dDay, setDDay] = useState('');
  const [dNight, setDNight] = useState('');

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'READY': return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'DAY_PUBLISHED': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
      case 'CLOSED': return 'bg-green-500/20 text-green-300 border-green-500/40';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/40';
    }
  };

  return (
    <tr className="border-t border-gray-700 hover:bg-gray-700/30 transition-colors">
      <td className="py-4 px-3">
        <span className="text-yellow-300 font-bold">{r.sessionDate}</span>
      </td>

      <td className="py-4 px-3">
        <div className="flex flex-col gap-2">
          <div className="text-white font-mono">
            {r.dayPanna ? (
              <span className="text-green-300">({r.dayPanna}) {r.dayDigit}</span>
            ) : (
              <span className="text-gray-500">—</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <input
              placeholder="000"
              value={dDay}
              onChange={e => setDDay(clean3(e.target.value))}
              maxLength={3}
              className="w-20 px-2 py-1 text-black rounded-lg font-mono font-bold focus:ring-2 focus:ring-blue-500 outline-none"
              onBlur={() => dDay && setDDay(dDay.padStart(3, '0'))}
            />
            <button
              onClick={() => onSave(r.sessionDate, dDay || undefined, undefined)}
              className="px-3 py-1 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-sm transition-all"
            >
              💾
            </button>
            <button
              onClick={() => onSave(r.sessionDate, null, undefined)}
              className="px-3 py-1 rounded-lg bg-gray-600 hover:bg-gray-700 text-white font-semibold text-sm transition-all"
            >
              ✖
            </button>
          </div>
        </div>
      </td>

      <td className="py-4 px-3">
        <div className="flex flex-col gap-2">
          <div className="text-white font-mono">
            {r.nightPanna ? (
              <span className="text-purple-300">({r.nightPanna}) {r.nightDigit}</span>
            ) : (
              <span className="text-gray-500">—</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <input
              placeholder="000"
              value={dNight}
              onChange={e => setDNight(clean3(e.target.value))}
              maxLength={3}
              className="w-20 px-2 py-1 text-black rounded-lg font-mono font-bold focus:ring-2 focus:ring-purple-500 outline-none"
              onBlur={() => dNight && setDNight(dNight.padStart(3, '0'))}
            />
            <button
              onClick={() => onSave(r.sessionDate, undefined, dNight || undefined)}
              className="px-3 py-1 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold text-sm transition-all"
            >
              💾
            </button>
            <button
              onClick={() => onSave(r.sessionDate, undefined, null)}
              className="px-3 py-1 rounded-lg bg-gray-600 hover:bg-gray-700 text-white font-semibold text-sm transition-all"
            >
              ✖
            </button>
          </div>
        </div>
      </td>

      <td className="py-4 px-3">
        <span className={`inline-flex px-3 py-1.5 rounded-full text-xs font-bold uppercase border ${getStatusBadge(r.status)}`}>
          {r.status}
        </span>
      </td>

      <td className="py-4 px-3">
        <span className="text-yellow-400 font-bold text-lg font-mono">
          {r.jodi ?? '—'}
        </span>
      </td>

      <td className="py-4 px-3">
        <button
          onClick={() => onDelete(r.sessionDate)}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-sm transition-all transform hover:scale-105"
        >
          🗑️ Delete
        </button>
      </td>
    </tr>
  );
}

export default function AdminHistoryEditor() {
  const [month, setMonth] = useState<string>(new Date().toISOString().slice(0,7));
  const [rows, setRows] = useState<RoundLite[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [msgType, setMsgType] = useState<'success' | 'error'>('success');

  const load = async () => {
    setLoading(true); setMsg(null);
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

  useEffect(() => { load(); }, [month]);

  const save = async (sessionDate: string, dayPanna?: string | null, nightPanna?: string | null) => {
    setMsg(null);
    const body: any = {};
    if (dayPanna !== undefined)  body.dayPanna   = dayPanna;
    if (nightPanna !== undefined)body.nightPanna = nightPanna;

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
    const r = await fetch(`/api/admin/rounds/${encodeURIComponent(sessionDate.trim())}`, { method: 'DELETE' });
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
    <div className="bg-gray-800/50 backdrop-blur-sm border-2 border-gray-700 rounded-xl p-6 space-y-4 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-yellow-400">📝 History Editor</h3>
      </div>

      {/* Controls */}
      <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-300 font-semibold">📅 Month:</label>
            <input
              type="month"
              value={month}
              onChange={e => setMonth(e.target.value)}
              className="px-3 py-2 text-black rounded-lg font-semibold focus:ring-2 focus:ring-yellow-500 outline-none"
            />
          </div>
          <button 
            onClick={load} 
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-black font-bold transition-all transform hover:scale-105"
            disabled={loading}
          >
            {loading ? '⏳ Loading...' : '🔄 Reload'}
          </button>
          {msg && (
            <div className={`px-4 py-2 rounded-lg border-2 ${
              msgType === 'success' 
                ? 'bg-green-500/10 border-green-500 text-green-200' 
                : 'bg-red-500/10 border-red-500 text-red-200'
            }`}>
              {msg}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-gray-900 to-gray-800 border-b-2 border-yellow-600/50">
              <th className="py-4 px-3 text-left text-yellow-400 font-bold uppercase tracking-wider">📆 Date</th>
              <th className="py-4 px-3 text-left text-yellow-400 font-bold uppercase tracking-wider">☀️ Day</th>
              <th className="py-4 px-3 text-left text-yellow-400 font-bold uppercase tracking-wider">🌙 Night</th>
              <th className="py-4 px-3 text-left text-yellow-400 font-bold uppercase tracking-wider">📊 Status</th>
              <th className="py-4 px-3 text-left text-yellow-400 font-bold uppercase tracking-wider">🎯 Jodi</th>
              <th className="py-4 px-3 text-left text-yellow-400 font-bold uppercase tracking-wider">⚙️ Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && !loading && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-400">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-3xl">📭</span>
                    <span>No rounds found for this month</span>
                  </div>
                </td>
              </tr>
            )}
            {rows.map(r => (
              <RowEditor key={r.sessionDate} r={r} onSave={save} onDelete={del} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      {rows.length > 0 && (
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-4 py-3 rounded-lg border-t-2 border-gray-700">
          <p className="text-xs text-gray-400 text-center">
            📊 Total Rounds: <span className="font-semibold text-yellow-400">{rows.length}</span>
          </p>
        </div>
      )}
    </div>
  );
}