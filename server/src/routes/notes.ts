import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  PaneItem,
} from '../db/queries.js';

export const notesRouter = Router();

// GET /api/notes - List all notes (summary only)
notesRouter.get('/', (req: Request, res: Response) => {
  try {
    const notes = getAllNotes();
    res.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

// GET /api/notes/:id - Get a single note with all panes
notesRouter.get('/:id', (req: Request, res: Response) => {
  try {
    const note = getNoteById(req.params.id);
    if (!note) {
      res.status(404).json({ error: 'Note not found' });
      return;
    }
    res.json(note);
  } catch (error) {
    console.error('Error fetching note:', error);
    res.status(500).json({ error: 'Failed to fetch note' });
  }
});

// POST /api/notes - Create a new note
notesRouter.post('/', (req: Request, res: Response) => {
  try {
    const { id, title } = req.body;

    if (!title || typeof title !== 'string' || title.trim() === '') {
      res.status(400).json({ error: 'Title is required' });
      return;
    }

    const noteId = id || uuidv4();
    const note = createNote(noteId, title.trim());
    res.status(201).json(note);
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ error: 'Failed to create note' });
  }
});

// PUT /api/notes/:id - Update an existing note
notesRouter.put('/:id', (req: Request, res: Response) => {
  try {
    const { title, people, places, events, verses } = req.body;

    if (!title || typeof title !== 'string' || title.trim() === '') {
      res.status(400).json({ error: 'Title is required' });
      return;
    }

    const panes = {
      people: validatePaneItems(people),
      places: validatePaneItems(places),
      events: validatePaneItems(events),
      verses: validatePaneItems(verses),
    };

    const note = updateNote(req.params.id, title.trim(), panes);
    if (!note) {
      res.status(404).json({ error: 'Note not found' });
      return;
    }

    res.json(note);
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ error: 'Failed to update note' });
  }
});

// DELETE /api/notes/:id - Delete a note
notesRouter.delete('/:id', (req: Request, res: Response) => {
  try {
    const deleted = deleteNote(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Note not found' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ error: 'Failed to delete note' });
  }
});

function validatePaneItems(items: unknown): PaneItem[] {
  if (!Array.isArray(items)) return [];

  return items
    .filter(
      (item): item is { id: string; content: string; notes?: string } =>
        typeof item === 'object' &&
        item !== null &&
        typeof item.id === 'string' &&
        typeof item.content === 'string'
    )
    .map((item) => ({
      id: item.id,
      content: item.content,
      notes: typeof item.notes === 'string' ? item.notes : undefined,
    }));
}
