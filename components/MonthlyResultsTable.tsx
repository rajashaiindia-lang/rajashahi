'use client';

import useSWR from 'swr';

type Item = {
  sessionDate: string;
  openingPanna?: string;
  closingPanna?: string;
  jodi?: string;
  status: 'READY' | 'OPENING_PUBLISHED' | 'CLOSED';
};

const fetcher = (u: string) => fetch(u).then(r => r.json());

function ddmmyy(d: string) {
  return `${d.slice(8, 10)}/${d.slice(5, 7)}/${d.slice(2, 4)}`;
}
function isSunday(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00Z');
  return d.getUTCDay() === 0;
}
function groupIntoWeeks(items: Item[]) {
  const only = items.filter(i => !isSunday(i.sessionDate));
  const rows: Item[][] = [];
  for (let i = 0; i < only.length; i += 6) rows.push(only.slice(i, i + 6));
  return rows;
}

function PannaColumn({ panna }: { panna?: string }) {
  const p = (panna ?? '   ').padEnd(3, ' ');
  return (
    <div className="flex flex-col items-center text-[8px] md:text-[9px] leading-3 text-yellow-800/90 tracking-tight">
      <span>{p[0] ?? ''}</span>
      <span>{p[1] ?? ''}</span>
      <span>{p[2] ?? ''}</span>
    </div>
  );
}

function DayCell({ it }: { it: Item }) {
  const closed = it.status === 'CLOSED' && it.jodi;
  return (
    <div className="relative bg-[#fffdf6] rounded-[6px] border border-black/40 shadow-[inset_0_1px_0_rgba(0,0,0,0.12)] px-1 pt-1 pb-1.5 md:px-1.5 md:pt-1.5 md:pb-2 min-h-[56px] md:min-h-[64px] flex items-center justify-center">
      <div className="flex items-center justify-center gap-1 md:gap-1.5">
        <PannaColumn panna={it.openingPanna} />
        <div
          className={`min-w-[30px] md:min-w-[34px] text-center font-extrabold text-[14px] md:text-[16px] leading-5 ${
            closed ? 'text-red-600' : 'text-gray-400'
          }`}
          title={closed ? `Jodi ${it.jodi}` : 'Pending'}
        >
          {closed ? it.jodi : '—'}
        </div>
        <PannaColumn panna={it.closingPanna} />
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

export default function MonthlyResultsTable({ month }: { month?: string }) {
  const mm = month ?? new Date().toISOString().slice(0, 7);
 const { data } = useSWR<{ items: Item[] }>(
  '/api/result/history?weeks=6&market=KALYAN',
  fetcher
);

  const rows = groupIntoWeeks(data?.items ?? []);

  if (!data) {
    return (
      <div className="max-w-5xl mx-auto p-4 text-center text-sm text-yellow-200">
        Loading chart…
      </div>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-2 md:px-3 pb-8">
      {/* Single outer purple frame */}
      <div className="rounded-md border-[6px] border-purple-700 bg-[#fffdf6] shadow-[0_2px_10px_rgba(0,0,0,0.25)] overflow-hidden">
        {rows.map((row, weekIdx) => {
          const start = row[0]?.sessionDate;
          const end = row[row.length - 1]?.sessionDate;

          return (
            <div key={`week-${weekIdx}`} className="px-2 md:px-3 py-2">
              {/* Responsive grid:
                    base: 3 cols (date spans 3)
                    sm:   4 cols (date spans 1)
                    md+:  7 cols (date spans 1)
               */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-1">
                <div className="col-span-3 sm:col-span-1">
                  <DateRangeCell start={start} end={end} />
                </div>

                {row.map((it, i) => (
                  <DayCell key={`${it.sessionDate}-${i}`} it={it} />
                ))}

                {/* pad for incomplete rows */}
                {Array.from({ length: Math.max(0, 6 - row.length) }, (_, i) => (
                  <div
                    key={`pad-${weekIdx}-${i}`}
                    className="rounded-[6px] border border-dashed border-black/30 bg-[#fffdf6] min-h-[56px] md:min-h-[64px]"
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
