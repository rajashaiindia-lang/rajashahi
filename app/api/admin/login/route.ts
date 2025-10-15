import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const { password } = await req.json();
  if (!password) return NextResponse.json({ error: 'Password required' }, { status: 400 });
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
const c = await cookies();
c.set("isAdmin", "1", { httpOnly: true, path: "/", maxAge: 60 * 60 * 6 });

  return NextResponse.json({ ok: true });
}
