import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Round, { RoundCore } from '@/models/Round';

// Build year, month (1-12) defaults to current IST month
function currentISTYMD() {
  // Asia/Kolkata is UTC+05:30. For simplicity, use system time; your sessionDate is already local YYYY-MM-DD.
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth() + 1; // 1-12
  return { y, m };
}

function pad2(n: number) { return String(n).padStart(2, '0'); }

// Compute last day of month
function lastDay(y: number, m: number) {
  return new Date(y, m, 0).getDate(); // JS: month is 1-based when day=0 trick
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const y = parseInt(url.searchParams.get('year') || '', 10);
  const m = parseInt(url.searchParams.get('month') || '', 10);

  const { y: cy, m: cm } = currentISTYMD();
  const year = Number.isFinite(y) ? y : cy;
  const month = Number.isFinite(m) && m >= 1 && m <= 12 ? m : cm;

  const start = `${year}-${pad2(month)}-01`;
  const end = `${year}-${pad2(month)}-${pad2(lastDay(year, month))}`;

  await dbConnect();

  // sessionDate is 'YYYY-MM-DD' so string range works
  const rounds = await Round.find({
    sessionDate: { $gte: start, $lte: end }
  })
    .sort({ sessionDate: 1 })
    .lean<RoundCore[]>();

  const items = rounds.map(r => {
    const jodi =
      r.jodi ??
      (r.openingDigit != null && r.closingDigit != null
        ? `${r.openingDigit}${r.closingDigit}`
        : null);

    return {
      date: r.sessionDate,       // 'YYYY-MM-DD'
      jodi,                      // '00'..'99' or null if not closed yet
      status: r.status
    };
  });

  return NextResponse.json({
    year, month,
    results: items
  });
}
