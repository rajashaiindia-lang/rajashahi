// app/api/result/day/route.ts
import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Round from '@/models/Round';
import { digitFromPanna } from '@/utils/helpers';
import { cookies } from 'next/headers';

const pad3 = (v: string) => v.replace(/\D/g, '').slice(0, 3).padStart(3, '0');

export async function POST(req: Request) {
  const c = await cookies();
  if (c.get('isAdmin')?.value !== '1') {
    return NextResponse.json({ ok: false, code: 'UNAUTHORIZED', error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  let dayPannaRaw = String(body?.dayPanna ?? '');
  const dayPanna = pad3(dayPannaRaw);

  if (!/^\d{3}$/.test(dayPanna)) {
    return NextResponse.json(
      { ok: false, code: 'BAD_PANNA', error: 'dayPanna must be a 3-digit string (000–999)' },
      { status: 400 }
    );
  }

  await dbConnect();

  // Find the most recent round awaiting DAY publish
// Find the most recent round awaiting DAY publish by status
const round = await Round.findOne({
  status: { $in: ['READY', 'OPENING_PUBLISHED'] }, // allow legacy during rollout
}).sort({ sessionDate: -1, createdAt: -1 });


  if (!round) {
    return NextResponse.json(
      { ok: false, code: 'NO_ROUND', error: 'No round found that is awaiting Day publish. Start a new round first.' },
      { status: 400 }
    );
  }

  // Idempotency shortcut if someone already published the same panna
  if (round.dayDigit !== undefined && round.dayPanna === dayPanna) {
    return NextResponse.json({ ok: true, round, note: 'Day already published with same panna (idempotent).' });
  }
  if (round.dayDigit !== undefined) {
    return NextResponse.json(
      { ok: false, code: 'ALREADY_PUBLISHED', error: 'Day already published' },
      { status: 409 }
    );
  }

  // ---- Legacy bridge: ensure required times exist ----
  // @ts-ignore tolerate legacy fields
  const openingTime = (round as any).openingTime;
  // @ts-ignore
  const closingTime = (round as any).closingTime;

  if (!round.dayTime) {
    if (openingTime) round.dayTime = openingTime;
    else {
      return NextResponse.json(
        { ok: false, code: 'MISSING_DAYTIME', error: 'Round missing dayTime; start the round with dayTime/nightTime.' },
        { status: 400 }
      );
    }
  }
  if (!round.nightTime) {
    if (closingTime) round.nightTime = closingTime;
    else {
      return NextResponse.json(
        { ok: false, code: 'MISSING_NIGHTTIME', error: 'Round missing nightTime; start the round with dayTime/nightTime.' },
        { status: 400 }
      );
    }
  }
  // ---------------------------------------

  const dayDigit = digitFromPanna(dayPanna);

  // Race-safe update gate
  const res = await Round.updateOne(
    {
      _id: round._id,
      $or: [{ dayDigit: { $exists: false } }, { dayDigit: null }],
    },
    {
      $set: {
        dayPanna,
        dayDigit,
        status: 'DAY_PUBLISHED',
        dayTime: round.dayTime,
        nightTime: round.nightTime,
      },
    },
    { runValidators: true }
  );

  if (res.modifiedCount === 0) {
const fresh = await Round.findById(round._id).lean<{ dayPanna?: string }>();
if (fresh?.dayPanna && dayPanna && fresh.dayPanna === dayPanna) {
  return NextResponse.json({
    ok: true,
    round: fresh,
    note: 'Day already published with same panna (idempotent).'
  });
}

    return NextResponse.json(
      { ok: false, code: 'ALREADY_PUBLISHED', error: 'Day already published' },
      { status: 409 }
    );
  }

  const updated = await Round.findById(round._id).lean();
  return NextResponse.json({ ok: true, round: updated });
}
