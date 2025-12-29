import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Note,
  NoteSummary,
  NotesState,
  NotesAction,
  PaneType,
  PaneItem,
} from '../types';

const API_BASE = '/api';

const initialState: NotesState = {
  notes: [],
  selectedNoteId: null,
  currentNote: null,
  isLoading: false,
  isSaving: false,
  error: null,
};

function notesReducer(state: NotesState, action: NotesAction): NotesState {
  switch (action.type) {
    case 'SET_NOTES':
      return { ...state, notes: action.payload };

    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'SET_SAVING':
      return { ...state, isSaving: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload };

    case 'SELECT_NOTE':
      return { ...state, selectedNoteId: action.payload };

    case 'SET_CURRENT_NOTE':
      return { ...state, currentNote: action.payload };

    case 'UPDATE_CURRENT_NOTE_TITLE':
      if (!state.currentNote) return state;
      return {
        ...state,
        currentNote: { ...state.currentNote, title: action.payload },
      };

    case 'UPDATE_PANE':
      if (!state.currentNote) return state;
      return {
        ...state,
        currentNote: {
          ...state.currentNote,
          [action.payload.pane]: action.payload.items,
        },
      };

    case 'ADD_NOTE_TO_LIST':
      return { ...state, notes: [action.payload, ...state.notes] };

    case 'UPDATE_NOTE_IN_LIST':
      return {
        ...state,
        notes: state.notes.map((n) =>
          n.id === action.payload.id ? action.payload : n
        ),
      };

    case 'REMOVE_NOTE_FROM_LIST':
      return {
        ...state,
        notes: state.notes.filter((n) => n.id !== action.payload),
        selectedNoteId:
          state.selectedNoteId === action.payload ? null : state.selectedNoteId,
        currentNote:
          state.currentNote?.id === action.payload ? null : state.currentNote,
      };

    default:
      return state;
  }
}

interface NotesContextValue {
  state: NotesState;
  fetchNotes: () => Promise<void>;
  selectNote: (id: string | null) => Promise<void>;
  createNote: (title: string) => Promise<void>;
  updateTitle: (title: string) => void;
  updatePane: (pane: PaneType, items: PaneItem[]) => void;
  saveNote: () => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
}

const NotesContext = createContext<NotesContextValue | null>(null);

export function NotesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(notesReducer, initialState);

  const fetchNotes = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const response = await fetch(`${API_BASE}/notes`);
      if (!response.ok) throw new Error('Failed to fetch notes');
      const notes: NoteSummary[] = await response.json();
      dispatch({ type: 'SET_NOTES', payload: notes });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'Failed to fetch notes',
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const selectNote = useCallback(async (id: string | null) => {
    dispatch({ type: 'SELECT_NOTE', payload: id });

    if (!id) {
      dispatch({ type: 'SET_CURRENT_NOTE', payload: null });
      return;
    }

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const response = await fetch(`${API_BASE}/notes/${id}`);
      if (!response.ok) throw new Error('Failed to fetch note');
      const note: Note = await response.json();
      dispatch({ type: 'SET_CURRENT_NOTE', payload: note });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'Failed to fetch note',
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const createNote = useCallback(async (title: string) => {
    dispatch({ type: 'SET_SAVING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    const id = uuidv4();

    try {
      const response = await fetch(`${API_BASE}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, title }),
      });

      if (!response.ok) throw new Error('Failed to create note');

      const note: Note = await response.json();
      const summary: NoteSummary = {
        id: note.id,
        title: note.title,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
      };

      dispatch({ type: 'ADD_NOTE_TO_LIST', payload: summary });
      dispatch({ type: 'SELECT_NOTE', payload: note.id });
      dispatch({ type: 'SET_CURRENT_NOTE', payload: note });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'Failed to create note',
      });
    } finally {
      dispatch({ type: 'SET_SAVING', payload: false });
    }
  }, []);

  const updateTitle = useCallback((title: string) => {
    dispatch({ type: 'UPDATE_CURRENT_NOTE_TITLE', payload: title });
  }, []);

  const updatePane = useCallback((pane: PaneType, items: PaneItem[]) => {
    dispatch({ type: 'UPDATE_PANE', payload: { pane, items } });
  }, []);

  const saveNote = useCallback(async () => {
    if (!state.currentNote) return;

    dispatch({ type: 'SET_SAVING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const response = await fetch(`${API_BASE}/notes/${state.currentNote.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: state.currentNote.title,
          people: state.currentNote.people,
          places: state.currentNote.places,
          events: state.currentNote.events,
          verses: state.currentNote.verses,
        }),
      });

      if (!response.ok) throw new Error('Failed to save note');

      const note: Note = await response.json();
      const summary: NoteSummary = {
        id: note.id,
        title: note.title,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
      };

      dispatch({ type: 'SET_CURRENT_NOTE', payload: note });
      dispatch({ type: 'UPDATE_NOTE_IN_LIST', payload: summary });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'Failed to save note',
      });
    } finally {
      dispatch({ type: 'SET_SAVING', payload: false });
    }
  }, [state.currentNote]);

  const deleteNote = useCallback(async (id: string) => {
    dispatch({ type: 'SET_SAVING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const response = await fetch(`${API_BASE}/notes/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete note');

      dispatch({ type: 'REMOVE_NOTE_FROM_LIST', payload: id });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'Failed to delete note',
      });
    } finally {
      dispatch({ type: 'SET_SAVING', payload: false });
    }
  }, []);

  // Fetch notes on mount
  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const value: NotesContextValue = {
    state,
    fetchNotes,
    selectNote,
    createNote,
    updateTitle,
    updatePane,
    saveNote,
    deleteNote,
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
}

export function useNotes(): NotesContextValue {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
}
