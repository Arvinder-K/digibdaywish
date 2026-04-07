import { NextResponse } from 'next/server';
import db from '../../../../lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const totalPagesResult = db.prepare('SELECT COUNT(*) as count FROM wishes').get();
    const totalPages = totalPagesResult ? totalPagesResult.count : 0;
    
    const totalUsersResult = db.prepare('SELECT COUNT(DISTINCT recipient_name) as count FROM wishes').get();
    const totalUsers = totalUsersResult ? totalUsersResult.count : 0;
    
    const totalDonationsResult = db.prepare('SELECT COUNT(*) as count FROM donations').get();
    const totalDonations = totalDonationsResult ? totalDonationsResult.count : 0;
    
    return NextResponse.json({
      total_pages: totalPages,
      total_users: totalUsers,
      total_donations: totalDonations
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ detail: 'Failed to fetch stats' }, { status: 500 });
  }
}
