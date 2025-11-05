// app/api/result/day/open/route.ts
import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Round from '@/models/Round';
import { digitFromPanna } from '@/utils/helpers';
import { cookies } from 'next/headers';

const pad3 = (v: string) => v.replace(/\D/g, '').slice(0, 3).padStart(3, '0');

export async function POST(req: Request) {
  const c = await cookies();
  if (c.get('isAdmin')?.value !== '1')
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const dayOpenPannaRaw = String(body?.panna ?? '');
  const dayOpenPanna = pad3(dayOpenPannaRaw);

  if (!/^\d{3}$/.test(dayOpenPanna)) {
    return NextResponse.json({ ok: false, error: 'panna must be 3-digit' }, { status: 400 });
  }

  await dbConnect();

  // latest round
  const round = await Round.findOne({}).sort({ sessionDate: -1, createdAt: -1 });
  if (!round) {
    return NextResponse.json({ ok: false, error: 'No round' }, { status: 400 });
  }

  // idempotent
  if (round.dayOpenDigit != null && round.dayOpenPanna === dayOpenPanna) {
    return NextResponse.json({ ok: true, round, note: 'already published' });
  }
  if (round.dayOpenDigit != null) {
    return NextResponse.json({ ok: false, error: 'Day opening already published' }, { status: 409 });
  }

  round.dayOpenPanna = dayOpenPanna;
  round.dayOpenDigit = digitFromPanna(dayOpenPanna);
  round.dayLineStatus = 'OPEN_PUBLISHED';
  await round.save();

  return NextResponse.json({ ok: true, round });
}
