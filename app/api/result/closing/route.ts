import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Round from '@/models/Round';
import { digitFromPanna, deriveJodi } from '@/utils/helpers';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const c = await cookies();
  const isAdmin = c.get('isAdmin')?.value === '1';
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { closingPanna } = await req.json();
  if (!/^\d{3}$/.test(closingPanna || '')) {
    return NextResponse.json({ error: 'closingPanna must be a 3-digit string' }, { status: 400 });
  }

  await dbConnect();
  const round = await Round.findOne().sort({ createdAt: -1 });
  if (!round) return NextResponse.json({ error: 'No round' }, { status: 400 });
  if (round.closingDigit !== undefined) {
    return NextResponse.json({ error: 'Closing already published' }, { status: 400 });
  }
  if (round.openingDigit === undefined) {
    return NextResponse.json({ error: 'Opening not published yet' }, { status: 400 });
  }

  round.closingPanna = closingPanna;
  round.closingDigit = digitFromPanna(closingPanna);
  round.jodi = deriveJodi(round.openingDigit!, round.closingDigit) as string;
  round.status = 'CLOSED';
  await round.save();

  return NextResponse.json({ round });
}
