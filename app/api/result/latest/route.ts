import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Round, { RoundCore } from '@/models/Round';
import { formatResult } from '@/utils/helpers';

export async function GET() {
  await dbConnect();
  const latest = await Round.findOne().sort({ createdAt: -1 }).lean<RoundCore | null>();

  if (!latest) return NextResponse.json({ result: null });

  const formatted = formatResult(
    latest.openingPanna,
    latest.openingDigit,
    latest.closingDigit,
    latest.closingPanna
  );

  return NextResponse.json({
    openingPanna: latest.openingPanna ?? null,
    openingDigit: latest.openingDigit ?? null,
    closingPanna: latest.closingPanna ?? null,
    closingDigit: latest.closingDigit ?? null,
    jodi: latest.jodi ?? (latest.openingDigit != null && latest.closingDigit != null
      ? `${latest.openingDigit}${latest.closingDigit}` : null),
    formatted,
    status: latest.status,
    market: latest.market,
    sessionDate: latest.sessionDate
  });
}
