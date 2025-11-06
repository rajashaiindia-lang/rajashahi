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

  // new
  dayOpenPanna?: string | null;
  dayOpenTime?: string | null;
  dayClosePanna?: string | null;
  dayCloseTime?: string | null;
  dayJodi?: string | null;

  nightOpenPanna?: string | null;
  nightOpenTime?: string | null;
  nightClosePanna?: string | null;
  nightCloseTime?: string | null;
  nightJodi?: string | null;
};

const clean3 = (v: string) => v.replace(/\D/g, '').slice(0, 3);
const pad3 = (v: string) => v.padStart(3, '0');

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
      // sort by date desc so latest is on top
      const items: RoundLite[] = (d.items || []).sort((a: any, b: any) =>
        b.sessionDate.localeCompare(a.sessionDate)
      );
      setRows(items);
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
    if (!r.ok || d.ok === false) {
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
        <div className="flex flex-wrap items-center gap-4 justify-between">
          <h3 className="text-xl font-bold text-gray-900">📝 History Editor</h3>
          <div className="flex flex-wrap gap-3 items-center">
            <label className="text-sm text-gray-700 font-semibold">📅 Month:</label>
            <input
              type="month"
              value={month}
              onChange={e => setMonth(e.target.value)}
              className="px-3 py-2 border-2 border-gray-300 rounded-lg font-semibold focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
            />
            <button
              onClick={load}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all"
              disabled={loading}
            >
              {loading ? '⏳ Loading…' : '🔄 Reload'}
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
        <p className="text-xs text-gray-500">
          Tip: You can set panna and also schedule the time (IST) for that day or night directly here.
        </p>
      </div>

      {/* Unified table */}
      <div className="bg-white border-2 border-gray-200 rounded-xl shadow-md overflow-x-auto mb-10">
        <table className="w-full text-sm min-w-[1100px]">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300 text-xs uppercase tracking-wide text-gray-700">
              <th className="py-3 px-3 text-left">Date</th>
              <th className="py-3 px-3 text-left">Day Open</th>
              <th className="py-3 px-3 text-left">Day Close</th>
              <th className="py-3 px-3 text-left">Night Open</th>
              <th className="py-3 px-3 text-left">Night Close</th>
           
              <th className="py-3 px-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && rows.length === 0 && (
              <tr>
                <td colSpan={7} className="py-6 text-center text-gray-500">
                  No rounds for this month.
                </td>
              </tr>
            )}
            {rows.map(r => (
              <tr key={r.sessionDate} className="border-t border-gray-200 hover:bg-gray-50">
                {/* DATE */}
                <td className="py-3 px-3 font-semibold text-gray-900 whitespace-nowrap">
                  {r.sessionDate}
                </td>

                {/* DAY OPEN */}
                <td className="py-3 px-3">
                  <InlinePannaEditor
                    label="Open"
                    initial={r.dayOpenPanna ?? r.dayPanna ?? ''}
                    timeInitial={r.dayOpenTime ?? ''}
                    onSave={(panna, time) =>
                      save(r.sessionDate, {
                        dayOpenPanna: panna || null,
                        ...(time ? { dayOpenTime: time } : {}),
                      })
                    }
                  />
                </td>

                {/* DAY CLOSE */}
                <td className="py-3 px-3">
                  <InlinePannaEditor
                    label="Close"
                    initial={r.dayClosePanna ?? ''}
                    timeInitial={r.dayCloseTime ?? ''}
                    onSave={(panna, time) =>
                      save(r.sessionDate, {
                        dayClosePanna: panna || null,
                        ...(time ? { dayCloseTime: time } : {}),
                      })
                    }
                  />
                </td>

                {/* NIGHT OPEN */}
                <td className="py-3 px-3">
                  <InlinePannaEditor
                    label="Open"
                    initial={r.nightOpenPanna ?? r.nightPanna ?? ''}
                    timeInitial={r.nightOpenTime ?? ''}
                    color="purple"
                    onSave={(panna, time) =>
                      save(r.sessionDate, {
                        nightOpenPanna: panna || null,
                        ...(time ? { nightOpenTime: time } : {}),
                      })
                    }
                  />
                </td>

                {/* NIGHT CLOSE */}
                <td className="py-3 px-3">
                  <InlinePannaEditor
                    label="Close"
                    initial={r.nightClosePanna ?? ''}
                    timeInitial={r.nightCloseTime ?? ''}
                    color="pink"
                    onSave={(panna, time) =>
                      save(r.sessionDate, {
                        nightClosePanna: panna || null,
                        ...(time ? { nightCloseTime: time } : {}),
                      })
                    }
                  />
                </td>


                {/* ACTIONS */}
                <td className="py-3 px-3">
                  <button
                    onClick={() => del(r.sessionDate)}
                    className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors"
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
            {loading && (
              <tr>
                <td colSpan={7} className="py-4 text-center text-gray-500">
                  Loading…
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * Small inline editor for one panna + optional time
 */
function InlinePannaEditor({
  label,
  initial,
  timeInitial,
  onSave,
  color,
}: {
  label: string;
  initial: string;
  timeInitial?: string | null;
  onSave: (panna: string, time?: string) => void;
  color?: 'purple' | 'pink';
}) {
  const [panna, setPanna] = useState(initial ?? '');
  const [time, setTime] = useState(timeInitial ?? '');

  // keep input in sync if parent refetches
  useEffect(() => {
    setPanna(initial ?? '');
  }, [initial]);
  useEffect(() => {
    setTime(timeInitial ?? '');
  }, [timeInitial]);

  const btnBase =
    color === 'purple'
      ? 'bg-purple-600 hover:bg-purple-700'
      : color === 'pink'
      ? 'bg-pink-600 hover:bg-pink-700'
      : 'bg-blue-600 hover:bg-blue-700';

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-2 items-center">
        <input
          placeholder={label}
          value={panna}
          onChange={e => setPanna(clean3(e.target.value))}
          onBlur={() => panna && setPanna(pad3(panna))}
          maxLength={3}
          className="w-20 px-2 py-1 border-2 border-gray-200 rounded-md font-mono text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <button
          onClick={() => onSave(panna, time)}
          className={`px-2 py-1 rounded-md text-white text-xs font-semibold transition-colors ${btnBase}`}
        >
          Save
        </button>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="time"
          value={time}
          onChange={e => setTime(e.target.value)}
          className="w-28 px-2 py-1 border-2 border-gray-200 rounded-md text-xs text-gray-800 focus:ring-1 focus:ring-blue-200 outline-none"
        />
        <span className="text-[10px] text-gray-400">IST</span>
      </div>
    </div>
  );
}
