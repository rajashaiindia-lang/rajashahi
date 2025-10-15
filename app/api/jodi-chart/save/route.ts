// app/api/jodi-chart/save/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { dbConnect } from '@/lib/mongodb';
import JodiChart from '@/models/JodiChart';

const TWO = /^\d{2}$/;

export async function POST(req: Request) {
  const isAdmin = (await cookies()).get('isAdmin')?.value === '1';
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { sequence } = await req.json();

  if (!Array.isArray(sequence) || sequence.length !== 100 || !sequence.every((s: string) => TWO.test(s))) {
    return NextResponse.json({ error: 'sequence must be 100 items of "00".."99"' }, { status: 400 });
  }
  if (new Set(sequence).size !== 100) {
    return NextResponse.json({ error: 'sequence must be unique' }, { status: 400 });
  }

  await dbConnect();

  // Upsert exactly one document, ensure market is set for schemas that require it
  await JodiChart.findOneAndUpdate(
    {}, // single-doc collection
    { $set: { sequence }, $setOnInsert: { market: 'KALYAN' } },
    { upsert: true, new: true }
  );

  return NextResponse.json({ ok: true });
}
