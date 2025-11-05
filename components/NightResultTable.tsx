'use client';

import useSWR from 'swr';

type Item = {
  sessionDate: string;
  openPanna?: string | null;
  openDigit?: number | null;
  closePanna?: string | null;
  closeDigit?: number | null;
  jodi?: string | null;
  status: 'READY' | 'OPEN_PUBLISHED' | 'CLOSED';

  // optional: if history API sends times for night
  openTime?: string | null;   // nightOpenTime
  closeTime?: string | null;  // nightCloseTime
};

type LocalItem = Item & { _missing?: boolean };

const fetcher = (u: string) => fetch(u).then(r => r.json());
const ddmmyy = (d: string) => `${d.slice(8, 10)}/${d.slice(5, 7)}/${d.slice(2, 4)}`;
const addDays = (dateStr: string, n: number) => {
  const d = new Date(dateStr + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};
const maxDate = (a: string, b: string) => (a > b ? a : b);

function fillContinuous(items: Item[]): LocalItem[] {
  if (!items.length) return [];
  const sorted = [...items].sort((a, b) => a.sessionDate.localeCompare(b.sessionDate));
  const first = sorted[0].sessionDate;
  const last = sorted[sorted.length - 1].sessionDate;
  const today = new Date().toISOString().slice(0, 10);
  const end = maxDate(last, today);
  const byDate = new Map(sorted.map(i => [i.sessionDate, i as LocalItem]));
  const out: LocalItem[] = [];
  for (let d = first; d <= end; d = addDays(d, 1)) {
    const found = byDate.get(d);
    if (found) {
      out.push(found);
    } else {
      out.push({
        sessionDate: d,
        status: 'READY',
        openPanna: null,
        openDigit: null,
        closePanna: null,
        closeDigit: null,
        jodi: null,
        _missing: true,
      } as any);
    }
  }
  return out;
}

function groupIntoWeeks(items: LocalItem[]) {
  const rows: LocalItem[][] = [];
  for (let i = 0; i < items.length; i += 7) rows.push(items.slice(i, i + 7));
  return rows.length > 24 ? rows.slice(-24) : rows;
}

function PannaColumn({ panna }: { panna?: string | null }) {
  const p = (panna ?? '   ').padEnd(3, ' ');
  return (
    <div className="flex flex-col items-center text-[8px] md:text-[9px] leading-3 text-purple-800/90 tracking-tight">
      <span>{p[0]}</span>
      <span>{p[1]}</span>
      <span>{p[2]}</span>
    </div>
  );
}

function PlaceholderCell() {
  const col = ['*', '*', '*'];
  return (
    <div className="relative bg-[#fffdf6] rounded-[6px] border border-black/40 shadow-[inset_0_1px_0_rgba(0,0,0,0.12)] px-1 pt-1 pb-1.5 min-h-[56px] flex items-center justify-center">
      <div className="flex items-center justify-center gap-1">
        <div className="flex flex-col items-center text-[8px] leading-3 text-black">
          {col.map((c, i) => (
            <span key={i}>{c}</span>
          ))}
        </div>
        <div className="min-w-[30px] text-center font-extrabold text-[16px] text-black">*</div>
        <div className="flex flex-col items-center text-[8px] leading-3 text-black">
          {col.map((c, i) => (
            <span key={i}>{c}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function TodayPendingCell() {
  return (
    <div className="relative bg-[#fffdf6] rounded-[6px] border border-dashed border-black/40 px-1 pt-1 pb-1.5 min-h-[56px] flex items-center justify-center">
      <div className="min-w-[30px] text-center font-extrabold text-[14px] text-gray-400">
        —
      </div>
    </div>
  );
}

function isNowBeforeIST(dateStr: string, hhmm?: string | null) {
  if (!hhmm) return false;
  const target = new Date(`${dateStr}T${hhmm}:00+05:30`);
  return new Date() < target;
}

function NightCell({ it, today }: { it: LocalItem; today: string }) {
  const haveOpen = it.openDigit != null && it.openPanna != null;
  const haveClose = it.closeDigit != null && it.closePanna != null;
  const closed = it.status === 'CLOSED' && haveOpen && haveClose;
  const isToday = it.sessionDate === today;

  if (isToday) {
    const openScheduled = isNowBeforeIST(it.sessionDate, it.openTime);
    const closeScheduled = isNowBeforeIST(it.sessionDate, it.closeTime);
    const nothingYet = !haveOpen && !haveClose;
    if (nothingYet || openScheduled || closeScheduled) {
      return <TodayPendingCell />;
    }
  }

  // past missing → stars
  if (it._missing || (!haveOpen && !haveClose)) {
    return <PlaceholderCell />;
  }

  const center = closed ? it.jodi ?? `${it.openDigit}${it.closeDigit}` : '—';

  return (
    <div className="relative bg-[#fffdf6] rounded-[6px] border border-black/40 shadow-[inset_0_1px_0_rgba(0,0,0,0.12)] px-1 pt-1 pb-1.5 min-h-[56px] flex items-center justify-center">
      <div className="flex items-center justify-center gap-1">
        <PannaColumn panna={it.openPanna} />
        <div
          className={`min-w-[30px] text-center font-extrabold text-[14px] ${
            closed ? 'text-purple-600' : 'text-gray-400'
          }`}
          title={closed ? `Jodi ${center}` : 'Pending'}
        >
          {center}
        </div>
        <PannaColumn panna={it.closePanna} />
      </div>
    </div>
  );
}

function DateRangeCell({ start, end }: { start?: string; end?: string }) {
  return (
    <div className="relative bg-[#fffdf6] rounded-[6px] border border-black/40 py-2 flex flex-col items-center justify-center text-[9px] text-purple-800/90">
      <div>{start ? ddmmyy(start) : ''}</div>
      <div className="text-black/80 italic">to</div>
      <div>{end ? ddmmyy(end) : ''}</div>
    </div>
  );
}

export default function NightResultsTable() {
  const { data } = useSWR<{ items: Item[] }>('/api/result/history?weeks=52&side=night', fetcher);

  if (!data) {
    return (
      <div className="max-w-5xl mx-auto p-4 text-center text-sm text-purple-200">
        Loading night chart…
      </div>
    );
  }

  const filled = fillContinuous(data.items ?? []);
  const rows = groupIntoWeeks(filled);
  const today = new Date().toISOString().slice(0, 10);

  return (
    <section className="max-w-5xl mx-auto px-2 md:px-3 pb-8">
      <div className="rounded-md border-[6px] border-purple-700 bg-[#fffdf6] shadow-[0_2px_10px_rgba(0,0,0,0.25)] overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-8 bg-purple-200 border-b border-black/40 text-center font-semibold text-[10px] md:text-[12px] uppercase text-black tracking-wide">
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
              <div className="grid grid-cols-8 gap-1">
                <div>
                  <DateRangeCell start={start} end={end} />
                </div>
                {row.map((it, i) => (
                  <NightCell key={`${it.sessionDate}-${i}`} it={it} today={today} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
