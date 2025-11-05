// app/api/round/current/route.ts
import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Round from '@/models/Round';

export async function GET() {
  await dbConnect();

  const round = await Round.findOne({})
    .sort({ sessionDate: -1, createdAt: -1 })
    .lean<any>();

  if (!round) {
    return NextResponse.json({ ok: false, error: 'No round' }, { status: 404 });
  }

  return NextResponse.json({ ok: true, round });
}
