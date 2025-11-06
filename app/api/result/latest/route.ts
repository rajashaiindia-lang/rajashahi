import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Round from '@/models/Round';
import { deriveJodi } from '@/utils/helpers';

function isNowBeforeIST(sessionDate: string, hhmm?: string | null) {
  if (!hhmm) return false;
  const target = new Date(`${sessionDate}T${hhmm}:00+05:30`);
  return new Date() < target;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const side = searchParams.get('side') || 'day';

  await dbConnect();

  const round = await Round.findOne({})
    .sort({ sessionDate: -1, createdAt: -1 })
    .lean<any>();

  if (!round) {
    return NextResponse.json({ ok: false, error: 'No round' }, { status: 404 });
  }

  // grab legacy times
  const legacyDayTime = round.dayTime || null;
  const legacyNightTime = round.nightTime || null;

  // ===== DAY =====
  const dayHasExplicitOpenTime =
    !!round.dayOpenTime && round.dayOpenTime !== legacyDayTime;
  const dayHasExplicitCloseTime =
    !!round.dayCloseTime && round.dayCloseTime !== legacyDayTime;

  const dayOpenTooEarly =
    dayHasExplicitOpenTime &&
    isNowBeforeIST(round.sessionDate, round.dayOpenTime);
  const dayCloseTooEarly =
    dayHasExplicitCloseTime &&
    isNowBeforeIST(round.sessionDate, round.dayCloseTime);

  const dayOpenPannaRaw  = round.dayOpenPanna  ?? round.dayPanna ?? null;
  const dayOpenDigitRaw  = round.dayOpenDigit  ?? round.dayDigit ?? null;
  const dayClosePannaRaw = round.dayClosePanna ?? null;
  const dayCloseDigitRaw = round.dayCloseDigit ?? null;

  const dayOpenPanna  = dayOpenTooEarly  ? null : dayOpenPannaRaw;
  const dayOpenDigit  = dayOpenTooEarly  ? null : dayOpenDigitRaw;
  const dayClosePanna = dayCloseTooEarly ? null : dayClosePannaRaw;
  const dayCloseDigit = dayCloseTooEarly ? null : dayCloseDigitRaw;

  const haveDayOpen  = dayOpenDigit  != null;
  const haveDayClose = dayCloseDigit != null;

  const dayLineStatus =
    haveDayOpen ? (haveDayClose ? 'CLOSED' : 'OPEN_PUBLISHED') : 'READY';

  const dayJodi =
    haveDayOpen && haveDayClose
      ? (round.dayJodi ?? (deriveJodi(dayOpenDigit!, dayCloseDigit!) as string))
      : null;

  // ===== NIGHT =====
  const nightHasExplicitOpenTime =
    !!round.nightOpenTime && round.nightOpenTime !== legacyNightTime;
  const nightHasExplicitCloseTime =
    !!round.nightCloseTime && round.nightCloseTime !== legacyNightTime;

  const nightOpenTooEarly =
    nightHasExplicitOpenTime &&
    isNowBeforeIST(round.sessionDate, round.nightOpenTime);
  const nightCloseTooEarly =
    nightHasExplicitCloseTime &&
    isNowBeforeIST(round.sessionDate, round.nightCloseTime);

  const nightOpenPannaRaw  = round.nightOpenPanna  ?? round.nightPanna ?? null;
  const nightOpenDigitRaw  = round.nightOpenDigit  ?? round.nightDigit ?? null;
  const nightClosePannaRaw = round.nightClosePanna ?? null;
  const nightCloseDigitRaw = round.nightCloseDigit ?? null;

  const nightOpenPanna  = nightOpenTooEarly  ? null : nightOpenPannaRaw;
  const nightOpenDigit  = nightOpenTooEarly  ? null : nightOpenDigitRaw;
  const nightClosePanna = nightCloseTooEarly ? null : nightClosePannaRaw;
  const nightCloseDigit = nightCloseTooEarly ? null : nightCloseDigitRaw;

  const haveNightOpen  = nightOpenDigit  != null;
  const haveNightClose = nightCloseDigit != null;

  const nightLineStatus =
    haveNightOpen ? (haveNightClose ? 'CLOSED' : 'OPEN_PUBLISHED') : 'READY';

  const nightJodi =
    haveNightOpen && haveNightClose
      ? (round.nightJodi ?? (deriveJodi(nightOpenDigit!, nightCloseDigit!) as string))
      : null;

  // side-specific response
  if (side === 'night') {
    return NextResponse.json({
      ok: true,
      sessionDate: round.sessionDate,
      status: nightLineStatus,
      jodi: nightJodi,
      nightPanna: nightOpenPanna,
      nightDigit: nightOpenDigit,
      nightClosePanna,
      nightCloseDigit,
    });
  }

  return NextResponse.json({
    ok: true,
    sessionDate: round.sessionDate,
    status: dayLineStatus,
    jodi: dayJodi,
    dayPanna: dayOpenPanna,
    dayDigit: dayOpenDigit,
    dayClosePanna,
    dayCloseDigit,
  });
}
