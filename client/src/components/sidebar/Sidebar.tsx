import { useState, useMemo, KeyboardEvent } from 'react';
import { BookOpen, Plus, Trash2, ArrowDownAZ, Clock } from 'lucide-react';
import { SortMode } from '../../types';
import { useNotes } from '../../context/NotesContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export function Sidebar() {
  const { state, selectNote, createNote, deleteNote } = useNotes();
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [sortMode, setSortMode] = useState<SortMode>(() => {
    return (localStorage.getItem('notesSortMode') as SortMode) || 'recent';
  });

  const sortedNotes = useMemo(() => {
    const notes = [...state.notes];
    if (sortMode === 'alphabetical') {
      return notes.sort((a, b) => a.title.localeCompare(b.title));
    }
    return notes;
  }, [state.notes, sortMode]);

  const toggleSortMode = () => {
    const newMode = sortMode === 'alphabetical' ? 'recent' : 'alphabetical';
    setSortMode(newMode);
    localStorage.setItem('notesSortMode', newMode);
  };

  const handleCreateNote = async () => {
    if (!newTitle.trim()) return;
    await createNote(newTitle.trim());
    setNewTitle('');
    setIsCreating(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCreateNote();
    } else if (e.key === 'Escape') {
      setIsCreating(false);
      setNewTitle('');
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this note?')) {
      await deleteNote(id);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-parchment-200">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-serif font-semibold text-burgundy-600 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Scripture Notes
          </h1>
          <button
            onClick={toggleSortMode}
            className="p-1.5 rounded-md hover:bg-parchment-200 text-ink-600/70 hover:text-burgundy-600 transition-colors"
            title={sortMode === 'alphabetical' ? 'Sorted A-Z (click for recent)' : 'Sorted by recent (click for A-Z)'}
          >
            {sortMode === 'alphabetical' ? (
              <ArrowDownAZ className="w-4 h-4" />
            ) : (
              <Clock className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Notes list */}
      <div className="flex-1 overflow-y-auto p-2">
        {state.isLoading && state.notes.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin h-6 w-6 border-2 border-burgundy-500 border-t-transparent rounded-full" />
          </div>
        ) : sortedNotes.length === 0 && !isCreating ? (
          <div className="text-center py-8 px-4">
            <p className="text-ink-600/70 font-body text-sm">
              No notes yet. Create your first study note!
            </p>
          </div>
        ) : (
          <ul className="space-y-1">
            {sortedNotes.map((note) => (
              <li key={note.id}>
                <button
                  onClick={() => selectNote(note.id)}
                  className={`
                    w-full text-left p-3 rounded-lg
                    transition-all duration-200
                    group flex items-start justify-between gap-2
                    ${
                      state.selectedNoteId === note.id
                        ? 'bg-burgundy-500/10 border border-burgundy-500/20'
                        : 'hover:bg-parchment-200/50 border border-transparent'
                    }
                  `}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <BookOpen
                        className={`w-4 h-4 flex-shrink-0 ${
                          state.selectedNoteId === note.id
                            ? 'text-burgundy-500'
                            : 'text-ink-600/50'
                        }`}
                      />
                      <span
                        className={`font-body font-medium truncate ${
                          state.selectedNoteId === note.id
                            ? 'text-burgundy-600'
                            : 'text-ink-700'
                        }`}
                      >
                        {note.title}
                      </span>
                    </div>
                    <p className="text-xs text-ink-600/50 mt-1 ml-6 font-body">
                      {formatDate(note.updatedAt)}
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleDelete(e, note.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-100 text-ink-600/50 hover:text-red-600 transition-all"
                    aria-label="Delete note"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Create note form */}
      <div className="p-3 border-t border-parchment-200">
        {isCreating ? (
          <div className="space-y-2 animate-fade-in">
            <Input
              placeholder="Note title..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <div className="flex gap-2">
              <Button
                variant="primary"
                onClick={handleCreateNote}
                disabled={!newTitle.trim()}
                isLoading={state.isSaving}
                className="flex-1"
              >
                Create
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setIsCreating(false);
                  setNewTitle('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button
            variant="secondary"
            onClick={() => setIsCreating(true)}
            className="w-full"
          >
            <Plus className="w-4 h-4" />
            New Note
          </Button>
        )}
      </div>
    </div>
  );
}
