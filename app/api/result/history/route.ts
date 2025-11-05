// app/api/result/history/route.ts
import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Round from '@/models/Round';

// helper to get month range
function monthBounds(yyyyMM: string) {
  const [Y, M] = yyyyMM.split('-').map(Number);
  const start = new Date(Date.UTC(Y, M - 1, 1, 0, 0, 0));
  const next = new Date(Date.UTC(Y, M, 1, 0, 0, 0));
  const lo = start.toISOString().slice(0, 10);
  const hi = next.toISOString().slice(0, 10);
  return { lo, hi };
}
function addDaysUTC(d: Date, n: number) {
  const x = new Date(d);
  x.setUTCDate(x.getUTCDate() + n);
  return x;
}

export async function GET(req: Request) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const month     = searchParams.get('month');      // 'YYYY-MM'
  const limitRaw  = searchParams.get('limit');
  const weeksRaw  = searchParams.get('weeks');      // '24'
  const endParam  = searchParams.get('end');        // 'YYYY-MM-DD'
  const side      = searchParams.get('side');       // 'day' | 'night' | null

  const limit = Number(limitRaw ?? 0);
  const filter: any = {};

  let lo: string | undefined;
  let hi: string | undefined;

  if (month) {
    // month mode
    const { lo: _lo, hi: _hi } = monthBounds(month);
    lo = _lo;
    hi = _hi;
  } else if (weeksRaw) {
    // weeks mode (like your previous code)
    const weeks = Math.max(1, Math.min(52, Number(weeksRaw) || 24));

    // figure out latest sessionDate as end (or use ?end=)
    const latest = await Round
      .findOne({})
      .sort({ sessionDate: -1 })
      .select('sessionDate')
      .lean<{ sessionDate: string } | null>();

    const endDateStr = endParam || latest?.sessionDate;
    if (!endDateStr) {
      return NextResponse.json({ items: [] });
    }

    const end = new Date(`${endDateStr}T00:00:00Z`);
    const start = addDaysUTC(end, -(weeks * 7) + 1);
    lo = start.toISOString().slice(0, 10);
    hi = addDaysUTC(end, 1).toISOString().slice(0, 10);
  }

  if (lo && hi) {
    filter.sessionDate = { $gte: lo, $lt: hi };
  }

  // pull all needed fields, including the new ones
  const rounds = await Round
    .find(filter)
    .sort({ sessionDate: 1 })
    .select(
      'sessionDate ' +
      'dayOpenPanna dayOpenDigit dayClosePanna dayCloseDigit dayJodi dayLineStatus ' +
      'nightOpenPanna nightOpenDigit nightClosePanna nightCloseDigit nightJodi nightLineStatus ' +
      // legacy
      'dayPanna dayDigit nightPanna nightDigit jodi status'
    )
    .lean<any[]>();

  // now map to a consistent shape
  const mapped = rounds.map(r => {
    // ----- DAY LINE -----
    // try new fields first, then fall back to legacy
    const dayOpenPanna  = r.dayOpenPanna  ?? r.dayPanna ?? null;
    const dayOpenDigit  = r.dayOpenDigit  ?? r.dayDigit ?? null;
    const dayClosePanna = r.dayClosePanna ?? null;
    const dayCloseDigit = r.dayCloseDigit ?? null;

    // if both open+close exist, prefer stored dayJodi, else derive from digits
    const haveDayOpen  = dayOpenDigit  !== null && dayOpenDigit  !== undefined;
    const haveDayClose = dayCloseDigit !== null && dayCloseDigit !== undefined;
    const dayJodi = haveDayOpen && haveDayClose
      ? (r.dayJodi ?? `${dayOpenDigit}${dayCloseDigit}`)
      : null;

    // a status for day-line, default to READY
    const dayLineStatus: 'READY' | 'OPEN_PUBLISHED' | 'CLOSED' =
      r.dayLineStatus
        ? r.dayLineStatus
        : haveDayOpen
          ? (haveDayClose ? 'CLOSED' : 'OPEN_PUBLISHED')
          : 'READY';

    // ----- NIGHT LINE -----
    const nightOpenPanna  = r.nightOpenPanna  ?? r.nightPanna ?? null;
    const nightOpenDigit  = r.nightOpenDigit  ?? r.nightDigit ?? null;
    const nightClosePanna = r.nightClosePanna ?? null;
    const nightCloseDigit = r.nightCloseDigit ?? null;

    const haveNightOpen  = nightOpenDigit  !== null && nightOpenDigit  !== undefined;
    const haveNightClose = nightCloseDigit !== null && nightCloseDigit !== undefined;
    const nightJodi = haveNightOpen && haveNightClose
      ? (r.nightJodi ?? `${nightOpenDigit}${nightCloseDigit}`)
      : null;

    const nightLineStatus: 'READY' | 'OPEN_PUBLISHED' | 'CLOSED' =
      r.nightLineStatus
        ? r.nightLineStatus
        : haveNightOpen
          ? (haveNightClose ? 'CLOSED' : 'OPEN_PUBLISHED')
          : 'READY';

    // legacy bridge for top-level status (UI that still reads r.status)
    const topStatus =
      r.status === 'OPENING_PUBLISHED'
        ? 'DAY_PUBLISHED'
        : r.status;

    return {
      sessionDate: r.sessionDate,
      status: topStatus, // legacy, can be ignored in new UI
      day: {
        openPanna:  dayOpenPanna,
        openDigit:  dayOpenDigit,
        closePanna: dayClosePanna,
        closeDigit: dayCloseDigit,
        jodi:       dayJodi,
        status:     dayLineStatus,
      },
      night: {
        openPanna:  nightOpenPanna,
        openDigit:  nightOpenDigit,
        closePanna: nightClosePanna,
        closeDigit: nightCloseDigit,
        jodi:       nightJodi,
        status:     nightLineStatus,
      },
    };
  });

  // allow side=day or side=night for simpler components
  let items: any[] = mapped;
  if (side === 'day') {
    items = mapped.map(m => ({
      sessionDate: m.sessionDate,
      ...m.day,
    }));
  } else if (side === 'night') {
    items = mapped.map(m => ({
      sessionDate: m.sessionDate,
      ...m.night,
    }));
  }

  // keep your old behaviour: if no month/weeks and limit is set, slice from the end
  if (!month && !weeksRaw && limit && items.length > limit) {
    items = items.slice(-limit);
  }

  return NextResponse.json({ items });
}
