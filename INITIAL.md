# FEATURE: Scripture Notes - Bible Study Note-Taking App

## Summary
Build a beautiful, spiritually-themed web application for taking structured Bible study notes. The app features a four-pane note editor (People, Places, Events, Verses) with persistent storage.

## Core Requirements

### User Experience
- Create new notes with custom titles
- Organize study notes into four categories: Key People, Key Places, Key Events, Key Verses
- Add, edit, and delete items within each category
- Save notes persistently (survive page refresh/browser close)
- Browse and open previously saved notes
- Delete notes when no longer needed

### Visual Design
- Beautiful, warm aesthetic inspired by sacred texts
- "Sacred Simplicity" theme: parchment colors, serif typography, subtle textures
- Responsive design (mobile, tablet, desktop)
- Smooth, subtle animations

### Technical Requirements
- React frontend with TypeScript
- Express.js backend
- SQLite database (simple, no external dependencies)
- RESTful API

## What Success Looks Like
A user can:
1. Open the app and immediately start studying
2. Create a note titled "Genesis 1-3 Study"
3. Add "Adam", "Eve", "Serpent" to the People pane
4. Add "Garden of Eden" to the Places pane
5. Add "Creation", "The Fall" to the Events pane
6. Add "Gen 1:1", "Gen 3:15" to the Verses pane
7. Close the browser, come back later, and find their notes intact
8. Create additional notes for different study sessions
9. Navigate between notes seamlessly

## Design Inspiration
- Warm, contemplative feel like a leather-bound study Bible
- Colors: burgundy accents, gold highlights, cream/parchment backgrounds
- Typography: Elegant serif fonts (Cormorant Garamond for headers)
- Subtle paper texture, soft shadows, gentle borders

## Out of Scope for MVP
- User authentication/accounts
- Sharing or collaboration
- Bible verse lookup API
- Export functionality
- Dark mode
- Search
