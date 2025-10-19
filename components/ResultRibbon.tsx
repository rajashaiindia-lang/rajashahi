'use client';

import { useMemo, useState } from 'react';

type Status = 'READY' | 'DAY_PUBLISHED' | 'CLOSED';
type Side = 'day' | 'night';

type Props = {
  side: Side;                         // required now
  sessionDate?: string;
  status?: Status;                    // kept for future, not rendered
  dayPanna?: string | null;
  dayDigit?: number | null;
  nightPanna?: string | null;
  nightDigit?: number | null;
  jodi?: string | null;               // optional; we derive if absent
  onRefresh?: () => Promise<void> | void;
};

export default function ResultRibbon({
  side,
  sessionDate,
  dayPanna,
  dayDigit,
  nightPanna,
  nightDigit,
  jodi,
  onRefresh,
}: Props) {
  const [spinning, setSpinning] = useState(false);
  const refresh = async () => {
    if (!onRefresh) return;
    setSpinning(true);
    try { await onRefresh(); } finally { setSpinning(false); }
  };

  // What to show on the big line
  const mainLine = useMemo(() => {
    if (side === 'day') {
      const has = dayDigit != null && dayPanna != null;
      return has ? `(${dayPanna}) ${dayDigit}` : '(—) —';
    } else {
      const has = nightDigit != null && nightPanna != null;
      return has ? `(${nightPanna}) ${nightDigit}` : '(—) —';
    }
  }, [side, dayPanna, dayDigit, nightPanna, nightDigit]);

  // Jodi appears only when both digits exist
  const jodiText = useMemo(() => {
    if (dayDigit == null || nightDigit == null) return null;
    return jodi ?? `${dayDigit}${nightDigit}`;
  }, [dayDigit, nightDigit, jodi]);

  return (
    <div className="rounded border-2 border-red-700 bg-yellow-300 text-center py-5 px-3 shadow-[inset_0_0_0_2px_rgba(255,0,0,0.3)]">
      {/* top chips: only show the side (no status chip) */}
      <div className="flex items-center justify-center gap-2 mb-1">
        <span
          className={`inline-block text-xs font-extrabold px-2 py-0.5 rounded-full border ${
            side === 'day'
              ? 'bg-yellow-400 text-black border-yellow-700'
              : 'bg-purple-400 text-black border-purple-700'
          }`}
        >
          {side.toUpperCase()}
        </span>
      </div>

      {sessionDate && <p className="text-sm text-gray-700 mt-1">{sessionDate}</p>}

      <p className="mt-1 text-2xl font-bold font-mono">{mainLine}</p>

      {/* Only render Jodi row if both digits exist */}
      {jodiText && (
        <p className="text-sm text-gray-700 mt-1">
          Jodi: <span className="font-semibold">{jodiText}</span>
        </p>
      )}

      {onRefresh && (
        <button
          onClick={refresh}
          className="mt-3 inline-block rounded-full bg-yellow-400/90 px-4 py-1.5 text-sm font-semibold shadow hover:bg-yellow-400 border border-yellow-600"
        >
          {spinning ? 'Refreshing…' : 'Refresh Result'}
        </button>
      )}
    </div>
  );
}
