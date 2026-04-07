import { NextResponse } from 'next/server';
import db from '../../../lib/db';

export async function POST(request) {
  try {
    const { amount } = await request.json();
    
    const stmt = db.prepare('INSERT INTO donations (amount) VALUES (?)');
    stmt.run(amount);
    
    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ detail: 'Failed to create donation' }, { status: 500 });
  }
}
