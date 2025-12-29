# Product Requirements Prompt: Scripture Notes
## Bible Study Note-Taking Application

**Date**: 2025-12-28
**Status**: Ready for Implementation

---

## Goal
Build a beautiful, spiritually-themed note-taking application specifically designed for Bible study, featuring organized four-pane note structure with persistent storage.

## Why
- Bible students need organized ways to track interconnected information (people, places, events, verses)
- Existing note apps are generic and don't support structured Bible study workflows
- A dedicated tool creates a more focused, distraction-free study experience

## What
A full-stack web application with:
- **Four-pane note editor**: People, Places, Events, Verses
- **Notes list sidebar**: Browse, create, and select saved study notes
- **Persistent storage**: All notes saved to a SQLite database
- **Beautiful UI**: Warm, contemplative design

### Success Criteria
- [ ] User can create a new note with a title
- [ ] User can add/edit/delete items in each of the four panes
- [ ] User can save a note and see it persisted across page refreshes
- [ ] User can open previously saved notes
- [ ] User can delete notes
- [ ] UI is visually beautiful with the "Sacred Simplicity" aesthetic
- [ ] App is responsive (mobile, tablet, desktop)

---

## Technical Architecture
```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   React App     │────▶│  Express API    │────▶│    SQLite DB    │
│   (Vite + TS)   │◀────│  (Node.js)      │◀────│ (better-sqlite3)│
└─────────────────┘     └─────────────────┘     └─────────────────┘
     Port 5173               Port 3001              ./data/notes.db
```

## Core Dependencies
```json
{
  "client": {
    "react": "^18.2.0",
    "typescript": "^5.3.0",
    "tailwindcss": "^3.4.0",
    "lucide-react": "^0.263.1",
    "uuid": "^9.0.0"
  },
  "server": {
    "express": "^4.18.0",
    "better-sqlite3": "^9.0.0",
    "cors": "^2.8.5",
    "tsx": "^4.0.0"
  }
}
```

## Design System

### Colors (Tailwind Config)
```javascript
colors: {
  parchment: {
    50: '#FDFCFA',
    100: '#FAF6F0',
    200: '#F5EDE0',
    300: '#E8DBC8',
  },
  burgundy: {
    500: '#722F37',
    600: '#5C262D',
    700: '#461D23',
  },
  gold: {
    400: '#D4AF37',
    500: '#C9A227',
  },
  ink: {
    700: '#3D2B1F',
    800: '#2D1F16',
    900: '#1A120D',
  }
}
```

### Typography
- Headers: 'Cormorant Garamond', Georgia, serif
- Body: 'Source Serif Pro', Georgia, serif

### Known Gotchas
```
# CRITICAL: better-sqlite3 is synchronous - don't use async/await with it
# CRITICAL: Include CORS middleware before routes in Express
# CRITICAL: Use vite proxy config to avoid CORS issues in development
# CRITICAL: Generate UUIDs on the client for optimistic UI updates
```

---

## Implementation Blueprint

### Phase 1: Project Setup
**Goal**: Working dev environment

1. Initialize monorepo with npm workspaces
2. Set up client/ with Vite + React + TypeScript
3. Set up server/ with Express + TypeScript
4. Configure Tailwind with custom colors
5. Add Google Fonts

**Validation**: `npm run dev` starts both servers

### Phase 2: Database Layer
**Goal**: SQLite with CRUD operations

1. Create database initialization script
2. Implement: getAllNotes, getNoteById, createNote, updateNote, deleteNote

**Validation**: Can insert and query test data

### Phase 3: API Routes
**Goal**: RESTful endpoints

1. GET /api/notes - list all
2. GET /api/notes/:id - get one
3. POST /api/notes - create
4. PUT /api/notes/:id - update
5. DELETE /api/notes/:id - delete

**Validation**: All endpoints work with curl

### Phase 4: React State
**Goal**: Client-side architecture

1. Create TypeScript types
2. Build NotesContext with useReducer
3. Create useNotes hook

**Validation**: Can fetch and update state

### Phase 5: UI Components
**Goal**: Beautiful, functional UI

1. AppLayout, Sidebar, NoteEditor
2. PaneCard, PaneItem components
3. Apply design system colors and fonts
4. Add subtle animations

**Validation**: UI matches design, all interactions work

### Phase 6: Integration
**Goal**: Everything works together

1. Wire up full create/edit/delete flow
2. Add loading and error states
3. Make responsive

**Validation**: Full user journey works

---

## File Implementation Order

1. package.json (root)
2. client/package.json
3. server/package.json
4. client/vite.config.ts
5. client/tailwind.config.js
6. client/src/index.css
7. server/src/db/schema.ts
8. server/src/db/index.ts
9. server/src/db/queries.ts
10. server/src/routes/notes.ts
11. server/src/index.ts
12. client/src/types/index.ts
13. client/src/context/NotesContext.tsx
14. client/src/components/ui/Button.tsx
15. client/src/components/layout/AppLayout.tsx
16. client/src/components/sidebar/Sidebar.tsx
17. client/src/components/editor/NoteEditor.tsx
18. client/src/components/editor/PaneCard.tsx
19. client/src/App.tsx
20. client/index.html
