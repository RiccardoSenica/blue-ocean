import { redis } from '@utils/redis';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const { state } = await req.json();
    const key = crypto.randomBytes(8).toString('hex');
    await redis.set(key, JSON.stringify(state));
    return NextResponse.json({ success: true, key });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Backup failed' }, { status: 500 });
  }
}
