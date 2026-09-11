import { NextResponse } from 'next/server';
import { openDb } from '@/lib/db';

export async function GET() {
  try {
    const db = await openDb();
    const actions = await db.all('SELECT * FROM actions');
    await db.close();
    
    return NextResponse.json(actions);
  } catch (error) {
    console.error('Error fetching actions:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const db = await openDb();
    
    // In our case we only update the status for now
    if (data.id && data.status) {
      await db.run('UPDATE actions SET status = ? WHERE id = ?', [data.status, data.id]);
    }

    await db.close();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating action:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
