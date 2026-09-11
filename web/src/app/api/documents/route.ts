import { NextResponse } from 'next/server';
import { openDb } from '@/lib/db';

export async function GET() {
  try {
    const db = await openDb();
    
    // Fetch all documents
    const documents = await db.all('SELECT * FROM documents');
    
    // Fetch all clauses
    const clauses = await db.all('SELECT * FROM clauses');
    
    // Group clauses by documentId and parse topics JSON
    const docsWithClauses = documents.map(doc => {
      // Parse topics from JSON string
      const parsedTopics = doc.topics ? JSON.parse(doc.topics) : [];
      
      return {
        ...doc,
        topics: parsedTopics,
        clauses: clauses.filter(c => c.documentId === doc.id).map(c => ({
          number: c.number,
          title: c.title,
          text: c.text,
          obligationType: c.obligationType,
          matchedSection: c.matchedSection,
          gapScore: c.gapScore
        }))
      };
    });

    await db.close();
    
    return NextResponse.json(docsWithClauses);
  } catch (error) {
    console.error('Error fetching documents:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const db = await openDb();
    
    await db.run(`
      INSERT INTO documents (
        id, code, title, sub, type, source, department, date, effectiveDate, status, rel,
        iconColor, iconBg, pages, lastUpdated, owner, description, topics, clausesCount,
        obligationsCount, mappingCount, aiSummary
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      data.id, data.code, data.title, data.sub, data.type, data.source, data.department, 
      data.date, data.effectiveDate, data.status, data.rel, data.iconColor, data.iconBg, 
      data.pages, data.lastUpdated, data.owner, data.description, JSON.stringify(data.topics || []), 
      data.clausesCount, data.obligationsCount, data.mappingCount, data.aiSummary
    ]);

    if (data.clauses && Array.isArray(data.clauses)) {
      for (const clause of data.clauses) {
        await db.run(`
          INSERT INTO clauses (
            documentId, number, title, text, obligationType, matchedSection, gapScore
          ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [
          data.id, clause.number, clause.title, clause.text, clause.obligationType, 
          clause.matchedSection || null, clause.gapScore || null
        ]);
      }
    }

    await db.close();
    return NextResponse.json({ success: true, id: data.id }, { status: 201 });
  } catch (error) {
    console.error('Error creating document:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
