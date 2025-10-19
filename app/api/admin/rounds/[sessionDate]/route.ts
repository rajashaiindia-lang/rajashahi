// app/api/admin/rounds/[sessionDate]/route.ts
import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Round from '@/models/Round';
import { digitFromPanna, deriveJodi } from '@/utils/helpers';

const pad3 = (v: any) => String(v ?? '').replace(/\D/g, '').slice(0, 3).padStart(3, '0');

export async function PATCH(
  req: Request,
  { params }: { params: { sessionDate: string } }
) {
   // Normalize the URL param: remove zero-width chars etc., trim, and validate
  const raw = (params.sessionDate ?? '').normalize().trim();
  const sessionDate = raw.replace(/[^\d-]/g, ''); // keep only digits and hyphen
  if (!/^\d{4}-\d{2}-\d{2}$/.test(sessionDate)) {
    return NextResponse.json({ ok: false, error: 'Bad sessionDate in URL' }, { status: 400 });
  }
  const body = await req.json().catch(() => ({} as any));

  const setDay   = 'dayPanna'   in body;
  const setNight = 'nightPanna' in body;
  if (!setDay && !setNight) {
    return NextResponse.json({ ok: false, error: 'Provide dayPanna and/or nightPanna' }, { status: 400 });
  }

  await dbConnect();
  const round = await Round.findOne({ sessionDate });
  if (!round) return NextResponse.json({ ok: false, error: `No round for ${sessionDate}` }, { status: 404 });

  // --- Update fields ---
  if (setDay) {
    if (body.dayPanna === null) {
      round.dayPanna = undefined;
      round.dayDigit = undefined;
    } else {
      const p = pad3(body.dayPanna);
      if (!/^\d{3}$/.test(p)) return NextResponse.json({ ok: false, error: 'dayPanna must be 000–999' }, { status: 400 });
      round.dayPanna = p;
      round.dayDigit = digitFromPanna(p);
    }
  }

  if (setNight) {
    if (body.nightPanna === null) {
      round.nightPanna = undefined;
      round.nightDigit = undefined;
    } else {
      const p = pad3(body.nightPanna);
      if (!/^\d{3}$/.test(p)) return NextResponse.json({ ok: false, error: 'nightPanna must be 000–999' }, { status: 400 });
      round.nightPanna = p;
      round.nightDigit = digitFromPanna(p);
    }
  }

  // --- Derive jodi + status automatically ---
  const haveDay   = round.dayDigit   !== undefined;
  const haveNight = round.nightDigit !== undefined;

  if (haveDay && haveNight) {
    round.jodi = deriveJodi(round.dayDigit!, round.nightDigit!) as string;
    round.status = 'CLOSED';
  } else if (haveDay) {
    round.jodi = undefined;
    round.status = 'DAY_PUBLISHED';
  } else {
    round.jodi = undefined;
    round.status = 'READY';
  }

  await round.save();
  return NextResponse.json({ ok: true, round });
}

export async function DELETE(
  _req: Request,
  { params }: { params: { sessionDate: string } }
) {
  await dbConnect();
  const { deletedCount } = await Round.deleteOne({ sessionDate: params.sessionDate });
  if (!deletedCount) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
  return NextResponse.json({ ok: true });
}
