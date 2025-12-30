import { useState, KeyboardEvent } from 'react';
import { Plus, X, Users, MapPin, Calendar, BookMarked } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { PaneItem, PaneType } from '../../types';
import { Input } from '../ui/Input';

interface PaneCardProps {
  type: PaneType;
  items: PaneItem[];
  onItemsChange: (items: PaneItem[]) => void;
  onSave?: () => void;
}

const paneConfig: Record<PaneType, { label: string; singular: string; icon: typeof Users; placeholder: string }> = {
  people: {
    label: 'People',
    singular: 'person',
    icon: Users,
    placeholder: 'Add a person...',
  },
  places: {
    label: 'Places',
    singular: 'place',
    icon: MapPin,
    placeholder: 'Add a place...',
  },
  events: {
    label: 'Events',
    singular: 'event',
    icon: Calendar,
    placeholder: 'Add an event...',
  },
  verses: {
    label: 'Verses',
    singular: 'verse',
    icon: BookMarked,
    placeholder: 'Add a verse reference...',
  },
};

export function PaneCard({ type, items, onItemsChange, onSave }: PaneCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');

  const config = paneConfig[type];
  const Icon = config.icon;

  const handleAdd = () => {
    if (!newContent.trim()) return;
    const newItem: PaneItem = {
      id: uuidv4(),
      content: newContent.trim(),
    };
    onItemsChange([...items, newItem]);
    setNewContent('');
    setIsAdding(false);
    // Defer save to next tick to allow state update to process first
    setTimeout(() => onSave?.(), 0);
  };

  const handleAddKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd();
    } else if (e.key === 'Escape') {
      setIsAdding(false);
      setNewContent('');
    }
  };

  const handleRemove = (id: string) => {
    onItemsChange(items.filter((item) => item.id !== id));
    // Defer save to next tick to allow state update to process first
    setTimeout(() => onSave?.(), 0);
  };

  const handleStartEdit = (item: PaneItem) => {
    setEditingId(item.id);
    setEditingContent(item.content);
  };

  const handleSaveEdit = () => {
    if (!editingId || !editingContent.trim()) return;
    onItemsChange(
      items.map((item) =>
        item.id === editingId ? { ...item, content: editingContent.trim() } : item
      )
    );
    setEditingId(null);
    setEditingContent('');
    // Defer save to next tick to allow state update to process first
    setTimeout(() => onSave?.(), 0);
  };

  const handleEditKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      setEditingId(null);
      setEditingContent('');
    }
  };

  return (
    <div className="card p-4 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-burgundy-500" />
          <h3 className="font-serif font-semibold text-ink-800">{config.label}</h3>
        </div>
        <span className="text-xs text-ink-600/50 font-body">{items.length}</span>
      </div>

      {/* Items list */}
      <div className="flex-1 overflow-y-auto space-y-2 min-h-0">
        {items.length === 0 && !isAdding ? (
          <p className="text-sm text-ink-600/50 font-body italic py-2">
            No {config.label.toLowerCase()} added yet
          </p>
        ) : (
          <ul className="space-y-1">
            {items.map((item) => (
              <li
                key={item.id}
                className="group animate-fade-in"
              >
                {editingId === item.id ? (
                  <Input
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                    onKeyDown={handleEditKeyDown}
                    onBlur={handleSaveEdit}
                    autoFocus
                    className="text-sm py-1.5"
                  />
                ) : (
                  <div className="flex items-center justify-between gap-2 p-2 rounded-md hover:bg-parchment-100 transition-colors">
                    <button
                      onClick={() => handleStartEdit(item)}
                      className="flex-1 text-left text-sm font-body text-ink-700 hover:text-burgundy-600 transition-colors"
                    >
                      {item.content}
                    </button>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-100 text-ink-600/50 hover:text-red-600 transition-all"
                      aria-label={`Remove ${item.content}`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Add item form */}
      <div className="mt-3 pt-3 border-t border-parchment-200">
        {isAdding ? (
          <div className="animate-fade-in">
            <Input
              placeholder={config.placeholder}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              onKeyDown={handleAddKeyDown}
              onBlur={() => {
                if (!newContent.trim()) {
                  setIsAdding(false);
                }
              }}
              autoFocus
              className="text-sm"
            />
          </div>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full flex items-center justify-center gap-1.5 py-2 text-sm text-ink-600/70 hover:text-burgundy-600 hover:bg-parchment-100 rounded-md transition-colors font-body"
          >
            <Plus className="w-4 h-4" />
            Add {config.singular}
          </button>
        )}
      </div>
    </div>
  );
}
