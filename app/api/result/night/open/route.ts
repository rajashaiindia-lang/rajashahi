// app/api/result/night/open/route.ts
import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Round from '@/models/Round';
import { digitFromPanna } from '@/utils/helpers';
import { cookies } from 'next/headers';

const pad3 = (v: string) => v.replace(/\D/g, '').slice(0, 3).padStart(3, '0');

export async function POST(req: Request) {
  const c = await cookies();
  if (c.get('isAdmin')?.value !== '1') {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const nightOpenPannaRaw = String(body?.panna ?? '');
  const nightOpenPanna = pad3(nightOpenPannaRaw);

  if (!/^\d{3}$/.test(nightOpenPanna)) {
    return NextResponse.json({ ok: false, error: 'panna must be 3-digit' }, { status: 400 });
  }

  await dbConnect();

  // latest round (same style as day routes)
  const round = await Round.findOne({}).sort({ sessionDate: -1, createdAt: -1 });
  if (!round) {
    return NextResponse.json({ ok: false, error: 'No round' }, { status: 400 });
  }

  // idempotent: same panna as already published
  if (round.nightOpenDigit != null && round.nightOpenPanna === nightOpenPanna) {
    return NextResponse.json({ ok: true, round, note: 'already published' });
  }

  // already published with some other value
  if (round.nightOpenDigit != null) {
    return NextResponse.json({ ok: false, error: 'Night opening already published' }, { status: 409 });
  }

  round.nightOpenPanna = nightOpenPanna;
  round.nightOpenDigit = digitFromPanna(nightOpenPanna);
  // per-line status
  round.nightLineStatus = 'OPEN_PUBLISHED';

  // do NOT touch day line here
  await round.save();

  return NextResponse.json({ ok: true, round });
}
