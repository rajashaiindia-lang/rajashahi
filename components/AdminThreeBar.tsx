'use client';

type Props = {
  formatted?: string;         // "(160) 7 | 9 (135)"
  jodi?: string | null;       // "79"
  sessionDate?: string;       // "YYYY-MM-DD"
  market?: 'KALYAN' | 'DEMO';
  loading?: boolean;
  onRefresh?: () => void;
};

export default function AdminThreeBar({
  formatted,
  jodi,
  sessionDate,
  market = 'DEMO',
  loading = false,
  onRefresh,
}: Props) {
  return (
    <div className="w-full">
      {/* Bar 1 */}
      <div className="bg-[#7b0c2b] py-3 text-center text-white text-2xl font-extrabold tracking-wide border-b-4 border-[#c51d41]">
        ADMIN — KALYAN CHART
      </div>

      {/* Bar 2 */}
      <div className="bg-[#9a1839] py-2 text-center text-white/95 text-sm italic border-b-4 border-[#d02a50]">
        Manage session & publish results
      </div>

      {/* Bar 3 (yellow ribbon) */}
      <div className="bg-yellow-300 text-black p-4 border-y-4 border-red-700">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="text-blue-800 font-extrabold text-2xl">KALYAN</div>
            <div className="text-xs text-gray-800">
              {market} · {sessionDate ?? '—'}
            </div>
          </div>

          <div className="mt-1 font-mono text-xl font-semibold tracking-wide text-center">
            {formatted || '(—) — | — (—)'}
          </div>

          <div className="mt-1 flex items-center justify-center gap-3">
            <div className="text-sm">
              Jodi:&nbsp;<span className="font-bold">{jodi ?? '—'}</span>
            </div>
            <button
              onClick={onRefresh}
              disabled={!onRefresh || loading}
              className="px-3 py-1.5 rounded-full bg-yellow-500 hover:bg-yellow-400 border border-yellow-700 text-gray-900 text-sm font-semibold disabled:opacity-60"
            >
              {loading ? 'Refreshing…' : 'Refresh'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
