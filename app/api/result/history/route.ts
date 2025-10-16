import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Round from '@/models/Round';

// helper: parse YYYY-MM and compute month range (IST)
function rangeForMonth(yyyyMM?: string) {
  const now = new Date();
  const [Y, M] = yyyyMM?.split('-').map(Number) ?? [now.getFullYear(), now.getMonth() + 1];
  const start = new Date(Date.UTC(Y, M - 1, 1, 0, 0, 0));
  const end = new Date(Date.UTC(Y, M, 1, 0, 0, 0)); // exclusive
  return { start, end };
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const month = searchParams.get('month') ?? undefined; // '2025-10'
  const limit = Number(searchParams.get('limit') ?? 0); // optional fallback

  await dbConnect();

  let filter: any = {};
  if (month) {
    const { start, end } = rangeForMonth(month);
    // sessionDate is 'YYYY-MM-DD' local; filter by string bounds
    const yyyyMM = month;
    const lo = `${yyyyMM}-01`;
    const hi = new Date(end).toISOString().slice(0, 10); // first of next month
    filter.sessionDate = { $gte: lo, $lt: hi };
  }

  const rounds = await Round
    .find(filter)
    .sort({ sessionDate: 1 })   // chronological
    .select('sessionDate openingPanna closingPanna openingDigit closingDigit jodi status')
    .lean();

  // Optionally fall back to recent N days if month not provided
  const data = month || !limit ? rounds : rounds.slice(-limit);

  return NextResponse.json({ items: data });
}
