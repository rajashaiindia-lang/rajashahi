'use client';

import { useMemo, useState } from 'react';

type Status = 'READY' | 'DAY_PUBLISHED' | 'CLOSED';
type Side = 'day' | 'night';

type Props = {
  side: Side;
  sessionDate?: string;
  status?: Status;
  // open values
  dayPanna?: string | null;
  dayDigit?: number | null;
  nightPanna?: string | null;
  nightDigit?: number | null;
  // optional close values (for future)
  dayClosePanna?: string | null;
  dayCloseDigit?: number | null;
  nightClosePanna?: string | null;
  nightCloseDigit?: number | null;

  jodi?: string | null;
  onRefresh?: () => Promise<void> | void;
};

export default function ResultRibbon({
  side,
  sessionDate,
  status,
  dayPanna,
  dayDigit,
  nightPanna,
  nightDigit,
  dayClosePanna,
  dayCloseDigit,
  nightClosePanna,
  nightCloseDigit,
  jodi,
  onRefresh,
}: Props) {
  const [spinning, setSpinning] = useState(false);
  const refresh = async () => {
    if (!onRefresh) return;
    setSpinning(true);
    try {
      await onRefresh();
    } finally {
      setSpinning(false);
    }
  };

  // Compose open/close display depending on side
  const mainLine = useMemo(() => {
    if (side === 'day') {
      const openHas = dayDigit != null && dayPanna != null;
      const closeHas = dayCloseDigit != null && dayClosePanna != null;
      const open = openHas ? `(${dayPanna}) ${dayDigit}` : '(—) —';
      const close = closeHas ? `(${dayClosePanna}) ${dayCloseDigit}` : '(—)';
      return `${open} | ${close}`;
    } else {
      const openHas = nightDigit != null && nightPanna != null;
      const closeHas = nightCloseDigit != null && nightClosePanna != null;
      const open = openHas ? `(${nightPanna}) ${nightDigit}` : '(—) —';
      const close = closeHas ? `(${nightClosePanna}) ${nightCloseDigit}` : '(—)';
      return `${open} | ${close}`;
    }
  }, [
    side,
    dayPanna,
    dayDigit,
    dayClosePanna,
    dayCloseDigit,
    nightPanna,
    nightDigit,
    nightClosePanna,
    nightCloseDigit,
  ]);

  // Always show jodi row, with fallback '-'
  const jodiDisplay = jodi && jodi.trim() !== '' ? jodi : '-';

  return (
    <div className="rounded border-2 border-red-700 bg-yellow-300 text-center py-5 px-3 shadow-[inset_0_0_0_2px_rgba(255,0,0,0.3)]">
      {/* top chip */}
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

      {/* Main line: Open | Close */}
      <p className="mt-1 text-2xl font-bold font-mono">{mainLine}</p>

      {/* Jodi */}
      <p className="text-sm text-gray-700 mt-1">
        Jodi: <span className="font-semibold">{jodiDisplay}</span>
      </p>

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
