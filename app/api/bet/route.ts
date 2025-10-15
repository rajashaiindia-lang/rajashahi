import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Round from '@/models/Round';
import Bet from '@/models/Bet';

// Build a Date from sessionDate + HH:mm in IST (+05:30) for cutoff checks
function buildIST(sessionDate: string, hhmm: string) {
  return new Date(`${sessionDate}T${hhmm}:00+05:30`);
}

function now() {
  return new Date();
}

export async function POST(req: Request) {
  const { type, number, guestId, stakeTokens } = await req.json();

  if (!guestId) return NextResponse.json({ error: 'guestId required' }, { status: 400 });
  if (!type || !['SINGLE_OPEN','SINGLE_CLOSE','JODI','PANNA_OPEN','PANNA_CLOSE'].includes(type)) {
    return NextResponse.json({ error: 'Invalid bet type' }, { status: 400 });
  }
  if (typeof number !== 'string') {
    return NextResponse.json({ error: 'number must be a string' }, { status: 400 });
  }

  // Format validation (server-side mirror of schema validator)
  const formatOK =
    (['SINGLE_OPEN','SINGLE_CLOSE'].includes(type) && /^[0-9]$/.test(number)) ||
    (type === 'JODI' && /^\d{2}$/.test(number)) ||
    (['PANNA_OPEN','PANNA_CLOSE'].includes(type) && /^\d{3}$/.test(number));

  if (!formatOK) {
    return NextResponse.json({ error: 'Invalid number format for the selected type' }, { status: 400 });
  }

  await dbConnect();

  const round = await Round.findOne().sort({ createdAt: -1 });
  if (!round) return NextResponse.json({ error: 'No active round' }, { status: 400 });
  if (round.status === 'CLOSED') {
    return NextResponse.json({ error: 'Bets are closed (round closed)' }, { status: 400 });
  }

  // Cutoff logic (IST based)
  const tNow = now();
  const tOpen = buildIST(round.sessionDate, round.openingTime);
  const tClose = buildIST(round.sessionDate, round.closingTime);

  // Enforce per-type cutoffs
  if (type === 'SINGLE_OPEN' || type === 'PANNA_OPEN') {
    if (tNow >= tOpen || round.openingDigit !== undefined) {
      return NextResponse.json({ error: 'Opening bets are closed' }, { status: 400 });
    }
  } else {
    // SINGLE_CLOSE, PANNA_CLOSE, JODI
    if (tNow >= tClose || round.closingDigit !== undefined) {
      return NextResponse.json({ error: 'Closing bets are closed' }, { status: 400 });
    }
  }

  const bet = await Bet.create({
    guestId,
    round: round._id,
    type,
    number,
    stakeTokens: typeof stakeTokens === 'number' ? stakeTokens : 1
  });

  return NextResponse.json({ ok: true, roundId: round.roundId, betId: bet._id });
}
