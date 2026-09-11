import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import fs from 'fs';
import { documentsData, complianceActions } from '../src/lib/data/mock-data';

async function initDb() {
  const dbPath = path.join(process.cwd(), 'database.sqlite');
  
  if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
  }

  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  console.log('Creating tables...');
  
  await db.exec(`
    CREATE TABLE documents (
      id TEXT PRIMARY KEY,
      code TEXT,
      title TEXT,
      sub TEXT,
      type TEXT,
      source TEXT,
      department TEXT,
      date TEXT,
      effectiveDate TEXT,
      status TEXT,
      rel TEXT,
      iconColor TEXT,
      iconBg TEXT,
      pages INTEGER,
      lastUpdated TEXT,
      owner TEXT,
      description TEXT,
      topics TEXT,
      clausesCount INTEGER,
      obligationsCount INTEGER,
      mappingCount INTEGER,
      aiSummary TEXT
    );

    CREATE TABLE clauses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      documentId TEXT,
      number TEXT,
      title TEXT,
      text TEXT,
      obligationType TEXT,
      matchedSection TEXT,
      gapScore INTEGER,
      FOREIGN KEY(documentId) REFERENCES documents(id)
    );

    CREATE TABLE actions (
      id TEXT PRIMARY KEY,
      action TEXT,
      regulation TEXT,
      department TEXT,
      ownerInitials TEXT,
      owner TEXT,
      priority TEXT,
      due TEXT,
      status TEXT
    );
  `);

  console.log('Inserting documents and clauses...');
  
  for (const doc of documentsData) {
    await db.run(`
      INSERT INTO documents (
        id, code, title, sub, type, source, department, date, effectiveDate, status, rel,
        iconColor, iconBg, pages, lastUpdated, owner, description, topics, clausesCount,
        obligationsCount, mappingCount, aiSummary
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      doc.id, doc.code, doc.title, doc.sub, doc.type, doc.source, doc.department, doc.date, doc.effectiveDate, doc.status, doc.rel,
      doc.iconColor, doc.iconBg, doc.pages, doc.lastUpdated, doc.owner, doc.description, JSON.stringify(doc.topics), doc.clausesCount,
      doc.obligationsCount, doc.mappingCount, doc.aiSummary
    ]);

    for (const clause of doc.clauses) {
      await db.run(`
        INSERT INTO clauses (
          documentId, number, title, text, obligationType, matchedSection, gapScore
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [
        doc.id, clause.number, clause.title, clause.text, clause.obligationType, clause.matchedSection || null, clause.gapScore || null
      ]);
    }
  }

  console.log('Inserting actions...');
  
  for (const action of complianceActions) {
    await db.run(`
      INSERT INTO actions (
        id, action, regulation, department, ownerInitials, owner, priority, due, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      action.id, action.action, action.regulation, action.department, action.ownerInitials, action.owner, action.priority, action.due, action.status
    ]);
  }

  console.log('Database seeded successfully.');
  await db.close();
}

initDb().catch(console.error);
