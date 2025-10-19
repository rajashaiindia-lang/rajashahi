// app/api/admin/rounds/route.ts
import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Round from '@/models/Round';

export async function GET(req: Request) {
  await dbConnect();

  const url = new URL(req.url);
  const month = url.searchParams.get('month'); // 'YYYY-MM'

  const filter: any = {};
  if (month) {
    const [Y, M] = month.split('-').map(Number);
    const lo = new Date(Date.UTC(Y, M - 1, 1)).toISOString().slice(0,10);
    const hi = new Date(Date.UTC(Y, M, 1)).toISOString().slice(0,10);
    filter.sessionDate = { $gte: lo, $lt: hi };
  }

  const items = await Round.find(filter)
    .sort({ sessionDate: -1 })
    .select('sessionDate status dayPanna dayDigit nightPanna nightDigit jodi')
    .lean();

  return NextResponse.json({ ok: true, items });
}
