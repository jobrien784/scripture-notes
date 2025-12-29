// Example: Pane Card Component Pattern
import { useState } from 'react';
import { Users, Plus, Pencil, Trash2 } from 'lucide-react';

interface PaneItem {
  id: string;
  content: string;
}

interface PaneCardProps {
  title: string;
  items: PaneItem[];
  onAdd: (content: string) => void;
  onUpdate: (id: string, content: string) => void;
  onDelete: (id: string) => void;
}

export function PaneCard({ title, items, onAdd, onUpdate, onDelete }: PaneCardProps) {
  const [newItem, setNewItem] = useState('');

  const handleAdd = () => {
    if (newItem.trim()) {
      onAdd(newItem.trim());
      setNewItem('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-parchment-50 rounded-lg border border-parchment-300 shadow-sm">
      {/* Header */}
      <div className="px-4 py-3 border-b border-parchment-200 flex items-center gap-2">
        <Users className="w-5 h-5 text-burgundy-600" />
        <h3 className="font-serif text-lg text-ink-800">{title}</h3>
        <span className="ml-auto text-sm text-ink-700/50">{items.length}</span>
      </div>

      {/* Items */}
      <div className="flex-1 p-3 space-y-2 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="group flex items-center gap-2 px-3 py-2 bg-white rounded border border-parchment-200">
            <span className="flex-1 text-sm text-ink-800">{item.content}</span>
            <button onClick={() => onDelete(item.id)} className="opacity-0 group-hover:opacity-100">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Add Form */}
      <div className="px-3 py-2 border-t border-parchment-200">
        <div className="flex gap-2">
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="Add item..."
            className="flex-1 px-3 py-1.5 text-sm border rounded"
          />
          <button onClick={handleAdd} className="p-1.5 text-burgundy-600">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
