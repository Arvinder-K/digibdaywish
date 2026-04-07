import { NextResponse } from 'next/server';
import { getWish } from '../../../../lib/kv';

export async function GET(request, { params }) {
  const unwrappedParams = await params;
  const id = unwrappedParams.id;
  
  try {
    const wish = await getWish(id);
    
    if (!wish) {
      return NextResponse.json({ detail: 'Wish not found' }, { status: 404 });
    }
    
    return NextResponse.json(wish);
  } catch (error) {
    console.error('API Error (GET):', error);
    return NextResponse.json({ detail: 'Failed to fetch wish' }, { status: 500 });
  }
}
