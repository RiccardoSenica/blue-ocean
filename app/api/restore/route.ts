import { redis } from '@utils/redis';
import { validateState } from '@utils/validateState';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get('key');

    if (!key) {
      return NextResponse.json({ error: 'No key provided' }, { status: 400 });
    }

    const state = await redis.get(key);

    if (!state) {
      return NextResponse.json(
        { error: 'No data found for this key' },
        { status: 404 }
      );
    }

    const validatedState = validateState(state);
    return NextResponse.json({ data: validatedState });
  } catch (error) {
    console.error('Restore operation failed:', error);
    return NextResponse.json(
      {
        error: 'Restore failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
