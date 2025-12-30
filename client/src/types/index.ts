export interface PaneItem {
  id: string;
  content: string;
  notes?: string;
}

export type PaneType = 'people' | 'places' | 'events' | 'verses';

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

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

export interface NotesState {
  notes: NoteSummary[];
  selectedNoteId: string | null;
  currentNote: Note | null;
  isLoading: boolean;
  isSaving: boolean;
  saveStatus: SaveStatus;
  error: string | null;
}

export type NotesAction =
  | { type: 'SET_NOTES'; payload: NoteSummary[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SAVING'; payload: boolean }
  | { type: 'SET_SAVE_STATUS'; payload: SaveStatus }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SELECT_NOTE'; payload: string | null }
  | { type: 'SET_CURRENT_NOTE'; payload: Note | null }
  | { type: 'UPDATE_CURRENT_NOTE_TITLE'; payload: string }
  | { type: 'UPDATE_PANE'; payload: { pane: PaneType; items: PaneItem[] } }
  | { type: 'ADD_NOTE_TO_LIST'; payload: NoteSummary }
  | { type: 'UPDATE_NOTE_IN_LIST'; payload: NoteSummary }
  | { type: 'REMOVE_NOTE_FROM_LIST'; payload: string };

export type SortMode = 'alphabetical' | 'recent';
