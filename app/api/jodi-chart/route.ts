import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import JodiChart, { JodiChartCore } from '@/models/JodiChart';

function defaultSeq() {
  return Array.from({ length: 100 }, (_, i) => String(i).padStart(2, '0'));
}

export async function GET() {
  await dbConnect();
  const doc = await JodiChart
    .findOne()
    .sort({ updatedAt: -1 })
    .select('sequence updatedAt')  // optional, narrows fields
    .lean<JodiChartCore | null>(); // << tell TS the shape

  return NextResponse.json({ sequence: doc?.sequence ?? defaultSeq() });
}
