// app/api/round/start/route.ts
import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Round from '@/models/Round';
import { cookies } from 'next/headers';

const timeHHmm = /^([01]\d|2[0-3]):[0-5]\d$/;

export async function POST(req: Request) {
  const c = await cookies();
  if (c.get('isAdmin')?.value !== '1') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Parse & validate input early so we never reach Mongoose without the fields
  const body = await req.json().catch(() => ({} as any));
  const sessionDate = String(body?.sessionDate ?? '').trim();
  const dayTime     = String(body?.dayTime ?? '').trim();
  const nightTime   = String(body?.nightTime ?? '').trim();

  if (!/^\d{4}-\d{2}-\d{2}$/.test(sessionDate)) {
    return NextResponse.json({ error: 'sessionDate must be YYYY-MM-DD' }, { status: 400 });
  }
  if (!timeHHmm.test(dayTime)) {
    return NextResponse.json({ error: 'dayTime must be HH:mm (00:00–23:59)' }, { status: 400 });
  }
  if (!timeHHmm.test(nightTime)) {
    return NextResponse.json({ error: 'nightTime must be HH:mm (00:00–23:59)' }, { status: 400 });
  }

  await dbConnect();

  // One round per date
  const exists = await Round.findOne({ sessionDate }).lean();
  if (exists) {
    return NextResponse.json({ error: `Round already exists for ${sessionDate}` }, { status: 400 });
  }

  const roundId = `R-${sessionDate}-${Date.now()}`;

  // IMPORTANT: write the NEW fields (dayTime/nightTime), not opening/closing
  const round = await Round.create({
    roundId,
    sessionDate,
    dayTime,
    nightTime,
    status: 'READY',
  });

  return NextResponse.json({ round });
}
