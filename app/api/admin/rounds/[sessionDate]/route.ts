import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Round from '@/models/Round';
import { digitFromPanna, deriveJodi } from '@/utils/helpers';

const pad3 = (v: any) =>
  String(v ?? '')
    .replace(/\D/g, '')
    .slice(0, 3)
    .padStart(3, '0');

function extractSessionDate(req: Request) {
  const url = new URL(req.url);
  const rawParam = decodeURIComponent(url.pathname.split('/').pop() || '');
  const raw = rawParam.normalize().trim();
  const sessionDate = raw.replace(/[^\d-]/g, '');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(sessionDate)) return null;
  return sessionDate;
}

// -------- GET: return the round, or 404 if none --------
export async function GET(req: Request) {
  const sessionDate = extractSessionDate(req);
  if (!sessionDate) {
    return NextResponse.json({ ok: false, error: 'Bad sessionDate in URL' }, { status: 400 });
  }

  await dbConnect();
  const round = await Round.findOne({ sessionDate }).lean<any>();
  if (!round) {
    return NextResponse.json({ ok: false, error: `No round for ${sessionDate}` }, { status: 404 });
  }

  // normalize like before
  const dayOpenPanna  = round.dayOpenPanna  ?? round.dayPanna ?? null;
  const dayOpenDigit  = round.dayOpenDigit  ?? round.dayDigit ?? null;
  const dayClosePanna = round.dayClosePanna ?? null;
  const dayCloseDigit = round.dayCloseDigit ?? null;

  const haveDayOpen  = dayOpenDigit  != null;
  const haveDayClose = dayCloseDigit != null;

  const dayLineStatus =
    round.dayLineStatus
      ? round.dayLineStatus
      : haveDayOpen
        ? (haveDayClose ? 'CLOSED' : 'OPEN_PUBLISHED')
        : 'READY';

  const dayJodi =
    haveDayOpen && haveDayClose
      ? (round.dayJodi ?? deriveJodi(dayOpenDigit!, dayCloseDigit!) as string)
      : null;

  const nightOpenPanna  = round.nightOpenPanna  ?? round.nightPanna ?? null;
  const nightOpenDigit  = round.nightOpenDigit  ?? round.nightDigit ?? null;
  const nightClosePanna = round.nightClosePanna ?? null;
  const nightCloseDigit = round.nightCloseDigit ?? null;

  const haveNightOpen  = nightOpenDigit  != null;
  const haveNightClose = nightCloseDigit != null;

  const nightLineStatus =
    round.nightLineStatus
      ? round.nightLineStatus
      : haveNightOpen
        ? (haveNightClose ? 'CLOSED' : 'OPEN_PUBLISHED')
        : 'READY';

  const nightJodi =
    haveNightOpen && haveNightClose
      ? (round.nightJodi ?? deriveJodi(nightOpenDigit!, nightCloseDigit!) as string)
      : null;

  return NextResponse.json({
    ok: true,
    round: {
      ...round,
      dayOpenPanna,
      dayOpenDigit,
      dayClosePanna,
      dayCloseDigit,
      dayJodi,
      dayLineStatus,
      nightOpenPanna,
      nightOpenDigit,
      nightClosePanna,
      nightCloseDigit,
      nightJodi,
      nightLineStatus,
    },
  });
}

// -------- PATCH: CREATE IF MISSING, then update --------
export async function PATCH(req: Request) {
  const sessionDate = extractSessionDate(req);
  if (!sessionDate) {
    return NextResponse.json({ ok: false, error: 'Bad sessionDate in URL' }, { status: 400 });
  }

  const body = (await req.json().catch(() => ({} as any))) as any;

  await dbConnect();
  let round = await Round.findOne({ sessionDate });

  // if round for that date does not exist → create a basic one
  if (!round) {
    round = new Round({
      roundId: 'R-' + sessionDate.replace(/-/g, ''), // unique-ish
      sessionDate,
      dayTime: '10:00',
      nightTime: '22:00',
      status: 'READY',
    });
  }

  // figure out what we’re setting
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
    !setNightClose
  ) {
    return NextResponse.json(
      {
        ok: false,
        error:
          'Provide at least one of: dayPanna, nightPanna, dayOpenPanna, dayClosePanna, nightOpenPanna, nightClosePanna',
      },
      { status: 400 }
    );
  }

  // legacy day
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

  // legacy night
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

  // DAY OPEN
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

  // DAY CLOSE
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

  // NIGHT OPEN
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

  // NIGHT CLOSE
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

// ---------------------------------- DELETE ----------------------------------
export async function DELETE(req: Request) {
  const sessionDate = extractSessionDate(req);
  if (!sessionDate) {
    return NextResponse.json({ ok: false, error: 'Bad sessionDate in URL' }, { status: 400 });
  }

  await dbConnect();
  const { deletedCount } = await Round.deleteOne({ sessionDate });
  if (!deletedCount) {
    return NextResponse.json({ ok: false, error: `No round found for ${sessionDate}` }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
