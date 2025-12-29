import express from 'express';
import cors from 'cors';
import { initDatabase } from './db/index.js';
import { notesRouter } from './routes/notes.js';

const app = express();
const PORT = 3001;

// Middleware - CORS must be before routes
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Scripture Notes API is running' });
});

// API routes
app.use('/api/notes', notesRouter);

// Initialize database and start server
async function start() {
  try {
    await initDatabase();
    console.log('Database initialized');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();
