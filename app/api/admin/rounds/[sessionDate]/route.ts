// app/api/admin/rounds/[sessionDate]/route.ts
import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Round from '@/models/Round';
import Bet from '@/models/Bet'; 
import { digitFromPanna, deriveJodi } from '@/utils/helpers';

const pad3 = (v: any) =>
  String(v ?? '')
    .replace(/\D/g, '')
    .slice(0, 3)
    .padStart(3, '0');

const hhmm = /^([01]\d|2[0-3]):[0-5]\d$/;

function extractSessionDate(req: Request) {
  const url = new URL(req.url);
  const rawParam = decodeURIComponent(url.pathname.split('/').pop() || '');
  const raw = rawParam.normalize().trim();
  const sessionDate = raw.replace(/[^\d-]/g, '');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(sessionDate)) return null;
  return sessionDate;
}

export async function PATCH(req: Request) {
  const sessionDate = extractSessionDate(req);
  if (!sessionDate) {
    return NextResponse.json({ ok: false, error: 'Bad sessionDate in URL' }, { status: 400 });
  }

  const body = (await req.json().catch(() => ({} as any))) as any;

  await dbConnect();
  let round = await Round.findOne({ sessionDate });

  // create round if missing
  if (!round) {
    round = new Round({
      roundId: 'R-' + sessionDate.replace(/-/g, ''),
      sessionDate,
      dayTime: '10:00',
      nightTime: '22:00',
      status: 'READY',
    });
  }

  // ---------- NEW: time fields ----------
  if (typeof body.dayOpenTime === 'string' && hhmm.test(body.dayOpenTime)) {
    round.dayOpenTime = body.dayOpenTime;
  }
  if (typeof body.dayCloseTime === 'string' && hhmm.test(body.dayCloseTime)) {
    round.dayCloseTime = body.dayCloseTime;
  }
  if (typeof body.nightOpenTime === 'string' && hhmm.test(body.nightOpenTime)) {
    round.nightOpenTime = body.nightOpenTime;
  }
  if (typeof body.nightCloseTime === 'string' && hhmm.test(body.nightCloseTime)) {
    round.nightCloseTime = body.nightCloseTime;
  }

  // figure out what we’re setting (same as before)
  const setDayLegacy   = 'dayPanna' in body;
  const setNightLegacy = 'nightPanna' in body;
  const setDayOpen     = 'dayOpenPanna' in body;
  const setDayClose    = 'dayClosePanna' in body;
  const setNightOpen   = 'nightOpenPanna' in body;
  const setNightClose  = 'nightClosePanna' in body;

  if (
    !setDayLegacy &&
    !setNightLegacy &&
    !setDayOpen &&
    !setDayClose &&
    !setNightOpen &&
    !setNightClose &&
    // 👆 we added times, so allow PATCH with only times
    !('dayOpenTime' in body) &&
    !('dayCloseTime' in body) &&
    !('nightOpenTime' in body) &&
    !('nightCloseTime' in body)
  ) {
    return NextResponse.json(
      {
        ok: false,
        error:
          'Provide at least one of: dayPanna, nightPanna, dayOpenPanna, dayClosePanna, nightOpenPanna, nightClosePanna, or any of the time fields',
      },
      { status: 400 }
    );
  }

  // ----- legacy day -----
  if (setDayLegacy) {
    if (body.dayPanna === null) {
      round.dayPanna = undefined as any;
      round.dayDigit = undefined as any;
    } else {
      const p = pad3(body.dayPanna);
      if (!/^\d{3}$/.test(p)) {
        return NextResponse.json({ ok: false, error: 'dayPanna must be 000–999' }, { status: 400 });
      }
      round.dayPanna = p;
      round.dayDigit = digitFromPanna(p);
    }
  }

  // ----- legacy night -----
  if (setNightLegacy) {
    if (body.nightPanna === null) {
      round.nightPanna = undefined as any;
      round.nightDigit = undefined as any;
    } else {
      const p = pad3(body.nightPanna);
      if (!/^\d{3}$/.test(p)) {
        return NextResponse.json({ ok: false, error: 'nightPanna must be 000–999' }, { status: 400 });
      }
      round.nightPanna = p;
      round.nightDigit = digitFromPanna(p);
    }
  }

  // ----- DAY OPEN -----
  if (setDayOpen) {
    if (body.dayOpenPanna === null) {
      round.dayOpenPanna = undefined as any;
      round.dayOpenDigit = undefined as any;
    } else {
      const p = pad3(body.dayOpenPanna);
      if (!/^\d{3}$/.test(p)) {
        return NextResponse.json({ ok: false, error: 'dayOpenPanna must be 000–999' }, { status: 400 });
      }
      round.dayOpenPanna = p;
      round.dayOpenDigit = digitFromPanna(p);
    }
  }

  // ----- DAY CLOSE -----
  if (setDayClose) {
    if (body.dayClosePanna === null) {
      round.dayClosePanna = undefined as any;
      round.dayCloseDigit = undefined as any;
    } else {
      const p = pad3(body.dayClosePanna);
      if (!/^\d{3}$/.test(p)) {
        return NextResponse.json({ ok: false, error: 'dayClosePanna must be 000–999' }, { status: 400 });
      }
      round.dayClosePanna = p;
      round.dayCloseDigit = digitFromPanna(p);
    }
  }

  // ----- NIGHT OPEN -----
  if (setNightOpen) {
    if (body.nightOpenPanna === null) {
      round.nightOpenPanna = undefined as any;
      round.nightOpenDigit = undefined as any;
    } else {
      const p = pad3(body.nightOpenPanna);
      if (!/^\d{3}$/.test(p)) {
        return NextResponse.json({ ok: false, error: 'nightOpenPanna must be 000–999' }, { status: 400 });
      }
      round.nightOpenPanna = p;
      round.nightOpenDigit = digitFromPanna(p);
    }
  }

  // ----- NIGHT CLOSE -----
  if (setNightClose) {
    if (body.nightClosePanna === null) {
      round.nightClosePanna = undefined as any;
      round.nightCloseDigit = undefined as any;
    } else {
      const p = pad3(body.nightClosePanna);
      if (!/^\d{3}$/.test(p)) {
        return NextResponse.json({ ok: false, error: 'nightClosePanna must be 000–999' }, { status: 400 });
      }
      round.nightClosePanna = p;
      round.nightCloseDigit = digitFromPanna(p);
    }
  }

  // recompute day line
  const haveDayOpen  = round.dayOpenDigit != null;
  const haveDayClose = round.dayCloseDigit != null;
  if (haveDayOpen && haveDayClose) {
    round.dayJodi = deriveJodi(round.dayOpenDigit!, round.dayCloseDigit!) as string;
    // @ts-ignore
    round.dayLineStatus = 'CLOSED';
  } else if (haveDayOpen) {
    // @ts-ignore
    round.dayLineStatus = 'OPEN_PUBLISHED';
    round.dayJodi = undefined;
  } else {
    // @ts-ignore
    round.dayLineStatus = 'READY';
    round.dayJodi = undefined;
  }

  // recompute night line
  const haveNightOpen2  = round.nightOpenDigit != null;
  const haveNightClose2 = round.nightCloseDigit != null;
  if (haveNightOpen2 && haveNightClose2) {
    round.nightJodi = deriveJodi(round.nightOpenDigit!, round.nightCloseDigit!) as string;
    // @ts-ignore
    round.nightLineStatus = 'CLOSED';
  } else if (haveNightOpen2) {
    // @ts-ignore
    round.nightLineStatus = 'OPEN_PUBLISHED';
    round.nightJodi = undefined;
  } else {
    // @ts-ignore
    round.nightLineStatus = 'READY';
    round.nightJodi = undefined;
  }

  await round.save();

  return NextResponse.json({ ok: true, round });
}
// ------------------ NEW: DELETE ------------------
export async function DELETE(req: Request) {
  const sessionDate = extractSessionDate(req);
  if (!sessionDate) {
    return NextResponse.json(
      { ok: false, error: 'Bad sessionDate in URL' },
      { status: 400 }
    );
  }

  await dbConnect();

  // find the round first (so we can also delete bets that point to it)
  const round = await Round.findOne({ sessionDate });
  if (!round) {
    // UI will show “Deleted successfully!” if we just return ok
    return NextResponse.json({ ok: true, note: 'Round not found (already deleted?)' });
  }

  // delete bets for that round (optional but nice to keep DB clean)
  await Bet.deleteMany({ round: round._id });

  // delete the round itself
  await Round.deleteOne({ _id: round._id });

  return NextResponse.json({ ok: true });
}