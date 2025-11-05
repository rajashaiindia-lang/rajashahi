// app/api/result/latest/route.ts
import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Round from '@/models/Round';

export async function GET(req: Request) {
  await dbConnect();

  const url = new URL(req.url);
  const side = url.searchParams.get('side'); // 'day' | 'night' | null

  // latest round by date (and createdAt as tiebreaker)
  const round = await Round.findOne({})
    .sort({ sessionDate: -1, createdAt: -1 })
    .lean<any>();

  if (!round) {
    return NextResponse.json(
      { ok: false, error: 'No round', status: 'READY' },
      { status: 404 }
    );
  }

  // ----- DAY mapping -----
  // prefer new fields, then fall back to legacy
  const dayOpenPanna  = round.dayOpenPanna  ?? round.dayPanna ?? null;
  const dayOpenDigit  = round.dayOpenDigit  ?? round.dayDigit ?? null;
  const dayClosePanna = round.dayClosePanna ?? null;
  const dayCloseDigit = round.dayCloseDigit ?? null;

  const haveDayOpen  = dayOpenDigit  !== null && dayOpenDigit  !== undefined;
  const haveDayClose = dayCloseDigit !== null && dayCloseDigit !== undefined;

  // if both present, use stored dayJodi else derive from digits
  const dayJodi =
    haveDayOpen && haveDayClose
      ? (round.dayJodi ?? `${dayOpenDigit}${dayCloseDigit}`)
      : null;

  const dayLineStatus: 'READY' | 'OPEN_PUBLISHED' | 'CLOSED' =
    round.dayLineStatus
      ? round.dayLineStatus
      : haveDayOpen
        ? (haveDayClose ? 'CLOSED' : 'OPEN_PUBLISHED')
        : 'READY';

  // ----- NIGHT mapping -----
  const nightOpenPanna  = round.nightOpenPanna  ?? round.nightPanna ?? null;
  const nightOpenDigit  = round.nightOpenDigit  ?? round.nightDigit ?? null;
  const nightClosePanna = round.nightClosePanna ?? null;
  const nightCloseDigit = round.nightCloseDigit ?? null;

  const haveNightOpen  = nightOpenDigit  !== null && nightOpenDigit  !== undefined;
  const haveNightClose = nightCloseDigit !== null && nightCloseDigit !== undefined;

  const nightJodi =
    haveNightOpen && haveNightClose
      ? (round.nightJodi ?? `${nightOpenDigit}${nightCloseDigit}`)
      : null;

  const nightLineStatus: 'READY' | 'OPEN_PUBLISHED' | 'CLOSED' =
    round.nightLineStatus
      ? round.nightLineStatus
      : haveNightOpen
        ? (haveNightClose ? 'CLOSED' : 'OPEN_PUBLISHED')
        : 'READY';

  // pick which side to “surface” to the old client
  if (side === 'night') {
    // NIGHT view
    return NextResponse.json({
      ok: true,
      sessionDate: round.sessionDate,
      status: nightLineStatus,          // 'READY' | 'OPEN_PUBLISHED' | 'CLOSED'
      jodi: nightJodi,
      // map to old names so your <ResultRibbon ... nightPanna= ... /> works
      dayPanna: null,
      dayDigit: null,
      nightPanna: nightOpenPanna,
      nightDigit: nightOpenDigit,
      formatted: `Night ${nightOpenPanna ?? '--'}${nightClosePanna ? ' / ' + nightClosePanna : ''}`
    });
  }

  // default = DAY view
  return NextResponse.json({
    ok: true,
    sessionDate: round.sessionDate,
    status: dayLineStatus,              // 'READY' | 'OPEN_PUBLISHED' | 'CLOSED'
    jodi: dayJodi,
    // expose day opening under old names so your page sees it:
    dayPanna: dayOpenPanna,
    dayDigit: dayOpenDigit,
    // keep night here too because your component passes them through
    nightPanna: nightOpenPanna,
    nightDigit: nightOpenDigit,
    formatted: `Day ${dayOpenPanna ?? '--'}${dayClosePanna ? ' / ' + dayClosePanna : ''}`
  });
}
