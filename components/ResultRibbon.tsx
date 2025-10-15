'use client';

import { useState } from 'react';

type Props = {
  
  sessionDate?: string;
  formatted: string; // e.g. "(160) 7 | 9 (135)"
  jodi?: string | null;
  onRefresh?: () => Promise<void> | void;
};

export default function ResultRibbon({ sessionDate, formatted, jodi, onRefresh }: Props) {
  const [spinning, setSpinning] = useState(false);

  const refresh = async () => {
    if (!onRefresh) return;
    setSpinning(true);
    try { await onRefresh(); } finally { setSpinning(false); }
  };

  return (
    <div className="rounded border-2 border-red-700 bg-yellow-300 text-center py-5 px-3 shadow-[inset_0_0_0_2px_rgba(255,0,0,0.3)]">

      {sessionDate && <p className="text-sm text-gray-700 mt-1">{sessionDate}</p>}
      <p className="mt-1 text-xl font-bold font-mono">{formatted || '(—) — | — (—)'}</p>
      <p className="text-sm text-gray-700 mt-1">Jodi: <span className="font-semibold">{jodi ?? '—'}</span></p>
      <button
        onClick={refresh}
        className="mt-3 inline-block rounded-full bg-yellow-400/90 px-4 py-1.5 text-sm font-semibold shadow hover:bg-yellow-400 border border-yellow-600"
      >
        {spinning ? 'Refreshing…' : 'Refresh Result'}
      </button>
    </div>
  );
}
