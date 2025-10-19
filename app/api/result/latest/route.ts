// app/api/result/latest/route.ts
import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Round from '@/models/Round';

export async function GET(req: Request) {
  await dbConnect();

  const url = new URL(req.url);
  const side = url.searchParams.get('side'); // 'day' | 'night' | null

  const round = await Round.findOne().sort({ sessionDate: -1, createdAt: -1 }).lean<{
    sessionDate: string;
    status: 'READY' | 'DAY_PUBLISHED' | 'CLOSED' | 'OPENING_PUBLISHED';
    dayPanna?: string;
    dayDigit?: number;
    nightPanna?: string;
    nightDigit?: number;
  }>();

  if (!round) return NextResponse.json(null);

  const haveDay   = round.dayDigit   !== undefined && round.dayPanna   !== undefined;
  const haveNight = round.nightDigit !== undefined && round.nightPanna !== undefined;

  // Only show Jodi when both digits exist
  const jodi = (round.dayDigit != null && round.nightDigit != null)
    ? `${round.dayDigit}${round.nightDigit}`
    : null;

  // Optional: a formatted fallback string (UI doesn’t need it, but harmless)
  const formatted = `(${round.dayPanna ?? '—'}) ${round.dayDigit ?? '—'} | ${round.nightDigit ?? '—'} (${round.nightPanna ?? '—'})`;

  // Return explicit fields (nulls, not undefined) so the client can render correctly
  return NextResponse.json({
    sessionDate: round.sessionDate,
    status: round.status === 'OPENING_PUBLISHED' ? 'DAY_PUBLISHED' : round.status, // legacy bridge
    jodi,
    formatted,
    dayPanna: round.dayPanna ?? null,
    dayDigit: round.dayDigit ?? null,
    nightPanna: round.nightPanna ?? null,
    nightDigit: round.nightDigit ?? null,
    side: side ?? null,
    haveDay,
    haveNight,
  });
}
