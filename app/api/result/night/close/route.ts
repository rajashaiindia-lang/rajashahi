// app/api/result/night/close/route.ts
import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Round from '@/models/Round';
import { digitFromPanna, deriveJodi } from '@/utils/helpers';
import { cookies } from 'next/headers';

const pad3 = (v: string) => v.replace(/\D/g, '').slice(0, 3).padStart(3, '0');

export async function POST(req: Request) {
  const c = await cookies();
  if (c.get('isAdmin')?.value !== '1') {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const nightClosePannaRaw = String(body?.panna ?? '');
  const nightClosePanna = pad3(nightClosePannaRaw);

  if (!/^\d{3}$/.test(nightClosePanna)) {
    return NextResponse.json({ ok: false, error: 'panna must be 3-digit' }, { status: 400 });
  }

  await dbConnect();

  const round = await Round.findOne({}).sort({ sessionDate: -1, createdAt: -1 });
  if (!round) return NextResponse.json({ ok: false, error: 'No round' }, { status: 400 });

  // must have night opening first
  if (round.nightOpenDigit == null) {
    return NextResponse.json({ ok: false, error: 'Publish night opening first' }, { status: 400 });
  }

  // idempotence / double publish guard
  if (round.nightCloseDigit != null) {
    return NextResponse.json({ ok: false, error: 'Night closing already published' }, { status: 409 });
  }

  const closeDigit = digitFromPanna(nightClosePanna);
  round.nightClosePanna = nightClosePanna;
  round.nightCloseDigit = closeDigit;

  // build night jodi from opening + closing
  round.nightJodi = deriveJodi(round.nightOpenDigit!, closeDigit) as string;
  round.nightLineStatus = 'CLOSED';

  // do NOT touch day line
  await round.save();

  return NextResponse.json({ ok: true, round });
}
