/* ts-node scripts/seed_last6weeks.ts
   or: node -r ts-node/register scripts/seed_last6weeks.ts
*/
import { dbConnect } from '@/lib/mongodb';
import Round from '@/models/Round';

type D = Date;

// ---- helpers ---------------------------------------------------------------

// classic matka digit: sum of digits % 10 (last digit of the sum)
function digitFromPanna(p: string): number {
  const s = p.split('').reduce((a, c) => a + Number(c), 0);
  return s % 10;
}

// deterministic PRNG so results are stable across runs
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pannaFromSeed(rng: () => number) {
  // generate a 3-digit string 000..999, but avoid boring 000/111/222 every time
  const a = Math.floor(rng() * 10);
  const b = Math.floor(rng() * 10);
  const c = Math.floor(rng() * 10);
  return `${a}${b}${c}`;
}

function yyyy_mm_dd(d: D) {
  return d.toISOString().slice(0, 10);
}

function addDays(d: D, n: number) {
  const x = new Date(d);
  x.setUTCDate(x.getUTCDate() + n);
  return x;
}

// ---- main seeder -----------------------------------------------------------

async function run() {
  await dbConnect();

  // last day (inclusive)
  const end = new Date(Date.UTC(2025, 9, 16)); // 2025-10-16 (UTC months are 0-based)
  // start = 6 weeks earlier = 42 days
  const start = addDays(end, -42 + 1); // inclusive window of 42 days

  console.log(`Seeding KALYAN rounds from ${yyyy_mm_dd(start)} to ${yyyy_mm_dd(end)} (Mon–Sat only)`);

  const docs: any[] = [];
  for (let d = new Date(start); d <= end; d = addDays(d, 1)) {
    const day = d.getUTCDay();          // 0 Sun ... 6 Sat
    if (day === 0) continue;            // skip Sundays

    const sessionDate = yyyy_mm_dd(d);
    const seed = Number(sessionDate.replace(/-/g, '')); // e.g., 20250904
    const rng = mulberry32(seed);

    const openingPanna = pannaFromSeed(rng);
    const closingPanna = pannaFromSeed(rng);

    const openingDigit = digitFromPanna(openingPanna);
    const closingDigit = digitFromPanna(closingPanna);
    const jodi = `${openingDigit}${closingDigit}`;

    docs.push({
      updateOne: {
        filter: { market: 'KALYAN', sessionDate },
        update: {
          $set: {
            roundId: `${sessionDate}-KALYAN`,
            sessionDate,
            market: 'KALYAN',
            openingTime: '16:00',
            closingTime: '18:00',
            openingPanna,
            openingDigit,
            closingPanna,
            closingDigit,
            jodi,
            status: 'CLOSED'
          }
        },
        upsert: true
      }
    });
  }

  if (docs.length) {
    const res = await Round.bulkWrite(docs, { ordered: false });
    console.log('Bulk upsert ok:', JSON.stringify(res, null, 2));
  } else {
    console.log('No days to insert (window empty?)');
  }

  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
