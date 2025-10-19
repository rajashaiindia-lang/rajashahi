// app/api/result/history/route.ts
import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Round from '@/models/Round';

type RoundLite = {
  sessionDate: string;
  dayPanna?: string;
  dayDigit?: number;
  nightPanna?: string;
  nightDigit?: number;
  jodi?: string;
  status: 'READY' | 'DAY_PUBLISHED' | 'CLOSED' | 'OPENING_PUBLISHED';
};

function monthBounds(yyyyMM: string) {
  const [Y, M] = yyyyMM.split('-').map(Number);
  const start = new Date(Date.UTC(Y, M - 1, 1, 0, 0, 0));
  const next = new Date(Date.UTC(Y, M, 1, 0, 0, 0));
  const lo = start.toISOString().slice(0, 10);
  const hi = next.toISOString().slice(0, 10);
  return { lo, hi };
}
function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setUTCDate(x.getUTCDate() + n);
  return x;
}

export async function GET(req: Request) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const month = searchParams.get('month');     // e.g. '2025-10'
  const limit = Number(searchParams.get('limit') ?? 0);
  const weeksParam = searchParams.get('weeks');// e.g. '24'
  const endParam = searchParams.get('end');    // e.g. '2025-10-18'

  const filter: any = {};
  let lo: string | undefined;
  let hi: string | undefined;

  if (month) {
    const b = monthBounds(month);
    lo = b.lo; hi = b.hi;
  } else if (weeksParam) {
    const weeks = Math.max(1, Math.min(52, Number(weeksParam) || 24));

    // latest sessionDate as end if not provided
    const latest = await Round
      .findOne({})
      .sort({ sessionDate: -1 })
      .select('sessionDate')
      .lean<{ sessionDate: string } | null>();
    const endDateStr = endParam || latest?.sessionDate;
    if (!endDateStr) return NextResponse.json({ items: [] });

    const end = new Date(`${endDateStr}T00:00:00Z`);
    const start = addDays(end, -(weeks * 7) + 1);
    lo = start.toISOString().slice(0, 10);
    hi = addDays(end, 1).toISOString().slice(0, 10);
  }

  if (lo && hi) filter.sessionDate = { $gte: lo, $lt: hi };

  const rounds = await Round
    .find(filter)
    .sort({ sessionDate: 1 })
    .select('sessionDate dayPanna dayDigit nightPanna nightDigit jodi status')
    .lean<RoundLite[]>();

  const items = (month || weeksParam || !limit) ? rounds : rounds.slice(-limit);

  // Bridge legacy OPENING_PUBLISHED -> DAY_PUBLISHED for the UI
  const mapped = items.map(it => ({
    ...it,
    status: it.status === 'OPENING_PUBLISHED' ? 'DAY_PUBLISHED' : it.status
  }));

  return NextResponse.json({ items: mapped });
}
