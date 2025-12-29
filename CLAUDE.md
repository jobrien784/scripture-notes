# Scripture Notes - Bible Study Note-Taking Application

## Project Overview
A beautiful, spiritually-inspired note-taking application for Bible study with four-pane organization (People, Places, Events, Verses) and persistent storage.

## Tech Stack
- **Frontend**: React 18+ with TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: React Context + useReducer (keep it simple)
- **Backend**: Node.js with Express
- **Database**: SQLite with better-sqlite3 (simple, file-based, no setup)
- **Build Tool**: Vite

## Project Structure
```
scripture-notes/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── context/        # React Context providers
│   │   ├── types/          # TypeScript interfaces
│   │   ├── utils/          # Helper functions
│   │   └── styles/         # Global styles, design tokens
│   └── index.html
├── server/                 # Express backend
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── db/             # Database setup and queries
│   │   └── index.ts        # Server entry
│   └── data/               # SQLite database file location
├── package.json            # Root package.json with workspaces
└── README.md
```

## Design Philosophy

### Aesthetic Direction: "Sacred Simplicity"
- **Tone**: Warm, contemplative, refined - like a well-loved leather-bound Bible
- **Color Palette**: 
  - Primary: Deep burgundy (#722F37) or forest green (#2D4739)
  - Accent: Gold/amber (#C9A227) for highlights
  - Background: Warm cream/parchment (#FAF6F0) or soft charcoal for dark mode
  - Text: Rich brown (#3D2B1F) on light, warm ivory on dark
- **Typography**: 
  - Headers: Serif font (Cormorant Garamond, Libre Baskerville)
  - Body: Clean, readable serif or humanist sans (Source Serif Pro, Lora)
- **Visual Elements**:
  - Subtle paper/parchment textures
  - Soft shadows and gentle borders
  - Understated animations (fade, slide)
  - Icons from Lucide React

### UI Layout
```
┌─────────────────────────────────────────────────────────────┐
│  [Notes List Sidebar]  │         Note Title                 │
│  ─────────────────────  ────────────────────────────────────│
│  📖 Genesis Study      │  ┌────────────┐  ┌────────────┐   │
│  📖 Sermon Notes       │  │  👥 People │  │  📍 Places │   │
│  📖 Psalm Reflections  │  │            │  │            │   │
│                        │  │  • Moses   │  │  • Egypt   │   │
│  [+ New Note]          │  │  • Aaron   │  │  • Sinai   │   │
│                        │  └────────────┘  └────────────┘   │
│                        │  ┌────────────┐  ┌────────────┐   │
│                        │  │  📅 Events │  │  📜 Verses │   │
│                        │  │            │  │            │   │
│                        │  │  • Exodus  │  │  Ex 3:14   │   │
│                        │  │  • Plagues │  │  Ex 20:1-17│   │
│                        │  └────────────┘  └────────────┘   │
│                        │              [Save Note]           │
└─────────────────────────────────────────────────────────────┘
```

## Code Style
- Use functional components with hooks exclusively
- Prefer named exports over default exports
- Use TypeScript strict mode
- Extract reusable logic into custom hooks
- Keep components small and focused (<150 lines)
- Use semantic HTML elements
- Ensure keyboard accessibility

## Commands
```bash
# Development
npm run dev              # Start both client and server in dev mode
npm run dev:client       # Start only frontend
npm run dev:server       # Start only backend

# Build
npm run build            # Build for production

# Database
npm run db:init          # Initialize SQLite database
```

## API Endpoints
```
GET    /api/notes              # List all notes (summary only)
GET    /api/notes/:id          # Get full note with all panes
POST   /api/notes              # Create new note
PUT    /api/notes/:id          # Update existing note
DELETE /api/notes/:id          # Delete note
```

## Data Models
```typescript
interface Note {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  people: PaneItem[];
  places: PaneItem[];
  events: PaneItem[];
  verses: PaneItem[];
}

interface PaneItem {
  id: string;
  content: string;
  notes?: string;  // Optional additional notes
}
```

## Critical Implementation Details

### Database Schema
```sql
CREATE TABLE notes (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE pane_items (
  id TEXT PRIMARY KEY,
  note_id TEXT NOT NULL,
  pane_type TEXT NOT NULL,  -- 'people' | 'places' | 'events' | 'verses'
  content TEXT NOT NULL,
  notes TEXT,
  sort_order INTEGER,
  FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE
);
```

### State Management Pattern
Use a single `NotesContext` with `useReducer` for predictable state updates:
```typescript
type Action =
  | { type: 'SET_NOTES'; payload: Note[] }
  | { type: 'SELECT_NOTE'; payload: string }
  | { type: 'UPDATE_PANE'; payload: { pane: PaneType; items: PaneItem[] } }
  | { type: 'SAVE_NOTE' }
  | { type: 'CREATE_NOTE'; payload: { title: string } };
```

## Do Not
- Do not use complex state management libraries (Redux, Zustand)
- Do not add authentication (out of scope for MVP)
- Do not use an ORM - direct SQL queries are fine for this scale
- Do not over-engineer - this is a focused, single-purpose app
- Do not use generic/bland UI - make it beautiful and distinctive

## Validation Checklist
Before considering a feature complete:
- [ ] Component renders without errors
- [ ] TypeScript has no type errors
- [ ] UI is responsive (mobile, tablet, desktop)
- [ ] Keyboard navigation works
- [ ] Data persists correctly to database
- [ ] Loading and error states are handled
- [ ] Design matches the "Sacred Simplicity" aesthetic
