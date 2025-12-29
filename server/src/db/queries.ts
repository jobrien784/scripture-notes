import { getDatabase, saveDatabase } from './index.js';

export interface Note {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  people: PaneItem[];
  places: PaneItem[];
  events: PaneItem[];
  verses: PaneItem[];
}

export interface NoteSummary {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaneItem {
  id: string;
  content: string;
  notes?: string;
}

export type PaneType = 'people' | 'places' | 'events' | 'verses';

export function getAllNotes(): NoteSummary[] {
  const db = getDatabase();
  const results = db.exec(`
    SELECT id, title, created_at, updated_at
    FROM notes
    ORDER BY updated_at DESC
  `);

  if (results.length === 0) return [];

  return results[0].values.map((row) => ({
    id: row[0] as string,
    title: row[1] as string,
    createdAt: row[2] as string,
    updatedAt: row[3] as string,
  }));
}

export function getNoteById(id: string): Note | null {
  const db = getDatabase();

  // Get note
  const noteResult = db.exec(`
    SELECT id, title, created_at, updated_at
    FROM notes
    WHERE id = ?
  `, [id]);

  if (noteResult.length === 0 || noteResult[0].values.length === 0) {
    return null;
  }

  const noteRow = noteResult[0].values[0];
  const note: Note = {
    id: noteRow[0] as string,
    title: noteRow[1] as string,
    createdAt: noteRow[2] as string,
    updatedAt: noteRow[3] as string,
    people: [],
    places: [],
    events: [],
    verses: [],
  };

  // Get pane items
  const itemsResult = db.exec(`
    SELECT id, pane_type, content, notes
    FROM pane_items
    WHERE note_id = ?
    ORDER BY sort_order
  `, [id]);

  if (itemsResult.length > 0) {
    for (const row of itemsResult[0].values) {
      const item: PaneItem = {
        id: row[0] as string,
        content: row[2] as string,
        notes: row[3] as string | undefined,
      };
      const paneType = row[1] as PaneType;
      note[paneType].push(item);
    }
  }

  return note;
}

export function createNote(id: string, title: string): Note {
  const db = getDatabase();
  const now = new Date().toISOString();

  db.run(`
    INSERT INTO notes (id, title, created_at, updated_at)
    VALUES (?, ?, ?, ?)
  `, [id, title, now, now]);

  saveDatabase(db);

  return {
    id,
    title,
    createdAt: now,
    updatedAt: now,
    people: [],
    places: [],
    events: [],
    verses: [],
  };
}

export function updateNote(
  id: string,
  title: string,
  panes: { people: PaneItem[]; places: PaneItem[]; events: PaneItem[]; verses: PaneItem[] }
): Note | null {
  const db = getDatabase();
  const now = new Date().toISOString();

  // Check if note exists
  const existingResult = db.exec(`SELECT id FROM notes WHERE id = ?`, [id]);
  if (existingResult.length === 0 || existingResult[0].values.length === 0) {
    return null;
  }

  // Update note
  db.run(`UPDATE notes SET title = ?, updated_at = ? WHERE id = ?`, [title, now, id]);

  // Delete existing pane items
  db.run(`DELETE FROM pane_items WHERE note_id = ?`, [id]);

  // Insert new pane items
  const paneTypes: PaneType[] = ['people', 'places', 'events', 'verses'];
  for (const paneType of paneTypes) {
    const items = panes[paneType];
    items.forEach((item, index) => {
      db.run(`
        INSERT INTO pane_items (id, note_id, pane_type, content, notes, sort_order)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [item.id, id, paneType, item.content, item.notes || null, index]);
    });
  }

  saveDatabase(db);

  return getNoteById(id);
}

export function deleteNote(id: string): boolean {
  const db = getDatabase();

  // Check if note exists
  const existingResult = db.exec(`SELECT id FROM notes WHERE id = ?`, [id]);
  if (existingResult.length === 0 || existingResult[0].values.length === 0) {
    return false;
  }

  // Delete pane items first (cascade doesn't work with sql.js)
  db.run(`DELETE FROM pane_items WHERE note_id = ?`, [id]);
  db.run(`DELETE FROM notes WHERE id = ?`, [id]);

  saveDatabase(db);

  return true;
}
