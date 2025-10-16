import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Round from '@/models/Round';
import { generateRoundId } from '@/utils/helpers';
import { cookies } from 'next/headers';

// Defaults for demo (Kalyan-ish times in IST)
const DEFAULT_OPEN = '16:15';
const DEFAULT_CLOSE = '18:15';

export async function POST(req: Request) {
  const c = await cookies();
  const isAdmin = c.get('isAdmin')?.value === '1';
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const {
    sessionDate,            // 'YYYY-MM-DD'
    market = 'KALYAN',
    openingTime = DEFAULT_OPEN,
    closingTime = DEFAULT_CLOSE,
    roundId = generateRoundId(),
  } = body || {};

  if (!/^\d{4}-\d{2}-\d{2}$/.test(sessionDate || '')) {
    return NextResponse.json({ error: 'sessionDate (YYYY-MM-DD) required' }, { status: 400 });
  }

  await dbConnect();
  const round = await Round.create({
    roundId,
    sessionDate,
    market,
    openingTime,
    closingTime,
    status: 'READY',
  });

  return NextResponse.json({ round });
}
