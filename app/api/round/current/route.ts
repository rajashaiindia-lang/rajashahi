import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Round, { RoundCore } from '@/models/Round';
import { cookies } from 'next/headers';

export async function GET() {
  await dbConnect();
  const c = await cookies();
  const isAdmin = c.get('isAdmin')?.value === '1';

  const latest = await Round.findOne().sort({ createdAt: -1 }).lean<RoundCore | null>();
  if (!latest) return NextResponse.json({ round: null });

  if (!isAdmin) {
    // Minimal for guests
    return NextResponse.json({
      round: {
        roundId: latest.roundId,
        market: latest.market,
        sessionDate: latest.sessionDate,
        openingTime: latest.openingTime,
        closingTime: latest.closingTime,
        status: latest.status,
        // Publish only what has been revealed
        opening: latest.openingDigit !== undefined ? {
          panna: latest.openingPanna,
          digit: latest.openingDigit
        } : null,
        closing: latest.closingDigit !== undefined ? {
          panna: latest.closingPanna,
          digit: latest.closingDigit
        } : null,
        jodi: latest.jodi ?? null
      }
    });
  }

  // Full for admin
  return NextResponse.json({ round: latest });
}
