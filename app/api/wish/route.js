import { NextResponse } from 'next/server';
import { saveWish } from '../../../lib/kv';
import crypto from 'crypto';

export async function POST(request) {
  try {
    const body = await request.json();
    const id = crypto.randomUUID();
    
    const success = await saveWish(id, {
      id,
      ...body,
      created_at: new Date().toISOString()
    });

    if (!success) {
      throw new Error('KV storage failed');
    }

    return NextResponse.json({ id, ...body });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ detail: 'Failed to create wish' }, { status: 500 });
  }
}
