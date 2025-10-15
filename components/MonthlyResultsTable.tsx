'use client';

import useSWR from 'swr';

const fetcher = (u: string) => fetch(u).then(r => r.json());

function monthName(y: number, m: number) {
  const d = new Date(y, m - 1, 1);
  return d.toLocaleString('en-GB', { month: 'long', year: 'numeric' });
}

function fmtDay(ymd: string) {
  const [y, m, d] = ymd.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  const day = String(d).padStart(2, '0');
  const mon = dt.toLocaleString('en-GB', { month: 'short' });
  return `${day} ${mon}`;
}

function getDayOfWeek(ymd: string) {
  const [y, m, d] = ymd.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleString('en-GB', { weekday: 'short' });
}

export default function MonthlyResultsTable() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const { data, isLoading } = useSWR<{
    year: number;
    month: number;
    results: { date: string; jodi: string | null; status: string }[];
  }>(`/api/monthly-results?year=${year}&month=${month}`, fetcher);

  const results = data?.results ?? [];
  const title = monthName(year, month);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'READY': return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'OPENING_PUBLISHED': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
      case 'CLOSED': return 'bg-green-500/20 text-green-300 border-green-500/40';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/40';
    }
  };

  return (
    <div id="bottom" className="mt-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#7b0c2b] via-[#a01638] to-[#7b0c2b] rounded-t-xl p-4 border-b-4 border-yellow-600">
        <h2 className="text-2xl font-extrabold text-center bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          📅 {title} RESULTS
        </h2>
      </div>

      {/* Table Container */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-b-xl border-x-2 border-b-2 border-gray-700 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-900 to-gray-800 border-b-2 border-yellow-600/50">
                <th className="px-4 py-4 text-left text-sm font-bold text-yellow-400 uppercase tracking-wider">
                  📆 Date
                </th>
                <th className="px-4 py-4 text-left text-sm font-bold text-yellow-400 uppercase tracking-wider">
                  🎯 Winning Jodi
                </th>
                <th className="px-4 py-4 text-left text-sm font-bold text-yellow-400 uppercase tracking-wider">
                  📊 Status
                </th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-700">
              {isLoading && (
                <tr>
                  <td className="px-4 py-6 text-center text-gray-400" colSpan={3}>
                    <div className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Loading results...
                    </div>
                  </td>
                </tr>
              )}
              {!isLoading && results.length === 0 && (
                <tr>
                  <td className="px-4 py-8 text-center text-gray-400" colSpan={3}>
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-3xl">📭</span>
                      <span className="font-semibold">No results yet this month</span>
                    </div>
                  </td>
                </tr>
              )}
              {results.map((r, i) => {
                const pretty = fmtDay(r.date);
                const dayOfWeek = getDayOfWeek(r.date);
                const show = r.jodi ?? '—';
                const done = r.jodi != null;
                const isToday = r.date === now.toISOString().split('T')[0];
                
                return (
                  <tr 
                    key={`${r.date}-${i}`} 
                    className={`hover:bg-gray-700/30 transition-colors ${
                      isToday ? 'bg-yellow-900/20 border-l-4 border-yellow-500' : ''
                    }`}
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <span className="font-bold text-white">{pretty}</span>
                          <span className="text-xs text-gray-400">{dayOfWeek}</span>
                        </div>
                        {isToday && (
                          <span className="px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-xs font-bold border border-yellow-500/40">
                            Today
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {done ? (
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-green-600/30 to-emerald-600/30 border-2 border-green-500/50">
                          <span className="text-2xl font-bold text-green-300">{show}</span>
                          <span className="text-green-400">✓</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700/50 border-2 border-gray-600">
                          <span className="text-gray-400 font-semibold">Pending</span>
                          <span className="text-yellow-500">⏳</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex px-3 py-1.5 rounded-full text-xs font-bold uppercase border ${getStatusBadge(r.status)}`}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {!isLoading && results.length > 0 && (
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-4 py-3 border-t-2 border-gray-700">
            <p className="text-xs text-gray-400 text-center">
              📊 Showing <span className="font-semibold text-yellow-400">{title}</span> — Total: <span className="font-semibold text-green-400">{results.length}</span> {results.length === 1 ? 'result' : 'results'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}