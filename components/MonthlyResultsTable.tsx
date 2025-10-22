// components/MonthlyResultsTable.tsx
'use client';

import useSWR from 'swr';

type Item = {
  sessionDate: string; // 'YYYY-MM-DD'
  dayPanna?: string | null;
  dayDigit?: number | null;
  nightPanna?: string | null;
  nightDigit?: number | null;
  jodi?: string | null;
  status: 'READY' | 'DAY_PUBLISHED' | 'CLOSED';
};

// mark client-side gap placeholders
type LocalItem = Item & { _missing?: boolean };

const fetcher = (u: string) => fetch(u).then(r => r.json());

const ddmmyy = (d: string) => `${d.slice(8, 10)}/${d.slice(5, 7)}/${d.slice(2, 4)}`;
const addDays = (dateStr: string, n: number) => {
  const d = new Date(dateStr + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};
const maxDate = (a: string, b: string) => (a > b ? a : b);

/** Build a continuous Mon–Sun timeline from first data day through max(lastData, today) */
function fillContinuous(items: Item[]): LocalItem[] {
  if (!items.length) return [];

  const sorted = [...items].sort((a, b) => a.sessionDate.localeCompare(b.sessionDate));
  const first = sorted[0].sessionDate;
  const lastData = sorted[sorted.length - 1].sessionDate;

  const today = new Date().toISOString().slice(0, 10);
  const end = maxDate(lastData, today);

  const byDate = new Map(sorted.map(i => [i.sessionDate, i as LocalItem]));
  const out: LocalItem[] = [];

  for (let d = first; d <= end; d = addDays(d, 1)) {
    const found = byDate.get(d);
    if (found) {
      out.push(found);
    } else {
      const isPast = d < today;
      const isToday = d === today;
      out.push({
        sessionDate: d,
        status: 'READY',
        dayPanna: null,
        dayDigit: null,
        nightPanna: null,
        nightDigit: null,
        jodi: null,
        _missing: true,
        // new flags:
        // @ts-ignore – local-only helpers
        _missingPast: isPast,
        // @ts-ignore
        _missingToday: isToday,
      } as any);
    }
  }
  return out;
}


/** group into full weeks of 7 (Mon–Sun) */
function groupIntoWeeks(items: LocalItem[]) {
  const rows: LocalItem[][] = [];
  for (let i = 0; i < items.length; i += 7) rows.push(items.slice(i, i + 7));
  // keep ~6 months of rows (24 as before is fine)
  return rows.length > 24 ? rows.slice(-24) : rows;
}

function PannaColumn({ panna }: { panna?: string | null }) {
  const p = (panna ?? '   ').padEnd(3, ' ');
  return (
    <div className="flex flex-col items-center text-[8px] md:text-[9px] leading-3 text-yellow-800/90 tracking-tight">
      <span>{p[0] ?? ''}</span>
      <span>{p[1] ?? ''}</span>
      <span>{p[2] ?? ''}</span>
    </div>
  );
}
function DayCell({ it }: { it: LocalItem }) {
  if (it._missing) {
    // @ts-ignore local helpers set in fillContinuous
    const showStar = it._missingPast === true;
    // @ts-ignore
    const isTodayMissing = it._missingToday === true;

    const leftCol = showStar ? ['*', '*', '*'] : [' ', ' ', ' '];
    const rightCol = showStar ? ['*', '*', '*'] : [' ', ' ', ' '];
    const centerChar = showStar ? '*' : '—';

    return (
      <div className="relative bg-[#fffdf6] rounded-[6px] border border-black/40 shadow-[inset_0_1px_0_rgba(0,0,0,0.12)] px-1 pt-1 pb-1.5 md:px-1.5 md:pt-1.5 md:pb-2 min-h-[56px] md:min-h-[64px] flex items-center justify-center">
        <div className="flex items-center justify-center gap-1 md:gap-1.5">
          {/* left panna stars */}
          <div className="flex flex-col items-center text-[8px] md:text-[9px] leading-3 text-black tracking-tight">
            <span>{leftCol[0]}</span>
            <span>{leftCol[1]}</span>
            <span>{leftCol[2]}</span>
          </div>

          {/* center */}
          <div
            className={`min-w-[30px] md:min-w-[34px] text-center font-extrabold text-[14px] md:text-[16px] leading-5 ${
              showStar ? 'text-black' : 'text-gray-400'
            }`}
            title={showStar ? 'No data for this past date' : 'Pending (today)'}
          >
            {centerChar}
          </div>

          {/* right panna stars */}
          <div className="flex flex-col items-center text-[8px] md:text-[9px] leading-3 text-black tracking-tight">
            <span>{rightCol[0]}</span>
            <span>{rightCol[1]}</span>
            <span>{rightCol[2]}</span>
          </div>
        </div>
      </div>
    );
  }

  const haveDay = it.dayDigit != null && it.dayPanna != null;
  const haveNight = it.nightDigit != null && it.nightPanna != null;
  const closed = it.status === 'CLOSED' && haveDay && haveNight;
  const center = closed ? (it.jodi ?? `${it.dayDigit}${it.nightDigit}`) : '—';

  return (
    <div className="relative bg-[#fffdf6] rounded-[6px] border border-black/40 shadow-[inset_0_1px_0_rgba(0,0,0,0.12)] px-1 pt-1 pb-1.5 md:px-1.5 md:pt-1.5 md:pb-2 min-h-[56px] md:min-h-[64px] flex items-center justify-center">
      <div className="flex items-center justify-center gap-1 md:gap-1.5">
        <PannaColumn panna={it.dayPanna} />
        <div
          className={`min-w-[30px] md:min-w-[34px] text-center font-extrabold text-[14px] md:text-[16px] leading-5 ${
            closed ? 'text-red-600' : 'text-gray-400'
          }`}
          title={closed ? `Jodi ${center}` : 'Pending'}
        >
          {center}
        </div>
        <PannaColumn panna={it.nightPanna} />
      </div>
    </div>
  );
}

function DateRangeCell({ start, end }: { start?: string; end?: string }) {
  return (
    <div className="relative bg-[#fffdf6] rounded-[6px] border border-black/40 shadow-[inset_0_1px_0_rgba(0,0,0,0.12)] px-1 pt-1 pb-1.5 md:px-1.5 md:pt-1.5 md:pb-2 min-h-[56px] md:min-h-[64px] flex items-center justify-center">
      <div className="flex flex-col items-center leading-3">
        <div className="text-[9px] md:text-[10px] text-yellow-800/90 font-medium">
          {start ? ddmmyy(start) : ''}
        </div>
        <div className="text-[9px] md:text-[10px] text-black/80 italic">to</div>
        <div className="text-[9px] md:text-[10px] text-yellow-800/90 font-medium">
          {end ? ddmmyy(end) : ''}
        </div>
      </div>
    </div>
  );
}

export default function MonthlyResultsTable() {
  const { data } = useSWR<{ items: Item[] }>('/api/result/history?weeks=52', fetcher);

  if (!data) {
    return (
      <div className="max-w-5xl mx-auto p-4 text-center text-sm text-yellow-200">
        Loading chart…
      </div>
    );
  }

  // 1) make the list continuous (incl. Sundays), 2) split into 7-day rows
  const filled = fillContinuous(data.items ?? []);
  const rows = groupIntoWeeks(filled);

  return (
    <section className="max-w-5xl mx-auto px-2 md:px-3 pb-8">
      <div className="rounded-md border-[6px] border-purple-700 bg-[#fffdf6] shadow-[0_2px_10px_rgba(0,0,0,0.25)] overflow-hidden">
             {/* Header Row */}

<div className="grid grid-cols-8 bg-yellow-200 border-b border-black/40 text-center font-semibold text-[10px] md:text-[12px] uppercase text-black tracking-wide">
  <div className="py-1.5 border-r border-black/30">Date</div>
  <div className="py-1.5 border-r border-black/30">Mon</div>
  <div className="py-1.5 border-r border-black/30">Tue</div>
  <div className="py-1.5 border-r border-black/30">Wed</div>
  <div className="py-1.5 border-r border-black/30">Thu</div>
  <div className="py-1.5 border-r border-black/30">Fri</div>
  <div className="py-1.5 border-r border-black/30">Sat</div>
  <div className="py-1.5">Sun</div>
</div>


        {rows.map((row, weekIdx) => {
          const start = row[0]?.sessionDate;
          const end = row[row.length - 1]?.sessionDate;

          return (
            <div key={`week-${weekIdx}`} className="px-2 md:px-3 py-2">
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 lg:grid-cols-8 xl:grid-cols-8 gap-1">
                {/* first column shows week range */}
                <div className="col-span-3 sm:col-span-1">
                  <DateRangeCell start={start} end={end} />
                </div>

                {/* 7 day tiles (Mon–Sun) */}
                {row.map((it, i) => (
                  <DayCell key={`${it.sessionDate}-${i}`} it={it} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
