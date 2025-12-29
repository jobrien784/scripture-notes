import initSqlJs, { Database } from 'sql.js';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { dirname } from 'path';

const DB_PATH = new URL('../../data/notes.db', import.meta.url).pathname;

let db: Database | null = null;

export async function initDatabase(): Promise<Database> {
  if (db) return db;

  const SQL = await initSqlJs();

  // Ensure data directory exists
  const dataDir = dirname(DB_PATH);
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }

  // Load existing database or create new one
  if (existsSync(DB_PATH)) {
    const buffer = readFileSync(DB_PATH);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
    createTables(db);
  }

  return db;
}

function createTables(database: Database): void {
  database.run(`
    CREATE TABLE IF NOT EXISTS notes (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `);

  database.run(`
    CREATE TABLE IF NOT EXISTS pane_items (
      id TEXT PRIMARY KEY,
      note_id TEXT NOT NULL,
      pane_type TEXT NOT NULL,
      content TEXT NOT NULL,
      notes TEXT,
      sort_order INTEGER DEFAULT 0,
      FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE
    )
  `);

  database.run(`
    CREATE INDEX IF NOT EXISTS idx_pane_items_note_id ON pane_items(note_id)
  `);

  saveDatabase(database);
}

export function saveDatabase(database: Database): void {
  const data = database.export();
  const buffer = Buffer.from(data);
  writeFileSync(DB_PATH, buffer);
}

export function getDatabase(): Database {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return db;
}
