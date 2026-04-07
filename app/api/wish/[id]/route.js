import { NextResponse } from 'next/server';
import db from '../../../../lib/db';

export async function GET(request, { params }) {
  const unwrappedParams = await params;
  const id = unwrappedParams.id;
  
  try {
    const stmt = db.prepare('SELECT * FROM wishes WHERE id = ?');
    const wish = stmt.get(id);
    
    if (!wish) {
      return NextResponse.json({ detail: 'Wish not found' }, { status: 404 });
    }
    
    return NextResponse.json(wish);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ detail: 'Failed to fetch wish' }, { status: 500 });
  }
}
