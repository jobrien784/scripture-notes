import { useCallback } from 'react';
import { AlertCircle, Check, Loader2 } from 'lucide-react';
import { useNotes } from '../../context/NotesContext';
import { PaneType, PaneItem } from '../../types';
import { PaneCard } from './PaneCard';

export function NoteEditor() {
  const { state, updateTitle, updatePane, saveNote } = useNotes();
  const { currentNote, saveStatus, error } = state;

  const handleSave = useCallback(() => {
    saveNote();
  }, [saveNote]);

  const handlePaneChange = useCallback(
    (pane: PaneType) => (items: PaneItem[]) => {
      updatePane(pane, items);
    },
    [updatePane]
  );

  if (!currentNote) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 bg-parchment-200 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-ink-600/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h2 className="text-xl font-serif font-semibold text-ink-700 mb-2">
            Select a Note
          </h2>
          <p className="text-ink-600/70 font-body">
            Choose a note from the sidebar or create a new one to begin your study.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-6">
      {/* Error banner */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 animate-fade-in">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="font-body text-sm">{error}</p>
        </div>
      )}

      {/* Title */}
      <div className="mb-6">
        <input
          type="text"
          value={currentNote.title}
          onChange={(e) => updateTitle(e.target.value)}
          className="w-full text-3xl font-serif font-semibold text-ink-800 bg-transparent border-none outline-none placeholder:text-ink-600/30 focus:ring-0"
          placeholder="Untitled Note"
        />
        <p className="text-sm text-ink-600/50 font-body mt-1 flex items-center gap-2">
          <span>Last updated {new Date(currentNote.updatedAt).toLocaleString()}</span>
          {saveStatus === 'saving' && (
            <span className="flex items-center gap-1 text-ink-600/70 italic animate-fade-in">
              <Loader2 className="w-3 h-3 animate-spin" />
              Saving...
            </span>
          )}
          {saveStatus === 'saved' && (
            <span className="flex items-center gap-1 text-green-600 animate-fade-in">
              <Check className="w-3 h-3" />
              Saved
            </span>
          )}
        </p>
      </div>

      {/* Four panes grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-0">
        <PaneCard
          type="people"
          items={currentNote.people}
          onItemsChange={handlePaneChange('people')}
          onSave={handleSave}
        />
        <PaneCard
          type="places"
          items={currentNote.places}
          onItemsChange={handlePaneChange('places')}
          onSave={handleSave}
        />
        <PaneCard
          type="events"
          items={currentNote.events}
          onItemsChange={handlePaneChange('events')}
          onSave={handleSave}
        />
        <PaneCard
          type="verses"
          items={currentNote.verses}
          onItemsChange={handlePaneChange('verses')}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}
