// app/api/result/day/close/route.ts
import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Round from '@/models/Round';
import { digitFromPanna, deriveJodi } from '@/utils/helpers';
import { cookies } from 'next/headers';

const pad3 = (v: string) => v.replace(/\D/g, '').slice(0, 3).padStart(3, '0');

export async function POST(req: Request) {
  const c = await cookies();
  if (c.get('isAdmin')?.value !== '1')
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const dayClosePannaRaw = String(body?.panna ?? '');
  const dayClosePanna = pad3(dayClosePannaRaw);

  if (!/^\d{3}$/.test(dayClosePanna)) {
    return NextResponse.json({ ok: false, error: 'panna must be 3-digit' }, { status: 400 });
  }

  await dbConnect();

  const round = await Round.findOne({}).sort({ sessionDate: -1, createdAt: -1 });
  if (!round) return NextResponse.json({ ok: false, error: 'No round' }, { status: 400 });

  if (round.dayOpenDigit == null) {
    return NextResponse.json({ ok: false, error: 'Publish day opening first' }, { status: 400 });
  }
  if (round.dayCloseDigit != null) {
    return NextResponse.json({ ok: false, error: 'Day closing already published' }, { status: 409 });
  }

  const closeDigit = digitFromPanna(dayClosePanna);
  round.dayClosePanna = dayClosePanna;
  round.dayCloseDigit = closeDigit;
  // build day jodi from opening + closing
  round.dayJodi = deriveJodi(round.dayOpenDigit!, closeDigit) as string;
  round.dayLineStatus = 'CLOSED';

  // NOTE: do NOT touch night line here
  await round.save();

  return NextResponse.json({ ok: true, round });
}
