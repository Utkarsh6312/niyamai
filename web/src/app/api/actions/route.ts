import { NextResponse } from 'next/server';
import { openDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await openDb();
    const actions = await db.all('SELECT * FROM actions ORDER BY rowid DESC');
    await db.close();
    
    return NextResponse.json(actions);
  } catch (error) {
    console.error('Error fetching actions:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const db = await openDb();

    // Check if action exists
    const existing = await db.get('SELECT id FROM actions WHERE id = ?', [data.id]);
    if (existing) {
      await db.run(
        'UPDATE actions SET action = ?, regulation = ?, department = ?, ownerInitials = ?, owner = ?, priority = ?, due = ?, status = ? WHERE id = ?',
        [data.action, data.regulation, data.department, data.ownerInitials, data.owner, data.priority, data.due, data.status || 'Pending', data.id]
      );
    } else {
      await db.run(
        'INSERT INTO actions (id, action, regulation, department, ownerInitials, owner, priority, due, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [data.id, data.action, data.regulation, data.department, data.ownerInitials, data.owner, data.priority, data.due, data.status || 'Pending']
      );
    }

    await db.close();
    return NextResponse.json({ success: true, action: data }, { status: 201 });
  } catch (error) {
    console.error('Error creating action:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const db = await openDb();
    
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

export async function DELETE(request: Request) {
  try {
    const db = await openDb();
    await db.run('DELETE FROM actions');
    await db.close();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting actions:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
