import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Round from '@/models/Round';

type RoundLite = {
  sessionDate: string;
  openingPanna?: string;
  closingPanna?: string;
  openingDigit?: number;
  closingDigit?: number;
  jodi?: string;
  status: 'READY' | 'OPENING_PUBLISHED' | 'CLOSED';
  market: string;
};

// Month helpers
function monthBounds(yyyyMM: string) {
  const [Y, M] = yyyyMM.split('-').map(Number);
  const start = new Date(Date.UTC(Y, M - 1, 1, 0, 0, 0));
  const next = new Date(Date.UTC(Y, M, 1, 0, 0, 0));
  const lo = start.toISOString().slice(0, 10); // inclusive
  const hi = next.toISOString().slice(0, 10);  // exclusive
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
  const month = searchParams.get('month');            // e.g. '2025-10'
  const limit = Number(searchParams.get('limit') ?? 0);
  const weeksParam = searchParams.get('weeks');       // e.g. '6'
  const endParam = searchParams.get('end');           // e.g. '2025-10-16'
  const market = searchParams.get('market') ?? 'KALYAN';

  const filter: any = { market };
  let lo: string | undefined;
  let hi: string | undefined;

  if (month) {
    const b = monthBounds(month);
    lo = b.lo; hi = b.hi;
  } else if (weeksParam) {
    // Allow up to 52 weeks (~1 year)
const weeks = Math.max(1, Math.min(52, Number(weeksParam) || 6));


    let endDateStr = endParam;
    if (!endDateStr) {
      // 👇 Explicitly type the lean() result to avoid union [] | {} typings
      const latest = await Round
        .findOne({ market })
        .sort({ sessionDate: -1 })
        .select('sessionDate')
        .lean<{ sessionDate: string } | null>();

      if (!latest) return NextResponse.json({ items: [] });
      endDateStr = latest.sessionDate;
    }

    const end = new Date(`${endDateStr}T00:00:00Z`);
    const start = addDays(end, -(weeks * 7) + 1); // inclusive
    lo = start.toISOString().slice(0, 10);
    hi = addDays(end, 1).toISOString().slice(0, 10); // exclusive
  }

  if (lo && hi) {
    filter.sessionDate = { $gte: lo, $lt: hi };
  }

  // 👇 Also type the array returned by lean()
  const rounds = await Round
    .find(filter)
    .sort({ sessionDate: 1 })
    .select('sessionDate openingPanna closingPanna openingDigit closingDigit jodi status market')
    .lean<RoundLite[]>();

  const items = (month || weeksParam || !limit) ? rounds : rounds.slice(-limit);
  return NextResponse.json({ items });
}
