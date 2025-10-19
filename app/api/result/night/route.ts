// app/api/result/night/route.ts
import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Round from '@/models/Round';
import { digitFromPanna, deriveJodi } from '@/utils/helpers';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const c = await cookies();
  if (c.get('isAdmin')?.value !== '1') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { nightPanna } = await req.json();
  if (!/^\d{3}$/.test(nightPanna || '')) {
    return NextResponse.json({ error: 'nightPanna must be a 3-digit string' }, { status: 400 });
  }

  await dbConnect();
// Find the most recent round awaiting NIGHT publish
const round = await Round.findOne({
  status: 'DAY_PUBLISHED',
}).sort({ sessionDate: -1, createdAt: -1 });

if (!round) {
  return NextResponse.json(
    { ok: false, code: 'NO_ROUND', error: 'No round found that is awaiting Night publish. Publish Day first.' },
    { status: 400 }
  );
}

  if (round.nightDigit !== undefined) {
    return NextResponse.json({ error: 'Night already published' }, { status: 400 });
  }
  if (round.dayDigit === undefined) {
    return NextResponse.json({ error: 'Day not published yet' }, { status: 400 });
  }

  round.nightPanna = nightPanna;
  round.nightDigit = digitFromPanna(nightPanna);
  round.jodi = deriveJodi(round.dayDigit!, round.nightDigit) as string;
  round.status = 'CLOSED';
  await round.save();

  return NextResponse.json({ round });
}
