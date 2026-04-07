import { NextResponse } from 'next/server';
import db from '../../../lib/db';
import crypto from 'crypto';

export async function POST(request) {
  try {
    const body = await request.json();
    const id = crypto.randomUUID();
    
    const stmt = db.prepare(`
      INSERT INTO wishes (id, gift_type, theme_color, recipient_name, message_type, message, music_choice)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    
    stmt.run(
      id, 
      body.gift_type, 
      body.theme_color, 
      body.recipient_name, 
      body.message_type || 'short', 
      body.message, 
      body.music_choice || 'none'
    );

    return NextResponse.json({ id, ...body });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ detail: 'Failed to create wish' }, { status: 500 });
  }
}
